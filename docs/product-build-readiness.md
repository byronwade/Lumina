# Product Build Readiness

Status: Planned.

Audience: maintainers, framework contributors, AI agents.

This page defines the documentation and evidence gates that must remain true as NeedleStart moves from scaffold into full product build work. It is not an implementation plan by itself; it is the readiness checklist that keeps implementation work tied to clear contracts, user-facing docs, speed expectations, and verification.

## Why This Exists

Mature framework docs give builders a fast path, a precise reference surface, and clear project structure before they scale the product surface. NeedleStart needs the same discipline as package work moves from scaffold into real framework behavior:

- Getting started docs must distinguish target commands from verified commands.
- Project structure must be explicit enough for generated apps, examples, and agents to follow.
- CLI, config, file conventions, generated manifests, and adapter contracts must have reference homes before implementation fills them.
- Machine-readable docs must be treated as a product surface, not a cleanup task after launch.

Research backing lives in [Documentation Research Notes](documentation-research.md). The active implementation sequence lives in [Phase 1 Build Plan](phase-1-build-plan.md) and [Task Backlog](task-backlog.md).

## Readiness Lanes

| Lane | Source of truth | Build-ready when |
| --- | --- | --- |
| Product status | [Project Status](status.md), [README](../README.md) | Current phase, implemented behavior, and planned behavior are easy to distinguish. |
| User onboarding | [Getting Started](getting-started.md), [Public Create App Guide](public/guides/create-app.md), [Examples And Templates Contract](examples-contract.md) | The planned flow is documented now, and can be replaced with verified commands and a verified starter example after app creation exists. |
| Project structure | [File Conventions](file-conventions.md), [Routing Contract](routing-contract.md), [Public Project Structure](public/reference/project-structure.md), [Package Map](package-map.md) | App structure, route grammar, package structure, generated files, and root-only files are documented. |
| Reference docs | [API Reference](api-reference.md), [CLI](cli.md), [CLI JSON Contract](cli-json-contract.md), [Diagnostics Contract](diagnostics-contract.md), [Config](config.md), [Configuration Contract](config-contract.md), [Adapter Contract](adapter-contract.md), [API Route Contract](api-route-contract.md), [Schema Contract](schema-contract.md), [Cache Contract](cache-contract.md), [SEO Contract](seo-contract.md), [Accessibility Contract](accessibility-contract.md), [Manifest Contracts](manifest-contracts.md) | Every planned public command, helper, config field, config loading rule, diagnostic rule, adapter rule, API handler rule, schema rule, cache rule, SEO rule, accessibility rule, JSON envelope, exit code, and generated artifact has a reference home. |
| Versioning | [Versioning And Upgrades](versioning-and-upgrades.md), [Release Process](release.md), [Compatibility](compatibility.md) | Public APIs, manifests, docs outputs, deprecations, compatibility claims, and upgrade guides have rules before release work. |
| Speed | [Speed Strategy](speed-strategy.md), [Speed Decisions](speed-decisions.md), [Speed Capability Audit](speed-capability-audit.md), [Performance](performance.md), [Performance Contract](performance-contract.md), [Benchmark Methodology](benchmark-methodology.md) | Each implementation phase names the speed-sensitive surfaces it touches, the fast-path decision it follows, the browser-delivery surfaces it affects, the route/report contracts it changes, and the evidence required before public claims. |
| Agent readiness | [AGENTS](../AGENTS.md), [Machine-Readable Documentation](machine-readable-docs.md), [Agent Kernel](agent-kernel.md), [MCP Server](mcp-server.md), [Safe Edit Transactions](safe-edit-transactions.md) | Agents can find stable contracts and know what is planned, implemented, generated, and forbidden. |
| Public docs | [Public Docs Readiness](public-docs.md), [Public Docs Site Architecture](public-docs-site-architecture.md), [Website Content Map](website-content-map.md), [Public Website Content](public/README.md) | Public pages have status, audience, source links, route metadata, and no unsupported implementation claims. |
| Security and governance | [Security](security.md), [Security Contract](security-contract.md), [Security Policy](../SECURITY.md), [Governance](../GOVERNANCE.md), [Maintainer Guide](maintainer-guide.md) | High-risk areas, threat model rules, review ownership, evidence, and disclosure expectations are documented before implementation touches them. |
| Verification | [Testing](testing.md), [Testing Contract](testing-contract.md), [Docs Maintenance Checklist](docs-maintenance-checklist.md), [Documentation Verification](docs-verification.md) | Available checks, fixture expectations, snapshot rules, missing checks, and docs drift are part of review. |

## Minimum Build-Ready State For Phase 1

Before expanding beyond the monorepo scaffold, the repository should have:

- A clear Phase 1 package list and package boundaries.
- A target app structure and target monorepo structure.
- Planned command names and a warning that they are not verified yet.
- A planned CLI JSON envelope, diagnostic shape, and exit-code policy.
- A shared planned diagnostic contract for codes, severity values, categories, locations, remediations, docs links, child diagnostics, and safe JSON output.
- A planned configuration loading, validation, environment-variable, and normalized-output contract.
- A stable generated-file list for `.needle/*` and `dist/*`.
- A first-pass docs hub and public docs navigation.
- A planned example and starter-template contract with evidence rules.
- A planned accessibility contract for examples, public docs, generated pages, diagnostics, and tests.
- A public docs site content model for metadata, routes, navigation, source links, and machine-readable outputs.
- A versioning and upgrade policy for packages, manifests, docs outputs, public APIs, compatibility, and deprecations.
- Agent workflow rules for future package, command, generated-file, and safety changes.
- A planned security contract for high-risk surfaces, secrets, production errors, headers, agent writes, advisories, and supply-chain release work.
- A planned performance contract for route budgets, Core Web Vitals targets, reports, diagnostics, benchmark evidence, and public speed claims.
- A planned speed decision record for Vite/Rolldown, Bun, route code splitting, CSS delivery, production source maps, React Compiler, React streaming, resource hints, fetch priority, speculation rules, bfcache, image/font delivery, compression, optional RUM, explicit caching, hot APIs, payload budgets, compiler scaling, and rejected defaults.
- A planned speed capability audit that maps every major speed surface to its decision, source docs, proof gate, and implementation follow-up.
- A docs freshness process that requires README, AGENTS, roadmap, package map, status, and reference docs to stay current.
- A benchmark policy that prevents unsupported speed claims.
- A testing contract for fixtures, snapshots, HTTP checks, browser checks, security checks, CI gates, and evidence reporting.
- A repeatable documentation verification runbook with exact checks and evidence expectations.

This state is mostly present. The current follow-up is keeping the readiness checklist aligned with implementation issues, PR descriptions, and the Phase 1 scaffold.

## Product Build Gates

Use these gates as the first screen for build work.

### Gate 1: Package Scaffold

Build work may rely on the Bun workspace only when:

- [Phase 1 Build Plan](phase-1-build-plan.md) and [Package Map](package-map.md) agree on package names.
- README and AGENTS distinguish verified scaffold commands from planned feature commands.
- Package README expectations are known.
- `bun install`, `bun test`, `bun run typecheck`, and `bun run check` are implemented for the scaffold and passing locally before feature work builds on them.

### Gate 2: Route Discovery

Route discovery work may begin only when:

- [Routing](routing.md), [Routing Contract](routing-contract.md), [File Conventions](file-conventions.md), [Compiler IR](compiler-ir.md), [Manifest Contracts](manifest-contracts.md), and [Public Routing Reference](public/reference/routing.md) agree on route shapes.
- Fixture expectations are documented.
- Deterministic path sorting and cross-platform path normalization are required.
- Diagnostics for route conflicts are part of the task.

### Gate 2A: Starter Example

Onboarding examples may be linked from public docs only when:

- [Examples](examples.md), [Examples And Templates Contract](examples-contract.md), [Getting Started](getting-started.md), and [Public Examples Reference](public/reference/examples.md) agree on status labels and commands.
- The default starter has a README, expected routes, expected artifacts, and tests.
- Create-command docs do not claim examples work until the command and example are verified.
- Public guide snippets are marked planned until backed by current repository evidence.

### Gate 3: Runtime And Adapters

Runtime work may begin only when:

- [Runtime Contract](runtime-contract.md), [Adapter Architecture](adapters.md), [Deployment](deployment.md), and [Compatibility](compatibility.md) agree on adapter responsibilities.
- [Adapter Contract](adapter-contract.md) defines adapter inputs, outputs, manifests, capabilities, static export behavior, health endpoint behavior, environment variables, diagnostics, and fixtures.
- Bun-only APIs are contained in `@needle/adapter-bun`.
- Node and static compatibility are not presented as verified until tested.
- Runtime code does not depend on agent-only packages.

### Gate 4: SEO And Public HTML

SEO work may begin only when:

- [SEO Engine](seo-engine.md), [SEO Contract](seo-contract.md), [Public SEO Concept](public/concepts/seo-first.md), [Public SEO Reference](public/reference/seo.md), and [API Reference](api-reference.md) agree on metadata names.
- Public route checks include title, description, canonical URL, and meaningful HTML.
- Planned sitemap, robots, and structured data outputs have manifest or file expectations.
- Metadata merge rules, sitemap inclusion rules, robots limitations, JSON-LD escaping, SEO diagnostics, and SEO report fields are documented.
- Accessibility impact is checked through [Accessibility](accessibility.md) and [Accessibility Contract](accessibility-contract.md).

### Gate 4A: Accessibility

Framework-owned public HTML, examples, and docs UI may be marked verified only when:

- [Accessibility](accessibility.md), [Accessibility Contract](accessibility-contract.md), [Testing Contract](testing-contract.md), [SEO Contract](seo-contract.md), and [Public Accessibility Reference](public/reference/accessibility.md) agree on the target behavior.
- WCAG language is framed as a target until evidence supports a narrower conformance claim.
- Keyboard, focus, semantic HTML, form error, and public docs requirements are covered by checks or manual review notes.
- Accessibility diagnostics use the shared diagnostic shape.

### Gate 5: Agent Kernel, MCP, And Safe Edits

Agent work may begin only when:

- [Risk Mitigation](risk-mitigation.md) has been read.
- [Agent Kernel](agent-kernel.md), [MCP Server](mcp-server.md), [Safe Edit Transactions](safe-edit-transactions.md), [Machine-Readable Documentation](machine-readable-docs.md), and [Security Contract](security-contract.md) agree on stable JSON outputs and write-risk rules.
- Write paths are previewable, logged, reversible, and check-backed.
- Production bundles exclude agent metadata.
- Human sign-off is required for high-risk edits.

### Gate 5A: Security-Sensitive Work

High-risk implementation work may begin only when:

- [Security](security.md), [Security Contract](security-contract.md), [Security Policy](../SECURITY.md), [Testing Contract](testing-contract.md), and the affected feature contract agree on threat model and evidence requirements.
- Secrets, production errors, diagnostics, logs, generated artifacts, and public docs outputs have explicit exclusion or redaction rules.
- Security claims remain target language until implementation and tests prove the exact behavior.
- Release or package-publishing work names the provenance and advisory expectations before public packages exist.

### Gate 6: API Routes And Hot APIs

API route work may begin only when:

- [API Routes](api-routes.md), [API Route Contract](api-route-contract.md), [Schema](schema.md), [Hot API Path](hot-api-path.md), [Runtime Contract](runtime-contract.md), [Security](security.md), and [Public API Routes Reference](public/reference/api-routes.md) agree on handler behavior.
- Request and response behavior is tested through HTTP fixtures.
- Validation errors are structured and documented.
- [Schema Contract](schema-contract.md) defines helper scope, issue shape, query coercion, serializer expectations, OpenAPI mapping, and fixtures.
- [Cache Contract](cache-contract.md) defines cache modes, headers, tags, revalidation, micro-cache behavior, diagnostics, and fixtures.
- API routes default to `no-store` unless explicit cache policy exists.
- Hot API routes have schema and benchmark fixture requirements before speed claims are public.

### Gate 7: Public Claims

Public claims may be added only when:

- The behavior exists.
- The relevant check has passed.
- The public docs page links to the reference page.
- Benchmark claims include raw data and methodology.
- Security claims include threat notes, implementation, and tests.

### Gate 8: Performance Claims

Performance work may produce public claims only when:

- [Speed Strategy](speed-strategy.md), [Speed Decisions](speed-decisions.md), [Speed Capability Audit](speed-capability-audit.md), [Performance](performance.md), [Performance Contract](performance-contract.md), [Benchmark Methodology](benchmark-methodology.md), [Testing Contract](testing-contract.md), and [Public Performance Reference](public/reference/performance.md) agree on the evidence.
- `.needle/perf.report.json` fields are documented in [Manifest Contracts](manifest-contracts.md) or the report contract.
- Core Web Vitals language is framed as a target until browser evidence exists.
- Benchmark comparisons include raw results, fixture source, command, environment metadata, and variance.
- Lab metrics, build-time budgets, synthetic benchmarks, and field data are not mixed together.
- Any new speed-sensitive default names the matching decision in [Speed Decisions](speed-decisions.md).
- Browser-delivery behavior for route chunks, CSS chunks, images, fonts, scripts, source maps, compression, resource hints, speculation rules, optional RUM, and bfcache has fixture evidence before public claims.

## Documentation Debt That Blocks A Full Product Build

These docs should become more exact as implementation starts:

- `docs/cli.md`: command syntax, exit codes, JSON envelope, and examples.
- `docs/cli-json-contract.md`: convert planned envelope, diagnostic, and exit-code rules into tested CLI behavior.
- `docs/diagnostics-contract.md`: convert planned diagnostic shape, source locations, categories, remediations, docs links, code stability, and fixture requirements into tested behavior.
- `docs/config.md`: field table, defaults, validation errors, and environment handling.
- `docs/config-contract.md`: replace planned config loading, env, and normalized-output rules with tested behavior after implementation.
- `docs/adapter-contract.md`: replace planned adapter manifest, capability, health endpoint, static export, and compatibility evidence rules with tested adapter behavior.
- `docs/examples-contract.md`: replace planned example statuses, README requirements, create-command integration, and verification evidence rules with real example fixtures and test evidence.
- `docs/manifest-contracts.md`: schema versions and concrete examples.
- `docs/api-route-contract.md`: replace planned handler context, response behavior, diagnostics, and fixture requirements with tested API behavior.
- `docs/schema-contract.md`: replace planned schema helpers, result shapes, serializer behavior, OpenAPI mapping, and fixtures with tested schema behavior.
- `docs/cache-contract.md`: replace planned cache modes, header mapping, tag behavior, revalidation, diagnostics, and fixture requirements with tested cache behavior.
- `docs/seo-contract.md`: replace planned metadata merge rules, sitemap output, robots output, structured data behavior, SEO diagnostics, and fixture requirements with tested SEO behavior.
- `docs/accessibility-contract.md`: replace planned WCAG target, semantic HTML, keyboard, focus, forms, diagnostics, and test evidence rules with implemented checks and review evidence.
- `docs/security-contract.md`: replace planned threat model, secret handling, production error, security header, advisory, package provenance, and security evidence rules with implemented checks and release evidence.
- `docs/performance-contract.md`: replace planned budgets, Core Web Vitals targets, report shape, diagnostics, benchmark evidence, and public claim rules with measured fixture and browser evidence.
- `docs/speed-decisions.md`: revisit rejected defaults only after fixture data shows the planned path is not enough.
- `docs/versioning-and-upgrades.md`: replace policy draft with real release, deprecation, and upgrade-guide procedures once public package releases exist.
- `docs/testing.md`: actual scripts and fixture commands.
- `docs/testing-contract.md`: replace planned fixture layout, snapshot policy, CI gates, browser-test rules, and evidence reporting with implemented package scripts and CI jobs.
- `docs/docs-verification.md`: expand automated checks for generated indexes, anchors, and claim categories as docs tooling grows.
- `docs/compatibility.md`: evidence table for Bun, Node, static, and deployment adapters.
- `docs/machine-readable-docs.md`: generated `docs-index.json`, `llms.txt`, and `llms-full.txt` behavior.
- `docs/public-docs-site-architecture.md`: choose a renderer and replace planned metadata contracts with implemented parser behavior.
- `docs/public/reference/project-structure.md`: replace planned generated app structure with verified output after app creation exists.

## Completion Standard

NeedleStart is ready for a full product build when a contributor can:

1. Read README and know the current phase.
2. Read the docs hub and find start, guide, reference, concept, deployment, community, and agent lanes.
3. Read the Phase 1 build plan and know the next Phase 1A task.
4. Read package map and know where each responsibility belongs.
5. Read project structure docs and know what goes in the root, `app/`, `packages/`, `.needle/`, `dist/`, and `docs/`.
6. Read examples docs and know which starter or fixture proves an onboarding workflow.
7. Read testing docs and know which checks prove the current implementation.
8. Read public docs and see no unsupported implementation, speed, security, or compatibility claims.

If any of those fail, improve the docs before expanding implementation scope.
