import type { Plugin } from "@opencode-ai/plugin"
import { tool } from "@opencode-ai/plugin"
import path from "path"

const OPENCODE_SKILL_GLOB = new Bun.Glob("{skill,skills}/**/SKILL.md")
const CLAUDE_SKILL_GLOB = new Bun.Glob("skills/**/SKILL.md")

export const SkillToolEnhancedPlugin: Plugin = async (input) => {
  const { client, directory, worktree } = input

  const findClaudeDirs = async (startDir: string, stopDir: string): Promise<string[]> => {
    const dirs: string[] = []
    let current = startDir

    while (current !== stopDir && current !== "/") {
      const claudePath = path.join(current, ".claude")
      try {
        const exists = await Bun.file(claudePath).exists()
        if (exists) dirs.push(claudePath)
      } catch {}
      current = path.dirname(current)
    }
    return dirs
  }

  const getSkills = async () => {
    const skills: Array<{ name: string; description: string; location: string }> = []

    const addSkill = async (filePath: string) => {
      try {
        const content = await Bun.file(filePath).text()
        const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/)
        if (!frontmatterMatch) return

        const frontmatter = frontmatterMatch[1]
        if (!frontmatter) return
        const nameMatch = frontmatter.match(/name:\s*(.+)/)
        const descMatch = frontmatter.match(/description:\s*(.+)/)

        if (nameMatch && descMatch) {
          const name = nameMatch[1]?.trim()
          const description = descMatch[1]?.trim()
          if (name && description) {
            skills.push({ name, description, location: filePath })
          }
        }
      } catch {
        // Skip skills that fail to load
      }
    }

    // Scan .claude/skills directories
    try {
      const claudeDirs = await findClaudeDirs(directory, worktree)
      const home = process.env.HOME || process.env.USERPROFILE || ""
      const globalClaude = path.join(home, ".claude")
      try {
        const exists = await Bun.file(globalClaude).exists()
        if (exists) claudeDirs.push(globalClaude)
      } catch {}

      for (const dir of claudeDirs) {
        const matches = await Array.fromAsync(
          CLAUDE_SKILL_GLOB.scan({ cwd: dir, absolute: true, onlyFiles: true, followSymlinks: true }),
        )
        for (const match of matches) await addSkill(match)
      }
    } catch {
      // Claude scan failed, continue
    }

    // Scan .opencode/skill directories
    const opencodeSkillDir = path.join(directory, ".opencode")
    try {
      const matches = await Array.fromAsync(
        OPENCODE_SKILL_GLOB.scan({ cwd: opencodeSkillDir, absolute: true, onlyFiles: true, followSymlinks: true }),
      )
      for (const match of matches) await addSkill(match)
    } catch {
      // OpenCode scan failed, continue
    }

    return skills
  }

  // Get skills at plugin load time to build tool description
  const skills = await getSkills()
  console.log(
    "[skill-tool-enhanced] Loaded skills:",
    skills.map((s) => s.name),
  )

  const description =
    skills.length === 0
      ? "Load a skill to get detailed instructions for a specific task. No skills are currently available."
      : [
          "Load a skill to get detailed instructions for a specific task.",
          "Skills provide specialized knowledge and step-by-step guidance.",
          "Use this when a task matches an available skill's description.",
          "Only the skills listed here are available:",
          "<available_skills>",
          ...skills.flatMap((skill) => [
            `  <skill>`,
            `    <name>${skill.name}</name>`,
            `    <description>${skill.description}</description>`,
            `  </skill>`,
          ]),
          "</available_skills>",
        ].join(" ")

  const examples = skills
    .slice(0, 3)
    .map((s) => `'${s.name}'`)
    .join(", ")
  const hint = examples ? ` (e.g., ${examples}, ...)` : ""

  return {
    tool: {
      skill: tool({
        description,
        args: {
          name: tool.schema.string().describe(`The skill identifier from available_skills${hint}`),
        },
        async execute(args, context) {
          const skill = skills.find((s) => s.name === args.name)

          if (!skill) {
            const available = skills.map((s) => s.name).join(", ")
            throw new Error(`Skill "${args.name}" not found. Available skills: ${available || "none"}`)
          }

          await context.ask({
            permission: "skill",
            patterns: [args.name],
            always: [args.name],
            metadata: {},
          })

          const content = await Bun.file(skill.location).text()

          context.metadata({
            title: `Loaded skill: ${args.name}`,
            metadata: {
              name: args.name,
              dir: skill.location,
            },
          })

          return `## Skill: ${args.name}\n\n**Base directory**: ${skill.location}\n\n${content}`
        },
      }),
    },
  }
}

export default SkillToolEnhancedPlugin
