/*
This module extracts workflow metadata from frontmatter blocks in files.
It keeps parsing logic isolated for reuse during discovery.
*/
import type { WorkflowDefinition } from "./types"

type WorkflowMetadata = Omit<WorkflowDefinition, "location">

export const parseWorkflowFrontmatter = (content: string): WorkflowMetadata | null => {
  const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/)
  if (!frontmatterMatch) return null

  const frontmatter = frontmatterMatch[1]
  if (!frontmatter) return null

  const nameMatch = frontmatter.match(/name:\s*(.+)/)
  const descriptionMatch = frontmatter.match(/description:\s*(.+)/)

  const name = nameMatch?.[1]?.trim()
  const description = descriptionMatch?.[1]?.trim()

  if (!name || !description) return null

  return { name, description }
}
