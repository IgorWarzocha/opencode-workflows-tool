/*
This module formats workflow metadata into the XML-like block used by tools.
It centralizes the tag structure so descriptions and outputs stay aligned.
*/
import type { WorkflowDefinition } from "./types"

export const buildAvailableWorkflowsXml = (workflows: WorkflowDefinition[]) => {
  if (workflows.length === 0) return "<available_workflows></available_workflows>"

  return [
    "<available_workflows>",
    ...workflows.flatMap((workflow) => [
      "  <workflow>",
      `    <name>${workflow.name}</name>`,
      `    <description>${workflow.description}</description>`,
      "  </workflow>",
    ]),
    "</available_workflows>",
  ].join(" ")
}

type FormatInput = {
  workflows: WorkflowDefinition[]
  checkedDirs: string[]
}

export const formatAvailableWorkflows = ({ workflows, checkedDirs }: FormatInput) => {
  if (workflows.length === 0) {
    return [
      "No workflows are currently available in .opencode/workflows.",
      "Checked paths:",
      ...checkedDirs.map((dir) => `- ${dir}`),
    ].join("\n")
  }

  return ["Available workflows:", buildAvailableWorkflowsXml(workflows)].join("\n\n")
}
