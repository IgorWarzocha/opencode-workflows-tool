/*
This module provides the instruction prompt for the /workflow slash command.
It guides the model to document the session as a workflow and associate it via AGENTS.md.
*/

export const WORKFLOW_COMMAND_INSTRUCTIONS = `
<summary>
Document this session as a workflow and enforce its usage via AGENTS.md.
</summary>

<objective>
Capture session findings into a repeatable workflow (via workflows_create) and ensure it is suggested to future agents operating in this scope via AGENTS.md.
</objective>

<instructions>
1. **Document Session**: Analyze what was done, what worked, and what to avoid. Use \`workflows_create\` to save this as a new workflow or update an existing one.
2. **Auto-Detect Scope**: Prefer creating/editing a nested \`AGENTS.md\` in the specific subdirectory where work occurred (OpenCode auto-loads these when entering subdirs). Use the root only for global procedures.
3. **Format Rule**: Add/append exactly: "When operating in this directory you MUST consider loading these workflows:" followed by a concise list of relevant workflow names.
</instructions>

<rules>
- MUST use \`workflows_create\` to persist the session's logic.
- MUST use the exact phrasing: "When operating in this directory you MUST consider loading these workflows:".
- MUST keep \`AGENTS.md\` updates minimalist and focused.
</rules>
`;
