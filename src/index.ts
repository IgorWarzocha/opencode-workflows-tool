/*
This file provides the plugin entry point for the workflow tool replacement.
It wires workflow discovery into the tool definition exported to OpenCode.
*/
import type { Plugin } from "@opencode-ai/plugin"

import { createWorkflowCreateTool, createWorkflowSystemHook, createWorkflowTool } from "./workflows"
import { WORKFLOW_COMMAND_INSTRUCTIONS } from "./workflows/instructions"

export const SkillToolEnhancedPlugin: Plugin = async (input) => {
  const { directory, worktree } = input

  return {
    ...createWorkflowSystemHook({ directory, worktree }),
    "chat.message": async (_msgInput, output) => {
      const textPart = output.parts.find((p) => "text" in p && typeof p.text === "string")
      if (!textPart || !("text" in textPart)) return
      const text = textPart.text as string

      if (text.startsWith("/workflow")) {
        // Instead of executing, we replace the user message with instructions for the LLM.
        // This follows the /learn pattern where the model "learns" and then acts.
        textPart.text = WORKFLOW_COMMAND_INSTRUCTIONS
      }
    },
    tool: {
      workflows: createWorkflowTool({ directory, worktree }),
      workflows_create: createWorkflowCreateTool({ directory, worktree }),
    },
  }
}

export default SkillToolEnhancedPlugin
