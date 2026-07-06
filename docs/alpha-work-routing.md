# Alpha Work Routing

Status: Scaffolded.
Audience: AI agents, maintainers, framework contributors.

This page routes MVP Alpha work to the right playbook and review role. It is documentation-only scaffolding.

## Routing Table

| Work type | Skill | Review role |
| --- | --- | --- |
| Scope or roadmap question | `docs/skills/alpha-scope-gate.md` | `docs/subagents/alpha-orchestrator.md` |
| Shared core model change | `docs/skills/core-model-hardening.md` | `docs/subagents/core-model-guardian.md` |
| Route discovery | `docs/skills/route-discovery-builder.md` | `docs/subagents/route-discovery-guardian.md` |
| Render manifest | `docs/skills/render-manifest-builder.md` | `docs/subagents/render-manifest-guardian.md` |
| Lumina Map V1 | `docs/skills/lumina-map-v1-builder.md` | `docs/subagents/map-contract-guardian.md` |
| CLI JSON output | `docs/skills/cli-json-builder.md` | `docs/subagents/cli-json-contract-keeper.md` |
| Demo app | `docs/skills/demo-app-builder.md` | `docs/subagents/demo-fixture-reviewer.md` |
| Deterministic JSON | `docs/skills/deterministic-json-review.md` | `docs/subagents/verification.md` |
| Fixture and snapshot tests | `docs/skills/fixture-snapshot-testing.md` | `docs/subagents/demo-fixture-reviewer.md` |
| Docs freshness | `docs/skills/docs-status-sync.md` | `docs/subagents/docs-keeper.md` |
| Security note | `docs/skills/security-threat-note.md` | `docs/subagents/security-threat-reviewer.md` |
| Performance claim | `docs/skills/performance-claim-gate.md` | `docs/subagents/performance-claim-reviewer.md` |
| Release readiness | `docs/skills/release-readiness-alpha.md` | `docs/subagents/release-readiness-reviewer.md` |

## Delegation Rules

- Delegate only bounded file sets.
- Give each role exact source docs and expected output.
- Require each role to report changed files, commands run, risks, and unresolved questions.
- Do not ask any role to close an implementation issue without evidence that the issue acceptance criteria are satisfied.

## Refusal Conditions

Agents should stop and escalate when a task asks for:

- post-MVP Alpha scope without a scope-doc update,
- production claims without implementation evidence,
- benchmark or speed claims without raw evidence,
- security claims without a threat note and tests,
- broad rewrites that bypass package boundaries.
