=== Flipbook Block ===
Contributors: philhoyt
Tags: block, flipbook, pdf, page-flip, viewer
Requires at least: 6.6
Tested up to: 7.1
Stable tag: 1.1.1
Requires PHP: 7.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Displays a PDF from the media library as a page-flip flipbook block

== Description ==

Flipbook Block adds one block to the editor. Pick a PDF from the media library and the block renders it on the front end as a flipbook with page-turn animation. Rendering is done in the browser by the bundled PageFlipOpen library; no external service is called.

The block shows the PDF's thumbnail in the editor when WordPress has generated one. It supports wide and full alignment.

Settings in the block sidebar:

* Show toolbar (default on).
* Always visible: keep the toolbar on screen instead of fading it out (default on).
* Fullscreen button in the toolbar (default on).
* Download button in the toolbar (default off), with an optional filename for the downloaded file.
* Single page mode: force one page per spread instead of switching between one and two pages based on container width (default off).
* Flip duration in milliseconds (default 800).
* Start page (default 1).

The `pdfUrl` attribute can be bound to post meta through the block bindings API on WordPress 6.9 or later. A template can declare the binding like this:

    <!-- wp:ph/flipbook-block {"metadata":{"bindings":{"pdfUrl":{"source":"core/post-meta","args":{"key":"your_meta_key"}}}}} /-->

The [Flipbook Catalog](https://github.com/philhoyt/flipbook-catalog) plugin uses this binding to build a PDF catalog post type with the block already in its template.

== Installation ==

1. Upload the flipbook-block folder to /wp-content/plugins/, or install the zip from the Plugins screen.
2. Activate the plugin from the Plugins menu.
3. In the editor, add the Flipbook Block to a post or page.
4. Upload or select a PDF from the media library.

Updates are delivered from GitHub releases through Plugin Update Checker.

== Frequently Asked Questions ==

= What file types are supported? =

PDF only.

= Why isn't the PDF thumbnail showing in the editor? =

WordPress generates PDF thumbnails with Imagick. If Imagick is not installed on the server, there is no thumbnail to show. The flipbook still renders on the front end.

= The flipbook isn't rendering on my site. What should I check? =

Check that the server sends .js files with the application/javascript MIME type. A "fake worker" warning in the browser console usually points to this.

= I'm using block bindings and the PDF URL is empty. =

Block bindings need WordPress 6.9 or later; on older versions the binding is skipped. Also confirm the meta key is registered with `show_in_rest: true` and that the post has a value saved for it.

== Changelog ==

= 1.1.1 =
* Fixed the render template so its working variables stay in their own scope instead of leaking into the page template.
* Changed update delivery to GitHub releases.
* Tested up to WordPress 7.1.

= 1.1.0 =
* Fixed the Plugin Check warnings in the render template: blocked direct file access, prefixed variable names, and marked the already-escaped wrapper attributes for the escaping check.

= 1.0.4 =
* Added `"usesContext": ["postId", "postType"]` to block.json so a `core/post-meta` binding resolves the correct post.
* Registered `pdfUrl` through the `block_bindings_supported_attributes_ph/flipbook-block` filter, which WordPress 6.9 requires for custom block bindings.

= 1.0.3 =
* Switched to server-side rendering through render.php.
* Stored `pdfUrl` as a plain attribute value so it can be bound to post meta.

= 1.0.2 =
* Removed the manual height control; the flipbook now uses PageFlipOpen's autoHeight option.
* Updated PageFlipOpen to 0.4.3.

= 1.0.1 =
* Internal version bump.

= 1.0.0 =
* Initial release.
* Added PDF selection from the media library.
* Added the PageFlipOpen flipbook view.
* Added toolbar, fullscreen, download, single page mode, flip duration, start page, and height controls.
* Added wide and full alignment.
* Added the PDF thumbnail preview in the editor.

== Upgrade Notice ==

= 1.0.4 =
Adds block binding support for the pdfUrl attribute. Required if using Flipbook Catalog or any plugin that binds the PDF URL via core/post-meta.

= 1.0.3 =
Switched to server-side rendering. Resave any existing Flipbook blocks to update stored post content.

= 1.0.2 =
The manual height control has been removed. The flipbook now sizes itself automatically.
