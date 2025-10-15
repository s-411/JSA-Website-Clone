# JSA Website Clone

An exact clone of the website deployed to Cloudflare Workers.

## Project Structure

```
JSA-Website-Clone/
├── src/
│   ├── index.js          # Cloudflare Worker entry point
│   └── template.html     # Main HTML template
├── public/
│   ├── css/
│   │   └── styles.css    # Main stylesheet
│   ├── js/
│   │   └── main.js       # JavaScript functionality
│   └── images/           # Image assets
├── Section Screenshots/  # Reference screenshots for cloning
├── package.json          # Project dependencies
├── wrangler.toml         # Cloudflare Workers configuration
└── README.md            # This file
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Deploy to Cloudflare Workers:
   ```bash
   npm run deploy
   ```

## Development

The website is being built section by section based on screenshots in the `Section Screenshots/` folder. Each section will be implemented with pixel-perfect accuracy to match the original design.

### AI-Assisted Development with Claude Code

This project includes a custom Claude Code agent that can automatically build website sections from screenshots:

**Quick Start:**
```
/build-section
```

This slash command invokes an AI agent that:
- Analyzes section screenshots using vision AI
- Generates pixel-perfect HTML and CSS
- Maintains consistency with the design system (Plus Jakarta Sans, color variables, spacing)
- Uses the established CSS variable system automatically
- Creates responsive, accessible code

See [`.claude/README.md`](.claude/README.md) for detailed documentation on using the `/build-section` command.

**Design System:**
- Typography: Plus Jakarta Sans with CSS variables for all font sizes
- Colors: Brand purple (#825ef6), primary black (#0f2438)
- Responsive breakpoints: 480px, 768px, 1024px
- Consistent spacing multiples

## Deployment

This site is configured to deploy to Cloudflare Workers. Make sure you have:
- A Cloudflare account
- Wrangler CLI configured with your credentials

Run `npm run deploy` to publish the site to your Cloudflare Workers domain.
