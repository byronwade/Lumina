# Task Backlog

This backlog turns the roadmap into concrete implementation tasks. Each task should eventually become an issue or implementation plan using `docs/templates/task-template.md`.

Use `docs/status.md` to track whether each task is planned, scaffolded, implemented, or verified.

## PR 0: Documentation Contract Hardening

Goal: turn Phase 0 planning into implementation contracts.

Definition of done:

- `docs/status.md` exists.
- `docs/cli.md` exists.
- `docs/config.md` exists.
- `docs/routing.md` exists.
- `docs/manifest-contracts.md` exists.
- `docs/security.md` and root `SECURITY.md` exist.
- `docs/testing.md` exists.
- `docs/cache.md` exists.
- `docs/schema.md` exists.
- `docs/api-routes.md` exists.
- `docs/deployment.md` exists.
- README and docs hub link the new docs.
- Package and adapter naming is consistent.

## PR 1: Monorepo Skeleton

Goal: create the Bun workspace and package scaffolds.

Packages:

- `create-needle`
- `@needle/cli`
- `@needle/core`
- `@needle/compiler`
- `@needle/vite-plugin`
- `@needle/react`
- `@needle/router`
- `@needle/seo`
- `@needle/map`
- `@needle/agent`
- `@needle/mcp`
- `@needle/cache`
- `@needle/schema`
- `@needle/devtools`

Definition of done:

- `bun install` works.
- `bun test` works.
- `bun run typecheck` works.
- Every package has `package.json`.
- Every package has `src/index.ts`.
- Placeholder tests exist.
- `docs/status.md` marks the skeleton as scaffolded.

## PR 1A: Core Data Model

Goal: lock the shared immutable data model in `@needle/core`.

Definition of done:

- `NeedleConfig` exists.
- `NeedleApp` exists.
- `RouteNode` exists.
- `RenderMode` exists.
- `GraphEdge` exists with `kind`, `source`, `confidence`, and `why`.
- `NeedleDiagnostic` exists.
- `CachePlan` exists.
- Adapter capability type exists.
- Manifest base type exists.
- CLI, compiler, map, agent, MCP, adapters, and devtools import these types instead of defining local substitutes.
- Type tests or placeholder tests verify the shape.

## PR 1B: Adapter Package Baseline

Goal: create early adapter package boundaries.

Definition of done:

- `@needle/adapter-bun` package exists.
- `@needle/adapter-node` package exists.
- `@needle/adapter-static` package exists.
- Adapter capability type exists in `@needle/core`.
- Placeholder adapter manifests can be represented.
- User-facing docs explain Bun default plus Node/static compatibility.
- `@needle/server-bun` is not introduced unless a future ADR defines a shared server core package.

## PR 2: Route Discovery

Goal: discover `app/` routes and emit `.needle/routes.json`.

Definition of done:

- Static routes work.
- Dynamic routes work.
- Catch-all routes work.
- Route groups are ignored in URLs.
- API routes are distinguished.
- Route IDs are stable.
- Manifest order is deterministic.
- Route collision diagnostics work.

## PR 3: CLI JSON Envelope

Goal: implement a minimal CLI wrapper with stable JSON output rules.

Definition of done:

- `needle routes --json` uses the envelope from `docs/cli.md`.
- Diagnostics use stable codes.
- Exit codes follow `docs/cli.md`.
- `--ci` avoids prompts.
- `--json` does not print unrelated human output.

## PR 4: Vite Dev Integration

Goal: make `needle dev` start Vite and render a basic React page.

Definition of done:

- `needle dev` starts.
- Page renders on server.
- Client hydrates.
- Route manifest virtual module exists.
- HMR updates changed page.

## PR 5: React SSR and Hydration

Goal: support basic SSR and client hydration.

Definition of done:

- Root route SSR works.
- Client component counter hydrates.
- Dev errors are readable.
- Route and source file appear in useful diagnostics where available.

## PR 6: Layouts and Params

Goal: support nested layouts, route params, and search params.

Definition of done:

- Nested layouts render in order.
- Dynamic params pass to pages.
- Catch-all params pass to pages.
- Search params pass to pages.
- 404 and error page conventions work.

## PR 7: Static Build and Render Manifest

Goal: support `staticPage()` and emit static HTML.

Definition of done:

- Static route emits HTML.
- Render manifest records mode.
- Invalid render export gets helpful diagnostic.
- Generated output follows `docs/manifest-contracts.md`.

## PR 8: Bun Adapter Server

Goal: support `needle start` for built apps through `@needle/adapter-bun`.

Definition of done:

- Static files served.
- SSR routes served.
- 404 works.
- 500 works.
- Cache headers are tested.
- Bun-specific APIs stay inside `@needle/adapter-bun`.

## PR 8A: Adapter-Aware Server Entry

Goal: make generated server output adapter-aware.

Definition of done:

- `needle.config.ts` supports `runtime` and `adapter`.
- `.needle/generated/server-entry.ts` imports selected adapter.
- `adapter.manifest.json` is emitted.
- Static adapter can export compatible static routes.
- Node adapter can serve a minimal SSR route.

## PR 9: Metadata and SEO Audit

Goal: implement `defineMeta()` and `needle seo`.

Definition of done:

- Head tags render.
- Sitemap generated.
- Robots generated.
- Missing title, description, or canonical fails public route audit.
- JSON output is stable.
- SEO report follows `docs/manifest-contracts.md`.

## PR 10: API Routes

Goal: support API route files.

Definition of done:

- Common HTTP methods work.
- Dynamic API params work.
- Plain objects become JSON.
- Response objects pass through.
- 404 and 405 behavior is tested.
- Production errors hide stack traces.

## PR 11: Schema DSL Baseline

Goal: implement minimal `schema` primitives.

Definition of done:

- `string`, `number`, `boolean`, `enum`, `array`, `object`, and `uint64` exist.
- Optional fields work.
- Default fields work.
- Validation errors use stable JSON.
- Type tests or runtime tests cover supported primitives.

## PR 12: Hot API Schema Path

Goal: implement minimal `apiHot()`.

Definition of done:

- Params validate.
- Query validates where declared.
- Body validates where declared.
- Response serializes.
- Invalid input returns structured 400.
- Benchmark fixture compares normal and hot API.

## PR 13: Cache Manifest Baseline

Goal: make cache behavior explicit before deeper runtime caching.

Definition of done:

- Route cache metadata appears in `cache.manifest.json`.
- Static, SSR, API, and hot API defaults are documented in output.
- Cache tags appear in manifest.
- Invalid cache durations fail validation.
- Secret-like cache tags or keys are rejected or redacted.

## PR 14: Needle Map File Graph

Goal: generate a file-level map.

Risk mitigation:

- This is Layer 0 graph extraction.
- Keep output deterministic.
- Do not make semantic guesses yet.

Definition of done:

- Routes, components, APIs, schemas, styles, tests, and metadata appear.
- Affected query works.
- Explain query works.
- JSON output is deterministic.
- Every edge has `source`, `confidence`, and `why`.

## PR 15: Agent Context

Goal: generate route context capsules.

Definition of done:

- `needle agent context --route / --json` works.
- Context includes route, source, mode, SEO, components, cache summary, checks, and safe edits.
- Production build excludes agent metadata.
- Context output redacts secrets.

## PR 16: MCP Read-Only Server

Goal: expose read-only framework tools through MCP.

Definition of done:

- `needle mcp` starts.
- `list_routes` works.
- `get_route` works.
- `get_related_files` works.
- `get_seo_report` works.
- MCP responses are stable JSON.
- MCP read tools do not expose secrets.

## PR 17: Safe Metadata Edit

Goal: implement one safe edit path.

Risk mitigation:

- Metadata is the first low-risk safe edit.
- The edit must be AST-based.
- The command must support dry-run preview.
- The command must write a mutation log.
- The command must support undo.

Definition of done:

- Route metadata can be updated.
- AST edit is used.
- Dry-run diff preview works.
- `SafeEditTransaction` result is emitted.
- `.needle/mutations.json` is append-only.
- Affected checks run.
- Mutation log is written.
- `needle edit undo <mutationId>` works.
- Unknown field and high-risk edit rejection are tested.

## PR 18: Node Adapter Baseline

Goal: provide early Node compatibility so Bun is a speed default, not an adoption blocker.

Definition of done:

- Built static pages can run on Node.
- SSR route can run on Node.
- Adapter capabilities are documented.
- README documents Bun default plus Node compatibility.
- Benchmarks distinguish Bun and Node paths when benchmarks exist.

## PR 19: Agent Simulator Harness

Goal: create a script that exercises the agent and MCP workflow without an external LLM.

Definition of done:

- Fixture app includes safe and dangerous edit targets.
- Simulator can inspect routes through the same APIs MCP uses.
- Simulator can dry-run a metadata edit.
- Simulator can apply a metadata edit.
- Simulator runs affected checks.
- Simulator verifies mutation log output.
- Rejected edits are tested.

## PR 20: Migration Prototype

Goal: prototype `needle migrate from-next`.

Definition of done:

- Converts simple App Router pages.
- Preserves compatible layouts.
- Converts static metadata.
- Maps dynamic route segments.
- Generates `.contract.ts` stubs for ambiguous semantics.
- Emits migration report with skipped files and manual review items.
