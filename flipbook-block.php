<?php
/**
 * Plugin Name:       Flipbook Block
 * Description:       Display a pdf in a digital flipbook format.
 * Requires at least: 6.6
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            philhoyt
 * Author URI:        https://philhoyt.com
 * GitHub Plugin URI: https://github.com/philhoyt/flipbook-block
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

	// Defer the view script so it doesn't block page rendering.
	// The flipbook initialises on DOMContentLoaded so defer is safe.
	wp_script_add_data( 'ph-flipbook-block-view-script', 'strategy', 'defer' );
}
add_action( 'init', __NAMESPACE__ . '\\register_flipbook_block' );
