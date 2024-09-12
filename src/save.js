import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { pdfUrl, blockId } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			<div id={ `flipbook-container-${blockId}` } data-pdf-url={ pdfUrl }></div>
		</div>
	);
}