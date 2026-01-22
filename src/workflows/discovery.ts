/*
This module discovers workflow files in repo-scoped .opencode/workflows folders.
It reads frontmatter and returns structured workflow definitions.
*/
import path from "path"

import { parseWorkflowFrontmatter } from "./frontmatter"
import type { WorkflowDefinition, WorkflowDiscoveryResult } from "./types"

const WORKFLOW_GLOB = new Bun.Glob("**/WORKFLOW.md")

type DiscoveryInput = {
  directory: string
  worktree: string
}

const buildSearchRoots = ({ directory, worktree }: DiscoveryInput) => {
  const roots = [worktree, directory, process.cwd()]
  for (const candidate of [directory, worktree, process.cwd()]) {
    if (!candidate) continue
    if (path.basename(candidate) === ".opencode") {
      roots.push(path.dirname(candidate))
    }
  }

  return Array.from(new Set(roots.filter(Boolean)))
}

export const discoverWorkflows = async (input: DiscoveryInput): Promise<WorkflowDiscoveryResult> => {
  const workflows: WorkflowDefinition[] = []
  const checkedDirs: string[] = []

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
    checkedDirs.push(workflowsDir)
    try {
      const matches = await Array.fromAsync(
        WORKFLOW_GLOB.scan({ cwd: workflowsDir, absolute: true, onlyFiles: true, followSymlinks: true }),
      )

      for (const match of matches) await addWorkflow(match)
    } catch {
      // Workflow scan failed, continue
    }
  }

  return { workflows, checkedDirs }
}
