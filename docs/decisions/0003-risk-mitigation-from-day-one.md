# ADR 0003: Risk Mitigation From Day One

Date: 2026-07-05

Status: Proposed.
Audience: maintainers, framework contributors, security reviewers.

## Context

NeedleStart is intentionally competing on difficult axes: semantic graph extraction, agent-native workflows, safe automated edits, Bun-first adapter paths, and adoption against mature React frameworks.

If these risks are handled as late additions, the project will likely become too broad, too fragile, or too hard to trust.

## Decision

Treat the five major risks as architecture constraints from day one:

- Semantic graph extraction must be layered, with explicit contracts as the highest-signal source.
- The first working slice must stay tight until the graph and agent-safe workflow wedge is proven.
- Adoption must lead with the agent and Needle Map workflow, not generic framework parity.
- The Bun adapter remains the default production path, but Node compatibility moves earlier.
- Safe edits must be transactional, AST-based, previewable, logged, check-backed, and reversible.
- Adapter abstraction starts early through Bun, Node, and static adapters.
- Migration tooling should generate contract stubs instead of guessing semantics.

## Consequences

This decision changes priorities:

- File-level graph and affected queries move earlier.
- Node adapter baseline moves earlier than the full deployment adapter phase.
- Adapter-aware server entry work moves into the early runtime phase.
- Safe metadata edit is the first write capability.
- `needle migrate from-next` becomes an early adoption prototype.
- Devtools, RSC, streaming, partial prerendering, and large-app sharding remain post-wedge.

It also creates stricter documentation and implementation requirements:

- `docs/risk-mitigation.md` must be read before work on map, agent, MCP, runtime adapters, or safe edits.
- `GraphEdge` must include source, confidence, and why.
- Safety-critical decisions must combine graph data with contracts, validation, and checks.

## Alternatives Considered

- Build feature parity first and add map and agent features later.
- Require Bun-only runtime semantics in user applications.
- Allow safe edits to use direct text replacement.
- Treat Needle Map as a devtools feature instead of a core framework primitive.
