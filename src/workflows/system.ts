/*
This module provides a chat system hook to expose repo workflows dynamically.
It injects the available_workflows XML block into the system prompt.
*/
import type { Hooks } from "@opencode-ai/plugin"

import { discoverWorkflows } from "./discovery"
import { buildAvailableWorkflowsXml } from "./xml"

type WorkflowSystemHookInput = {
  directory: string
  worktree: string
}

export const createWorkflowSystemHook = ({ directory, worktree }: WorkflowSystemHookInput): Hooks => {
  return {
    "experimental.chat.system.transform": async (_input, output) => {
      const discovery = await discoverWorkflows({ directory, worktree })
      output.system.push(buildAvailableWorkflowsXml(discovery.workflows))
    },
  }
}
