---
name: test-workflow-hotreload
description: Test if workflow files hot-reload when modified during an active OpenCode session.
---

# Test Workflow Hot-Reload

## Purpose
Verify that workflow changes are reflected immediately without restarting OpenCode.

## Steps
1. Start an OpenCode session: `opencode`
2. Call `workflows` (no args) to list available workflows
3. Call `workflows` with `test-workflow-hotreload` to load this workflow
4. In a separate terminal, edit this file (add a test line)
5. Call `workflows` with `test-workflow-hotreload` again
6. Verify the changes appear

## Expected Behavior
- If hot-reload works: edits appear immediately on next `workflows` call
- If not: edits only appear after restarting OpenCode
