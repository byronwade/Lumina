# Skill: Needle Map Designer

## Purpose

Use this skill when designing the semantic graph, map query APIs, graph contracts, affected checks, or map-driven developer and agent experiences.

## Required Context

Read before editing:

1. `AGENTS.md`
2. `docs/risk-mitigation.md`
3. `docs/needle-map.md`
4. `docs/package-map.md`
5. `docs/compiler-ir.md` when compiler output is involved.

## Workflow

1. Start with structural graph needs before semantic inference.
2. Prefer explicit `.contract.ts` files for high-confidence semantic edges.
3. Ensure every planned `GraphEdge` includes `kind`, `source`, `confidence`, and `why`.
4. Treat missing semantic contracts as low-confidence data.
5. Keep graph query logic in `@needle/map`; CLI, MCP, devtools, and Agent Kernel should consume that API.
6. Define deterministic output and fixture expectations for every graph feature.

## Outputs

- Graph node/edge proposals.
- Query API or manifest shape notes.
- Acceptance criteria for fixture tests and stable JSON output.
- Safety notes when graph data could affect edits or production decisions.
