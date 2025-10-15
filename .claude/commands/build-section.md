---
description: Build a website section from a screenshot with pixel-perfect accuracy
---

You are about to build a section from a screenshot. Follow these steps:

1. Ask the user for:
   - **Screenshot name**: Which file from `Section Screenshots/` to use
   - **Target section**: Which section ID in template.html to populate

2. Once you have this information, invoke the section-builder agent with the Task tool using subagent_type "general-purpose"

3. Provide the agent with:
   - The path to the screenshot file
   - The target section in template.html
   - Reference to follow .claude/agents/section-builder.md instructions

The agent will read the screenshot, analyze it, and implement it with pixel-perfect accuracy while maintaining consistency with the existing design system.
