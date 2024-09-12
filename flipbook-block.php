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
	// Check if the flipbook block is being used on the page.
	if ( has_block( 'ph/flipbook-block' ) ) {
		// Paths to the assets.
		$flipbook_css_path = plugin_dir_path( __FILE__ ) . 'assets/css/dflip.min.css';
		$themify_css_path = plugin_dir_path( __FILE__ ) . 'assets/css/themify-icons.min.css';
		$flipbook_js_path = plugin_dir_path( __FILE__ ) . 'assets/js/dflip.min.js';

		// Use filemtime() to get the file's modification time as the version.
		$flipbook_css_version = file_exists( $flipbook_css_path ) ? filemtime( $flipbook_css_path ) : false;
		$themify_css_version = file_exists( $themify_css_path ) ? filemtime( $themify_css_path ) : false;
		$flipbook_js_version = file_exists( $flipbook_js_path ) ? filemtime( $flipbook_js_path ) : false;

		// Enqueue CSS files with dynamic version.
		wp_enqueue_style(
			'flipbook-style',
			plugins_url( '/assets/css/dflip.min.css', __FILE__ ),
			array(),
			$flipbook_css_version // Dynamic version
		);

		wp_enqueue_style(
			'themify-icons-style',
			plugins_url( '/assets/css/themify-icons.min.css', __FILE__ ),
			array(),
			$themify_css_version // Dynamic version
		);

		// Enqueue dFlip script with jQuery as a dependency and dynamic version.
		wp_enqueue_script(
			'flipbook-script',
			plugins_url( '/assets/js/dflip.min.js', __FILE__ ),
			array( 'jquery' ), // jQuery dependency
			$flipbook_js_version, // Dynamic version
			true // Load in footer
		);
	}
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_flipbook_assets' );
