# Task Backlog

Status: Planned.
Audience: maintainers, framework contributors, AI agents.

This backlog turns the roadmap into concrete implementation tasks. Each task should eventually become an issue or implementation plan using `docs/templates/task-template.md`.

Unless a task is explicitly marked `Verified.` or `Scaffolded.` with evidence, its "Definition of done" is planned acceptance criteria, not a claim that the behavior exists today. Future implementation tasks should use `should` wording for behavior that does not exist yet.

Current implementation path: Phase 1A expands and stabilizes the shared core data model, then begins route discovery.

MVP Alpha implementation path: keep PR 1A through PR 4 focused on core model hardening, route discovery, deterministic `.lumina/routes.json`, basic render mode data for `.lumina/render-manifest.json`, the first file-level `.lumina/map.json`, CLI inspection, and a demo app. API routes, MCP, safe edits, migration, Node adapter runtime behavior, and benchmarks are post-MVP unless `docs/mvp-alpha-scope.md` changes in the same work.

## PR 0A: AI Collaboration Playbooks

Goal: maintain docs-level, vendor-neutral skill and subagent guidance for AI companies and human reviewers.

Task status: Scaffolded.

Evidence: documentation exists in `docs/skills/`, `docs/subagents/`, `docs/alpha-agent-operating-system.md`, `docs/alpha-work-routing.md`, `docs/alpha-implementation-sequence.md`, `docs/alpha-drift-prevention.md`, `CLAUDE.md`, `.claude/`, `.agents/skills/`, and `.cursor/rules/`.

Definition of done:

- Skill index covers strategic app building, documentation maintenance, project maintenance, Lumina Map design, Agent Kernel design, SEO/runtime review, and MVP Alpha slice playbooks.
- Subagent index covers architecture, compiler/map, runtime/SEO, agent safety, documentation, verification, and MVP Alpha guardian roles.
- README.md, AGENTS.md, and docs hub link to the docs-level guidance and Alpha operating docs.
- Claude, Codex, and Cursor wrappers point back to vendor-neutral source docs.
- Guidance remains documentation-only until executable agent tooling exists.

## PR 0B: Documentation System

Goal: make the documentation structure comparable to a mature framework by separating getting started material, guides, API reference, file conventions, architecture, and contribution rules.

Task status: Planned.

Evidence: initial documentation structure exists in `docs/getting-started.md`, `docs/guides.md`, `docs/api-reference.md`, `docs/file-conventions.md`, `docs/documentation-standard.md`, `docs/documentation-audit.md`, and `docs/docs-maintenance-checklist.md`.

Definition of done:

- Documentation hub clearly separates start-here, guide, reference, architecture, and contribution lanes.
- Every planned feature page uses clear status language.
- CLI, config, helper APIs, file conventions, generated files, and JSON outputs have reference homes.
- README links to the primary docs lanes.
- AGENTS.md tells future agents to follow the documentation standard.
- No page claims unimplemented commands or APIs work.

Remaining follow-up:

- Add verified tutorials after app creation and runtime behavior exist.
- Add public docs frontmatter after a docs site parser is chosen.
- Add generated `docs-index.json`, `llms.txt`, and `llms-full.txt` plans to Agent Kernel implementation tasks.
- Keep the pull request template aligned with `docs/docs-maintenance-checklist.md`, `docs/docs-verification.md`, and `docs/review-checklist.md`.
- Expand `docs/machine-readable-docs.md` into generated schemas when the owning packages have schema output behavior.
- Use `docs/templates/documentation-page-template.md` for new durable docs pages.
- Keep `docs/speed-strategy.md` current as performance, runtime, compiler, graph, agent, or benchmark plans change.
- Keep `docs/threat-model.md`, `docs/benchmark-fixtures.md`, `docs/examples-catalog.md`, and `docs/docs-site-build-plan.md` current as implementation begins.

## PR 0C: Speed Strategy

Goal: define speed as a whole-system property before implementation begins.

Task status: Planned.

Evidence: initial documentation exists in `docs/speed-strategy.md`.

Definition of done:

- Speed surfaces are documented for compiler, runtime, client payload, hot APIs, app graph, agent workflows, builds, and benchmarks.
- Speed decisions are documented in `docs/speed-decisions.md`, including Vite/Rolldown, Bun, route code splitting, CSS delivery, production source maps, React Compiler, React streaming, resource hints, fetch priority, 103 Early Hints, speculation rules, bfcache, image/font delivery, compression, optional RUM, hot APIs, explicit caching, compiler scaling, rejected defaults, and implementation gates.
- Speed coverage is audited in `docs/speed-capability-audit.md`, with each major speed surface mapped to its decision, source docs, proof gate, and implementation follow-up.
- Feature scheduling includes speed gates.
- Benchmark evidence rules link to `docs/benchmark-methodology.md`.
- Runtime and compiler docs link back to the speed strategy.
- No public speed claim is marked verified before benchmarks exist.

Remaining follow-up:

- Implement route asset metadata fields for scripts, styles, images, fonts, likely LCP assets, resource hints, compression eligibility, 103 Early Hints eligibility, and bfcache blockers.
- Implement adapter manifest delivery capability fields for compression, resource hints, 103 Early Hints, and bfcache-aware headers.
- Add fixtures that prove final `Link` headers, 103 Early Hints, compressed responses, and route delivery metadata match the same route asset evidence.
- Recheck current Vite sources before Phase 1 dependency pinning; the 2026-07-06 research snapshot points to current stable Vite 8.x/Rolldown as the scaffold default candidate.
- Add Bun native-route-dispatch fixtures before enabling `nativeRouteDispatch`, including parity against the generated matcher and timing evidence for `Bun.serve({ routes })`.
- Add route chunk, CSS chunk, source-map exposure, and no-default-telemetry fixtures before performance docs can be marked verified.

## PR 0D: Product Build Readiness

Goal: keep the docs system ready to support the first real product build without letting implementation drift ahead of contracts.

Task status: Planned.

Evidence: initial documentation exists in `docs/product-build-readiness.md` and `docs/public/reference/project-structure.md`.

Definition of done:

- Build-readiness lanes are documented for status, onboarding, project structure, reference docs, speed, agents, public docs, security, governance, and verification.
- Public project structure explains planned app structure, generated files, repository layout, and docs-only AI playbooks.
- README, AGENTS, docs hub, public docs index, and website content map link to the readiness and project-structure docs.
- Remaining build blockers are explicit and tied to Phase 1 tasks.

## PR 0E: Documentation Verification

Goal: make docs quality repeatable before implementation starts.

Task status: Scaffolded.

Evidence: initial documentation and executable scaffold checks exist in `docs/docs-verification.md`.

Definition of done:

- Manual checks are documented for `git diff --check`, local Markdown links, AI playbook placement, status-language review, navigation coverage, and machine-readable docs contracts.
- The current `docs:check`, `structure:check`, `performance:check`, and root `check` scripts are documented without claiming they prove framework behavior.
- README, AGENTS, docs hub, freshness policy, maintenance checklist, testing docs, machine-readable docs, and product-build-readiness docs link to the verification runbook.
- PR summaries report documentation evidence instead of relying on intent.

## PR 0F: Testing Contract

Goal: define test layers, fixture layout, snapshot policy, CI gates, browser artifact rules, network restrictions, contract-to-test mapping, and evidence reporting before feature implementation expands beyond the scaffold.

Task status: Planned.

Evidence: initial documentation exists in `docs/testing-contract.md` and `docs/public/reference/testing.md`.

Definition of done:

- Planned unit, fixture, snapshot, integration, HTTP, browser, security, and performance test layers are documented.
- Planned fixture layout, snapshot update policy, CI gates, network/time rules, browser artifact rules, and evidence reporting are documented as planned behavior.
- README, AGENTS, docs hub, testing overview, public reference docs, freshness, maintenance, verification, research, matrix, and build-readiness docs link to the contract.
- Future implementation tasks require deterministic fixture outputs, snapshot review, local-server lifecycle, no-network defaults, and CI evidence.

## PR 0G: Versioning And Upgrade Policy

Goal: define versioning rules before public APIs, generated manifests, CLI JSON, docs outputs, and compatibility claims become real contracts.

Task status: Planned.

Evidence: initial documentation exists in `docs/versioning-and-upgrades.md`.

Definition of done:

- Versioned surfaces are documented for packages, CLI, config, helpers, manifests, agent context, docs site, and examples.
- Pre-1.0, stable release, schema versioning, upgrade guide, changelog, and deprecation rules are documented.
- Release, compatibility, manifest, machine-readable docs, freshness, maintenance, product-build-readiness, README, AGENTS, and docs hub link to the policy.
- Public compatibility and support claims remain planned until backed by fixture or integration evidence.

## PR 0H: Public Docs Site Architecture

Goal: define the future docs-site content model before building the public documentation portion of the website.

Task status: Planned.

Evidence: initial documentation exists in `docs/public-docs-site-architecture.md`.

Definition of done:

- Public docs route mapping, frontmatter contract, navigation lanes, page types, search metadata, source links, and machine-readable outputs are documented.
- Renderer decision criteria are documented without choosing a renderer prematurely.
- README, AGENTS, docs hub, public docs readiness, website content map, build readiness, freshness policy, maintenance checklist, machine-readable docs, research, and matrix docs link to the architecture.
- Public pages remain plain Markdown until a parser or docs site direction exists.

## PR 0I: CLI JSON Contract

Goal: define machine-readable CLI output before `@lumina/cli` implementation begins.

Task status: Planned.

Evidence: initial documentation exists in `docs/cli-json-contract.md`.

Definition of done:

- JSON envelope, diagnostic shape, exit codes, command-specific data contracts, and stability rules are documented.
- CLI, API reference, manifest contracts, Agent Kernel, MCP, versioning, build-readiness, freshness, maintenance, README, AGENTS, docs hub, research, and matrix docs link to the contract.
- The contract is clearly marked planned and does not claim command behavior exists.
- Future implementation tasks require stable JSON snapshots and exit-code tests.

## PR 0J: Diagnostics Contract

Goal: define diagnostic codes, severity values, categories, source locations, related locations, remediation text, docs links, child diagnostics, JSON ordering, and fixture expectations before compiler, CLI, runtime, and agent diagnostics are implemented.

Task status: Planned.

Evidence: initial documentation exists in `docs/diagnostics-contract.md` and `docs/public/reference/diagnostics.md`.

Definition of done:

- Planned diagnostic shape, required fields, categories, code naming, source span behavior, parent-child diagnostics, human output, JSON output, exit-code interaction, docs URL strategy, security rules, and fixtures are documented as planned behavior.
- README, AGENTS, docs hub, API reference, CLI JSON contract, manifest contracts, public reference docs, freshness, maintenance, verification, research, matrix, and build-readiness docs link to the contract.
- Future implementation tasks require single-file, cross-file, nested schema, strict-mode, runtime, sanitized production, deterministic ordering, and docs-link tests.

## PR 0K: Configuration Contract

Goal: define config loading, validation, environment-variable policy, and normalized output before compiler and adapter implementation starts.

Task status: Planned.

Evidence: initial documentation exists in `docs/config-contract.md`.

Definition of done:

- Planned `lumina.config.ts`, loading order, normalized config shape, config fields, environment-variable policy, env file order, diagnostics, generated-output impact, security rules, and tests are documented.
- Config, API reference, runtime, adapters, security, manifests, versioning, build-readiness, freshness, maintenance, README, AGENTS, docs hub, verification, research, and matrix docs link to the contract.
- The contract is clearly marked planned and does not claim config loading or env behavior exists.
- Future implementation tasks require config normalization tests, invalid config diagnostics, env loading fixtures, and secret-exclusion tests.

## PR 0L: Adapter Contract

Goal: define Bun, Node, and static adapter inputs, outputs, manifest fields, capabilities, environment variables, health endpoint behavior, static export behavior, diagnostics, compatibility evidence, and fixture expectations before adapter implementation starts.

Task status: Planned.

Evidence: initial documentation exists in `docs/adapter-contract.md` and `docs/public/reference/adapters.md`.

Definition of done:

- Planned adapter set, generated inputs, generated output, adapter manifest shape, capability rules, Bun responsibilities, native route dispatch rules, Node responsibilities, static export rules, environment variables, health endpoint behavior, cache/header rules, diagnostics, fixture requirements, compatibility evidence, and out-of-scope platform adapters are documented.
- README, AGENTS, docs hub, adapter architecture, deployment, compatibility, runtime contract, manifest contracts, public reference docs, freshness, maintenance, verification, research, matrix, and build-readiness docs link to the contract.
- Future implementation tasks require Bun, Node, static export, cache header, health endpoint, production error, adapter manifest, unsupported capability, and compatibility evidence tests.

## PR 0M: Examples And Templates Contract

Goal: define official example statuses, README requirements, starter-template behavior, create-command example support, generated-artifact expectations, public docs linking rules, and verification evidence before examples are used in onboarding.

Task status: Planned.

Evidence: initial documentation exists in `docs/examples-contract.md` and `docs/public/reference/examples.md`.

Definition of done:

- Planned example categories, status labels, directory layout, README fields, required commands, expected artifacts, contract coverage, verification evidence, create-command integration, public docs rules, agent demo requirements, and scale fixture requirements are documented.
- README, AGENTS, docs hub, examples overview, getting started, public create-app guide, public examples reference, freshness, maintenance, verification, research, matrix, and build-readiness docs link to the contract.
- Future implementation tasks require default starter, feature examples, agent demo, and large-app fixture evidence before public docs call examples verified.

## PR 0N: Routing Contract

Goal: define route discovery, route IDs, sorting, diagnostics, and fixture expectations before `@lumina/compiler` route discovery starts.

Task status: Planned.

Evidence: initial documentation exists in `docs/routing-contract.md`.

Definition of done:

- Static, dynamic, catch-all, route group, page, layout, and API route conventions are documented as planned behavior.
- Route ID and route manifest draft rules are documented without claiming generated output exists.
- Conflict, invalid segment, unsupported convention, missing API method, and case-collision diagnostics are documented.
- README, AGENTS, docs hub, routing, file conventions, compiler IR, manifest contracts, API routes, public reference docs, freshness, maintenance, verification, research, matrix, and build-readiness docs link to the contract.
- Future implementation tasks require route-discovery fixtures and snapshot tests for route order, IDs, params, diagnostics, and normalized paths.

## PR 0O: API Route Contract

Goal: define API route handlers, request and response behavior, schemas, diagnostics, manifests, security rules, and fixture expectations before API route implementation starts.

Task status: Planned.

Evidence: initial documentation exists in `docs/api-route-contract.md` and `docs/public/reference/api-routes.md`.

Definition of done:

- Method exports, handler context, request body rules, params, query, return normalization, route config, caching, and errors are documented as planned behavior.
- Schema exports and hot API integration are linked without claiming implemented validation.
- API diagnostics, manifest fields, security requirements, and fixture requirements are documented.
- README, AGENTS, docs hub, API routes, schema, hot API path, runtime, security, manifests, public reference docs, freshness, maintenance, verification, research, matrix, and build-readiness docs link to the contract.
- Future implementation tasks require manifest snapshots, HTTP behavior tests, validation tests, production error tests, and adapter parity where applicable.

## PR 0P: Schema Contract

Goal: define the schema DSL, parse result shape, issue shape, query coercion, serializer behavior, OpenAPI mapping, diagnostics, manifest references, and fixture expectations before schema and hot API implementation starts.

Task status: Planned.

Evidence: initial documentation exists in `docs/schema-contract.md` and `docs/public/reference/schema.md`.

Definition of done:

- Initial helpers, out-of-scope helpers, input/output type direction, parse results, issues, query coercion, object policy, serialization, and OpenAPI mapping are documented as planned behavior.
- Schema diagnostics, manifest references, and fixture requirements are documented.
- README, AGENTS, docs hub, schema, API route contract, hot API path, manifests, public reference docs, freshness, maintenance, verification, research, matrix, and build-readiness docs link to the contract.
- Future implementation tasks require primitive, object, optional, default, array, enum, uint64, query coercion, request body, response validation, serializer, OpenAPI, and unsupported-feature tests.

## PR 0Q: Cache Contract

Goal: define cache modes, HTTP header mapping, cache tags, revalidation, micro-cache behavior, diagnostics, manifest fields, security rules, and fixture expectations before cache implementation starts.

Task status: Planned.

Evidence: initial documentation exists in `docs/cache-contract.md` and `docs/public/reference/cache.md`.

Definition of done:

- Cache defaults, cache plan shape, public API drafts, HTTP header mapping, tags, revalidation, micro-cache behavior, generated manifest fields, diagnostics, security rules, and fixtures are documented as planned behavior.
- README, AGENTS, docs hub, cache, runtime, speed strategy, API route contract, hot API path, manifests, public reference docs, freshness, maintenance, verification, research, matrix, and build-readiness docs link to the contract.
- Future implementation tasks require static asset, static HTML, prerender, SSR no-store, API no-store, explicit API TTL, hot API micro-cache, tag, unsafe-cache, conflict, and adapter header tests.

## PR 0R: SEO Contract

Goal: define metadata helpers, metadata merge behavior, sitemap output, robots output, structured data behavior, SEO diagnostics, generated reports, security rules, and fixture expectations before SEO implementation starts.

Task status: Planned.

Evidence: initial documentation exists in `docs/seo-contract.md` and `docs/public/reference/seo.md`.

Definition of done:

- Planned `defineMeta()`, `generateMeta()`, metadata shape, merge order, HTML output, sitemap rules, robots rules, structured data rules, SEO diagnostics, generated report fields, security rules, and fixtures are documented as planned behavior.
- README, AGENTS, docs hub, SEO engine, API reference, manifest contracts, public reference docs, freshness, maintenance, verification, research, matrix, and build-readiness docs link to the contract.
- Future implementation tasks require metadata merge, canonical, sitemap, robots, JSON-LD, meaningful HTML, client-only fallback, and SEO report snapshot tests.

## PR 0S: Accessibility Contract

Goal: define WCAG target language, semantic HTML expectations, keyboard and focus behavior, form error requirements, accessibility diagnostics, public docs rules, and test evidence before examples, docs UI, or framework-owned pages are marked verified.

Task status: Planned.

Evidence: initial documentation exists in `docs/accessibility-contract.md` and `docs/public/reference/accessibility.md`.

Definition of done:

- Planned WCAG 2.2 AA target, semantic HTML rules, keyboard rules, focus rules, forms, motion/media/visual design expectations, SEO overlap, diagnostic families, test evidence, public docs requirements, and out-of-scope claims are documented.
- README, AGENTS, docs hub, accessibility overview, public docs, SEO contract, testing contract, public reference docs, freshness, maintenance, verification, research, matrix, and build-readiness docs link to the contract.
- Future implementation tasks require browser smoke checks, keyboard paths, visible focus evidence, route focus behavior, form error checks, and manual review before public conformance language.

## PR 0T: Security Contract

Goal: define high-risk surfaces, threat model requirements, secret handling, production error behavior, security headers, agent/MCP write rules, vulnerability intake, supply-chain release expectations, and security test evidence before high-risk implementation work begins.

Task status: Planned.

Evidence: initial documentation exists in `docs/security-contract.md` and `docs/public/reference/security.md`.

Definition of done:

- Planned security claim language, high-risk surfaces, threat model template, secret handling, production error behavior, security headers, agent/MCP rules, supply-chain release rules, vulnerability intake, test evidence, and out-of-scope claims are documented.
- README, AGENTS, docs hub, security overview, security policy, public security reference, testing contract, freshness, maintenance, verification, research, matrix, and build-readiness docs link to the contract.
- Future implementation tasks require threat notes, secret exclusion tests, production error sanitization, security header evidence, write-risk rejection tests, and release provenance/advisory evidence when publishing exists.

## PR 0U: Performance Contract

Goal: define route budgets, Core Web Vitals target language, `.lumina/perf.report.json`, route chunk and CSS delivery fields, source-map exposure checks, performance diagnostics, benchmark evidence, lab-vs-field language, optional RUM policy, agent/CI behavior, and public speed-claim rules before performance tooling or claims are implemented.

Task status: Planned.

Evidence: initial documentation exists in `docs/performance-contract.md` and `docs/public/reference/performance.md`.

Definition of done:

- Planned performance surfaces, Core Web Vitals targets, budget types, config draft, performance report shape, route chunk and CSS delivery fields, source-map exposure checks, diagnostics, benchmark evidence, lab/field distinction, optional RUM policy, agent/CI behavior, out-of-scope claims, and build-readiness rules are documented.
- README, AGENTS, docs hub, performance overview, speed strategy, benchmark methodology, manifest contracts, public performance reference, testing contract, freshness, maintenance, verification, research, matrix, and build-readiness docs link to the contract.
- Future implementation tasks require report snapshots, budget diagnostics, browser metric evidence, raw benchmark result storage, and public-claim evidence before speed claims are published.

## PR 1: Monorepo Skeleton

Goal: create the Bun workspace and package scaffolds.

Task status: Scaffolded.

Evidence: scaffolded in the repository. Keep this section as the acceptance record for the initial scaffold and update it if package boundaries change.

Read first:

- `docs/phase-1-build-plan.md`
- `docs/package-map.md`
- `docs/risk-mitigation.md`
- `docs/testing-contract.md` before adding package scripts or test fixtures
- `docs/diagnostics-contract.md` before CLI, compiler, runtime, or check diagnostics are added
- `docs/adapter-contract.md` before Bun, Node, static, deployment, or adapter manifest work starts
- `docs/examples-contract.md` before create-command example support, starter templates, fixture examples, or public guide snippets are added
- `docs/routing-contract.md` before route-discovery package work starts
- `docs/seo-contract.md` before `@lumina/seo` package work starts
- `docs/accessibility-contract.md` before framework-owned HTML, examples, docs UI, form errors, route focus behavior, or accessibility diagnostics are added
- `docs/security-contract.md` before high-risk surfaces, secret handling, production errors, security headers, agent/MCP writes, package publishing, or vulnerability-intake behavior are added
- `docs/performance-contract.md` before route budgets, `.lumina/perf.report.json`, performance diagnostics, benchmark evidence, Core Web Vitals language, or public speed claims are added
- `docs/speed-decisions.md` and `docs/speed-capability-audit.md` before rendering defaults, build pipeline, runtime request path, React Compiler, React streaming, resource hints, fetch priority, 103 Early Hints, speculation rules, bfcache, image/font delivery, compression, hot API behavior, cache strategy, compiler scaling, or benchmark positioning changes

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
- Every package has `package.json`.
- Every package has `src/index.ts`.
- Placeholder tests exist.
- Root `package.json`, `bun.lockb`, and `tsconfig.base.json` exist.
- No package claims real route, runtime, graph, MCP, or safe-edit behavior yet.
- README, AGENTS, roadmap, and package map reflect the scaffold.

Out of scope:

- Route discovery.
- Vite integration.
- React rendering.
- Runtime server behavior.
- Generated `.lumina/*` artifacts.

## PR 1A: Core Data Model

Goal: stabilize the shared immutable data model in `@lumina/core`.

MVP Alpha role: provide the route, render, manifest, diagnostic, and graph shapes needed by route discovery, `.lumina/render-manifest.json`, `.lumina/map.json`, and `lumina inspect why`.

The Phase 1 scaffold already exposes placeholder versions of the shared types. This task promotes them into contract-backed shapes before compiler, CLI, runtime adapter, map, agent, MCP, or devtools work depends on them.

Definition of done:

- `LuminaApp` is contract-backed.
- `RouteNode` is contract-backed.
- `GraphEdge` is contract-backed and includes `kind`, `source`, `confidence`, and `why`.
- `LuminaDiagnostic` is contract-backed.
- `RenderMode` is contract-backed.
- `CachePlan` is contract-backed.
- `AdapterManifest` is contract-backed.
- CLI, compiler, map, agent, MCP, adapters, and devtools import these types instead of defining local substitutes.
- Type tests and fixture tests verify the shape.

## PR 1B: Adapter Package Baseline

Goal: create early adapter package boundaries.

Definition of done:

- `@lumina/adapter-bun` package exists.
- `@lumina/adapter-node` package exists.
- `@lumina/adapter-static` package exists.
- Adapter capability type exists in `@lumina/core`.
- User-facing docs explain Bun default plus Node/static compatibility.

## PR 2: Route Discovery

Goal: discover `app/` routes and emit `.lumina/routes.json`.

MVP Alpha role: this is the first visible framework behavior. It should support the demo app routes listed in `docs/mvp-alpha-scope.md` before broader route conventions expand.

Read first:

- `docs/routing-contract.md`
- `docs/file-conventions.md`
- `docs/manifest-contracts.md`

Definition of done:

- Static routes work.
- Dynamic routes work.
- Catch-all routes work.
- Route groups are ignored in URLs.
- API routes are distinguished.
- Manifest order is deterministic.

## PR 3: Vite Dev Integration

Goal: make `lumina dev` start Vite and render a basic React page.

MVP Alpha role: start the demo app path and keep route/render/map artifacts inspectable without pulling API routes, MCP, safe edits, migration, or benchmarks into the first slice.

Definition of done:

- `lumina dev` should start.
- Page should render on the server.
- Client should hydrate.
- Route manifest virtual module should exist.
- HMR should update changed pages.

## PR 4: React SSR and Hydration

Goal: support basic SSR and client hydration.

MVP Alpha role: prove the smallest render path needed for the demo app, with basic SSR and explicit render mode evidence only.

Definition of done:

- Root route SSR should work.
- Client component counter should hydrate.
- Dev errors should be readable.

## PR 5: Layouts and Params

Goal: support nested layouts, route params, and search params.

Definition of done:

- Nested layouts should render in order.
- Dynamic params should pass to pages.
- Search params should pass to pages.
- 404 and error page conventions should work.

## PR 6: Static Build

Goal: support `staticPage()` and emit static HTML.

Definition of done:

- Static routes should emit HTML.
- Render manifest should record mode.
- Invalid render exports should get helpful diagnostics.

## PR 7: Bun Adapter Production Output

Goal: support `lumina start` for built apps.

Read first:

- `docs/runtime-contract.md`
- `docs/cache-contract.md`

Definition of done:

- Static files should be served.
- SSR routes should be served.
- 404 should work.
- 500 should work.
- Cache headers should be tested.
- Bun serving should be implemented through `@lumina/adapter-bun`.

## PR 7A: Adapter-Aware Server Entry

Goal: make generated server output adapter-aware.

Definition of done:

- `lumina.config.ts` should support `runtime` and `adapter`.
- `.lumina/generated/server-entry.ts` should import the selected adapter.
- `dist/adapter.manifest.json` should be emitted.
- Static adapter should export compatible static routes.
- Node adapter should serve a minimal SSR route.

## PR 8: Metadata and SEO Audit

Goal: implement `defineMeta()` and `lumina seo`.

Definition of done:

- Head tags should render.
- Sitemap should be generated.
- Robots should be generated.
- Missing title, description, or canonical should fail public route audits.
- JSON output should be stable.

## PR 8A: Cache Manifest Baseline

Goal: emit cache plans for static, prerendered, SSR, API, and hot API routes in generated manifests.

Read first:

- `docs/cache-contract.md`
- `docs/runtime-contract.md`
- `docs/manifest-contracts.md`
- `docs/speed-strategy.md`
- `docs/security.md`

Definition of done:

- Static asset cache plan should be emitted.
- Static and prerendered route cache plans should be emitted.
- SSR and API routes should default to `no-store`.
- Explicit API TTL cache config should appear in manifests.
- Cache tags should appear in manifests and Lumina Map inputs.
- Cache diagnostics should cover invalid tags, unsafe auth caching, invalid TTL, and header conflicts.
- Bun adapter HTTP tests should verify generated cache headers.

## PR 9: API Routes

Goal: support API route files.

Read first:

- `docs/api-route-contract.md`
- `docs/cache-contract.md`
- `docs/routing-contract.md`
- `docs/schema.md`
- `docs/runtime-contract.md`
- `docs/security.md`

Definition of done:

- Common HTTP methods should be implemented and tested.
- Dynamic API params should be implemented and tested.
- Plain objects should become JSON responses.
- Response objects should pass through.
- Missing or unsupported methods should emit diagnostics.
- Production error responses should hide stack traces.

## PR 10: Hot API Schema Path

Goal: implement minimal `schema` and `apiHot()`.

Read first:

- `docs/schema-contract.md`
- `docs/api-route-contract.md`
- `docs/cache-contract.md`
- `docs/hot-api-path.md`
- `docs/benchmark-methodology.md`

Definition of done:

- Params should validate.
- Response should serialize.
- Invalid input should return structured 400.
- Benchmark fixture should compare normal and hot API.

## PR 11: Lumina Map File Graph

Goal: generate a file-level map.

Risk mitigation:

- This is Layer 0 graph extraction.
- Keep output deterministic.
- Do not make semantic guesses yet.

Definition of done:

- Routes, components, APIs, schemas, styles, tests, and metadata should appear.
- Affected query should work.
- Explain query should work.
- JSON output should be deterministic.

## PR 12: Agent Context

Goal: generate route context capsules.

Definition of done:

- `lumina agent context --route / --json` should work.
- Context should include route, source, mode, SEO, components, checks, and safe edits.
- Production build should exclude agent metadata.

## PR 13: MCP Read-Only Server

Goal: expose read-only framework tools through MCP.

Definition of done:

- `lumina mcp` should start.
- `list_routes` should work.
- `get_route` should work.
- `get_related_files` should work.
- `get_seo_report` should work.

## PR 14: Safe Metadata Edit

Goal: implement one safe edit path.

Risk mitigation:

- Metadata is the first low-risk safe edit.
- The edit must be AST-based.
- The command must support dry-run preview.
- The command must write a mutation log.
- The command must support undo.

Definition of done:

- Route metadata should be updated.
- AST edit should be used.
- Dry-run diff preview should work.
- `SafeEditTransaction` result should be emitted.
- `.lumina/mutations.json` should be append-only.
- Affected checks should run.
- Mutation log should be written.
- `lumina edit undo <mutationId>` should work.

## PR 15: Node Adapter Baseline

Goal: provide early Node compatibility so Bun is a speed default, not an adoption blocker.

Definition of done:

- Built static pages should run on Node.
- SSR routes should run on Node.
- Adapter capabilities should be documented.
- README should document Bun default plus Node compatibility.

## PR 16: Agent Simulator Harness

Goal: create a script that exercises the agent and MCP workflow without an external LLM.

Definition of done:

- Fixture app should include safe and dangerous edit targets.
- Simulator should inspect routes through the same APIs MCP uses.
- Simulator should dry-run a metadata edit.
- Simulator should apply a metadata edit.
- Simulator should run affected checks.
- Simulator should verify mutation log output.
- Rejected edits should be tested.

## PR 17: Migration Prototype

Goal: prototype `lumina migrate from-next`.

Definition of done:

- Simple App Router pages should be converted.
- Compatible layouts should be preserved.
- Static metadata should be converted.
- Dynamic route segments should be mapped.
- `.contract.ts` stubs should be generated for ambiguous semantics.
- Migration report should be emitted with skipped files and manual review items.
