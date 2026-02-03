/*
This file provides the plugin entry point for the workflow tool replacement.
It wires workflow discovery into the tool definition exported to OpenCode.
*/
import type { Hooks, Plugin } from "@opencode-ai/plugin"

import { createBundledSkillsHook } from "./skills"
import { createWorkflowCreateTool, createWorkflowSystemHook, createWorkflowTool, createWorkflowCommandHooks } from "./workflows"

export const SkillToolEnhancedPlugin: Plugin = async (input) => {
  const { client, directory, worktree } = input

  const commandHooks = createWorkflowCommandHooks({ client })
  const skillsHook = createBundledSkillsHook()

  const config: Hooks["config"] = async (value) => {
    await skillsHook.config?.(value)
    await commandHooks.config?.(value)
  }

  return {
    ...createWorkflowSystemHook({ directory, worktree }),
    config,
    "command.execute.before": commandHooks["command.execute.before"],
    tool: {
      workflows: createWorkflowTool({ directory, worktree }),
      workflows_create: createWorkflowCreateTool({ directory, worktree }),
    },
  }
}

export default SkillToolEnhancedPlugin
