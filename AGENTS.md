# AGENTS.md

This file is the operating guide for AI agents working in this repository.

Agents must read this file before editing code or documentation. When the project changes in a way that affects setup, commands, architecture, package boundaries, roadmap, or safety rules, agents must update this file and README.md in the same change.

## Project Identity

Project name: NeedleStart.

NeedleStart is an agent-native, SEO-first React framework for fast, large-scale web applications. It uses Bun for runtime paths, Vite/Rolldown for frontend build leverage, and a custom Needle compiler for route intelligence, SEO, graph, API generation, and agent context.

## Current Phase

Current phase: Phase 0, project constitution.

The repository currently contains documentation and planning artifacts. Do not invent implemented behavior in docs unless the implementation exists or the text clearly marks it as planned.

## Required Documentation Sync

Every agent change must evaluate whether these files need updates:

- `README.md`
- `AGENTS.md`
- `VISION.md`
- `ARCHITECTURE.md`
- `docs/roadmap.md`
- `docs/risk-mitigation.md`
- `docs/package-map.md`
- `docs/task-backlog.md`
- `skills/README.md`
- `subagents/README.md`

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

Planned commands once implementation exists:

```bash
bun install
bun test
bun run typecheck
```

Until package scaffolding exists, do not claim these commands pass.

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
```

## Repository Rules

- Prefer deterministic compiler output.
- Prefer AST edits over string replacement for TypeScript source.
- Add or update tests for every implemented feature.
- Keep production runtime free of agent metadata.
- Keep CLI JSON output stable, compact, and documented.
- Public SEO behavior must be tested when implemented.
- New graph edges must include `kind`, `source`, `confidence`, and `why`.
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
- Keep the first prototype scoped to create app, SEO-safe pages, Bun server, basic map, agent inspection, and safe metadata edit.
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

Do not add cross-package imports casually. Shared types belong in `@needle/core`. Compiler-only code belongs in `@needle/compiler`. Runtime code belongs in `@needle/server-bun` or a runtime adapter. Agent and MCP code must remain dev/build-time unless explicitly designed as a development server feature.

## Testing Expectations

For implemented features, use the smallest complete test set that proves behavior:

- Unit tests for pure parsing, manifest, schema, and graph logic.
- Integration tests for CLI behavior and fixture apps.
- HTTP tests for server runtime behavior.
- Snapshot or stable JSON tests for agent-facing output.
- Fixture tests for route discovery, SEO, API routes, and map generation.

Test output used by agents must be deterministic.

## Documentation Style

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
5. For AI collaboration or delegation changes, read `skills/README.md` and `subagents/README.md`.

While editing:

1. Keep changes scoped.
2. Update docs touched by the change.
3. Prefer adding task files from `docs/templates/task-template.md` for implementation work.
4. Keep root-level skills and subagent role briefs vendor-neutral and aligned with the documented safety rules.
5. Keep planned and implemented behavior separate.

Before finishing:

1. Run available checks.
2. If checks cannot run because scaffolding does not exist, state that clearly.
3. Verify `README.md` and `AGENTS.md` still describe the repository honestly.
4. Summarize changed files and remaining next steps.
