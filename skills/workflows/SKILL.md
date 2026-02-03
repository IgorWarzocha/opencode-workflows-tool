---
name: workflows
description: |-
  Load and create repository SOPs via `workflows` and `workflows_create` tools. Use proactively when executing repo-specific procedures, documenting repeatable processes, or when `<available_workflows>` contains matching entries.

  Examples:
  - user: "Release a new version" -> check available_workflows, load matching SOP, follow steps
  - user: "How do we deploy?" -> call workflows to list, load relevant procedure
  - user: "Document this process" -> use workflows_create to capture the SOP
  - user: "Create a migration workflow" -> use workflows_create with structured body
  - user: "Don't make the same mistake again" -> use workflows_create to the correct workflow
---

# Workflows

<objective>
Follow established SOPs before executing repo-specific procedures. Capture repeatable processes as workflows for future reuse.
</objective>

<procedure name="before-repo-work">

## Before Executing Repo-Specific Procedures

1. Check `<available_workflows>` in the system prompt
2. If a matching workflow exists, call `workflows` with that name
3. Follow the returned procedure step-by-step
4. If you must adapt steps, explain why the deviation is safe

</procedure>

<procedure name="after-completing-process">

## After Completing a Reusable Process

1. Identify if the process could be repeated (deployments, migrations, releases, etc.)
2. Structure what you learned:
   - **Prerequisites**: What must be true before starting
   - **Steps**: Numbered, with exact commands
   - **Verification**: How to confirm success
   - **Troubleshooting**: What can fail and how to recover
3. Call `workflows_create` with:
   - `name`: Descriptive identifier
   - `description`: 5-10 word summary
   - `body`: Markdown with the structured content above

</procedure>

<procedure name="correcting-workflows">

## When a Workflow Doesn't Match Reality

If a loaded workflow doesn't match your experience or you discover a new edge case:

1. Read the workflow file at `.opencode/workflows/<name>/WORKFLOW.md`
2. Use the Edit tool to surgically update the workflow:
   - Add missing steps or prerequisites
   - Correct inaccurate commands or outputs
   - Document the new edge case in Troubleshooting
3. Keep changes minimal and focused on what you learned

Do NOT create duplicate workflows. Always update the existing one.

</procedure>

<rules>

- MUST check `<available_workflows>` before repo-specific procedures
- MUST load workflow when a matching entry exists
- MUST create workflow after completing a reusable process
- MUST use Edit tool on `.opencode/workflows/*/WORKFLOW.md` to correct inaccuracies or add edge cases
- MUST update existing workflows rather than creating variants
- SHOULD include exact commands and expected outputs in steps
- SHOULD document failure scenarios and recovery steps
- MAY add workflow references to nested `AGENTS.md` for directory-specific suggestions

</rules>
