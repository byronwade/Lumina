# AGENTS.md

This file is the operating guide for AI agents working in this repository.

Agents must read this file before editing code or documentation. When the project changes in a way that affects setup, commands, architecture, package boundaries, roadmap, or safety rules, agents must update this file and README.md in the same change.

## Project Identity

Project name: Lumina.

Lumina is an app-graph-native, SEO-first React framework for humans and AI agents. It uses Bun for package management, local workflow, testing, and the default adapter path; Vite/Rolldown for frontend build leverage; and a custom Lumina compiler for route intelligence, SEO, graph, API generation, and agent context.

## Current Phase

Current phase: Phase 1, monorepo scaffold.

The repository currently contains documentation, a Bun workspace scaffold, package placeholders, contract-backed shared core model types, initial `@lumina/compiler` route discovery and route manifest shaping, scaffolded `apps/www` and example fixtures, CI, and enforcement scripts. Do not invent implemented framework behavior in docs unless the implementation exists or the text clearly marks it as planned.

The next prototype target is defined in `docs/mvp-alpha-scope.md`. Agents must keep MVP Alpha scope language aligned with README.md, this file, status, roadmap, getting started, examples, file conventions, and Lumina Map docs.

## Required Documentation Sync

Every agent change must evaluate whether these files need updates:

- `README.md`
- `AGENTS.md`
- `CONTRIBUTING.md`
- `GOVERNANCE.md`
- `SECURITY.md`
- `CODE_OF_CONDUCT.md`
- `VISION.md`
- `ARCHITECTURE.md`
- `docs/README.md`
- `docs/status.md`
- `docs/mvp-alpha-scope.md`
- `docs/alpha-agent-operating-system.md`
- `docs/alpha-work-routing.md`
- `docs/alpha-implementation-sequence.md`
- `docs/alpha-drift-prevention.md`
- `docs/roadmap.md`
- `docs/risk-mitigation.md`
- `docs/engineering-standards.md`
- `docs/package-map.md`
- `docs/documentation-standard.md`
- `docs/docs-freshness-policy.md`
- `docs/docs-maintenance-checklist.md`
- `docs/docs-verification.md`
- `docs/agent-enforcement.md`
- `docs/first-contribution.md`
- `docs/review-checklist.md`
- `docs/public-frontmatter-standard.md`
- `docs/getting-started.md`
- `docs/guides.md`
- `docs/api-reference.md`
- `docs/manifest-contracts.md`
- `docs/file-conventions.md`
- `docs/cli.md`
- `docs/testing-contract.md`
- `docs/testing.md`
- `docs/cli-json-contract.md`
- `docs/diagnostics-contract.md`
- `docs/config-contract.md`
- `docs/config.md`
- `docs/adapter-contract.md`
- `docs/adapters.md`
- `docs/examples-contract.md`
- `docs/examples-catalog.md`
- `docs/examples.md`
- `docs/routing-contract.md`
- `docs/routing.md`
- `docs/api-route-contract.md`
- `docs/api-routes.md`
- `docs/schema-contract.md`
- `docs/schema.md`
- `docs/cache-contract.md`
- `docs/cache.md`
- `docs/seo-contract.md`
- `docs/seo-engine.md`
- `docs/accessibility-contract.md`
- `docs/accessibility.md`
- `docs/security-contract.md`
- `docs/security.md`
- `docs/threat-model.md`
- `docs/performance-contract.md`
- `docs/performance.md`
- `docs/benchmark-fixtures.md`
- `docs/benchmark-methodology.md`
- `docs/benchmarks.md`
- `docs/implementation-speed-rules.md`
- `docs/runtime-contract.md`
- `docs/compiler-ir.md`
- `docs/agent-kernel.md`
- `docs/mcp-server.md`
- `docs/safe-edit-transactions.md`
- `docs/lumina-map.md`
- `docs/hot-api-path.md`
- `docs/migration.md`
- `docs/deployment.md`
- `docs/compatibility.md`
- `docs/prototype-acceptance.md`
- `docs/app-graph-visual.md`
- `docs/product-strategy.md`
- `docs/open-source-community.md`
- `docs/operating-cadence.md`
- `docs/maintainer-guide.md`
- `docs/public-docs.md`
- `docs/public/README.md`
- `docs/public/docs.md`
- `docs/public/index.md`
- `docs/public/roadmap.md`
- `docs/website-content-map.md`
- `docs/machine-readable-docs.md`
- `docs/release.md`
- `docs/speed-decisions.md`
- `docs/speed-capability-audit.md`
- `docs/speed-strategy.md`
- `docs/large-repo-build-architecture.md`
- `docs/public-docs-site-architecture.md`
- `docs/docs-site-build-plan.md`
- `docs/phase-1-build-plan.md`
- `docs/product-build-readiness.md`
- `docs/versioning-and-upgrades.md`
- `docs/decisions/README.md`
- `docs/checklists/README.md`
- `docs/checklists/phase-1-scaffold.md`
- `docs/checklists/adapter-implementation.md`
- `docs/checklists/performance-evidence.md`
- `docs/glossary.md`
- `docs/task-backlog.md`
- `docs/proposed-codex-agents.md`
- `docs/proposed-cursor-skills.md`
- `docs/skills/README.md`
- `docs/skills/alpha-scope-gate.md`
- `docs/skills/agent-kernel-designer.md`
- `docs/skills/cli-json-builder.md`
- `docs/skills/core-model-hardening.md`
- `docs/skills/demo-app-builder.md`
- `docs/skills/deterministic-json-review.md`
- `docs/skills/docs-maintainer.md`
- `docs/skills/docs-status-sync.md`
- `docs/skills/fixture-snapshot-testing.md`
- `docs/skills/lumina-map-designer.md`
- `docs/skills/lumina-map-v1-builder.md`
- `docs/skills/performance-claim-gate.md`
- `docs/skills/project-maintainer.md`
- `docs/skills/release-readiness-alpha.md`
- `docs/skills/render-manifest-builder.md`
- `docs/skills/route-discovery-builder.md`
- `docs/skills/seo-runtime-guardian.md`
- `docs/skills/security-threat-note.md`
- `docs/skills/strategic-app-builder.md`
- `docs/subagents/README.md`
- `docs/subagents/agent-safety.md`
- `docs/subagents/alpha-orchestrator.md`
- `docs/subagents/architect.md`
- `docs/subagents/cli-json-contract-keeper.md`
- `docs/subagents/compiler-map.md`
- `docs/subagents/core-model-guardian.md`
- `docs/subagents/demo-fixture-reviewer.md`
- `docs/subagents/docs-keeper.md`
- `docs/subagents/map-contract-guardian.md`
- `docs/subagents/performance-claim-reviewer.md`
- `docs/subagents/release-readiness-reviewer.md`
- `docs/subagents/render-manifest-guardian.md`
- `docs/subagents/route-discovery-guardian.md`
- `docs/subagents/runtime-seo.md`
- `docs/subagents/security-threat-reviewer.md`
- `docs/subagents/verification.md`

Update `README.md` when:

- Setup commands change.
- Package structure changes.
- The prototype status changes.
- Public positioning changes.
- A user-facing feature becomes real.
- A planned feature is removed, renamed, or significantly rescoped.

Update `AGENTS.md` when:

- Build, test, lint, typecheck, or dev commands change.
- Safety rules change.
- Generated-file rules change.
- Package ownership or edit boundaries change.
- Agent workflow changes.
- New high-risk areas are introduced.
- Tool-specific AI wrappers are added, moved, or removed.

Update both `README.md` and `AGENTS.md` when:

- The monorepo structure changes.
- A new package is added.
- A new command is added.
- A new generated artifact is introduced.
- A phase is completed or redefined.

## Setup

Implemented repository commands:

```bash
bun install
bun test
bun run typecheck
bun run docs:check
bun run lumina -- routes <appPath> --json
bun run lumina -- inspect <appPath> --json
bun run lumina -- inspect <appPath> why <route>
bun run lumina -- dev <appPath>
bun run lumina -- dev <appPath> --once
bun run lumina -- build <appPath>
bun run lumina -- build <appPath> --json
bun run lumina -- start <appPath>
bun run lumina -- start <appPath> --once
bun run structure:check
bun run performance:check
bun run check
```

These commands verify the scaffold, docs links, root docs metadata, docs navigation coverage, package-map/build-plan/backlog alignment, planned CLI command surface and prefix consistency, status-drift guardrails, config/adapter contract terms, generated artifact inventories across agent and machine-readable docs, package structure, shared-core type ownership, shared-core contract terminology, performance documentation guardrails, TypeScript surface, route-discovery fixture behavior, explicit `staticPage()` / `ssr()` render-mode extraction, generated `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `.lumina/hmr-report.json`, `.lumina/build-trace.json`, `.lumina/perf.report.json`, `dist/routes.manifest.json`, `dist/render.manifest.json`, and `dist/adapter.manifest.json` output, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, minimal `lumina dev` Vite SSR route serving, `virtual:lumina/routes`, static `lumina build`, static `lumina start` through `@lumina/adapter-bun`, scaffolded `apps/www` and example fixture route evidence, early benchmark/status skeleton paths, and tests. They do not prove measured benchmark results, SSR/API production behavior, client hydration, component-level HMR, MCP tools, or safe edits.

## Planned Commands

```bash
lumina dev
lumina build
lumina start
lumina routes
lumina inspect
lumina check
lumina test
lumina seo
lumina map
lumina workspace
lumina agent
lumina mcp
lumina edit
lumina migrate
lumina bench
```

## Repository Rules

- Prefer deterministic compiler output.
- Follow `docs/engineering-standards.md` for definitions of ready, done, review quality, ownership, and evidence.
- Prefer AST edits over string replacement for TypeScript source.
- Add or update tests for every implemented feature.
- Keep production runtime free of agent metadata.
- Keep CLI JSON output stable, compact, and documented.
- Public SEO behavior must be tested when implemented.
- New graph edges must include `kind`, `source`, `confidence`, and `why`.
- Claims about scaffolded directories, examples, commands, generated files, and performance evidence must match the current filesystem and checks; otherwise mark them as planned.
- MVP Alpha docs and implementation must keep route discovery, basic render modes, Lumina Map output, CLI inspection, and the demo app as the center. Do not pull MCP, safe edits, API routes, migration, or benchmark claims into MVP Alpha unless the scope doc is updated in the same change.
- Shared core model types belong in `@lumina/core`; other packages must import them instead of defining local `LuminaApp`, `RouteNode`, `GraphEdge`, `LuminaDiagnostic`, `RenderMode`, `CachePlan`, or `AdapterManifest` substitutes.
- Docs that describe planned expansions of shared core model types must also state the current contract-backed shape and add or preserve an automated docs guardrail when drift would mislead readers.
- Do not edit generated files manually.
- Do not add network calls in tests unless explicitly required.
- Do not introduce global mutable state in the server runtime.
- Do not implement a custom bundler before the Vite/Rolldown path is proven.
- Do not make React Server Components the default render path before stable SSR, SSG, streaming, and the route compiler exist.
- Do not let Lumina Map be the only source of truth for safety-critical decisions.
- Treat missing semantic contracts as low-confidence graph data instead of guessing.
- Safe edits must be AST-based, previewable, logged, check-backed, and reversible.
- User application code should not require Bun-only APIs; Bun-specific behavior belongs inside runtime adapter packages.

## Generated Files

Planned generated files include:

```txt
.lumina/routes.json
.lumina/render-manifest.json
.lumina/map.json
.lumina/graph.json
.lumina/seo.report.json
.lumina/perf.report.json
.lumina/workspace.json
.lumina/workspace-graph.json
.lumina/affected.json
.lumina/build-trace.json
.lumina/cache-report.json
.lumina/hmr-report.json
.lumina/split-report.json
.lumina/context/*.ctx.json
.lumina/context/agent-index.json
.lumina/mutations.json
.lumina/generated/*
dist/routes.manifest.json
dist/render.manifest.json
dist/seo.report.json
dist/adapter.manifest.json
dist/*
```

Rules:

- Generated files must identify their source inputs when practical.
- Generated files must be reproducible across operating systems.
- Generated files must not require manual edits.
- Agent metadata must not be shipped in production runtime bundles.

## Safety

High-risk areas:

- Auth and sessions.
- Billing or payment integrations.
- Cache invalidation.
- Deployment adapters.
- File-system write tools.
- Safe edit APIs.
- MCP write tools.
- Environment variable handling.
- Runtime request routing.

## Risk Mitigation Rules

Agents must read `docs/risk-mitigation.md` before changing Lumina Map, Agent Kernel, MCP, runtime adapters, or safe edit behavior.

Key rules:

- Build semantic graph extraction in layers: file graph, explicit contracts, convention inference, then optional static analysis.
- Prefer explicit `.contract.ts` files for high-confidence semantic edges.
- Every `GraphEdge` must include `kind`, `source`, `confidence`, and `why`.
- Keep the first working slice scoped to create app, SEO-safe pages, `@lumina/adapter-bun` serving, basic map, agent inspection, and safe metadata edit.
- Treat `docs/prototype-acceptance.md`, README, and the public roadmap as the broader first public prototype acceptance scope.
- Move Node adapter work earlier than the long-term adapter phase to reduce Bun adoption friction.
- Keep adapter boundaries early: Bun-specific APIs stay in `@lumina/adapter-bun`, Node compatibility stays in `@lumina/adapter-node`, and static export logic stays in `@lumina/adapter-static`.
- Safe edit transactions must validate, produce a dry-run preview, apply through AST, format, regenerate graph, run affected checks, log to `.lumina/mutations.json`, and support undo.
- High-risk safe edits in production workflows require explicit human sign-off.
- New feature work must pass the scope gate: improves map or agent experience, adds minimal production runtime code, and has a clear fixture or agent demo.

Agents must treat high-risk changes as requiring stronger tests and clearer documentation.

## Architecture Principles

1. Static-first, SSR when needed, client-only only when intentional.
2. Agent-safe, human-auditable.
3. Compiler intelligence over runtime magic.
4. Typed route graph is the app contract.
5. SEO must pass by default for public pages.
6. Hot APIs bypass React.
7. Every generated artifact has a source and explanation.
8. Large apps are not an afterthought.
9. Production bundles do not ship agent metadata.
10. No invisible caching.

## Learning and Collaboration

This project was initially explored with AI assistance for architecture and roadmap clarity. Human maintainers remain accountable for implementation, review, and release decisions. Agents may contribute work only through the same documented contracts, tests, and safety rules as human contributors.

Contributors, human or agent, are expected to:

- Ask clarifying questions when uncertain.
- Document tradeoffs and rejected approaches.
- Update this file and relevant docs when patterns change.
- Keep planned behavior separate from implemented behavior.
- Prefer learning-in-public notes that improve the next contributor's context.

## Package Boundaries

Planned package responsibilities are documented in `docs/package-map.md`.

Do not add cross-package imports casually. Shared types belong in `@lumina/core`. Compiler-only code belongs in `@lumina/compiler`. Runtime request handling belongs in runtime adapters, starting with `@lumina/adapter-bun`. Agent and MCP code must remain dev/build-time unless explicitly designed as a development server feature.

Phase 1 package scaffolding must follow `docs/phase-1-build-plan.md`. The active runtime adapter package names are `@lumina/adapter-bun`, `@lumina/adapter-node`, and `@lumina/adapter-static`. Reintroduce any separate `@lumina/server-bun` package only through an architecture decision record.

## Testing Expectations

For implemented features, use the smallest complete test set that proves behavior:

- Unit tests for pure parsing, manifest, schema, and graph logic.
- Integration tests for CLI behavior and fixture apps.
- HTTP tests for server runtime behavior.
- Snapshot or stable JSON tests for agent-facing output.
- Fixture tests for route discovery, SEO, API routes, and map generation.

Test output used by agents must be deterministic.

## Documentation Style

- Follow `docs/documentation-standard.md` when creating or reorganizing docs.
- Follow `docs/docs-freshness-policy.md` before finishing any change that can make docs stale.
- Use `docs/docs-maintenance-checklist.md` before finishing documentation, command, package, status, governance, release, security, benchmark, or public-docs changes.
- Use `docs/docs-verification.md` for repeatable documentation checks and report which checks passed.
- Use `docs/agent-enforcement.md` to map agent rules to the automated docs, structure, performance, typecheck, and test gates before finishing non-trivial work.
- Use `docs/first-contribution.md` when shaping first-time contributor or good-first-task guidance.
- Use `docs/review-checklist.md` before review-ready changes, especially docs-system, security, performance, public-docs, package-boundary, or implementation work.
- Use `docs/decisions/README.md` and `docs/templates/adr-template.md` when a change needs a durable architecture decision record.
- Use `docs/public-frontmatter-standard.md` when changing public docs metadata, future frontmatter fields, route metadata, or docs-site validation.
- Use `docs/checklists/phase-1-scaffold.md` when adding or reviewing monorepo scaffold work.
- Use `docs/checklists/adapter-implementation.md` when adding or reviewing runtime adapter behavior.
- Use `docs/checklists/performance-evidence.md` when adding or reviewing performance evidence or speed claims.
- Use `docs/testing-contract.md` when changing test commands, fixture layout, snapshot policy, CI gates, HTTP tests, browser tests, security tests, performance tests, or evidence reporting.
- Use `docs/cli-json-contract.md` when changing CLI JSON output, diagnostics, exit codes, or command automation behavior.
- Use `docs/diagnostics-contract.md` when changing diagnostic codes, severity values, source locations, remediation text, docs links, code frames, JSON diagnostic shape, or cross-surface diagnostic behavior.
- Use `docs/config-contract.md` when changing config fields, config loading, env handling, normalized config, or config-generated output behavior.
- Use `docs/adapter-contract.md` when changing adapter packages, adapter manifests, deployment output, runtime compatibility, static export behavior, health endpoints, adapter environment variables, or adapter capability claims.
- Use `docs/examples-contract.md` when changing example apps, starter templates, create-command example support, fixture evidence, public guide snippets, or example status labels.
- Use `docs/examples-catalog.md` when changing official example inventory, planned example status, example paths, or public guide-to-example mapping.
- Use `docs/routing-contract.md` when changing route discovery, route IDs, file-route grammar, route manifest fields, route sorting, route diagnostics, or route fixtures.
- Use `docs/api-route-contract.md` when changing API route handlers, method exports, request or response behavior, API schemas, API diagnostics, API manifest fields, API cache defaults, or hot API integration.
- Use `docs/schema-contract.md` when changing schema helpers, validation results, issue shapes, query coercion, response serializers, OpenAPI mapping, schema manifests, or schema diagnostics.
- Use `docs/cache-contract.md` when changing cache modes, cache headers, cache tags, revalidation, micro-cache behavior, cache metadata in manifests, cache diagnostics, or cache-related security rules.
- Use `docs/seo-contract.md` when changing metadata helpers, metadata merge behavior, sitemap output, robots output, structured data, SEO diagnostics, SEO reports, or public HTML indexability checks.
- Use `docs/accessibility-contract.md` when changing framework-owned HTML, examples, docs UI, form errors, route focus behavior, accessibility diagnostics, or accessibility test evidence.
- Use `docs/security-contract.md` when changing high-risk surfaces, secret handling, production errors, security headers, agent or MCP writes, package publishing, vulnerability intake, or security test evidence.
- Use `docs/threat-model.md` when changing high-risk implementation work, generated artifacts, runtime routing, cache behavior, docs outputs, Agent Kernel, MCP tools, safe edits, or release flow.
- Use `docs/performance-contract.md` when changing route budgets, performance diagnostics, `.lumina/perf.report.json`, benchmark evidence, Core Web Vitals language, or public speed claims.
- Use `docs/benchmark-fixtures.md` when changing benchmark fixture scope, fixture names, raw result layout, performance evidence paths, or benchmark claim gates.
- Use `docs/speed-decisions.md` when changing rendering defaults, build pipeline choices, runtime request path, route code splitting, CSS delivery, production source maps, React Compiler, React streaming or hydration behavior, browser delivery hints, 103 Early Hints, optional RUM or field-data policy, API hot paths, caching strategy, compiler scaling, agent context size, or benchmark positioning.
- Use `docs/implementation-speed-rules.md` before implementing route discovery, generated manifests, runtime adapters, hot API paths, graph queries, agent context output, or benchmark skeletons.
- Use `docs/speed-capability-audit.md` when reviewing whether all major speed surfaces have a documented decision, proof gate, and remaining implementation evidence.
- Use `docs/large-repo-build-architecture.md` when changing workspace graph, shared-file identity, multi-app workspaces, split-app planning, affected builds, terminal output, HMR summaries, or large-repo observability reports.
- Use `docs/public-docs-site-architecture.md` when changing public docs navigation, page metadata, future frontmatter, route mapping, source mapping, or docs-site behavior.
- Use `docs/docs-site-build-plan.md` when changing future public docs implementation phases, renderer selection gates, search, navigation, accessibility, or machine-readable docs outputs.
- Use `docs/versioning-and-upgrades.md` when changing public APIs, command contracts, config, manifest schemas, generated files, compatibility claims, or release behavior.
- Use direct, durable language.
- Mark planned features as planned.
- Mark implemented features as implemented only after verification.
- Include public API examples for stable or proposed APIs.
- Include "out of scope" notes for phases to prevent scope creep.
- Avoid undocumented magic.

## Agent Workflow

Before editing:

1. Read `README.md`.
2. Read this `AGENTS.md`.
3. Read the relevant docs under `docs/`.
4. Check whether the task is documentation-only, scaffolding, implementation, or verification.
5. Read `docs/engineering-standards.md` for non-trivial implementation, architecture, or process work.
6. Read `docs/review-checklist.md` before preparing non-trivial work for review.
7. Read `docs/agent-enforcement.md` for non-trivial docs, structure, performance, package-boundary, status, or verification work.
8. For AI collaboration or delegation changes, read `docs/skills/README.md` and `docs/subagents/README.md`.
9. For MVP Alpha agent workflow, read `docs/alpha-agent-operating-system.md`, `docs/alpha-work-routing.md`, and `docs/alpha-drift-prevention.md`.
10. For Phase 1 scaffolding or package-boundary work, read `docs/phase-1-build-plan.md`.

While editing:

1. Keep changes scoped.
2. Update docs touched by the change.
3. Prefer adding task files from `docs/templates/task-template.md` for implementation work.
4. Keep docs-level skills and subagent role briefs vendor-neutral and aligned with the documented safety rules.
5. Keep Claude, Codex, Cursor, and future tool-specific wrappers thin; source behavior belongs in `docs/skills/`, `docs/subagents/`, and the Alpha operating docs.
6. Keep planned, scaffolded, implemented, and verified behavior separate.
7. When a doc names a directory or example as current, confirm it exists or make the text explicitly planned.

Before finishing:

1. Run available checks.
2. If checks cannot run, state the exact command and reason.
3. Verify `README.md` and `AGENTS.md` still describe the repository honestly.
4. Apply `docs/docs-freshness-policy.md`, `docs/docs-maintenance-checklist.md`, and `docs/docs-verification.md`.
5. Summarize changed files and remaining next steps.
