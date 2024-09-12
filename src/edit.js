import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const { pdfUrl, blockId } = attributes;
	const blockProps = useBlockProps();

	// Set a unique blockId based on clientId
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	const onSelectPDF = ( media ) => {
		setAttributes( { pdfUrl: media.url } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'PDF Upload', 'flipbook-block' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectPDF }
							allowedTypes={ [ 'application/pdf' ] }
							render={ ( { open } ) => (
								<Button
									onClick={ open }
									className="components-button is-primary"
								>
									{ pdfUrl ? __( 'Replace PDF', 'flipbook-block' ) : __( 'Upload PDF', 'flipbook-block' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ pdfUrl ? (
					<>
						<div className='flipbook-block_file'>
							<p>{ __( 'PDF uploaded: ', 'flipbook-block' ) }</p>
							<a href={ pdfUrl } target='_blank' rel='noopener noreferrer'>{ pdfUrl }</a>
						</div>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectPDF }
								allowedTypes={ [ 'application/pdf' ] }
								render={ ( { open } ) => (
									<Button
										onClick={ open }
										className="components-button is-secondary"
									>
										{ __( 'Replace PDF', 'flipbook-block' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</>
				) : (
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectPDF }
							allowedTypes={ [ 'application/pdf' ] }
							render={ ( { open } ) => (
								<Button
									onClick={ open }
									className="components-button is-primary"
								>
									{ __( 'Upload PDF', 'flipbook-block' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				) }
			</div>
		</>
	);
};

export default Edit;