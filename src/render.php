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

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$flipbook_block_pdf_url            = $attributes['pdfUrl'] ?? '';
$flipbook_block_id                 = $attributes['blockId'] ?? '';
$flipbook_block_toolbar            = $attributes['toolbar'] ?? true;
$flipbook_block_toolbar_always_vis = $attributes['toolbarAlwaysVisible'] ?? true;
$flipbook_block_enable_fullscreen  = $attributes['enableFullscreen'] ?? true;
$flipbook_block_enable_download    = $attributes['enableDownload'] ?? false;
$flipbook_block_download_filename  = $attributes['downloadFilename'] ?? '';
$flipbook_block_single_page_mode   = $attributes['singlePageMode'] ?? false;
$flipbook_block_flip_duration      = isset( $attributes['flipDuration'] ) ? (int) $attributes['flipDuration'] : 800;
$flipbook_block_start_page         = isset( $attributes['startPage'] ) ? (int) $attributes['startPage'] : 1;

$flipbook_block_inner_attrs = sprintf(
	'id="flipbook-container-%s" data-pdf-url="%s" data-toolbar="%s" data-toolbar-always-visible="%s" data-enable-fullscreen="%s" data-enable-download="%s" data-single-page-mode="%s" data-flip-duration="%d" data-start-page="%d"',
	esc_attr( $flipbook_block_id ),
	esc_attr( $flipbook_block_pdf_url ),
	$flipbook_block_toolbar ? 'true' : 'false',
	$flipbook_block_toolbar_always_vis ? 'true' : 'false',
	$flipbook_block_enable_fullscreen ? 'true' : 'false',
	$flipbook_block_enable_download ? 'true' : 'false',
	$flipbook_block_single_page_mode ? 'true' : 'false',
	$flipbook_block_flip_duration,
	$flipbook_block_start_page
);

if ( $flipbook_block_download_filename ) {
	$flipbook_block_inner_attrs .= sprintf( ' data-download-filename="%s"', esc_attr( $flipbook_block_download_filename ) );
}

printf(
	'<div %s><div %s></div></div>',
	get_block_wrapper_attributes(), // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	$flipbook_block_inner_attrs // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
);
