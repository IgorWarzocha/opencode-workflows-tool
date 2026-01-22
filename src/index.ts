/*
This file provides the plugin entry point for the workflow tool replacement.
It wires workflow discovery into the tool definition exported to OpenCode.
*/
import type { Plugin } from "@opencode-ai/plugin"

import { createWorkflowTool, discoverWorkflows } from "./workflows"

export const SkillToolEnhancedPlugin: Plugin = async (input) => {
  const workflows = await discoverWorkflows({ directory: input.directory, worktree: input.worktree })

  return {
    tool: {
      workflows: createWorkflowTool({ workflows }),
    },
  }
}

export default SkillToolEnhancedPlugin
