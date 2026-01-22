/*
This module builds the tool description for workflow discovery and loading.
It keeps the copy aligned with repo SOP and workflow usage.
*/
export const buildWorkflowToolDescription = () => {
  return [
    "Load a repository workflow or SOP to guide consistent operations.",
    "Workflows provide step-by-step repo standards, runbooks, or team SOPs.",
    "Workflows are discovered dynamically from .opencode/workflows at execution time.",
    "Call with no workflow to list available workflows under <available_workflows>.",
  ].join(" ")
}
