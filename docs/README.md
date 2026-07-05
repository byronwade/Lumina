# Documentation Hub

This directory is the source of truth for NeedleStart planning, architecture, roadmap, implementation contracts, and future task work.

NeedleStart is still in Phase 0. Unless `docs/status.md` marks a behavior implemented or verified, docs describe planned behavior and target contracts.

## Start Here

- [Project Status](status.md): current planned, drafted, scaffolded, implemented, and verified state.
- [Roadmap](roadmap.md): complete phase plan.
- [Task Backlog](task-backlog.md): first concrete implementation tasks.
- [Risk Mitigation](risk-mitigation.md): mitigation plan for semantic graph, scope, adoption, Bun perception, and safe edits.

## Core Contracts

- [Package Map](package-map.md): package responsibilities and boundaries.
- [CLI Contract](cli.md): command surface, invocation rules, JSON output, exit codes, and diagnostics.
- [Configuration Contract](config.md): `needle.config.ts`, defaults, validation, environment rules, and config diagnostics.
- [Routing Contract](routing.md): `app/` conventions, route discovery, layouts, params, API route discovery, and route diagnostics.
- [Compiler IR](compiler-ir.md): internal compiler model and manifest contracts.
- [Manifest Contracts](manifest-contracts.md): schema versions, stable JSON, generated artifacts, manifests, and redaction rules.
- [Runtime Contract](runtime-contract.md): server behavior and build output expectations.
- [Adapter Architecture](adapters.md): Bun, Node, and static adapter strategy.
- [Deployment Guide](deployment.md): build output, production runtime expectations, adapter deployment, and health endpoint policy.

## Product Systems

- [SEO Engine](seo-engine.md): metadata, sitemap, robots, structured data, and audits.
- [API Routes](api-routes.md): file-based API routes, handler behavior, response normalization, and diagnostics.
- [Hot API Path](hot-api-path.md): generated validators, serializers, and fast handlers.
- [Schema DSL](schema.md): validation, serialization, OpenAPI direction, and schema diagnostics.
- [Cache System](cache.md): cache plans, cache tags, headers, invalidation, and cache manifests.
- [Performance](performance.md): route budgets, reports, and benchmark goals.
- [Needle Map](needle-map.md): graph model, nodes, edges, and queries.
- [Agent Kernel](agent-kernel.md): agent context, safe edits, and generated agent files.
- [MCP Server](mcp-server.md): planned MCP resources and tools.
- [Safe Edit Transactions](safe-edit-transactions.md): transaction engine, risk tiers, dry runs, mutation logs, and undo.
- [Migration Tooling](migration.md): migration commands, contract stubs, and reports.

## Safety and Verification

- [Security and Threat Model](security.md): secrets, MCP, safe edits, production bundles, and deployment security.
- [Testing Strategy](testing.md): unit, fixture, integration, HTTP, stable JSON, MCP, safe edit, security, and benchmark tests.
- [Prototype Acceptance Demo](prototype-acceptance.md): demo that proves the wedge.

## Reference

- [Vision](../VISION.md): product purpose and promises.
- [Architecture](../ARCHITECTURE.md): system layers and strategic technology split.
- [Contributing](../CONTRIBUTING.md): contribution flow and review standards.
- [Agent Rules](../AGENTS.md): operating guide for AI agents working in this repository.
- [Glossary](glossary.md): shared terminology.

## Templates

- [Implementation Task Template](templates/task-template.md)
- [Architecture Decision Template](templates/adr-template.md)

## Decision Records

- [0001: Runtime and Build Split](decisions/0001-runtime-and-build-split.md)
- [0002: Agent-Native Core](decisions/0002-agent-native-core.md)
- [0003: Risk Mitigation From Day One](decisions/0003-risk-mitigation-from-day-one.md)

## Documentation Rules

- Keep `README.md` concise and user-facing.
- Keep `AGENTS.md` operational for AI agents.
- Keep deep design details in `docs/`.
- Mark planned features as planned.
- Mark implemented features as implemented only after verification.
- Update `docs/status.md` when implementation state changes.
- Update roadmap status when implementation begins or scope changes.
- Prefer examples that can later become tests.
- Keep command examples aligned with `docs/cli.md`.
- Keep generated artifact descriptions aligned with `docs/manifest-contracts.md`.
