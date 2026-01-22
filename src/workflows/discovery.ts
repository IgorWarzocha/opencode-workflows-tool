/*
This module discovers workflow files in repo-scoped .opencode/workflows folders.
It reads frontmatter and returns structured workflow definitions.
*/
import path from "path"

import { parseWorkflowFrontmatter } from "./frontmatter"
import type { WorkflowDefinition } from "./types"

const WORKFLOW_GLOB = new Bun.Glob("**/WORKFLOW.md")

type DiscoveryInput = {
  directory: string
  worktree: string
}

const buildSearchRoots = ({ directory, worktree }: DiscoveryInput) => {
  return Array.from(new Set([worktree, directory]))
}

export const discoverWorkflows = async (input: DiscoveryInput) => {
  const workflows: WorkflowDefinition[] = []

  const addWorkflow = async (filePath: string) => {
    try {
      const content = await Bun.file(filePath).text()
      const metadata = parseWorkflowFrontmatter(content)
      if (!metadata) return

      workflows.push({ ...metadata, location: filePath })
    } catch {
      // Skip workflows that fail to load
    }
  }

  for (const root of buildSearchRoots(input)) {
    const workflowsDir = path.join(root, ".opencode", "workflows")
    try {
      const exists = await Bun.file(workflowsDir).exists()
      if (!exists) continue

      const matches = await Array.fromAsync(
        WORKFLOW_GLOB.scan({ cwd: workflowsDir, absolute: true, onlyFiles: true, followSymlinks: true }),
      )

      for (const match of matches) await addWorkflow(match)
    } catch {
      // Workflow scan failed, continue
    }
  }

  return workflows
}
