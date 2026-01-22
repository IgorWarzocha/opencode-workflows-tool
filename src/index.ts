/*
This file provides the plugin entry point for the workflow tool replacement.
It wires workflow discovery into the tool definition exported to OpenCode.
*/
import type { Plugin } from "@opencode-ai/plugin"

import { createWorkflowTool } from "./workflows"

export const SkillToolEnhancedPlugin: Plugin = async (input) => {
  return {
    tool: {
      workflows: createWorkflowTool({ directory: input.directory, worktree: input.worktree }),
    },
  }
}

export default SkillToolEnhancedPlugin
