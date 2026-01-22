---
name: test-skill-discovery
description: Test skill discovery functionality after changes
---

# Test Skill Discovery

Tests the skill tool enhancement plugin's ability to discover skills from various directories.

## Prerequisites

- Plugin is built (`bun run build`)
- At least one test skill file exists

## Steps

1. **Build the plugin**
   ```bash
   bun run build
   ```

2. **Verify build output exists**
   ```bash
   ls -la dist/index.js dist/index.d.ts
   ```

3. **Typecheck**
   ```bash
   tsc --noEmit
   ```

4. **Create test skill (if none exists)**
   ```bash
   mkdir -p .opencode/skill/test-skill
   cat > .opencode/skill/test-skill/SKILL.md << 'EOF'
   ---
   name: test-skill
   description: A test skill for verifying discovery
   ---
   
   This is a test skill.
   EOF
   ```

5. **Check skill discovery**
   - Restart OpenCode to reload the plugin
   - Check console logs for discovered skills
   - Verify `test-skill` appears in the skill list

## Expected Outcome

- Build succeeds without errors
- Typecheck passes
- Test skill is discovered and logged to console
- Skill appears in `/skill` tool completion

## Troubleshooting

- **Build fails**: Check TypeScript errors in output
- **Skill not discovered**: Verify YAML frontmatter is valid
- **Plugin not loading**: Check dist/ files exist and are valid
