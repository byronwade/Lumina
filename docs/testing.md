# Testing

Status: Scaffolded.

Audience: framework contributors, maintainers, AI agents.

This page defines expected test categories for Lumina as implementation begins.

The planned test layers, fixture layout, snapshot policy, CI gates, artifact rules, browser-test rules, and evidence reporting requirements are defined in [Testing Contract](testing-contract.md).

## Test Types

- Unit tests for pure parser, manifest, schema, and graph logic.
- Fixture tests for route discovery, SEO, API routes, and map generation.
- Integration tests for CLI behavior.
- HTTP tests for runtime adapters.
- Stable JSON tests for agent-facing output.
- Benchmark tests only when performance claims are introduced.

## Implemented Commands

```bash
bun test
bun run typecheck
bun run docs:check
bun run test:browser
bun run structure:check
bun run performance:check
bun run check
```

These commands are available after the Phase 1 scaffold. They currently prove scaffold integrity, documentation links, package structure, performance documentation guardrails, TypeScript validity, scaffold tests, shared core model tests, route/render/map artifact behavior, CLI inspection, static build/start behavior, dev-server behavior, and browser-verified interactive dev and production hydration. They do not prove production SSR/API runtime behavior, broader component-level browser HMR, MCP tools, safe edits, or measured benchmark results.

## Documentation Checks

Documentation changes should use [Documentation Verification](docs-verification.md). The first automated docs checks now run through `bun run docs:check`; the manual checks remain the human-readable source of truth for review evidence.

## Determinism

Agent-facing output, manifests, snapshots, and fixture output must be deterministic across operating systems.

## Out Of Scope

- Claiming route, render, CLI, runtime, map, MCP, or safe-edit behavior exists because scaffold checks pass.
- Network-dependent tests unless explicitly required.
- Benchmark claims without benchmark methodology.
