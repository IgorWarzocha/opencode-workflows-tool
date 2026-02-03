/*
This module builds the tool descriptions for the workflow tools.
It keeps the copy aligned with repo SOP and workflow usage.
*/
export const buildWorkflowToolDescription = () => {
  return [
    "Load a repository workflow or SOP.",
    "You SHOULD load a workflow before executing repo-specific procedures.",
    "You MUST consult workflows when a matching procedure exists in <available_workflows>.",
  ].join(" ");
};

export const buildWorkflowCreateDescription = () => {
  return [
    "Create a repository workflow or SOP from a confirmed, repeatable process.",
    "You MUST create a workflow as soon as you complete a reusable process.",
    "You SHOULD document prerequisites, ordered steps, and expected outcomes.",
    "You MAY include troubleshooting notes if failures occurred.",
    "If a workflow fails, you MUST surgically edit it and provide failure scenarios.",
    "It is stored in .opencode/workflows/*/WORKFLOW.md.",
  ].join(" ");
};

export const buildWorkflowLearnDescription = () => {
  return [
    "Create or append to an AGENTS.md file in a target directory to enforce specific workflow usage.",
    "This command helps the model remember which workflow to load when operating in specific project subdirectories.",
    "The rule added will state: 'When operating in this directory you MUST load [workflow] workflow'.",
  ].join(" ");
};
