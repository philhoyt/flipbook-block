import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		pdfUrl,
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

	return (
		<div { ...useBlockProps.save() }>
			<div
				id={ `flipbook-container-${ blockId }` }
				data-pdf-url={ pdfUrl }
				data-toolbar={ toolbar }
				data-toolbar-always-visible={ toolbarAlwaysVisible }
				data-enable-fullscreen={ enableFullscreen }
				data-enable-download={ enableDownload }
				data-download-filename={ downloadFilename || undefined }
				data-single-page-mode={ singlePageMode }
				data-flip-duration={ flipDuration }
				data-start-page={ startPage }
			></div>
		</div>
	);
}
