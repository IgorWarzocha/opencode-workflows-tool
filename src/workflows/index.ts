/*
This module exposes the public workflows helpers for the plugin entry point.
It keeps exports explicit and centralized for easier maintenance.
*/
export { discoverWorkflows } from "./discovery"
export { createWorkflowTool } from "./tool"
export type { WorkflowDefinition } from "./types"
