# @howaboua/opencode-workflows-tool

A workflow-first replacement for OpenCode’s `skill` tool that helps agents capture repeatable SOPs and reuse them across sessions, including a create tool with YAML frontmatter protection.

## What It Does

OpenCode agents tend to avoid the word “skill,” even when a process is clearly reusable. This plugin reframes that behavior around **workflows/SOPs** and keeps them visible during long-running sessions.

## Features

- **Tools exposed**: `workflows` and `workflows.create` for listing, loading, and creating SOPs
- **Workflow discovery**: Scans `.opencode/workflows/**/WORKFLOW.md` in the current repo
- **Workflow creation**: `workflows.create` writes new workflows from structured name/body input
- **System prompt injection**: Always exposes `<available_workflows>` to the main agent and subagents
- **Hot reload friendly**: New workflows are discoverable immediately during ongoing sessions

## Installation

Add to your repo `opencode.json` or `.opencode/opencode.jsonc` (preferred):

```jsonc
{
  "plugin": ["@howaboua/opencode-workflows-tool@latest"],
}
```

Or reference a local plugin file:

```jsonc
{
  "plugin": ["file:///absolute/path/to/your/plugin/src/index.ts"],
}
```

## Usage

List available workflows:

```
Use the workflows tool with no arguments to list available workflows.
```

Load a workflow:

```
Use the workflows tool with workflow: "release-checklist".
```

Create a new workflow after a successful, repeatable process:

```
Use workflows.create with name: "release-checklist" and body containing the SOP steps.
```

## Development

```bash
# Install dependencies
bun install

# Build
bun run build

# Watch mode
bun run dev
```

## License

MIT
