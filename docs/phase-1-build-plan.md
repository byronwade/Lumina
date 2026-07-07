# Phase 1 Build Plan

Status: Scaffolded.
Audience: framework contributors, maintainers, AI agents.

This document turns the planning docs into the first implementation path. It should be read before hardening package scaffolding, expanding shared core types, or claiming framework behavior works.

Test command, fixture, snapshot, and CI expectations are defined in [Testing Contract](testing-contract.md).

## Current Truth

Lumina now has the initial Phase 1 scaffold plus Phase 1A shared core model hardening, the first route-discovery compiler slice, and a minimal Vite dev-server slice: Bun workspace configuration, package directories, placeholder source files outside `@lumina/core`, `@lumina/compiler`, `@lumina/cli`, and `@lumina/vite-plugin`, contract-backed shared core model types, root verification scripts, route-discovery fixtures, dev-server fixtures, and tests.

Current verified scaffold commands:

```bash
bun install
bun test
bun run typecheck
bun run docs:check
bun run structure:check
bun run performance:check
bun run check
```

Most CLI commands remain target UX, not implemented behavior. `lumina routes <appPath> --json`, `lumina inspect <appPath> --json`, `lumina inspect <appPath> why <route>`, `lumina bench --list --json`, minimal `lumina dev <appPath>`, static `lumina build <appPath>`, and static `lumina start <appPath>` are implemented through the local `bun run lumina -- ...` script. Public API examples in the docs are still drafts, except for the initial `@lumina/compiler` route, render-manifest, map artifact APIs, minimal `@lumina/vite-plugin` dev-server/static-build APIs, and static `@lumina/adapter-bun` serving covered by route-discovery, artifact, CLI, HTTP dev-server, build, and HTTP adapter tests.

## Phase 1 Goal

Create a clean monorepo foundation that makes later compiler, runtime, SEO, map, and agent work possible without package-boundary drift.

The initial scaffold proves this foundation:

- The workspace installs.
- The package graph is explicit.
- Each package has an entrypoint.
- Placeholder tests and type checks run.
- Documentation still clearly separates planned behavior from implemented behavior.

Future Phase 1 hardening should preserve those guarantees while adding the smallest implementation surface needed for Phase 1B and route discovery.

Before route discovery expands into generated artifacts, CLI behavior, or performance claims, Phase 1 must keep the early benchmark and fixture skeleton described in [Implementation Speed Rules](implementation-speed-rules.md). That skeleton reports `not implemented`; it must not publish speed claims or synthetic results.

## Package Scaffold

The scaffold uses these package paths:

```txt
packages/create-lumina
packages/cli
packages/core
packages/compiler
packages/vite-plugin
packages/react
packages/router
packages/seo
packages/map
packages/agent
packages/mcp
packages/cache
packages/schema
packages/devtools
packages/adapters/bun
packages/adapters/node
packages/adapters/static
```

Package names should be:

```txt
create-lumina
@lumina/cli
@lumina/core
@lumina/compiler
@lumina/vite-plugin
@lumina/react
@lumina/router
@lumina/seo
@lumina/map
@lumina/agent
@lumina/mcp
@lumina/cache
@lumina/schema
@lumina/devtools
@lumina/adapter-bun
@lumina/adapter-node
@lumina/adapter-static
```

Earlier planning docs referred to `@lumina/server-bun` as the Bun production runtime package. It is not an active Phase 1 package name. Phase 1 uses the adapter package path unless a later architecture decision record reintroduces a separate server package. Bun-specific request handling belongs in `@lumina/adapter-bun`; shared runtime contracts belong in `@lumina/core` or generated output.

## Root Files

The Phase 1 scaffold includes:

- `package.json` with Bun workspace configuration.
- `bun.lockb` after install.
- `tsconfig.base.json`.
- Root test and typecheck scripts.
- Package-level `package.json` files.
- Package-level `src/index.ts` files.
- Root tests that verify package entrypoints and shared type surfaces.
- Initial `tests/` folders only when they match the planned fixture layout in [Testing Contract](testing-contract.md).

Do not add framework behavior in the same change unless the task explicitly says so.

## Package Minimums

Each package should define:

- `name`.
- `version`.
- `type`.
- `exports`.
- `types`.
- `scripts` when package-local checks are needed.
- `src/index.ts`.
- A local README once the package starts owning real behavior.

For Phase 1, exports can point to empty or placeholder entrypoints if they do not claim implemented functionality.

## Dependency Direction

Start with this conservative dependency flow:

```txt
@lumina/core
  -> no internal dependencies

@lumina/compiler
@lumina/router
@lumina/seo
@lumina/map
@lumina/cache
@lumina/schema
  -> @lumina/core

@lumina/agent
@lumina/mcp
@lumina/devtools
  -> @lumina/core and stable package APIs only

@lumina/cli
  -> package APIs, not package internals

@lumina/adapter-bun
@lumina/adapter-node
@lumina/adapter-static
  -> @lumina/core and generated runtime contracts
```

Production runtime packages must not depend on `@lumina/agent`, `@lumina/mcp`, or `@lumina/devtools`.

## First Types To Lock

Phase 1A stabilizes the shared model in `@lumina/core` before any package creates local substitutes. The current core package exports contract-backed versions of these names so package boundaries and checks can be wired early:

- `LuminaApp`
- `RouteNode`
- `GraphEdge`
- `LuminaDiagnostic`
- `RenderMode`
- `CachePlan`
- `AdapterManifest`

`GraphEdge` must include `kind`, `source`, `confidence`, and `why`.

`LuminaDiagnostic` must follow [Diagnostics Contract](diagnostics-contract.md).

## Verification

The minimum scaffold checks are:

```bash
bun install
bun test
bun run typecheck
bun run docs:check
bun run structure:check
bun run performance:check
```

If a command is not available yet, the PR must say so and update the relevant docs. Do not leave stale claims that the command passes.

Tests should prove package entrypoints, shared type surfaces, and explicitly implemented compiler, CLI, dev-server, static-build, or adapter behavior. They should not imply production adapter behavior beyond static built-output serving, CLI behavior beyond implemented route/inspect/map/bench-list/dev/build/start paths, broader component-level browser HMR, benchmark execution, or generated artifacts beyond `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `.lumina/client/*.js`, `dist/public/_lumina/client/*.js`, and `.lumina/hmr-report.json` exist.

When benchmark skeletons are added, checks should verify path existence, deterministic fixture naming, and claim hygiene only. They should not treat skeleton files as performance evidence.

## Out Of Scope

Phase 1 should not implement:

- Route discovery.
- Production Vite build output beyond static HTML generation for build-time static page routes.
- Full React rendering behavior beyond minimal dev SSR.
- Component-level HMR.
- Runtime request handling beyond static built HTML serving through `@lumina/adapter-bun`.
- Lumina Map extraction.
- MCP tools.
- Safe edit transactions.
- Generated `.lumina/*` artifacts.
- Benchmark results or public speed comparisons.

Those belong to later roadmap tasks after the package foundation exists.

## Documentation Checklist

When Phase 1 scaffold files, package boundaries, commands, or status change, update:

- `README.md`: current status, setup commands, and implemented package structure.
- `AGENTS.md`: real commands, package boundaries, generated-file rules if any.
- `docs/roadmap.md`: Phase 1 status.
- `docs/package-map.md`: package names and dependency rules.
- `docs/testing.md` and `docs/testing-contract.md`: real scripts, fixture layout, and CI behavior.
- `docs/task-backlog.md`: completed and next tasks.
- `docs/implementation-speed-rules.md`, `docs/benchmark-fixtures.md`, and `docs/speed-decisions.md`: early speed-proof rules and claim gates.
