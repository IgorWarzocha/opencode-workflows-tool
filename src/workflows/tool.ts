/*
This module defines the workflows tool for loading repo-scoped SOP content.
It validates workflow selection and returns the workflow document text.
*/
import { tool } from "@opencode-ai/plugin"

import { buildWorkflowToolDescription } from "./description"
import type { WorkflowDefinition } from "./types"

type WorkflowToolInput = {
  workflows: WorkflowDefinition[]
}

const buildWorkflowHint = (workflows: WorkflowDefinition[]) => {
  const examples = workflows
    .slice(0, 3)
    .map((workflow) => `'${workflow.name}'`)
    .join(", ")
  return examples ? ` (e.g., ${examples}, ...)` : ""
}

export const createWorkflowTool = ({ workflows }: WorkflowToolInput) => {
  return tool({
    description: buildWorkflowToolDescription(workflows),
    args: {
      workflow: tool.schema.string().describe(`Workflow identifier from available_workflows${buildWorkflowHint(workflows)}`),
    },
    async execute(args, context) {
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
