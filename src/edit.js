import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaPlaceholder, MediaReplaceFlow, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { ToolbarGroup, PanelBody, ToggleControl, RangeControl, TextControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

const ALLOWED_TYPES = [ 'application/pdf' ];

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const {
		pdfUrl,
		pdfId,
		blockId,
		toolbar,
		toolbarAlwaysVisible,
		enableFullscreen,
		enableDownload,
		downloadFilename,
singlePageMode,
		flipDuration,
		startPage,
	} = attributes;

	const blockProps = useBlockProps();

	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: clientId } );
		}
	}, [ clientId ] );

	const media = useSelect(
		( select ) => ( pdfId ? select( coreStore ).getMedia( pdfId ) : null ),
		[ pdfId ]
	);

	const thumbnailUrl =
		media?.media_details?.sizes?.medium?.source_url ||
		media?.media_details?.sizes?.thumbnail?.source_url;

	const onSelectPDF = ( selected ) => {
		setAttributes( { pdfUrl: selected.url, pdfId: selected.id } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Toolbar', 'flipbook-block' ) }>
					<ToggleControl
						label={ __( 'Show toolbar', 'flipbook-block' ) }
						checked={ toolbar }
						onChange={ ( value ) => setAttributes( { toolbar: value } ) }
					/>
					<ToggleControl
						label={ __( 'Always visible', 'flipbook-block' ) }
						checked={ toolbarAlwaysVisible }
						onChange={ ( value ) => setAttributes( { toolbarAlwaysVisible: value } ) }
						disabled={ ! toolbar }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Features', 'flipbook-block' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Fullscreen button', 'flipbook-block' ) }
						checked={ enableFullscreen }
						onChange={ ( value ) => setAttributes( { enableFullscreen: value } ) }
					/>
					<ToggleControl
						label={ __( 'Download button', 'flipbook-block' ) }
						checked={ enableDownload }
						onChange={ ( value ) => setAttributes( { enableDownload: value } ) }
					/>
					{ enableDownload && (
						<TextControl
							label={ __( 'Download filename', 'flipbook-block' ) }
							value={ downloadFilename }
							placeholder={ __( 'Defaults to PDF filename', 'flipbook-block' ) }
							onChange={ ( value ) => setAttributes( { downloadFilename: value } ) }
						/>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Display', 'flipbook-block' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Single page mode', 'flipbook-block' ) }
						checked={ singlePageMode }
						onChange={ ( value ) => setAttributes( { singlePageMode: value } ) }
					/>
					<RangeControl
						label={ __( 'Flip duration (ms)', 'flipbook-block' ) }
						value={ flipDuration }
						onChange={ ( value ) => setAttributes( { flipDuration: value } ) }
						min={ 0 }
						max={ 3000 }
						step={ 100 }
					/>
					<RangeControl
						label={ __( 'Start page', 'flipbook-block' ) }
						value={ startPage }
						onChange={ ( value ) => setAttributes( { startPage: value } ) }
						min={ 1 }
						max={ 999 }
					/>
				</PanelBody>
			</InspectorControls>

			{ pdfUrl && (
				<BlockControls>
					<ToolbarGroup>
						<MediaReplaceFlow
							mediaURL={ pdfUrl }
							allowedTypes={ ALLOWED_TYPES }
							accept="application/pdf"
							onSelect={ onSelectPDF }
							name={ __( 'Replace PDF', 'flipbook-block' ) }
						/>
					</ToolbarGroup>
				</BlockControls>
			) }

			<div { ...blockProps }>
				{ pdfUrl ? (
					<div className="flipbook-block_preview">
						{ thumbnailUrl && (
							<img
								src={ thumbnailUrl }
								alt={ __( 'PDF preview', 'flipbook-block' ) }
								className="flipbook-block_thumbnail"
							/>
						) }
						<p className="flipbook-block_filename">
							{ decodeURIComponent( pdfUrl.split( '/' ).pop() ) }
						</p>
					</div>
				) : (
					<MediaPlaceholder
						icon="media-document"
						labels={ {
							title: __( 'Flipbook PDF', 'flipbook-block' ),
							instructions: __( 'Upload a PDF file to display as an interactive flipbook.', 'flipbook-block' ),
						} }
						onSelect={ onSelectPDF }
						allowedTypes={ ALLOWED_TYPES }
						accept="application/pdf"
					/>
				) }
			</div>
		</>
	);
};

export default Edit;
