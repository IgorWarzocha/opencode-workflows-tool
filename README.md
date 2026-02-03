# Opencode Workflows Tool (aka skills but better)

An addition to OpenCode’s `skill` tool that helps agents capture repeatable SOPs and reuse them across sessions, including a `workflow-create` tool with YAML frontmatter protection.

Why? Agents tend to dislike the word “skill". They think they've already got all the skills necessary to perform the task. This plugin reframes that behavior around **workflows/SOPs** and enables agents to create and refine repo-standard-workflows during long-running sessions. Given it's hot-reload, it also works across subagents. If your subagent defines a workflow, it will appear as reusable across all the running sessions/subsessions.

Why not global? A bit opinionated, but I believe *skills* should be global, and carefully selected to be used *only* by specific agents to avoid context rot. And not every skill will apply to every project you're working on.

## Features

- **Bundled Skill**: Ships with a `workflows` skill that teaches agents when and how to use workflows effectively
- **Slash Command**: `/workflow` to automatically document a session as an SOP and associate it with a directory via `AGENTS.md`
- **Tools exposed**: `workflows` and `workflows_create` for listing, loading, and creating SOPs
- **Workflow discovery**: Scans `.opencode/workflows/**/WORKFLOW.md` in the current repo
- **Workflow creation**: `workflows_create` writes new workflows from structured name/body input
- **System prompt injection**: Always exposes `<available_workflows>` to the main agent and subagents
- **Nested context**: Supports directory-specific workflow suggestions via auto-loaded `AGENTS.md` files
- **Hot reload friendly**: New workflows are discoverable immediately during ongoing sessions

<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/635cc97b-a7f7-496e-97fe-6b7d83c536ae" />

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

### Slash Command

The `/workflow` command is the fastest way to capture work. It instructs the model to analyze the current session, document it using `workflows_create`, and suggest the new workflow to future agents by adding a rule to a nested `AGENTS.md`.

```
/workflow
```

### Tools

List available workflows:

```
Use the workflows tool with no arguments to list available workflows.
```

Load a workflow:

```
Use the workflows tool with workflow: "release-checklist".
```

Create a new workflow manually:

```
Use workflows_create with name: "release-checklist" and body containing the SOP steps.
```

## Development

```bash
# Install dependencies
bun install

# Build (Linux/macOS only)
bun run build

# Watch mode
bun run dev
```

## License

MIT
