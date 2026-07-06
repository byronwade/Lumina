# Documentation Hub

This directory is the source of truth for NeedleStart planning, architecture, roadmap, and future implementation tasks.

## Core Documents

- [Roadmap](roadmap.md): complete phase plan.
- [Package Map](package-map.md): package responsibilities and boundaries.
- [Compiler IR](compiler-ir.md): internal compiler model and manifest contracts.
- [Runtime Contract](runtime-contract.md): server behavior and build output expectations.
- [Adapter Architecture](adapters.md): Bun, Node, and static adapter strategy.
- [Agent Kernel](agent-kernel.md): agent context, safe edits, and generated agent files.
- [Safe Edit Transactions](safe-edit-transactions.md): transaction engine, risk tiers, dry runs, mutation logs, and undo.
- [Needle Map](needle-map.md): graph model, nodes, edges, and queries.
- [Migration Tooling](migration.md): migration commands, contract stubs, and reports.
- [Risk Mitigation](risk-mitigation.md): mitigation plan for semantic graph, scope, adoption, Bun perception, and safe edits.
- [SEO Engine](seo-engine.md): metadata, sitemap, robots, structured data, and audits.
- [MCP Server](mcp-server.md): planned MCP resources and tools.
- [Hot API Path](hot-api-path.md): generated validators, serializers, and fast handlers.
- [Performance](performance.md): route budgets, reports, and benchmark goals.
- [Prototype Acceptance Demo](prototype-acceptance.md): demo that proves the wedge.
- [Task Backlog](task-backlog.md): first concrete implementation tasks.
- [Glossary](glossary.md): shared terminology.
- [AI Skill Playbooks](../skills/README.md): root-level vendor-neutral skill workflows for agents.
- [AI Subagent Roles](../subagents/README.md): root-level delegated-agent role briefs.

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
- Update roadmap status when implementation begins or scope changes.
- Prefer examples that can later become tests.
