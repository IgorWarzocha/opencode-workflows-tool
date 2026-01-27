/*
This module defines the create workflow tool for programmatic SOP creation.
It writes new workflow markdown files with generated frontmatter.
*/
import path from "path"

import { tool } from "@opencode-ai/plugin"

import { buildWorkflowCreateDescription } from "./description"

type CreateWorkflowToolInput = {
  directory: string
  worktree: string
}

const slugify = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

const resolveRoot = (directory: string, worktree: string) => {
  const candidate = worktree || directory || process.cwd()
  return path.basename(candidate) === ".opencode" ? path.dirname(candidate) : candidate
}

const buildWorkflowFile = (name: string, description: string, body: string) => {
  return ["---", `name: ${name}`, `description: ${description}`, "---", "", body.trim(), ""].join("\n")
}

const stripFrontmatter = (body: string) => {
  const match = body.match(/^---\n[\s\S]+?\n---\s*\n?/)
  return match ? body.slice(match[0].length) : body
}

export const createWorkflowCreateTool = ({ directory, worktree }: CreateWorkflowToolInput) => {
  return tool({
    description: buildWorkflowCreateDescription(),
    args: {
      name: tool.schema.string().describe("Workflow name"),
      description: tool.schema.string().describe("Short plain-text summary (5-10 words)"),
      body: tool.schema.string().describe("Markdown content"),
    },
    async execute(args, context) {
      const root = resolveRoot(directory, worktree)
      const slug = slugify(args.name)
      const safeName = slug || "workflow"
      const workflowDir = path.join(root, ".opencode", "workflows", safeName)
      const workflowPath = path.join(workflowDir, "WORKFLOW.md")
      const cleanedBody = stripFrontmatter(args.body)
      const content = buildWorkflowFile(args.name, args.description, cleanedBody)

      await Bun.$`mkdir -p ${workflowDir}`
      await Bun.write(workflowPath, content)

      context.metadata({
        title: `Created workflow: ${args.name}`,
        metadata: {
          name: args.name,
          dir: workflowPath,
        },
      })

      return `Workflow created at ${workflowPath}`
    },
  })
}
