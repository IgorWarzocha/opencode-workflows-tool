/*
This script runs workflow discovery without OpenCode and prints diagnostics.
It helps validate .opencode/workflows scanning from the current repo.
*/
import { discoverWorkflows } from "../src/workflows/discovery"

const run = async () => {
  const discovery = await discoverWorkflows({
    directory: process.cwd(),
    worktree: process.cwd(),
  })

  const output = [
    `Checked paths: ${discovery.checkedDirs.join(", ") || "none"}`,
    `Workflows: ${discovery.workflows.map((workflow) => workflow.name).join(", ") || "none"}`,
  ]

  console.log(output.join("\n"))
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
