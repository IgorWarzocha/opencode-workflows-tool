# AGENTS.md

## Repository Overview

OpenCode plugin that provides an enhanced `skill` tool, replacing the built-in with a filesystem-scanning implementation for full extensibility. Discovers skills from `.opencode/skill/`, `.claude/skills/`, and global `~/.claude/skills/` directories.

<instructions>

## Build & Verification

- Build: `bun run build`
- Typecheck: `tsc --noEmit`
- Development watch: `bun run dev` (USER runs this in background)

## Plugin Architecture

- Entry point: `src/index.ts`
- Exports: `SkillToolEnhancedPlugin` function implementing the `Plugin` interface
- Build output: `dist/index.js` (runtime) + `dist/index.d.ts` (types)

## Testing Changes

1. Edit `src/index.ts`
2. Run `bun run build` to rebuild
3. Restart OpenCode to reload the plugin
4. Plugin logs loaded skills to console on startup

</instructions>

<rules>

## Process Constraints

- MUST NOT run `bun run dev` or other long-running processes
- Dev servers and watch modes are USER's responsibility
- MUST use one-shot commands: `bun run build`, `tsc --noEmit`

## Code Conventions

- TypeScript strict mode enabled
- Use `@opencode-ai/plugin` API for tool definitions
- Async plugin functions return `{ tool: { toolName: tool(...) } }`
- Scan paths at plugin load time, not per-execution
- Gracefully handle missing files/directories with try-catch

## Skill Discovery

Skills are YAML frontmatter in `SKILL.md` files:
- Scanned from `.opencode/{skill,skills}/**/SKILL.md`
- Scanned from `.claude/skills/**/SKILL.md` (project and ancestral)
- Scanned from `~/.claude/skills/**/SKILL.md` (global)
- Frontmatter must include `name:` and `description:` fields

</rules>

<context_hints>

## Context Allocation

- **node_modules/**: Skip - standard dependencies
- **dist/**: Build output, regenerate with `bun run build`

## Critical Configs

- `package.json`: Build script runs `bun build` then `tsc` for types
- `tsconfig.json`: Strict TypeScript, ESNext target, bundler module resolution

</context_hints>
