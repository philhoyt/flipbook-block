# Flipbook Block

[![CI](https://github.com/philhoyt/flipbook-block/actions/workflows/ci.yml/badge.svg)](https://github.com/philhoyt/flipbook-block/actions/workflows/ci.yml)

A WordPress block that renders a PDF from the media library as a page-flip flipbook, using [PageFlipOpen](https://github.com/philhoyt/PageFlipOpen) in the browser.

## Requirements

- WordPress 6.6 or later (6.9 or later for block bindings)
- PHP 7.0 or later

## Installation

1. Copy the `flipbook-block` folder into `wp-content/plugins/`, or upload the release zip from the Plugins screen.
2. Activate the plugin.

Updates come from GitHub releases through Plugin Update Checker. Only releases with a `.zip` asset are offered.

## Usage

Add the Flipbook Block to a post or page and pick a PDF from the media library. The block is rendered server-side by `src/render.php`; `src/view.js` reads the `data-*` attributes on the container and starts PageFlipOpen on `DOMContentLoaded`. The view script is enqueued with the `defer` strategy.

The editor shows the PDF's thumbnail when WordPress has generated one (this needs Imagick on the server). The block supports wide and full alignment.

### Settings

| Sidebar control | Attribute | Default | What it does |
|---|---|---|---|
| Show toolbar | `toolbar` | `true` | Renders the flipbook toolbar |
| Always visible | `toolbarAlwaysVisible` | `true` | Keeps the toolbar on screen instead of fading it out |
| Fullscreen button | `enableFullscreen` | `true` | Adds a fullscreen toggle to the toolbar |
| Download button | `enableDownload` | `false` | Adds a download button to the toolbar |
| Download filename | `downloadFilename` | `""` | Filename for the downloaded PDF; shown only when download is on |
| Single page mode | `singlePageMode` | `false` | One page per spread instead of switching on container width |
| Flip duration | `flipDuration` | `800` | Page-turn animation length in milliseconds |
| Start page | `startPage` | `1` | Page the flipbook opens on |

Height is automatic (PageFlipOpen `autoHeight`); there is no height control.

### Block bindings

`pdfUrl` is registered as a bindable attribute through the `block_bindings_supported_attributes_ph/flipbook-block` filter, and the block declares `usesContext: ["postId", "postType"]` so a `core/post-meta` source resolves against the current post. A template can declare the binding:

```html
<!-- wp:ph/flipbook-block {"metadata":{"bindings":{"pdfUrl":{"source":"core/post-meta","args":{"key":"your_meta_key"}}}}} /-->
```

The meta key must be registered with `show_in_rest: true`. [Flipbook Catalog](https://github.com/philhoyt/flipbook-catalog) uses this to build a PDF catalog post type with the block in its template.

## Development

```bash
npm install
composer install   # also copies Plugin Update Checker into lib/ via the copy-puc script
```

```bash
npm start          # webpack watch
npm run build      # production build into build/
npm run lint:js
npm run lint:css
npm run format
vendor/bin/phpcs   # PHP lint (WordPress Coding Standards)
composer audit
npm run plugin-zip # builds flipbook-block.zip
```

There is no automated test suite. CI (`.github/workflows/ci.yml`) runs phpcs and `composer audit` on PHP 7.2 through 8.4, then lints and builds the JavaScript on Node 22. The plugin header allows PHP 7.0, but `composer.lock` is resolved against a 7.2 platform pin, so CI starts at 7.2.

## Releases

Bump the version in `flipbook-block.php`, `package.json`, `src/block.json`, and the `Stable tag` in `readme.txt`, add the changelog entry to `readme.txt`, then push a lowercase `v` tag:

```bash
git tag v1.1.1 && git push origin v1.1.1
```

The release workflow (`.github/workflows/release.yml`) runs `npm ci`, builds, runs `npm run plugin-zip`, pulls the matching `= X.Y.Z =` section out of `readme.txt` as the release notes, and attaches `flipbook-block.zip` and `readme.txt` to the GitHub release. The tag must use a lowercase `v`: Plugin Update Checker strips the prefix case-sensitively, so a `V1.2.0` tag is never offered as an update.

## Limitations

- PDF files only.
- Block bindings need WordPress 6.9 or later; on older versions the binding is skipped and `pdfUrl` is empty.
- The editor thumbnail depends on WordPress generating one, which needs Imagick on the server.
- Rendering needs the server to serve `.js` files as `application/javascript`; a "fake worker" console warning points to a wrong MIME type.

## License

GPL-2.0-or-later. See [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html).
