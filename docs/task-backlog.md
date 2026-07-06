# Task Backlog

This backlog turns the roadmap into concrete implementation tasks. Each task should eventually become an issue or implementation plan using `docs/templates/task-template.md`.

## PR 0A: AI Collaboration Playbooks

Goal: maintain root-level, vendor-neutral skill and subagent guidance for AI companies and human reviewers.

Status: initial documentation exists in `skills/` and `subagents/`.

Definition of done:

- Skill index covers strategic app building, documentation maintenance, project maintenance, Needle Map design, Agent Kernel design, and SEO/runtime review.
- Subagent index covers architecture, compiler/map, runtime/SEO, agent safety, documentation, and verification roles.
- README.md and docs hub link to the root-level guidance.
- Guidance remains documentation-only until executable agent tooling exists.

## PR 1: Monorepo Skeleton

Goal: create the Bun workspace and package scaffolds.

Packages:

- `create-needle`
- `@needle/cli`
- `@needle/core`
- `@needle/compiler`
- `@needle/vite-plugin`
- `@needle/react`
- `@needle/server-bun`
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

## PR 1A: Core Data Model

Goal: lock the shared immutable data model in `@needle/core`.

Definition of done:

- `NeedleApp` exists.
- `RouteNode` exists.
- `GraphEdge` exists with `kind`, `source`, `confidence`, and `why`.
- `NeedleDiagnostic` exists.
- CLI, compiler, map, agent, MCP, adapters, and devtools import these types instead of defining local substitutes.
- Type tests or placeholder tests verify the shape.

## PR 1B: Adapter Package Baseline

Goal: create early adapter package boundaries.

Definition of done:

- `@needle/adapter-bun` package exists.
- `@needle/adapter-node` package exists.
- `@needle/adapter-static` package exists.
- Adapter capability type exists in `@needle/core`.
- User-facing docs explain Bun default plus Node/static compatibility.

## PR 2: Route Discovery

Goal: discover `app/` routes and emit `.needle/routes.json`.

Definition of done:

- Static routes work.
- Dynamic routes work.
- Catch-all routes work.
- Route groups are ignored in URLs.
- API routes are distinguished.
- Manifest order is deterministic.

## PR 3: Vite Dev Integration

Goal: make `needle dev` start Vite and render a basic React page.

Definition of done:

- `needle dev` starts.
- Page renders on server.
- Client hydrates.
- Route manifest virtual module exists.
- HMR updates changed page.

## PR 4: React SSR and Hydration

Goal: support basic SSR and client hydration.

Definition of done:

- Root route SSR works.
- Client component counter hydrates.
- Dev errors are readable.

## PR 5: Layouts and Params

Goal: support nested layouts, route params, and search params.

Definition of done:

- Nested layouts render in order.
- Dynamic params pass to pages.
- Search params pass to pages.
- 404 and error page conventions work.

## PR 6: Static Build

Goal: support `staticPage()` and emit static HTML.

Definition of done:

- Static route emits HTML.
- Render manifest records mode.
- Invalid render export gets helpful diagnostic.

## PR 7: Bun Server

Goal: support `needle start` for built apps.

Definition of done:

- Static files served.
- SSR routes served.
- 404 works.
- 500 works.
- Cache headers are tested.
- Bun server is implemented behind `@needle/adapter-bun`.

## PR 7A: Adapter-Aware Server Entry

Goal: make generated server output adapter-aware.

Definition of done:

- `needle.config.ts` supports `runtime` and `adapter`.
- `.needle/generated/server-entry.ts` imports selected adapter.
- `adapter.manifest.json` is emitted.
- Static adapter can export compatible static routes.
- Node adapter can serve a minimal SSR route.

## PR 8: Metadata and SEO Audit

Goal: implement `defineMeta()` and `needle seo`.

Definition of done:

- Head tags render.
- Sitemap generated.
- Robots generated.
- Missing title, description, or canonical fails public route audit.
- JSON output is stable.

## PR 9: API Routes

Goal: support API route files.

Definition of done:

- Common HTTP methods work.
- Dynamic API params work.
- Plain objects become JSON.
- Response objects pass through.

## PR 10: Hot API Schema Path

Goal: implement minimal `schema` and `apiHot()`.

Definition of done:

- Params validate.
- Response serializes.
- Invalid input returns structured 400.
- Benchmark fixture compares normal and hot API.

## PR 11: Needle Map File Graph

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

## PR 12: Agent Context

Goal: generate route context capsules.

Definition of done:

- `needle agent context --route / --json` works.
- Context includes route, source, mode, SEO, components, checks, and safe edits.
- Production build excludes agent metadata.

## PR 13: MCP Read-Only Server

Goal: expose read-only framework tools through MCP.

Definition of done:

- `needle mcp` starts.
- `list_routes` works.
- `get_route` works.
- `get_related_files` works.
- `get_seo_report` works.

## PR 14: Safe Metadata Edit

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

## PR 15: Node Adapter Baseline

Goal: provide early Node compatibility so Bun is a speed default, not an adoption blocker.

Definition of done:

- Built static pages can run on Node.
- SSR route can run on Node.
- Adapter capabilities are documented.
- README documents Bun default plus Node compatibility.

## PR 16: Agent Simulator Harness

Goal: create a script that exercises the agent and MCP workflow without an external LLM.

Definition of done:

- Fixture app includes safe and dangerous edit targets.
- Simulator can inspect routes through the same APIs MCP uses.
- Simulator can dry-run a metadata edit.
- Simulator can apply a metadata edit.
- Simulator runs affected checks.
- Simulator verifies mutation log output.
- Rejected edits are tested.

## PR 17: Migration Prototype

Goal: prototype `needle migrate from-next`.

Definition of done:

- Converts simple App Router pages.
- Preserves compatible layouts.
- Converts static metadata.
- Maps dynamic route segments.
- Generates `.contract.ts` stubs for ambiguous semantics.
- Emits migration report with skipped files and manual review items.
