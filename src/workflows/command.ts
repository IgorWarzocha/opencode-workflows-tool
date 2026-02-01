/*
This module implements the native command hooks for /workflow.
It registers the command in the global config and handles its execution
by injecting instructions into the session.
*/

import type { Hooks, PluginInput } from "@opencode-ai/plugin"
import { WORKFLOW_COMMAND_INSTRUCTIONS } from "./instructions"

type WorkflowClient = PluginInput["client"]

type CommandConfig = {
  template: string
  description: string
}

type GlobalConfig = {
  command?: Record<string, CommandConfig>
}

const WORKFLOW_COMMAND_HANDLED = "__WORKFLOW_COMMAND_HANDLED__"

export function createWorkflowCommandHooks(options: {
  client: WorkflowClient
}): Pick<Hooks, "command.execute.before" | "config"> {
  return {
    config: async (input) => {
      if (!input || typeof input !== "object") return
      const config = input as GlobalConfig
      config.command ??= {}
      config.command["workflow"] = {
        template: "/workflow",
        description: "Document this session as a workflow and associate it via AGENTS.md",
      }
    },

    "command.execute.before": async (input) => {
      if (input.command !== "workflow") return

      await options.client.session.prompt({
        path: { id: input.sessionID },
        body: {
          noReply: false,
          parts: [
            {
              type: "text",
              text: WORKFLOW_COMMAND_INSTRUCTIONS,
            },
          ],
        },
      })

      throw new Error(WORKFLOW_COMMAND_HANDLED)
    },
  }
}
