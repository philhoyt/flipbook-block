import { PageFlip } from 'page-flip';

document.addEventListener( 'DOMContentLoaded', async function () {
	const containers = document.querySelectorAll( '[id^="flipbook-container-"]' );

	for ( const container of containers ) {
		const pdfUrl = container.dataset.pdfUrl;
		if ( ! pdfUrl ) continue;

		pdfjsLib.GlobalWorkerOptions.workerSrc = flipbookData.pdfWorkerSrc;

		// Loading state.
		const loadingEl = document.createElement( 'div' );
		loadingEl.className = 'flipbook-loading';
		loadingEl.textContent = 'Loading…';
		container.appendChild( loadingEl );

		const pdf = await pdfjsLib.getDocument( pdfUrl ).promise;

		// Cache page 1 viewport — needed for both layout detection and showCover.
		const page1Viewport = ( await pdf.getPage( 1 ) ).getViewport( { scale: 1 } );

		// Auto-detect layout: landscape page 2 → pre-made spreads, otherwise individual pages.
		let layoutMode = 'single';
		if ( pdf.numPages > 1 ) {
			const p2v = ( await pdf.getPage( 2 ) ).getViewport( { scale: 1 } );
			if ( p2v.width > p2v.height ) layoutMode = 'spread';
		}

		const containerWidth = container.offsetWidth;

		// Both modes show two pages side by side.
		// 'spread': landscape pages are split into halves → each half is one page.
		// 'single': portrait pages shown as-is, two per view.
		const pageWidth = Math.floor( containerWidth / 2 );

		// Aspect ratio for a single page slot.
		// 'spread': use half of the interior landscape page (page 2).
		// 'single': use page 1 directly.
		const refVp = layoutMode === 'spread' && pdf.numPages > 1
			? ( await pdf.getPage( 2 ) ).getViewport( { scale: 1 } )
			: page1Viewport;

		const pageHeight = layoutMode === 'spread'
			? Math.round( pageWidth * refVp.height / ( refVp.width / 2 ) )  // half-landscape ratio
			: Math.round( pageWidth * refVp.height / refVp.width );

		container.style.height = `${ pageHeight }px`;

		const canvasW = pageWidth * 2;  // 2x for sharpness
		const canvasH = pageHeight * 2;

		const images = [];

		for ( let i = 1; i <= pdf.numPages; i++ ) {
			loadingEl.textContent = `Loading page ${ i } of ${ pdf.numPages }…`;

			const page    = await pdf.getPage( i );
			const nativeVp = page.getViewport( { scale: 1 } );
			const isLandscape = nativeVp.width > nativeVp.height;

			if ( layoutMode === 'spread' && isLandscape ) {
				// Render the full landscape spread onto a double-wide temp canvas,
				// then slice it into left and right halves.
				const fullScale = ( canvasW * 2 ) / nativeVp.width;

				const temp    = document.createElement( 'canvas' );
				temp.width    = canvasW * 2;
				temp.height   = canvasH;
				const tempCtx = temp.getContext( '2d' );
				tempCtx.fillStyle = '#ffffff';
				tempCtx.fillRect( 0, 0, temp.width, temp.height );
				await page.render( {
					canvasContext: tempCtx,
					viewport: page.getViewport( { scale: fullScale } ),
				} ).promise;

				const leftCanvas  = document.createElement( 'canvas' );
				leftCanvas.width  = canvasW;
				leftCanvas.height = canvasH;
				leftCanvas.getContext( '2d' )
					.drawImage( temp, 0, 0, canvasW, canvasH, 0, 0, canvasW, canvasH );
				images.push( leftCanvas.toDataURL( 'image/jpeg', 0.9 ) );

				const rightCanvas  = document.createElement( 'canvas' );
				rightCanvas.width  = canvasW;
				rightCanvas.height = canvasH;
				rightCanvas.getContext( '2d' )
					.drawImage( temp, canvasW, 0, canvasW, canvasH, 0, 0, canvasW, canvasH );
				images.push( rightCanvas.toDataURL( 'image/jpeg', 0.9 ) );

			} else {
				// Portrait page (covers, or any page in 'single' mode):
				// letterbox into the page slot canvas.
				const canvas  = document.createElement( 'canvas' );
				canvas.width  = canvasW;
				canvas.height = canvasH;

				const ctx = canvas.getContext( '2d' );
				ctx.fillStyle = '#ffffff';
				ctx.fillRect( 0, 0, canvasW, canvasH );

				const renderScale = Math.min( canvasW / nativeVp.width, canvasH / nativeVp.height );
				const scaledW     = nativeVp.width * renderScale;
				const scaledH     = nativeVp.height * renderScale;
				const offsetX     = ( canvasW - scaledW ) / 2;
				const offsetY     = ( canvasH - scaledH ) / 2;

				await page.render( {
					canvasContext: ctx,
					viewport: page.getViewport( { scale: renderScale, offsetX, offsetY } ),
				} ).promise;

				images.push( canvas.toDataURL( 'image/jpeg', 0.9 ) );
			}
		}

		loadingEl.remove();

		// In spread PDFs the first and last pages are portrait covers.
		// showCover:true tells StPageFlip to display them as single half-pages,
		// but it still draws an edge shadow on the empty side.
		// We cover that area with a positioned overlay div that matches the
		// container background, then hide it once interior spreads are visible.
		const hasCoverPages = layoutMode === 'spread' && page1Viewport.height > page1Viewport.width;

		const pageFlip = new PageFlip( container, {
			width:               pageWidth,
			height:              pageHeight,
			size:                'fixed',
			showCover:           hasCoverPages,
			drawShadow:          true,
			maxShadowOpacity:    0.3,
			flippingTime:        800,
			usePortrait:         true,
			mobileScrollSupport: true,
		} );

		// Overlay that hides the edge shadow on the empty side of cover pages.
		// Hidden during flip animations so it doesn't clip the turning page,
		// then restored once the book settles (changeState → 'read').
		if ( hasCoverPages ) {
			const overlay = document.createElement( 'div' );
			overlay.style.cssText =
				'position:absolute;top:0;height:100%;width:50%;pointer-events:none;z-index:5;' +
				'background:' + getComputedStyle( container ).backgroundColor + ';';
			container.appendChild( overlay );

			let currentPage = 0;

			const positionOverlay = ( idx ) => {
				if ( idx === 0 ) {
					Object.assign( overlay.style, { display: 'block', left: '0', right: 'auto' } );
				} else if ( idx === images.length - 1 ) {
					Object.assign( overlay.style, { display: 'block', left: 'auto', right: '0' } );
				} else {
					overlay.style.display = 'none';
				}
			};

			// Track the settled page index via flip events.
			pageFlip.on( 'flip', ( e ) => { currentPage = e.data; } );

			// Hide overlay while the page is in motion; restore when settled.
			pageFlip.on( 'changeState', ( e ) => {
				if ( e.data === 'flipping' || e.data === 'user_fold' ) {
					overlay.style.display = 'none';
				} else if ( e.data === 'read' ) {
					positionOverlay( currentPage );
				}
			} );

			positionOverlay( 0 );
		}

		// Block the corner-fold hover preview while keeping drag and click.
		// Listeners fire in registration order on the same element, so this must
		// be added before loadFromImages() attaches StPageFlip's own listeners.
		// When dragging, isDragging is true and we let mousemove through normally.
		let isDragging = false;
		container.addEventListener( 'mousedown', () => { isDragging = true; } );
		document.addEventListener( 'mouseup', () => { isDragging = false; } );
		container.addEventListener( 'mousemove', ( e ) => {
			if ( ! isDragging ) e.stopImmediatePropagation();
		} );

		pageFlip.loadFromImages( images );

		// Navigation controls.
		const nav     = document.createElement( 'div' );
		nav.className = 'flipbook-nav';

		const prevBtn = document.createElement( 'button' );
		prevBtn.className = 'flipbook-nav__btn';
		prevBtn.setAttribute( 'aria-label', 'Previous page' );
		prevBtn.innerHTML = '&#8592;';
		prevBtn.addEventListener( 'click', () => pageFlip.flipPrev() );

		const counter     = document.createElement( 'span' );
		counter.className = 'flipbook-nav__counter';

		const nextBtn = document.createElement( 'button' );
		nextBtn.className = 'flipbook-nav__btn';
		nextBtn.setAttribute( 'aria-label', 'Next page' );
		nextBtn.innerHTML = '&#8594;';
		nextBtn.addEventListener( 'click', () => pageFlip.flipNext() );

		nav.appendChild( prevBtn );
		nav.appendChild( counter );
		nav.appendChild( nextBtn );
		container.insertAdjacentElement( 'afterend', nav );

		const totalImages    = images.length;
		const updateCounter  = ( idx ) => {
			counter.textContent = `${ idx + 1 } / ${ totalImages }`;
		};
		pageFlip.on( 'flip', ( e ) => updateCounter( e.data ) );
		updateCounter( pageFlip.getCurrentPageIndex() );
	}
} );
