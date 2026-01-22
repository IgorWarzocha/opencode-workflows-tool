/*
This module defines the workflow metadata shape used by the plugin.
It keeps workflow parsing and formatting consistent across helpers.
*/
export type WorkflowDefinition = {
  name: string
  description: string
  location: string
}

export type WorkflowDiscoveryResult = {
  workflows: WorkflowDefinition[]
  checkedDirs: string[]
}
