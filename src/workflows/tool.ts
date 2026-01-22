/*
This module defines the workflows tool for loading repo-scoped SOP content.
It validates workflow selection and returns the workflow document text.
*/
import { tool } from "@opencode-ai/plugin"

import { buildWorkflowToolDescription } from "./description"
import { discoverWorkflows } from "./discovery"
import { formatAvailableWorkflows } from "./xml"

type WorkflowToolInput = {
  directory: string
  worktree: string
}

export const createWorkflowTool = ({ directory, worktree }: WorkflowToolInput) => {
  return tool({
    description: buildWorkflowToolDescription(),
    args: {
      workflow: tool.schema
        .string()
        .optional()
        .describe("Workflow identifier from available_workflows (omit to list available workflows)"),
    },
    async execute(args, context) {
      const workflows = await discoverWorkflows({ directory, worktree })
      if (!args.workflow) return formatAvailableWorkflows(workflows)

      const workflow = workflows.find((item) => item.name === args.workflow)

      if (!workflow) {
        const available = workflows.map((item) => item.name).join(", ")
        throw new Error(`Workflow "${args.workflow}" not found. Available workflows: ${available || "none"}`)
      }

      const content = await Bun.file(workflow.location).text()

      context.metadata({
        title: `Loaded workflow: ${args.workflow}`,
        metadata: {
          name: args.workflow,
          dir: workflow.location,
        },
      })

      return `## Workflow: ${args.workflow}\n\n**Base directory**: ${workflow.location}\n\n${content}`
    },
  })
}
