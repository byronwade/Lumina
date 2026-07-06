# Testing

Status: Planned.

Audience: app developers, contributors, AI agents.

Lumina testing is planned around deterministic fixtures, stable JSON snapshots, HTTP adapter checks, browser checks for user-visible behavior, and explicit evidence reporting. Initial scaffold checks and route-discovery fixture tests exist; broader feature-specific test tooling is still planned.

## Scaffold Commands

```bash
bun test
bun run typecheck
bun run docs:check
bun run structure:check
bun run performance:check
bun run check
```

These commands are verified for the Phase 1 scaffold and the first compiler route-discovery slice. They prove scaffold integrity, documentation links and guardrails, package structure, performance documentation hygiene, TypeScript validity, scaffold tests, shared core model tests, and initial route-discovery fixture behavior. They do not prove generated `.lumina/routes.json` files, rendering, runtime adapter behavior, Lumina Map generation, MCP tools, or safe edits.

## Future Target Commands

```bash
bun run test:fixtures
bun run test:http
bun run test:browser
```

Fixture, HTTP, and browser commands are target commands until implementation lands.

## Planned Test Layers

- Unit tests.
- Fixture tests.
- Snapshot tests.
- Integration tests.
- HTTP tests.
- Browser tests.
- Security tests.
- Performance tests only when benchmark methodology applies.

## Rules

- Generated JSON snapshots must be deterministic.
- Fixture output must avoid absolute local paths and machine-specific data.
- Snapshot updates must be explicit and reviewed.
- External network calls are not allowed by default.
- Browser tests should cover real user-visible behavior, not component internals.

## Source

- [Testing Contract](../../testing-contract.md)
- [Testing Overview](../../testing.md)
- [Documentation Verification](../../docs-verification.md)
