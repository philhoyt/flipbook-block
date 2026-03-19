<?php
/**
 * Server-side render for the Flipbook Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner block content (unused).
 * @var WP_Block $block      Block instance.
 *
 * @package PH\FlipbookBlock
 */

$pdf_url              = $attributes['pdfUrl'] ?? '';
$block_id             = $attributes['blockId'] ?? '';
$toolbar              = $attributes['toolbar'] ?? true;
$toolbar_always_vis   = $attributes['toolbarAlwaysVisible'] ?? true;
$enable_fullscreen    = $attributes['enableFullscreen'] ?? true;
$enable_download      = $attributes['enableDownload'] ?? false;
$download_filename    = $attributes['downloadFilename'] ?? '';
$single_page_mode     = $attributes['singlePageMode'] ?? false;
$flip_duration        = isset( $attributes['flipDuration'] ) ? (int) $attributes['flipDuration'] : 800;
$start_page           = isset( $attributes['startPage'] ) ? (int) $attributes['startPage'] : 1;

$inner_attrs = sprintf(
	'id="flipbook-container-%s" data-pdf-url="%s" data-toolbar="%s" data-toolbar-always-visible="%s" data-enable-fullscreen="%s" data-enable-download="%s" data-single-page-mode="%s" data-flip-duration="%d" data-start-page="%d"',
	esc_attr( $block_id ),
	esc_attr( $pdf_url ),
	$toolbar ? 'true' : 'false',
	$toolbar_always_vis ? 'true' : 'false',
	$enable_fullscreen ? 'true' : 'false',
	$enable_download ? 'true' : 'false',
	$single_page_mode ? 'true' : 'false',
	$flip_duration,
	$start_page
);

if ( $download_filename ) {
	$inner_attrs .= sprintf( ' data-download-filename="%s"', esc_attr( $download_filename ) );
}

printf(
	'<div %s><div %s></div></div>',
	get_block_wrapper_attributes(),
	$inner_attrs
);
