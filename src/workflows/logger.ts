/*
This module writes workflow discovery diagnostics to per-session log files.
It ensures each OpenCode session has a clean log file in the repo root.
*/
import path from "path"

import type { WorkflowDiscoveryResult, WorkflowLogContext } from "./types"

const initializedSessions = new Set<string>()

const resolveRoot = (directory: string, worktree: string) => {
  const candidate = worktree || directory || process.cwd()
  if (path.basename(candidate) === ".opencode") return path.dirname(candidate)
  return candidate
}

const resolveLogPath = (context: WorkflowLogContext) => {
  const root = resolveRoot(context.directory, context.worktree)
  return path.join(root, `workflows-session-${context.sessionID}.log`)
}

const writeFile = async (filePath: string, content: string) => {
  await Bun.write(filePath, content)
}

const appendFile = async (filePath: string, content: string) => {
  try {
    const current = await Bun.file(filePath).text()
    await Bun.write(filePath, `${current}${content}`)
  } catch {
    await Bun.write(filePath, content)
  }
}

export const ensureWorkflowLog = async (context: WorkflowLogContext) => {
  if (initializedSessions.has(context.sessionID)) return
  initializedSessions.add(context.sessionID)

  const logPath = resolveLogPath(context)
  const header = [`Session: ${context.sessionID}`, `Started: ${new Date().toISOString()}`, ""].join("\n")
  await writeFile(logPath, header)
}

export const logWorkflowDiscovery = async (context: WorkflowLogContext, discovery: WorkflowDiscoveryResult) => {
  const logPath = resolveLogPath(context)
  const lines = [
    "Discovery:",
    `Checked paths: ${discovery.checkedDirs.join(", ") || "none"}`,
    `Workflows: ${discovery.workflows.map((item) => item.name).join(", ") || "none"}`,
    "",
  ]

  await appendFile(logPath, lines.join("\n"))
}
