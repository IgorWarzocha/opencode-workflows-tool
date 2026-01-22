---
name: plugin-dev-cycle
description: # Plugin Development Cycle
---

# Plugin Development Cycle

Complete workflow for building, verifying, and testing the Skill Tool Enhanced plugin.

## Prerequisites

- Bun runtime installed
- Git repository initialized
- OpenCode CLI available for plugin testing

## Steps

1. **Build the plugin**
   ```bash
   bun run build
   ```
   Expected: `dist/index.js` and `dist/index.d.ts` generated successfully

2. **Typecheck**
   ```bash
   tsc --noEmit
   ```
   Expected: No TypeScript errors

3. **Verify skill discovery**
   - Create test skill in `.opencode/skill/test-skill/SKILL.md`
   - Restart OpenCode
   - Check console logs for loaded skill

4. **Validate plugin interface**
   - Ensure `SkillToolEnhancedPlugin` exports correctly
   - Verify tool definition matches `@opencode-ai/plugin` API

## Expected Outcome

- Plugin builds without errors
- All TypeScript checks pass
- Skills are discovered from all configured paths
- Plugin loads successfully in OpenCode

## Troubleshooting

- **Build fails**: Check TypeScript errors in `src/index.ts`
- **Skills not loading**: Verify YAML frontmatter has `name:` and `description:`
- **Type errors**: Run `tsc --noEmit` for detailed diagnostics
