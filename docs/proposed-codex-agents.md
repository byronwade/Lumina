# Proposed Codex Agents

Status: Proposed.
Audience: AI agents, maintainers, Codex users.

Codex custom subagent file formats are not treated as a stable repository contract here. Until this project chooses a Codex-native agent format, Codex should use the vendor-neutral role briefs in `docs/subagents/` and the skill wrappers in `.agents/skills/`.

## Proposed Roles

- `alpha-orchestrator`
- `core-model-guardian`
- `route-discovery-guardian`
- `render-manifest-guardian`
- `map-contract-guardian`
- `cli-json-contract-keeper`
- `demo-fixture-reviewer`
- `security-threat-reviewer`
- `performance-claim-reviewer`
- `release-readiness-reviewer`

## Required Behavior

Codex agents should:

- read `AGENTS.md` first,
- use `docs/alpha-work-routing.md` to pick the right role,
- report changed files, commands run, risks, and unresolved questions,
- avoid closing issues unless acceptance criteria are solved by code, docs, and checks.
