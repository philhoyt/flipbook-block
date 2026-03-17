<?php
/**
 * Plugin Name:       Flipbook Block
 * Description:       Display a pdf in a digital flipbook format.
 * Requires at least: 6.6
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Phil Hoyt
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       flipbook-block
 *
 * @package CreateBlock
 */

namespace PH\FlipbookBlock;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 */
function register_flipbook_block() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', __NAMESPACE__ . '\\register_flipbook_block' );

/**
 * Enqueue flipbook assets (CSS & JS) on the front end when the block is present.
 */
function enqueue_flipbook_assets() {
	if ( has_block( 'ph/flipbook-block' ) ) {
		$pdfjs_path    = plugin_dir_path( __FILE__ ) . 'assets/js/libs/pdf.min.js';
		$pdfjs_version = file_exists( $pdfjs_path ) ? filemtime( $pdfjs_path ) : false;

		wp_enqueue_script(
			'pdfjs',
			plugins_url( '/assets/js/libs/pdf.min.js', __FILE__ ),
			array(),
			$pdfjs_version,
			true
		);

		// Pass the worker URL to view.js so PDF.js can load it.
		wp_localize_script(
			'pdfjs',
			'flipbookData',
			array(
				'pdfWorkerSrc' => plugins_url( '/assets/js/libs/pdf.worker.min.js', __FILE__ ),
			)
		);
	}
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_flipbook_assets' );
