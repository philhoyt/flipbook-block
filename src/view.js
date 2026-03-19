import PageFlipOpen from 'pageflipopen';
import 'pageflipopen/pageflipopen.css'; // eslint-disable-line import/no-unresolved

document.addEventListener( 'DOMContentLoaded', function () {
	document
		.querySelectorAll( '[id^="flipbook-container-"]' )
		.forEach( function ( container ) {
			const pdfUrl = container.dataset.pdfUrl;
			if ( ! pdfUrl ) {
				return;
			}

			const dataset = container.dataset;

			const options = {
				source: pdfUrl,
				backgroundColor: 'transparent',
				autoHeight: true,
				toolbar: dataset.toolbar !== 'false',
				toolbarAlwaysVisible: dataset.toolbarAlwaysVisible === 'true',
				enableFullscreen: dataset.enableFullscreen !== 'false',
				enableDownload: dataset.enableDownload === 'true',
				singlePageMode: dataset.singlePageMode === 'true',
				flipDuration: parseInt( dataset.flipDuration, 10 ) || 800,
				startPage: parseInt( dataset.startPage, 10 ) || 1,
			};

			if ( dataset.downloadFilename ) {
				options.downloadFilename = dataset.downloadFilename;
			}

			new PageFlipOpen( container, options );
		} );
} );
