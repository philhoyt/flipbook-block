# Flipbook Block

A WordPress block that displays a PDF as an interactive digital flipbook powered by [PageFlipOpen](https://github.com/philhoyt/PageFlipOpen).

## Features

- Upload any PDF from the WordPress media library
- Interactive page-flip animation
- Configurable toolbar with fullscreen and download options
- Single page or double page spread layout
- Adjustable flip animation duration and start page
- Wide and full alignment support
- PDF thumbnail preview in the block editor

## Requirements

- WordPress 6.6 or higher
- PHP 7.0 or higher

## Installation

1. Upload the `flipbook-block` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the **Plugins** menu in WordPress
3. Add the **Flipbook Block** block to any post or page

## Block Settings

### Toolbar
| Setting | Default | Description |
|---|---|---|
| Show toolbar | On | Display the flipbook toolbar |
| Always visible | On | Keep the toolbar permanently visible instead of fading out |

### Features
| Setting | Default | Description |
|---|---|---|
| Fullscreen button | On | Show a fullscreen toggle button in the toolbar |
| Download button | Off | Show a download button in the toolbar |
| Download filename | — | Custom filename for the downloaded PDF |

### Display
| Setting | Default | Description |
|---|---|---|
| Single page mode | Off | Force single-page layout instead of auto-detecting |
| Flip duration | 800ms | Page-turn animation speed in milliseconds |
| Start page | 1 | The page number to open on |

## Development

### Prerequisites

- Node.js
- Composer

### Setup

```bash
npm install
composer install
```

### Commands

```bash
npm run build       # Build for production
npm run start       # Start development mode with file watching
npm run lint:js     # Lint JavaScript
npm run lint:css    # Lint CSS/SCSS
composer exec phpcs # Lint PHP
```

## License

GPL-2.0-or-later — see [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html)
