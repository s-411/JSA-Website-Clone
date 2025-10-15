# Claude Agent Configuration

This directory contains custom agents and slash commands for the JSA Website Clone project.

## Available Slash Commands

### `/build-section` - Build Website Section from Screenshot

This command invokes a specialized agent that analyzes section screenshots and recreates them with pixel-perfect accuracy in your website.

#### Usage

```
/build-section
```

You will be prompted for:
1. **Screenshot name** - The filename from the `Section Screenshots/` directory
   - Examples: "Header and Menu Section.png", "Section 1 Image 1.png", "Section 2 Image 1.png"
2. **Target section** - The section ID in `src/template.html` where the code should be added
   - Examples: "header", "section-1", "section-2", "footer"

#### What It Does

The agent will:
1. Read and analyze the specified screenshot using AI vision capabilities
2. Extract all visual elements: layout, typography, colors, spacing, images
3. Extract text content accurately from the screenshot
4. Generate semantic HTML that matches the structure
5. Generate CSS that recreates the design pixel-perfectly
6. Use the existing CSS variable system for consistency
7. Update both `src/template.html` and `public/css/styles.css`
8. Maintain consistency with the established design system

#### Design System Adherence

The agent is configured to strictly follow your design system:

**CSS Variables (automatically used):**
- Typography: Plus Jakarta Sans font with predefined sizes (h1: 56px, h2: 46px, etc.)
- Colors: Primary black (#0f2438), brand purple (#825ef6), white, gray
- Font weights: Light (300) through Extrabold (800)
- Line heights: Tight (1.2), Normal (1.5), Relaxed (1.6)

**Responsive Breakpoints:**
- Desktop: Default sizes
- Tablet: 1024px and 768px - scaled down typography
- Mobile: 480px - further scaled typography

**Layout Standards:**
- Max container width: 1200px
- Consistent spacing: 8px, 16px, 24px, 32px, 48px multiples
- Modern CSS: Flexbox and Grid

#### Example Session

```
You: /build-section
Claude: Which screenshot would you like to build from?
You: Header and Menu Section.png
Claude: Which section in template.html should I populate?
You: header
Claude: [Invokes agent to build the section...]
Agent: [Analyzes screenshot, generates HTML/CSS, updates files]
```

#### Available Screenshots

Check the `Section Screenshots/` directory for available files:
- Header and Menu Section.png
- Section 1 Image 1.png
- Section 1 Image 2.png
- Section 1 Image Scroll 1.png
- Section 1 Image Scroll 2.png
- Section 1 Image Scroll 3.png
- Section 2 Image 1.png

#### Tips for Best Results

1. **Be specific about the target section** - Make sure the section ID exists in template.html
2. **One section at a time** - Build sections sequentially for best consistency
3. **Review the output** - The agent generates production-ready code, but review for any edge cases
4. **Consistency is automatic** - The agent is configured to use your design system variables

## Agent Details

### Section Builder Agent

Location: `.claude/agents/section-builder.md`

This agent is specifically trained to:
- Analyze screenshots with high accuracy
- Maintain design system consistency
- Use CSS variables instead of hardcoded values
- Write semantic, accessible HTML
- Generate mobile-responsive layouts
- Preserve existing code while adding new sections

The agent follows strict rules:
- Never guesses measurements - analyzes carefully
- Always reads existing files first
- Preserves existing code
- Uses established patterns and classes
- Extracts text accurately from screenshots
- Ensures accessibility with alt text and ARIA labels

## Extending This Setup

### Adding New Commands

1. Create a new file in `.claude/commands/your-command.md`
2. Add frontmatter with description:
   ```yaml
   ---
   description: Your command description
   ---
   ```
3. Write the command prompt/instructions

### Adding New Agents

1. Create a new file in `.claude/agents/your-agent.md`
2. Define the agent's purpose, guidelines, and process
3. Reference it from a slash command

## Project Structure

```
.claude/
├── README.md                      # This file
├── commands/
│   └── build-section.md          # Slash command for building sections
└── agents/
    └── section-builder.md        # Agent that implements sections from screenshots
```

## Getting Started

1. Type `/build-section` in your Claude Code chat
2. Provide the screenshot name and target section
3. Let the agent analyze and implement the section
4. Review the generated code in template.html and styles.css
5. Test the section in your browser

That's it! The agent handles all the complexity of matching the design system and creating pixel-perfect implementations.