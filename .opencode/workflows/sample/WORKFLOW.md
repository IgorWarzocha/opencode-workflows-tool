---
name: sample-repo-workflow
description: Quick repo SOP for building and verifying the plugin.
---

# Sample Repo Workflow

## Purpose
Provide a quick SOP for validating the plugin build and tool behavior in this repo.

## Steps
1. Install deps: `bun install`
2. Build: `bun run build`
3. Typecheck: `bunx tsc --noEmit`
4. Launch OpenCode: `opencode`
5. In a session, call `workflows` with `sample-repo-workflow` to load this SOP.
