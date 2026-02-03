# AGENTS.md

## Repository Overview

Enhanced `workflows` plugin for OpenCode, enabling structured SOP discovery and creation. Replaces the built-in skill/workflow system with a filesystem-backed implementation scanning `.opencode/workflows/`.

<instructions>

## Build & Verification

- Typecheck: `npx tsc --noEmit`
- Build: `bun run build`
- Dry Run: `bun run workflow:dry-run`
- **MANDATORY**: Verify all changes with `npx tsc --noEmit` before completion.

## Plugin Architecture

- **Entry**: `src/index.ts` (exports `SkillToolEnhancedPlugin`)
- **Tools**: `workflows` (listing/reading) and `workflows_create` (authoring)
- **Logic**: Contained in `src/workflows.ts` (discovery, parsing, writing)
- **Output**: `dist/index.js` (runtime) and `dist/index.d.ts` (types)

## Development Flow

1. Modify `src/*.ts` logic.
2. Run `bun run build` to update `dist/`.
3. Test locally using `bun run workflow:dry-run` if applicable.
4. Restart OpenCode to apply changes.

</instructions>

<rules>

## Process Constraints

- MUST NOT run `bun run dev` or any long-running/blocking process.
- MUST use one-shot verification: `npx tsc --noEmit` or `bun run build`.
- MUST NOT modify `dist/` directly; always rebuild from `src/`.

## Code Conventions

- **TypeScript**: Strict mode enabled. Use explicit types for plugin exports.
- **Errors**: MUST use `try-catch` blocks for all filesystem operations.
- **Workflows**: Stored as Markdown in `.opencode/workflows/`.
- **API**: Follow `@opencode-ai/plugin` interface strictly.

</rules>

<context_hints>

## Context Allocation

- **scripts/**: Contains verification and dry-run utilities.
- **src/workflows.ts**: Core logic for the workflow system.
- **.opencode/workflows/**: Target directory for workflow storage.

</context_hints>

