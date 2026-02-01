/*
This file provides the plugin entry point for the workflow tool replacement.
It wires workflow discovery into the tool definition exported to OpenCode.
*/
import type { Plugin } from "@opencode-ai/plugin"

import { createWorkflowCreateTool, createWorkflowSystemHook, createWorkflowTool, createWorkflowCommandHooks } from "./workflows"

export const SkillToolEnhancedPlugin: Plugin = async (input) => {
  const { client, directory, worktree } = input

  const commandHooks = createWorkflowCommandHooks({ client })

  return {
    ...createWorkflowSystemHook({ directory, worktree }),
    config: commandHooks.config,
    "command.execute.before": commandHooks["command.execute.before"],
    tool: {
      workflows: createWorkflowTool({ directory, worktree }),
      workflows_create: createWorkflowCreateTool({ directory, worktree }),
    },
  }
}

export default SkillToolEnhancedPlugin
