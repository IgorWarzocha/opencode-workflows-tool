/*
This module provides a chat system hook to expose repo workflows dynamically.
It injects the available_workflows XML block into the system prompt.
*/
import type { Hooks } from "@opencode-ai/plugin"

import { discoverWorkflows } from "./discovery"
import { ensureWorkflowLog, logWorkflowDiscovery } from "./logger"
import { buildAvailableWorkflowsXml } from "./xml"

type WorkflowSystemHookInput = {
  directory: string
  worktree: string
}

export const createWorkflowSystemHook = ({ directory, worktree }: WorkflowSystemHookInput): Hooks => {
  return {
    "experimental.chat.system.transform": async (input, output) => {
      await ensureWorkflowLog({ sessionID: input.sessionID, directory, worktree })
      const discovery = await discoverWorkflows({ directory, worktree })
      await logWorkflowDiscovery({ sessionID: input.sessionID, directory, worktree }, discovery)
      output.system.push(buildAvailableWorkflowsXml(discovery.workflows))
    },
  }
}
