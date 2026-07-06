# Documentation Hub

Status: Scaffolded.
Audience: all contributors, maintainers, AI agents.

This directory is the source of truth for NeedleStart planning, architecture, roadmap, and future implementation tasks.

## Start Here

- [Project Status](status.md): current phase, what exists, and what does not exist yet.
- [First Contribution Path](first-contribution.md): focused path for first-time contributors and agents.
- [Getting Started](getting-started.md): current status and target onboarding flow.
- [Roadmap](roadmap.md): complete phase plan.
- [Phase 1 Build Plan](phase-1-build-plan.md): concrete monorepo scaffold path and verification expectations.
- [Lumina Rename And Documentation Overhaul Plan](superpowers/plans/2026-07-06-lumina-rename-documentation.md): approval-gated plan for the rename and Alpha documentation upgrade.
- [Product Build Readiness](product-build-readiness.md): documentation and evidence gates before full product build work.
- [Versioning And Upgrades](versioning-and-upgrades.md): package, docs, manifest, API, and upgrade policy.
- [Documentation Standard](documentation-standard.md): docs information architecture, status labels, and page quality bar.
- [Documentation Research Notes](documentation-research.md): primary-source lessons from leading docs.
- [Documentation Freshness Policy](docs-freshness-policy.md): rules for keeping docs current as the project changes.
- [Documentation Verification](docs-verification.md): repeatable docs checks, expected evidence, and future script targets.
- [Agent Enforcement Matrix](agent-enforcement.md): maps agent rules to documentation, structure, performance, typecheck, and test gates.
- [Testing Contract](testing-contract.md): planned test layers, fixture layout, snapshots, CI gates, and evidence rules.
- [Public Docs Site Architecture](public-docs-site-architecture.md): planned public docs content model, frontmatter, navigation, and validation.
- [Public Frontmatter Standard](public-frontmatter-standard.md): planned metadata fields and validation rules for future public docs pages.
- [Docs Site Build Plan](docs-site-build-plan.md): implementation phases and decision gates for the future public docs site.
- [Review Checklist](review-checklist.md): review gates for docs, implementation, security, performance, and public docs changes.

## User-Facing Docs

- [Public Website Content](public/README.md): public-facing Markdown source tree for the future website.
- [Guides](guides.md): planned task-focused guide set.
- [API Reference](api-reference.md): planned command, config, helper, and manifest reference index.
- [File Conventions](file-conventions.md): planned application file and route conventions.
- [Public Project Structure](public/reference/project-structure.md): public-facing planned app, generated output, and docs structure.
- [CLI Reference](cli.md): planned `needle` command reference.
- [CLI JSON Contract](cli-json-contract.md): planned `--json` envelope, diagnostics, and exit-code policy.
- [Diagnostics Contract](diagnostics-contract.md): planned diagnostic codes, severity values, locations, remediations, docs links, and JSON behavior.
- [Configuration Reference](config.md): planned `needle.config.ts` reference.
- [Configuration Contract](config-contract.md): planned config loading, validation, env handling, and normalized output rules.
- [Adapter Contract](adapter-contract.md): planned Bun, Node, and static adapter inputs, outputs, manifests, capabilities, and tests.
- [Routing](routing.md): planned route conventions.
- [Routing Contract](routing-contract.md): planned route IDs, segment grammar, sorting, diagnostics, and fixture requirements.
- [API Route Contract](api-route-contract.md): planned API handler, validation, response, manifest, and diagnostic rules.
- [Schema Contract](schema-contract.md): planned schema DSL, validation result, serializer, OpenAPI, manifest, and fixture rules.
- [Cache Contract](cache-contract.md): planned cache modes, headers, tags, revalidation, diagnostics, manifest, and fixture rules.
- [SEO Contract](seo-contract.md): planned metadata, sitemap, robots, structured data, reports, diagnostics, and fixture rules.
- [Accessibility Contract](accessibility-contract.md): planned WCAG target, semantic HTML, keyboard, focus, form, diagnostics, and test rules.
- [Manifest Contracts](manifest-contracts.md): planned generated manifest contracts.
- [Examples](examples.md): planned examples and fixtures.
- [Examples And Templates Contract](examples-contract.md): planned example statuses, READMEs, create-command integration, verification evidence, and public linking rules.
- [Examples Catalog](examples-catalog.md): planned official examples, status labels, paths, and public guide mapping.

## Core Architecture Documents

- [Product Strategy](product-strategy.md): positioning and strategic wedge.
- [Engineering Standards](engineering-standards.md): operating principles, review bar, definitions of ready and done.
- [Operating Cadence](operating-cadence.md): planned review rhythm for active development, phase changes, releases, and AI-agent work.
- [Package Map](package-map.md): package responsibilities and boundaries.
- [Compiler IR](compiler-ir.md): internal compiler model and manifest contracts.
- [Runtime Contract](runtime-contract.md): server behavior and build output expectations.
- [Adapter Architecture](adapters.md): Bun, Node, and static adapter strategy.
- [Adapter Contract](adapter-contract.md): planned adapter manifests, deployment output, health endpoints, environment variables, and compatibility evidence.
- [Agent Kernel](agent-kernel.md): agent context, safe edits, and generated agent files.
- [Safe Edit Transactions](safe-edit-transactions.md): transaction engine, risk tiers, dry runs, mutation logs, and undo.
- [Needle Map](needle-map.md): graph model, nodes, edges, and queries.
- [Migration Tooling](migration.md): migration commands, contract stubs, and reports.
- [Risk Mitigation](risk-mitigation.md): mitigation plan for semantic graph, scope, adoption, Bun perception, and safe edits.
- [Speed Strategy](speed-strategy.md): whole-system speed principles, surfaces, gates, and evidence rules.
- [Speed Decisions](speed-decisions.md): concrete fast-path decisions, rejected defaults, and implementation gates.
- [Speed Capability Audit](speed-capability-audit.md): coverage matrix for speed decisions across framework layers.
- [SEO Engine](seo-engine.md): metadata, sitemap, robots, structured data, and audits.
- [SEO Contract](seo-contract.md): planned SEO API, metadata merge rules, generated output, diagnostics, and fixtures.
- [API Routes](api-routes.md): planned route handler conventions.
- [Schema](schema.md): planned validation and serialization contracts.
- [Cache](cache.md): planned explicit cache behavior and cache tags.
- [MCP Server](mcp-server.md): planned MCP resources and tools.
- [Hot API Path](hot-api-path.md): generated validators, serializers, and fast handlers.
- [Performance](performance.md): route budgets, reports, and benchmark goals.
- [Performance Contract](performance-contract.md): planned route budgets, Core Web Vitals targets, performance reports, diagnostics, benchmark evidence, and claim rules.
- [Benchmarks](benchmarks.md): planned benchmark areas and evidence rules.
- [Benchmark Methodology](benchmark-methodology.md): required benchmark metadata and comparison rules.
- [Benchmark Fixtures](benchmark-fixtures.md): planned fixture matrix, raw result layout, and claim rules.
- [Prototype Acceptance Demo](prototype-acceptance.md): demo that proves the wedge.
- [Task Backlog](task-backlog.md): first concrete implementation tasks.
- [Compatibility](compatibility.md): planned runtime and platform compatibility.
- [Deployment](deployment.md): planned adapter deployment docs.
- [Testing](testing.md): planned test categories and deterministic output expectations.
- [Testing Contract](testing-contract.md): planned test layers, fixture layout, snapshot policy, CI gates, and evidence reporting.
- [Examples And Templates Contract](examples-contract.md): planned example fixture, starter template, create-command, and public-guide evidence rules.
- [Security](security.md): docs-level security requirements.
- [Security Contract](security-contract.md): planned threat model, secret handling, production error, header, agent write, release, and evidence rules.
- [Threat Model](threat-model.md): trust boundaries, assets, threats, controls, and threat-note template.
- [Accessibility](accessibility.md): docs and example accessibility requirements.
- [Accessibility Contract](accessibility-contract.md): planned framework-owned page, example, public docs, diagnostics, and verification rules.
- [Public Docs Readiness](public-docs.md): requirements before docs become website content.
- [Public Docs Site Architecture](public-docs-site-architecture.md): public docs metadata, routes, navigation, and renderer decision criteria.
- [Website Content Map](website-content-map.md): future public website navigation and source mapping.
- [Comparisons](comparisons.md): comparison writing principles.
- [Release Process](release.md): planned release requirements.
- [Versioning And Upgrades](versioning-and-upgrades.md): versioned surfaces, schema changes, deprecations, and upgrade guides.
- [Open Source Community](open-source-community.md): community and OSS readiness notes.
- [App Graph Visual](app-graph-visual.md): planned graph and workflow diagrams.
- [Machine-Readable Documentation](machine-readable-docs.md): planned `llms.txt`, `llms-full.txt`, and `docs-index.json` outputs.
- [Maintainer Guide](maintainer-guide.md): maintainer review, merge, and release responsibilities.
- [Documentation Strategy Audit](documentation-audit.md): audit, competitor lessons, matrices, IA, and plan.
- [Documentation Improvement Matrix](documentation-matrix.md): file-by-file quality and readiness matrix.
- [Documentation Completion Audit](documentation-completion-audit.md): requirement-to-evidence map for this docs-system pass.
- [Final PR Summary Draft](final-pr-summary.md): summary template for this docs-system work.
- [Docs Maintenance Checklist](docs-maintenance-checklist.md): update triggers for future contributors.
- [Documentation Verification](docs-verification.md): automated scaffold checks plus manual review checks for unsupported claims.
- [Agent Enforcement Matrix](agent-enforcement.md): automated gate map for agents and maintainers.
- [Glossary](glossary.md): shared terminology.
- [First Contribution Path](first-contribution.md): first safe contribution path for Phase 1 scaffold work.
- [AI Skill Playbooks](skills/README.md): vendor-neutral skill workflows for agents.
- [AI Subagent Roles](subagents/README.md): delegated-agent role briefs.

## Checklists

- [Implementation Checklists](checklists/README.md)
- [Phase 1 Scaffold Checklist](checklists/phase-1-scaffold.md)
- [Adapter Implementation Checklist](checklists/adapter-implementation.md)
- [Performance Evidence Checklist](checklists/performance-evidence.md)

## Templates

- [Implementation Task Template](templates/task-template.md)
- [Architecture Decision Template](templates/adr-template.md)
- [Documentation Page Template](templates/documentation-page-template.md)
- [Prompts](prompts/README.md)

## Decision Records

- [Architecture Decision Records](decisions/README.md)
- [0001: Runtime and Build Split](decisions/0001-runtime-and-build-split.md)
- [0002: Agent-Native Core](decisions/0002-agent-native-core.md)
- [0003: Risk Mitigation From Day One](decisions/0003-risk-mitigation-from-day-one.md)
- [0004: Vite/Rolldown Before Custom Bundler](decisions/0004-vite-rolldown-before-custom-bundler.md)
- [0005: Bun Default With Node And Static Adapters](decisions/0005-bun-default-node-static-adapters.md)
- [0006: Static-First Rendering](decisions/0006-static-first-rendering.md)
- [0007: Agent-Safe Edits](decisions/0007-agent-safe-edits.md)
- [0008: Docs-Level AI Playbooks](decisions/0008-docs-level-ai-playbooks.md)

## Documentation Rules

- Follow [Documentation Standard](documentation-standard.md) when adding or reorganizing docs.
- Keep `README.md` concise and user-facing.
- Keep `AGENTS.md` operational for AI agents.
- Keep deep design details in `docs/`.
- Mark planned features as planned.
- Mark implemented features as implemented only after verification.
- Update roadmap status when implementation begins or scope changes.
- Prefer examples that can later become tests.
