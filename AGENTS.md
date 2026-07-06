# AGENTS.md

This file is the operating guide for AI agents working in this repository.

Agents must read this file before editing code or documentation. When the project changes in a way that affects setup, commands, architecture, package boundaries, roadmap, or safety rules, agents must update this file and README.md in the same change.

## Project Identity

Project name: NeedleStart.

NeedleStart is an agent-native, SEO-first React framework for fast, large-scale web applications. It uses Bun for runtime paths, Vite/Rolldown for frontend build leverage, and a custom Needle compiler for route intelligence, SEO, graph, API generation, and agent context.

## Current Phase

Current phase: Phase 1, monorepo scaffold.

The repository currently contains documentation, a Bun workspace scaffold, package placeholders, shared core types, CI, and enforcement scripts. Do not invent implemented framework behavior in docs unless the implementation exists or the text clearly marks it as planned.

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
- `docs/status.md`
- `docs/roadmap.md`
- `docs/risk-mitigation.md`
- `docs/engineering-standards.md`
- `docs/package-map.md`
- `docs/documentation-standard.md`
- `docs/docs-freshness-policy.md`
- `docs/docs-maintenance-checklist.md`
- `docs/docs-verification.md`
- `docs/first-contribution.md`
- `docs/review-checklist.md`
- `docs/public-frontmatter-standard.md`
- `docs/testing-contract.md`
- `docs/cli-json-contract.md`
- `docs/diagnostics-contract.md`
- `docs/config-contract.md`
- `docs/adapter-contract.md`
- `docs/examples-contract.md`
- `docs/examples-catalog.md`
- `docs/routing-contract.md`
- `docs/api-route-contract.md`
- `docs/schema-contract.md`
- `docs/cache-contract.md`
- `docs/seo-contract.md`
- `docs/accessibility-contract.md`
- `docs/security-contract.md`
- `docs/threat-model.md`
- `docs/performance-contract.md`
- `docs/benchmark-fixtures.md`
- `docs/speed-decisions.md`
- `docs/speed-capability-audit.md`
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
- `docs/skills/README.md`
- `docs/subagents/README.md`

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
bun run structure:check
bun run performance:check
bun run check
```

These commands verify the scaffold, docs links, root docs metadata, docs navigation coverage, package-map/build-plan/backlog alignment, planned CLI command surface and prefix consistency, status-drift guardrails, package structure, shared-core type ownership, shared-core scaffold terminology, performance documentation guardrails, TypeScript surface, and placeholder tests. They do not prove route discovery, rendering, CLI runtime behavior, adapters, Needle Map generation, MCP tools, or safe edits.

## Planned Commands

```bash
needle dev
needle build
needle start
needle routes
needle inspect
needle check
needle seo
needle map
needle agent
needle mcp
needle edit
needle migrate
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
- Shared core model types belong in `@needle/core`; other packages must import them instead of defining local `NeedleApp`, `RouteNode`, `GraphEdge`, `NeedleDiagnostic`, `RenderMode`, `CachePlan`, or `AdapterManifest` substitutes.
- Docs that describe planned expansions of shared core model types must also state the current scaffold shape and add or preserve an automated docs guardrail when drift would mislead readers.
- Do not edit generated files manually.
- Do not add network calls in tests unless explicitly required.
- Do not introduce global mutable state in the server runtime.
- Do not implement a custom bundler before the Vite/Rolldown path is proven.
- Do not make React Server Components the default render path before stable SSR, SSG, streaming, and the route compiler exist.
- Do not let Needle Map be the only source of truth for safety-critical decisions.
- Treat missing semantic contracts as low-confidence graph data instead of guessing.
- Safe edits must be AST-based, previewable, logged, check-backed, and reversible.
- User application code should not require Bun-only APIs; Bun-specific behavior belongs inside runtime packages and adapters.

## Generated Files

Planned generated files include:

```txt
.needle/routes.json
.needle/render-manifest.json
.needle/map.json
.needle/graph.json
.needle/seo.report.json
.needle/perf.report.json
.needle/context/*.ctx.json
.needle/context/agent-index.json
.needle/generated/*
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

Agents must read `docs/risk-mitigation.md` before changing Needle Map, Agent Kernel, MCP, runtime adapters, or safe edit behavior.

Key rules:

- Build semantic graph extraction in layers: file graph, explicit contracts, convention inference, then optional static analysis.
- Prefer explicit `.contract.ts` files for high-confidence semantic edges.
- Every `GraphEdge` must include `kind`, `source`, `confidence`, and `why`.
- Keep the first working slice scoped to create app, SEO-safe pages, Bun server, basic map, agent inspection, and safe metadata edit.
- Treat `docs/prototype-acceptance.md`, README, and the public roadmap as the broader first public prototype acceptance scope.
- Move Node adapter work earlier than the long-term adapter phase to reduce Bun adoption friction.
- Keep adapter boundaries early: Bun-specific APIs stay in `@needle/adapter-bun`, Node compatibility stays in `@needle/adapter-node`, and static export logic stays in `@needle/adapter-static`.
- Safe edit transactions must validate, preview, apply through AST, format, regenerate graph, run affected checks, log, and support undo.
- High-risk safe edits in production workflows require explicit human sign-off.
- New feature work must pass the scope gate: improves map or agent experience, adds minimal production runtime code, and has a clear fixture or agent demo.

Agents must treat high-risk changes as requiring stronger tests and clearer documentation.

## Architecture Principles

1. Static-first, SSR when needed, client-only only when intentional.
2. Agent-native, human-auditable.
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

Do not add cross-package imports casually. Shared types belong in `@needle/core`. Compiler-only code belongs in `@needle/compiler`. Runtime request handling belongs in runtime adapters, starting with `@needle/adapter-bun`. Agent and MCP code must remain dev/build-time unless explicitly designed as a development server feature.

Phase 1 package scaffolding must follow `docs/phase-1-build-plan.md`. Prefer `@needle/adapter-bun`, `@needle/adapter-node`, and `@needle/adapter-static` for runtime adapter packages unless a later architecture decision reintroduces a separate `@needle/server-bun` package.

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
- Use `docs/first-contribution.md` when shaping first-time contributor or good-first-task guidance.
- Use `docs/review-checklist.md` before review-ready changes, especially docs-system, security, performance, public-docs, package-boundary, or implementation work.
- Use `docs/decisions/README.md` and `docs/templates/adr-template.md` when a change needs a durable architecture decision record.
- Use `docs/public-frontmatter-standard.md` when changing public docs metadata, future frontmatter fields, route metadata, or docs-site validation.
- Use `docs/checklists/phase-1-scaffold.md` when adding or reviewing monorepo scaffold work.
- Use `docs/checklists/adapter-implementation.md` when adding or reviewing runtime adapter behavior.
- Use `docs/checklists/performance-evidence.md` when adding or reviewing performance evidence or speed claims.
- Use `docs/testing-contract.md` when changing test commands, fixture layout, snapshot policy, CI gates, HTTP tests, browser tests, security tests, performance tests, or evidence reporting.
- Use `docs/cli-json-contract.md` when changing CLI JSON output, diagnostics, exit codes, or command automation behavior.
- Use `docs/diagnostics-contract.md` when changing diagnostic codes, severity levels, source locations, remediation text, docs links, code frames, JSON diagnostic shape, or cross-surface diagnostic behavior.
- Use `docs/config-contract.md` when changing config fields, config loading, env handling, normalized config, or config-generated output behavior.
- Use `docs/adapter-contract.md` when changing adapter packages, adapter manifests, deployment output, runtime compatibility, static export behavior, health endpoints, adapter environment variables, or adapter capability claims.
- Use `docs/examples-contract.md` when changing example apps, starter templates, create-command example support, fixture evidence, public guide snippets, or example status labels.
- Use `docs/examples-catalog.md` when changing official example inventory, planned example status, example paths, or public guide-to-example mapping.
- Use `docs/routing-contract.md` when changing route discovery, route IDs, file-route grammar, route manifest fields, route sorting, route diagnostics, or route fixtures.
- Use `docs/api-route-contract.md` when changing API route handlers, method exports, request or response behavior, API schemas, API diagnostics, API manifest fields, API cache defaults, or hot API integration.
- Use `docs/schema-contract.md` when changing schema helpers, validation results, issue shapes, query coercion, response serializers, OpenAPI mapping, schema manifests, or schema diagnostics.
- Use `docs/cache-contract.md` when changing cache modes, cache headers, cache tags, revalidation, micro-cache behavior, cache manifests, cache diagnostics, or cache-related security rules.
- Use `docs/seo-contract.md` when changing metadata helpers, metadata merge behavior, sitemap output, robots output, structured data, SEO diagnostics, SEO reports, or public HTML indexability checks.
- Use `docs/accessibility-contract.md` when changing framework-owned HTML, examples, docs UI, form errors, route focus behavior, accessibility diagnostics, or accessibility test evidence.
- Use `docs/security-contract.md` when changing high-risk surfaces, secret handling, production errors, security headers, agent or MCP writes, package publishing, vulnerability intake, or security test evidence.
- Use `docs/threat-model.md` when changing high-risk implementation work, generated artifacts, runtime routing, cache behavior, docs outputs, Agent Kernel, MCP tools, safe edits, or release flow.
- Use `docs/performance-contract.md` when changing route budgets, performance diagnostics, `.needle/perf.report.json`, benchmark evidence, Core Web Vitals language, or public speed claims.
- Use `docs/benchmark-fixtures.md` when changing benchmark fixture scope, fixture names, raw result layout, performance evidence paths, or benchmark claim gates.
- Use `docs/speed-decisions.md` when changing rendering defaults, build pipeline choices, runtime request path, route code splitting, CSS delivery, production source maps, React Compiler, React streaming or hydration behavior, browser delivery hints, 103 Early Hints, optional RUM or field-data policy, API hot paths, caching strategy, compiler scaling, agent context size, or benchmark positioning.
- Use `docs/speed-capability-audit.md` when reviewing whether all major speed surfaces have a documented decision, proof gate, and remaining implementation evidence.
- Use `docs/public-docs-site-architecture.md` when changing public docs navigation, page metadata, future frontmatter, route mapping, or docs-site behavior.
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
7. For AI collaboration or delegation changes, read `docs/skills/README.md` and `docs/subagents/README.md`.
8. For Phase 1 scaffolding or package-boundary work, read `docs/phase-1-build-plan.md`.

While editing:

1. Keep changes scoped.
2. Update docs touched by the change.
3. Prefer adding task files from `docs/templates/task-template.md` for implementation work.
4. Keep docs-level skills and subagent role briefs vendor-neutral and aligned with the documented safety rules.
5. Keep planned, scaffolded, implemented, and verified behavior separate.
6. When a doc names a directory or example as current, confirm it exists or make the text explicitly planned.

Before finishing:

1. Run available checks.
2. If checks cannot run, state the exact command and reason.
3. Verify `README.md` and `AGENTS.md` still describe the repository honestly.
4. Apply `docs/docs-freshness-policy.md`, `docs/docs-maintenance-checklist.md`, and `docs/docs-verification.md`.
5. Summarize changed files and remaining next steps.
