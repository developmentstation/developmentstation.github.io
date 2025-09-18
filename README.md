# Development Station

Professional developer utilities that work offline. 50+ free online tools.

## Features

- **50+ Developer Tools** - Comprehensive collection of utilities for developers
- **Works Offline** - Progressive Web App that functions without internet
- **Privacy First** - All processing happens locally in your browser
- **Modern UI** - Clean, responsive design with dark/light theme support
- **SEO Friendly** - Single Page Application with proper SEO optimization
- **GitHub Pages Compatible** - Optimized for GitHub Pages deployment

## Tool Categories

- **Time & Date** - Unix timestamps, world clock, date calculators
- **Text Processing** - Case converters, word counters, regex testers
- **Data Format** - JSON, XML, CSV, YAML formatters and converters
- **Security** - Password generators, hash tools, encryption utilities
- **Web Development** - HTML formatters, CSS minifiers, SEO analyzers
- **Network & System** - IP tools, browser info, system analysis
- **Image & Media** - Image processing and media utilities
- **Productivity** - QR codes, notes, todo lists, unit converters

## Architecture

This is a Single Page Application (SPA) built with:

- **Pure JavaScript** - No frameworks, just modern vanilla JS
- **Modular Design** - Component-based architecture
- **Client-side Routing** - Hash-based routing for GitHub Pages compatibility
- **SEO Optimization** - Dynamic meta tag management
- **Progressive Enhancement** - Works with and without JavaScript

## Files Structure

```
├── index.html              # Main SPA entry point
├── 404.html                # GitHub Pages SPA redirect handler
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker for offline functionality
├── _config.yml             # Jekyll configuration for GitHub Pages
├── assets/
│   ├── css/
│   │   ├── modern-styles.css    # Base styles
│   │   └── spa-styles.css       # SPA-specific styles
│   └── js/
│       ├── modern-shared.js     # Shared utilities
│       ├── spa-router.js        # Client-side router
│       ├── spa-components.js    # Page components
│       ├── spa-tools.js         # Tool definitions and management
│       └── spa-app.js           # Main application controller
└── tools/                  # Legacy individual tool pages (for fallback)
```

## Development

The application is designed to work seamlessly with GitHub Pages:

1. **SPA Routing** - Uses hash-based routing (`#/tool/json-formatter`)
2. **SEO Support** - Dynamic meta tags and structured data
3. **Fallback Support** - 404.html handles direct URL access
4. **Progressive Enhancement** - Individual tool pages as fallback

## Deployment

Simply push to GitHub Pages. The application will work immediately with:

- Custom domain support
- HTTPS by default
- CDN distribution
- Automatic builds

## License

MIT License - Built with ❤️ for developers worldwide.