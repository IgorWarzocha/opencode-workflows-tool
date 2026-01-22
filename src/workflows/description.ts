/*
This module builds the tool description for workflow discovery and loading.
It keeps the copy aligned with repo SOP and workflow usage.
*/
export const buildWorkflowToolDescription = () => {
  return [
    "Load a repository workflow or SOP to guide consistent operations.",
    "Workflows provide step-by-step repo standards, runbooks, or team SOPs.",
    "Call with no workflow to list available workflows under <available_workflows>.",
  ].join(" ");
};

export const buildWorkflowCreateDescription = () => {
  return [
    "Create a repository workflow or SOP from a confirmed, repeatable process.",
    "You MUST create a workflow as soon as you complete a reusable process.",
    "You SHOULD document prerequisites, ordered steps, and expected outcomes.",
    "You MUST NOT compare or evaluate workflows; just write the new workflow.",
    "You MUST NOT include frontmatter in the body; provide plain markdown only.",
    "You MAY include troubleshooting notes if failures occurred.",
    "If a workflow fails, you MUST surgically edit it and provide failure scenarios. It is stored in .opencode/workflows.",
  ].join(" ");
};
