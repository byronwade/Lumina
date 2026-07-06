# Alpha Drift Prevention

Status: Scaffolded.
Audience: AI agents, maintainers, reviewers.

This page lists the drift risks that can corrupt MVP Alpha work before implementation begins.

## Drift Risks

- False implemented claims in README or public docs.
- Scope creep from MVP Alpha into MCP, safe edits, migration, API routes, benchmarks, or full agent context.
- Local redefinition of shared core model types outside `@lumina/core`.
- Runtime packages depending on `@lumina/agent`, `@lumina/mcp`, or `@lumina/devtools`.
- Agent metadata entering production runtime bundles.
- Bun-only APIs leaking into user application code.
- JSON output that includes local paths, timestamps, random IDs, unordered keys, or machine-specific data.
- Performance or security claims without evidence.
- Tool-specific wrappers drifting away from vendor-neutral source docs.

## Prevention Gates

- `bun run docs:check` for doc metadata, links, indexes, sync lists, and claim language.
- `bun run structure:check` for package boundaries and shared-core ownership.
- `bun run performance:check` for speed and benchmark claim hygiene.
- `bun run typecheck` and `bun test` for the current scaffold.
- `bun run check` as the default non-trivial gate.

## Review Questions

- Does this change stay inside `docs/mvp-alpha-scope.md`?
- Does every generated-file claim name an artifact documented in `docs/manifest-contracts.md`?
- Does every agent-facing JSON change include deterministic output rules and planned snapshot evidence?
- Did README, AGENTS, docs hub, status, backlog, and feature contracts stay aligned?
