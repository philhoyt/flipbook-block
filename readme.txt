=== Flipbook Block ===
Contributors: philhoyt
Tags: block, flipbook, pdf, page-flip, viewer
Requires at least: 6.6
Tested up to: 6.7
Stable tag: 1.0.2
Requires PHP: 7.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Display a PDF as an interactive digital flipbook using the WordPress block editor.

== Description ==

Flipbook Block lets you upload any PDF from your media library and display it as a beautiful, interactive digital flipbook with realistic page-turn animations.

Powered by PageFlipOpen, the flipbook renders entirely in the browser with no external services required.

Features:

* Upload PDFs directly from the WordPress media library
* Interactive page-flip animations
* Configurable toolbar with fullscreen and download options
* Auto-detects single or double page spread based on container width
* Adjustable height, animation speed, and start page
* Wide and full alignment support
* PDF thumbnail preview in the block editor

== Installation ==

1. Upload the flipbook-block folder to the /wp-content/plugins/ directory, or install the plugin through the WordPress Plugins screen.
2. Activate the plugin through the Plugins menu in WordPress.
3. In the block editor, add the Flipbook Block block to any post or page.
4. Upload or select a PDF from your media library.

== Block Settings ==

= Toolbar =
* Show toolbar - Display the flipbook toolbar. Default: on.
* Always visible - Keep the toolbar permanently visible instead of fading out. Default: on.

= Features =
* Fullscreen button - Show a fullscreen toggle button in the toolbar. Default: on.
* Download button - Show a download button in the toolbar. Default: off.
* Download filename - Custom filename for the downloaded PDF (only shown when download is enabled).

= Display =
* Single page mode - Force single-page layout instead of auto-detecting based on container width. Default: off.
* Flip duration - Page-turn animation speed in milliseconds. Default: 800.
* Start page - The page number to open on. Default: 1.

== Frequently Asked Questions ==

= What file types are supported? =

Only PDF files are supported.

= Why isn't the PDF thumbnail showing in the editor? =

WordPress generates PDF thumbnails using Imagick. If Imagick is not installed on your server, the thumbnail will not appear in the editor. The flipbook will still work correctly on the frontend.

= The flipbook isn't rendering on my site. What should I check? =

Make sure your server is configured to serve .js files with the correct MIME type (application/javascript). If you are seeing a "fake worker" warning in the browser console, this is likely the cause.

== Changelog ==

= 1.0.2 =
* Removed manual height control in favour of automatic height via PageFlipOpen's autoHeight option
* Updated PageFlipOpen to 0.4.3

= 1.0.1 =
* Internal version bump

= 1.0.0 =
* Initial release
* PDF upload via WordPress media library
* Interactive flipbook powered by PageFlipOpen
* Toolbar, fullscreen, download, single page mode, flip duration, start page, and height controls
* Wide and full alignment support
* PDF thumbnail preview in the block editor

== Upgrade Notice ==

= 1.0.2 =
The manual height control has been removed. The flipbook now sizes itself automatically.

= 1.0.0 =
Initial release.
