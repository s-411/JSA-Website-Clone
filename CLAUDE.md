# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a pixel-perfect clone of a website deployed to Cloudflare Workers. The site is being built section-by-section based on reference screenshots located in `Section Screenshots/`.

## Development Commands

```bash
# Start development server (Cloudflare Workers local environment)
npm run dev
# or
npm start

# Deploy to Cloudflare Workers
npm run deploy
```

The development server runs via `wrangler dev` and serves the site locally with hot reload.

## Architecture

### Cloudflare Workers Setup

This is a **static site served via Cloudflare Workers**, not a traditional Node.js server:

- **Entry Point**: `src/index.js` - Cloudflare Worker that handles routing
- **HTML Template**: `src/template.html` - Single-page application structure
- **Static Assets**: Served from `public/` directory (configured in `wrangler.toml`)

The Worker handles:
- CSS serving at `/css/styles.css` with cache headers
- Image serving from `/images/*` (delegated to bucket in production)
- HTML serving for all other routes

### File Structure

```
src/
├── index.js          # Cloudflare Worker (imports HTML & CSS as modules)
└── template.html     # HTML structure with semantic sections

public/
├── css/styles.css    # All styles (imported by Worker)
├── js/main.js        # Client-side JavaScript
└── images/           # Static image assets

Section Screenshots/  # Reference screenshots for implementation
```

## Design System

### Typography System

The project uses **Plus Jakarta Sans** (replacing the original Hebo font) with a comprehensive CSS variable system.

**Key Typography Variables** (in `:root`):
- `--font-size-h1: 56px` (Hero titles)
- `--font-size-h2: 46px` (Section titles)
- `--font-size-h3: 32px` (Subsection titles)
- `--font-size-body: 22px` (Body text)
- `--font-size-small: 18px` (Secondary text)
- `--font-size-nav: 16px` (Navigation)

**Color Variables**:
- `--color-primary-black: #0f2438` (All black text)
- `--color-primary-custom: #825ef6` (Brand accent color - currently purple)
- `--color-white: #ffffff`
- `--color-gray-light: #6b7280`

**Important**: The `--color-primary-custom` variable is the single source of truth for the brand accent color. Changing this one hex code updates the color throughout the entire site. **Never reference "purple" in class names** - always use "custom" (e.g., `.text-custom`, `.nav-link-custom`).

### Typography Classes

- `.hero-title` / `.hero-subtitle` - Hero section typography
- `.section-title` / `.section-subtitle` - Section headings
- `.text-custom` / `.text-custom-light` - Custom brand color text
- `.nav-link` / `.nav-link-custom` - Navigation styling
- `.body-text` / `.body-text-small` / `.body-text-gray` - Body text variants
- `.card-title` / `.card-text` - Card components

### Responsive Typography

Font sizes automatically scale at breakpoints:
- **1024px**: H1→48px, H2→38px, H3→28px, Body→20px
- **768px**: H1→40px, H2→32px, H3→24px, Body→18px
- **480px**: H1→32px, H2→28px, H3→22px, Body→16px

### Layout System

- **Container max-width**: 1200px
- **Container padding**: 0 20px
- **Spacing scale**: 8px multiples (8px, 16px, 24px, 32px, 48px, etc.)
- **Breakpoints**: 480px (mobile), 768px (tablet), 1024px (desktop)

## Section-by-Section Build Process

This project has a custom workflow for building sections from screenshots:

### Using the /build-section Command

1. Run `/build-section` command
2. Provide the screenshot name from `Section Screenshots/`
3. Specify the target section ID in `template.html`
4. The section-builder agent will analyze and implement it pixel-perfectly

### Manual Section Building

When building sections manually, **always**:

1. **Read the screenshot** from `Section Screenshots/`
2. **Read existing files** before editing:
   - `src/template.html` - Understand structure
   - `public/css/styles.css` - Follow existing patterns
3. **Analyze the design** thoroughly (layout, spacing, colors, typography)
4. **Extract text content** accurately from the screenshot
5. **Use existing CSS variables and classes** where applicable
6. **Maintain consistency** with the established design system
7. **Target specific section IDs**: `#header`, `#section-1`, `#section-2`, etc.

### Design Consistency Rules

- Use CSS variables for colors, fonts, and sizes
- Follow existing naming conventions for classes and IDs
- Use semantic HTML (header, nav, section, article, footer)
- Maintain the established spacing patterns
- Never hardcode values that should use variables
- Preserve mobile-first responsive approach

## HTML Structure

The template uses semantic sections:
- `#header` - Header and navigation
- `#main-content` - Main container
  - `#section-1`, `#section-2`, etc. - Individual sections
- `#footer` - Footer

Sections are populated incrementally based on screenshots.

## JavaScript

`public/js/main.js` contains client-side interactivity:
- DOM-ready initialization
- Smooth scroll functionality
- Interactive elements (added section-by-section)

## Deployment

Requires Cloudflare account with Wrangler CLI configured. The `wrangler.toml` configures:
- Worker name: `jsa-website-clone`
- Static assets bucket: `./public`
- Compatibility date: 2024-01-01

CSS is imported directly into the Worker (not served from bucket) for cache control.

## Important Notes

- **Images**: In development, images may 404 - they're handled by the bucket in production
- **CSS Imports**: The Worker imports CSS as a module, so changes require Worker restart
- **Single Color System**: Only use `--color-primary-custom` for brand color, never create "purple" references
- **Screenshot References**: Keep original screenshots in `Section Screenshots/` for reference
- **Pixel-Perfect Goal**: This is a clone project - accuracy to the original design is paramount
