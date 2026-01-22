# @howaboua/opencode-skill-tool-enhanced

A 1:1 clone of OpenCode's built-in `skill` tool, implemented as a plugin for full control and extensibility.

## Features

- **Shadow tool**: Replaces the built-in `skill` tool completely
- **Filesystem scanning**: Automatically discovers skills from:
  - `.opencode/skill/**/SKILL.md` (project-level)
  - `.claude/skills/**/SKILL.md` (Claude-compatible)
  - `~/.claude/skills/**/SKILL.md` (global)
- **Dynamic tool description**: Builds tool description at load time with actual available skills
- **Full extensibility**: Modify and extend behavior since you control the code

## Installation

Add to your `.opencode/opencode.jsonc`:

```jsonc
{
  "plugin": ["file:///path/to/opencode-plugins-dev/opencode-skill-tool-enhanced/src/index.ts"],
}
```

Or install via npm (after publishing):

```bash
bun add @howaboua/opencode-skill-tool-enhanced --exact
```

Then add to config:

```jsonc
{
  "plugin": ["@howaboua/opencode-skill-tool-enhanced"],
}
```

## Usage

The plugin provides a `skill` tool that works exactly like the built-in one:

```
Use the skill tool to load the create-opencode-plugin skill
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
