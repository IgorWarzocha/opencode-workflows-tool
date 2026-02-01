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

export function createWorkflowCommandHooks(options: {
  client: WorkflowClient
}): Pick<Hooks, "command.execute.before" | "config"> {
  return {
    config: async (input) => {
      const config = input as GlobalConfig
      config.command ??= {}
      config.command["workflow"] = {
        template: "/workflow",
        description: "Document this session as a workflow and associate it via AGENTS.md",
      }
    },

    "command.execute.before": async (input) => {
      if (input.command !== "workflow") return

      // We handle the command by sending the instruction prompt to the session.
      // This mimics the /learn behavior where the model receives the prompt to act on.
      await options.client.session.prompt({
        path: { id: input.sessionID },
        body: {
          noReply: false, // We want the model to reply to these instructions
          parts: [
            {
              type: "text",
              text: WORKFLOW_COMMAND_INSTRUCTIONS,
            },
          ],
        },
      })

      // Throwing an error "swallows" the command so the core system doesn't process it further.
      throw new Error("__WORKFLOW_COMMAND_HANDLED__")
    },
  }
}
