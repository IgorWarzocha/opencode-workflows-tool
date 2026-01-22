---
name: quick-check
description: Fast repo verification steps after a change.
---

# Quick Check Workflow

## Purpose
Confirm the plugin builds and typechecks after a change.

## Steps
1. Install dependencies: `bun install`
2. Build: `bun run build`
3. Typecheck: `bunx tsc --noEmit`

## Expected Outcome
Build succeeds and typecheck reports no errors.
