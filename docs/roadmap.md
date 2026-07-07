# Roadmap

Status: Scaffolded.
Audience: maintainers, framework contributors, AI agents.

Lumina should be built in phases. Each phase must define what it proves, what it implements, and what remains out of scope.

The first working slice is intended to prove create app, SEO-safe pages, `@lumina/adapter-bun` serving, a basic map, agent inspection, and safe metadata edit. The first public prototype expands that slice into API routes, hot API, read-only MCP tools, adapter-aware server output, and documented Node/static paths.

Unless a phase is explicitly marked `Verified.` or `Scaffolded.` with evidence, its "Definition of done" is planned acceptance criteria, not a claim that the behavior exists today. Future-phase acceptance bullets should use `should` wording when they describe behavior that does not exist yet.

## Major Milestones

### Foundation

- Monorepo, CLI skeleton, config, and AGENTS.md.
- Shared core data model.
- Route discovery and manifest generation.
- Workspace graph, shared-file identity, and affected build planning.
- Basic Vite integration with React SSR and hydration.
- Nested layouts, dev-server page params, and dev not-found/error conventions.

### Core Wedge

- Render modes: `staticPage()`, `prerender()`, `ssr()`, `stream()`, `clientOnly()`, ordinary API routes, and `apiHot()`, mapped to the shared `@lumina/core` `RenderMode` literals.
- SEO engine: metadata, sitemap, robots, and audits.
- Adapter-aware Bun production output through `@lumina/adapter-bun`.
- API routes and hot API compiler with schemas.
- Lumina Map v1: file and import graph with affected queries.
- Agent context capsules and basic MCP read tools.
- Safe metadata edits with dry-run and affected checks.

### Advanced

- Lumina Map v2 with semantic edges from contracts.
- Full Agent Kernel and write-capable MCP tools.
- Structured page DSL and content collections.
- Streaming SSR and experimental partial prerendering.
- Deployment adapters for static, Bun, Node, Docker, and later cloud targets.
- Devtools dashboard.
- Large-app support: ownership, boundaries, incremental builds.
- RSC experimental path, version-pinned and opt-in.

## Current Status

The repository is in Phase 1. The monorepo scaffold exists with Bun workspace configuration, package placeholders, contract-backed shared core model types, `@lumina/react` `staticPage()` / `ssr()` helpers, `@lumina/compiler` route discovery and explicit static/SSR render-mode extraction, `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json` with direct local import edges, `.lumina/client/*.js` dev hydration bundles, `dist/public/_lumina/client/*.js` production hydration bundles, browser-verified interactive dev and production hydration, `.lumina/hmr-report.json` route-file and direct local imported component affected-route reports, `.lumina/build-trace.json`, `.lumina/perf.report.json`, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, minimal `lumina map affected --json`, `lumina bench --list --json`, minimal `lumina dev` Vite SSR route serving, `virtual:lumina/routes`, static `lumina build`, static `lumina start` through `@lumina/adapter-bun`, scaffolded `apps/www` and example fixtures, early benchmark/status skeletons, CI, and enforcement scripts. Phase 1A shared core model hardening is implemented. The next implementation stage is completing component-level HMR and production hardening after the dev and production hydration proof.

The upcoming prototype target is MVP Alpha, defined in `docs/mvp-alpha-scope.md`. MVP Alpha should keep the first build narrow: route discovery, basic render modes, generated `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, CLI inspection, and a demo app. API routes, MCP, safe edits, migration tooling, Node runtime behavior, and benchmark claims remain post-MVP unless the scope doc changes.

## MVP Alpha Lane

1. Core model hardening for route, render, manifest, and graph output. Implemented in `@lumina/core`.
2. Early benchmark and fixture skeleton with `not implemented` status only. Scaffolded.
3. Route discovery, deterministic `.lumina/routes.json`, and `lumina routes --json`. Implemented.
4. Basic render mode extraction and `.lumina/render-manifest.json`. Implemented for default static/API route modes plus explicit `staticPage()` and `ssr()` declarations.
5. File-level Lumina Map and `.lumina/map.json`. Implemented for route, source, layout, direct local import, render-mode, and generated-artifact evidence.
6. CLI inspection: `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, minimal `lumina map affected --json`, and `lumina bench --list --json` are implemented for app, route, direct-import route-impact, and benchmark-skeleton evidence.
7. Demo app and example source fixtures proving route/render/map/inspect workflow inputs. Scaffolded.
8. Minimal Vite dev integration for the scaffolded `apps/www` app and examples. Implemented for SSR page serving, `virtual:lumina/routes`, route-file update reports, and direct local imported component affected-route reports.
9. Static build output and static `@lumina/adapter-bun` serving. Implemented for build-time static page routes.
10. Complete broader component-level browser HMR. The first dev and production hydration bundle slices, browser-verified interactive counter proof, and direct local imported component affected-route report are implemented.

API routes, MCP, safe edits, migration, Node adapter runtime behavior, and benchmark claims are post-MVP unless `docs/mvp-alpha-scope.md` is updated in the same change.

## How We Build

- Every major task uses a structured task template.
- Compiler and map are built as first-class systems from the beginning.
- Runtime stays minimal.
- Speed is treated as a whole-system property across compiler, runtime, client payload, graph queries, agent workflows, and benchmarks.
- All generated artifacts are explainable.
- Lumina should dogfood Lumina Map and agent tools on the framework itself as soon as they exist.
- Large-repo work should make shared files, split apps, affected builds, terminal output, and observability visible before broad runtime complexity.

## Phase 0: Project Constitution

Goal: define what the framework is and what it refuses to become.

Deliverables:

- `README.md`
- `VISION.md`
- `CONTRIBUTING.md`
- `ARCHITECTURE.md`
- `AGENTS.md`
- `docs/roadmap.md`
- `docs/compiler-ir.md`
- `docs/runtime-contract.md`
- `docs/agent-kernel.md`
- `docs/lumina-map.md`

Definition of done:

- Project thesis is documented.
- Architecture principles are documented.
- Package responsibilities are documented.
- Agent rules are documented.
- Implementation task template exists.

Phase status: Verified.

Scope: complete for initial project constitution.

Risk mitigation focus:

- Lock the shared data model before implementation diverges.
- Keep the first working slice scoped to create app, SEO-safe pages, `@lumina/adapter-bun` serving, a basic map, agent inspection, and safe metadata edit.
- Keep speed strategy visible from the start: static-first output, build-time intelligence, small runtime adapters, compact JSON, and benchmark honesty.
- Treat `docs/risk-mitigation.md` as required reading for map, agent, MCP, adapter, and safe-edit work.

## Phase 1: Monorepo Skeleton

Goal: create the Bun workspace and package scaffolds.

Implementation guide: `docs/phase-1-build-plan.md`.

Phase status: Scaffolded.

Packages:

- `create-lumina`
- `@lumina/cli`
- `@lumina/core`
- `@lumina/compiler`
- `@lumina/vite-plugin`
- `@lumina/react`
- `@lumina/router`
- `@lumina/seo`
- `@lumina/map`
- `@lumina/agent`
- `@lumina/mcp`
- `@lumina/cache`
- `@lumina/schema`
- `@lumina/devtools`
- `@lumina/adapter-bun`
- `@lumina/adapter-node`
- `@lumina/adapter-static`

Definition of done:

- `bun install` works.
- `bun test` works.
- `bun run typecheck` works.
- `bun run docs:check` works.
- `bun run structure:check` works.
- `bun run performance:check` works.
- `bun run check` works.
- All packages have `package.json`.
- All packages expose `src/index.ts`.
- Placeholder tests exist.
- README, AGENTS, package map, and backlog reflect the implemented scaffold honestly.

Out of scope:

- Real route discovery.
- Runtime server.
- Vite integration.

## Phase 1A: Core Data Model

Goal: stabilize the shared immutable model in `@lumina/core`.

The Phase 1 scaffold originally exposed placeholder versions of these types. Phase 1A turns them into contract-backed shapes instead of letting downstream packages invent local substitutes.

Required types:

- `LuminaApp`
- `RouteNode`
- `GraphEdge`
- `LuminaDiagnostic`
- `RenderMode`
- `CachePlan`
- `AdapterManifest`

Definition of done:

- CLI, compiler, map, agent, MCP, adapters, and devtools import shared types from `@lumina/core`.
- `GraphEdge` includes `kind`, `source`, `confidence`, and `why`.
- Docs, type tests, and contract fixtures verify the type contracts.
- No package defines a competing local route or graph shape.

Phase status: Implemented.

Evidence: `packages/core/src/index.ts`, `tests/core-model.test.ts`, and `tests/scaffold.test.ts` cover the shared type contracts. Runtime behavior, route discovery, generated manifests, and CLI output remain planned.

## Phase 1B: Early Benchmark And Fixture Skeleton

Goal: create the speed evidence path before route discovery and adapter work expand.

This phase must not publish benchmark claims. It should add deterministic fixture and benchmark skeletons that can report `not implemented` until the owning behavior exists.

Planned paths:

```txt
fixtures/apps/tiny-static/
fixtures/apps/medium-100-routes/
fixtures/apps/large-1000-routes/
benchmarks/route-discovery.bench.ts
benchmarks/manifest-size.bench.ts
benchmarks/graph-query.bench.ts
benchmarks/adapter-dispatch.bench.ts
```

Definition of done:

- Fixture apps have stable names and deterministic content.
- Benchmark files exist but do not emit synthetic results.
- First speed surfaces are categorized as developer, user, or agent speed.
- Generated JSON skeletons include `schemaVersion` and `generatedBy` when artifacts are emitted.
- Dependency versions used by measured work are pinned before results are recorded.
- Docs state that benchmark publishing and public comparisons remain future work.

## Phase 1C: Large-Repo Build Architecture

Goal: define workspace graph, shared-file identity, split-app planning, affected work selection, terminal output, and observability reports before broad runtime complexity grows.

Source doc: `docs/large-repo-build-architecture.md`.

Definition of done:

- Workspace graph shape is documented.
- Shared file and generated artifact identity are documented.
- Multi-app workspace and split-app behavior are documented.
- Affected build, check, and test commands are documented.
- Terminal output and logs have a planned contract.
- Large-repo observability reports are documented.
- Production runtime boundaries stay generated-artifact only.

## Phase 2: CLI and App Discovery

Goal: discover routes from an `app/` directory and expose route inspection commands.

Commands:

- `lumina routes`
- `lumina inspect`

Route conventions:

```txt
app/page.tsx                       -> /
app/about/page.tsx                 -> /about
app/blog/[slug]/page.tsx           -> /blog/:slug
app/docs/[...parts]/page.tsx       -> /docs/*
app/(marketing)/pricing/page.tsx   -> /pricing
app/api/health.ts                  -> /api/health
```

Definition of done:

- Routes are discovered deterministically.
- Dynamic params are parsed.
- Route groups do not affect URL paths.
- API and page routes are distinguished.
- Manifest is stable across operating systems.
- Tests cover nested routes, dynamic routes, catch-all routes, and route groups.

## Phase 3: Vite Integration

Goal: make a React app run in dev mode with Vite.

Deliverables:

- `@lumina/vite-plugin`
- Virtual modules.
- Dev server middleware.
- Route manifest HMR.
- Client entry.
- Server entry.

Virtual modules:

```txt
virtual:lumina/routes
virtual:lumina/client-entry
virtual:lumina/server-entry
virtual:lumina/manifest
virtual:lumina/head
```

Definition of done:

- `lumina dev` should start Vite.
- Changing `app/page.tsx` should update browser output.
- `virtual:lumina/routes` should work.
- React pages should render on the server.
- Client hydration should work for a simple counter.

## Phase 4: React Pages, Layouts, and Hydration

Goal: support familiar page and layout ergonomics.

Features:

- Root layout.
- Nested layouts.
- Dynamic and catch-all page route params in the Vite dev server.
- Search params in the Vite dev server.
- Error page.
- Not found page.
- Client components with `"use client"`.
- Basic hydration.

Definition of done:

- Nested layouts render in correct order in the Vite dev server.
- Dynamic and catch-all params are available to page components in the Vite dev server.
- Search params are available to page components in the Vite dev server.
- 404 uses nearest `app/**/not-found.tsx` in the Vite dev server.
- Errors use nearest `app/**/error.tsx` in the Vite dev server.
- Hydration works for the first simple client component in the dev server and built static output; direct local imported component affected-route reporting exists, and broader component-level browser HMR remains planned.

## Phase 5: Render Modes

Goal: every route compiles into the safest appropriate rendering strategy with clear performance evidence.

Public API:

```ts
export const render = staticPage()
export const render = prerender({ revalidate: "10m", tags: ["blog"] })
export const render = ssr({ cache: "no-store" })
export const render = stream()
export const render = clientOnly()
export const render = apiHot({ validate: true, serialize: "generated" })
```

Definition of done:

- Render mode should be detected.
- Static routes should emit `dist/public/*.html`.
- SSR routes should run through `@lumina/adapter-bun`.
- Invalid render declarations should produce helpful errors.
- Manifest should include cache and revalidation metadata.

## Phase 6: SEO Engine

Goal: make public pages SEO-correct by default.

Features:

- `defineMeta()`
- Static metadata.
- Dynamic metadata.
- Title and description.
- Canonical URLs.
- Open Graph.
- Twitter/X cards.
- JSON-LD helpers.
- `robots.txt`.
- `sitemap.xml`.
- Sitemap indexes for large sites.
- RSS, Atom, and JSON feeds.
- `hreflang`.
- 404 and 410 status helpers.
- SEO audit CLI.
- Crawler preview.

Definition of done:

- Head tags should render into SSR and SSG HTML.
- `sitemap.xml` should be generated from the public route manifest.
- `robots.txt` should be generated from config.
- `lumina seo` should catch missing title, description, and canonical URL.
- `lumina seo --json` should be stable for agents.
- Tests should cover static and dynamic metadata.

## Phase 7: Core Web Vitals and Performance Budgets

Goal: make performance visible and enforceable.

Phase boundary:

- Phases 0 through 7 should remain focused on compiler IR, route discovery, basic rendering, SEO, performance visibility, and the first graph foundation.
- Features that require major runtime complexity should be deferred unless they directly strengthen the map or agent demo.

Definition of done:

- Route JS and CSS sizes should be reported.
- Budgets should warn or fail according to config.
- Public page budgets should be stricter by default.
- JSON diagnostics should include safe suggestions.

## Phase 7A: Adapter Abstraction

Goal: create early adapter boundaries so Bun is the speed default but not an adoption blocker.

Packages:

- `@lumina/adapter-bun`
- `@lumina/adapter-node`
- `@lumina/adapter-static`

Definition of done:

- `lumina.config.ts` should support `runtime` and `adapter`.
- Generated server entry should import the selected adapter.
- Adapter manifest should document capabilities.
- User application code should not require Bun-only APIs.
- Static adapter should export static routes.
- Node adapter should serve a minimal SSR route.

## Phase 8: Bun Adapter Production Output

Goal: ship Bun adapter output that serves static, SSR, and API routes.

Definition of done:

- `lumina build` emits static HTML and deployment manifest copies for build-time static page routes.
- `lumina start` serves static pages through `@lumina/adapter-bun`.
- `lumina start` should serve SSR pages.
- 404 and 500 should work.
- Cache headers should be correct for static assets.
- Integration tests should make HTTP requests and assert responses.
- Bun serving should be implemented through `@lumina/adapter-bun`.

## Phase 9: API Routes

Goal: support full-stack API routes.

Definition of done:

- GET, POST, PUT, PATCH, DELETE, OPTIONS, and HEAD should be implemented and tested.
- Dynamic API params should be implemented and tested.
- Plain objects should become JSON responses.
- Response objects should pass through untouched.
- Errors should be formatted in development and hidden in production.

## Phase 10: Hot API Compiler

Goal: make selected API routes faster than generic framework handlers.

Definition of done:

- Params, query, and body schemas should validate.
- Response schema should serialize.
- Invalid input should return 400 with structured errors.
- Hot API routes should avoid generic JSON paths where possible.
- OpenAPI output should emit for API routes.
- Benchmarks should be reproducible.

## Phase 11: Cache System

Goal: build predictable and inspectable caching.

Definition of done:

- Route cache metadata should appear in manifests.
- Cache tags should be queryable by route and component.
- `revalidateTag` should invalidate matching entries.
- Cache status should appear in dev logs.
- Agent JSON output should explain cache behavior.

## Phase 12: Server Functions

Goal: provide type-safe same-origin server calls.

Definition of done:

- Server functions should be callable from loaders.
- Server functions should be callable from client components through generated stubs.
- Input validation should work.
- Output validation should work in dev.
- Map should show which routes call each server function.

## Phase 13: Lumina Map v1

Goal: build a file-level graph.

Risk mitigation focus:

- This is Layer 0 of semantic graph extraction.
- Use structured parsing plus deterministic import walking.
- Do not infer semantics beyond file-level relationships yet.
- Implement basic affected queries early because the graph is the product wedge.

Definition of done:

- Graph should include routes, components, APIs, schemas, tests, styles, and metadata.
- Affected query should connect changed files to impacted routes and tests.
- Explain query should include why edges exist.
- Output should be compact and deterministic.
- Tests should cover graph generation on fixture apps.

## Phase 14: Lumina Map v2

Goal: move from imports into application meaning.

Risk mitigation focus:

- This is Layer 1 and Layer 2 of semantic graph extraction.
- Prefer explicit `.contract.ts` files as the primary source of semantic truth.
- Add convention-based inference only when the source and confidence are clear.
- Treat missing contracts as low-confidence graph data rather than guessing.
- Every semantic edge must include `kind`, `source`, `confidence`, and `why`.

Definition of done:

- Map should distinguish hard and soft edges.
- Component contracts should create prop edges.
- Route metadata should create SEO edges.
- Cache tags should appear as nodes.
- Affected checks should be smarter than import traversal.
- Agents should be able to ask what else must change if a component changes.

## Phase 15: Agent Kernel v1

Goal: make the framework usable by AI agents without forcing them to read the whole repo.

Definition of done:

- App-local `AGENTS.md` should be generated with project commands and rules.
- Context capsules should be generated per route.
- Agent context command should return compact JSON.
- Agent plan should return deterministic task skeletons.
- Production builds should not include agent metadata.

## Phase 16: MCP Server

Goal: expose framework data and actions through structured tools.

Definition of done:

- `lumina mcp` should start the server.
- MCP clients should list routes.
- MCP clients should inspect a route.
- MCP clients should get related files.
- MCP clients should run affected checks.
- Write tools should require safe-edit validation.
- Tools should return compact structured JSON.

## Phase 17: Safe Edit API

Goal: let agents change apps through guardrails.

Risk mitigation focus:

- Safe edits must be transactional.
- Edits must be AST-based, never string replacement.
- The first safe edit should be low risk: route metadata only.
- Each edit must support dry-run preview, affected checks, mutation logs, and undo.
- High-risk changes require explicit override.

Definition of done:

- Safe edits should update metadata.
- Safe edits should add route block placeholders.
- Safe edits should update component contracts.
- `SafeEditTransaction` shape should be implemented.
- Dry-runs should apply patches in memory.
- `.lumina/mutations.json` should be append-only.
- Unsafe fields should be rejected.
- Mutation log should be written.
- Affected checks should run after edits.
- `lumina edit undo` should roll back the last safe edit.

## Phase 18: Migration Prototype

Goal: reduce adoption friction through a constrained Next.js migration path.

Command:

- `lumina migrate from-next`

Definition of done:

- App Router pages should be copied into Lumina route shape when compatible.
- Layouts should be preserved when compatible.
- Static metadata should be converted.
- Dynamic route segments should be mapped.
- Ambiguous semantics should generate `.contract.ts` stubs.
- Migration report should list skipped files and manual review items.

## Phase 19: Node Adapter Baseline

Goal: reduce Bun adoption friction before the broader deployment adapter phase.

Rationale:

- The Bun adapter remains the default production path because speed matters.
- User application code should not depend on Bun-only APIs.
- Teams that require Node should have a credible path early.

Definition of done:

- A basic Node adapter should serve built static routes.
- A basic Node adapter should serve SSR routes.
- Adapter capabilities should be documented in `dist/adapter.manifest.json`.
- README should document Bun default plus Node compatibility.
- Benchmarks should distinguish Bun performance from Node compatibility.

## Later Phases

Later roadmap:

1. Structured page DSL.
2. Content collections.
3. Images, fonts, and scripts.
4. Auth and sessions.
5. Forms and mutations.
6. Streaming SSR.
7. Partial prerendering.
8. Full deployment adapter matrix.
9. Devtools dashboard.
10. Large-app support.
11. RSC experimental.
12. Docs and examples.
13. Benchmarks and launch polish.
