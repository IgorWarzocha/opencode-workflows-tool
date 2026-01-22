/*
This module builds the tool description for workflow discovery and loading.
It keeps the copy aligned with repo SOP and workflow usage.
*/
import { buildAvailableWorkflowsXml } from "./xml"
import type { WorkflowDefinition } from "./types"

export const buildWorkflowToolDescription = (workflows: WorkflowDefinition[]) => {
  if (workflows.length === 0) {
    return "Load a repository workflow or SOP to guide consistent operations. No workflows are currently available."
  }

  return [
    "Load a repository workflow or SOP to guide consistent operations.",
    "Workflows provide step-by-step repo standards, runbooks, or team SOPs.",
    "Only the workflows listed here are available:",
    buildAvailableWorkflowsXml(workflows),
  ].join(" ")
}
