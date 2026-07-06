# ADR 0008: Docs-Level AI Playbooks

Date: 2026-07-06

Status: proposed

## Context

NeedleStart includes guidance for AI skills and subagent roles, but executable local agent tooling does not exist yet. Keeping root-level `skills/` and `subagents/` directories would make the repository look like it ships operational tooling before it does.

## Decision

Keep AI skill playbooks and subagent role briefs under `docs/skills/` and `docs/subagents/` until executable tooling exists.

These files are documentation, not runtime code. Root-level `skills/` and `subagents/` mirrors should not exist in Phase 0.

## Consequences

This gives NeedleStart:

- Clearer repository structure.
- Honest status language.
- Public-facing AI collaboration docs that can later feed a docs site.
- Less confusion between planning artifacts and executable agent tooling.

This requires:

- README and docs hub links to the docs-level playbooks.
- Placement checks in documentation verification.
- Future implementation work to introduce executable tooling only with package ownership, tests, and generated-file rules.

## Alternatives Considered

- Keep root-level `skills/` and `subagents/` directories.
- Remove AI playbooks entirely until implementation.
- Move AI guidance into `AGENTS.md` only.

## Related

- [AI Skill Playbooks](../skills/README.md)
- [AI Subagent Roles](../subagents/README.md)
- [Documentation Verification](../docs-verification.md)
- [Agent Kernel](../agent-kernel.md)
