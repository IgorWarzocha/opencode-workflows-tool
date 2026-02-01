---
name: workflow-command-implementation
description: Documentation and implementation of the /workflow command process
---

## Summary
Implementation of the `/workflow` slash command for OpenCode, enabling automated session documentation and workflow association via nested `AGENTS.md` files.

## Prerequisites
- Access to the `@opencode-ai/plugin` SDK.
- Understanding of the `chat.message` hook for command interception.

## Steps
1. **Intercept Slash Command**: Use the `chat.message` hook in the plugin entry point (`src/index.ts`) to detect the `/workflow` prefix.
2. **Inject Instruction Prompt**: Replace the user's message text with a structured instruction block that guides the LLM to act.
3. **Analyze & Document**: The model analyzes the current session, identifying successes, failures, and workarounds.
4. **Persist Workflow**: Use the `workflows_create` tool to save the captured logic as a repeatable SOP.
5. **Associate via AGENTS.md**: Identify the most specific subdirectory relevant to the work. Create or append to a nested `AGENTS.md` with the mandatory "consider loading" rule.

## What Worked
- Using the instruction-based (LLM-driven) approach instead of hardcoded tool logic allows for more flexible directory detection and "smart" summarization.
- Leveraging `chat.message` transformation effectively "hijacks" the command before it reaches the model, ensuring the model's next turn is driven by the specific instructions.

## What to Avoid
- **Hardcoding paths**: Let the model determine the best subdirectory based on worktree changes.
- **Verbose AGENTS.md**: Keep the rules minimalist to avoid cluttering the system prompt in future sessions.

## Troubleshooting
- If the command doesn't trigger, ensure the plugin is correctly registered in `opencode.json` and that the `chat.message` hook isn't being blocked by other plugins.
