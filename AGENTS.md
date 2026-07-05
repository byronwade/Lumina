# AGENTS.md

This file is the operating guide for AI agents working in this repository.

Agents must read this file before editing code or documentation. When the project changes in a way that affects setup, commands, architecture, package boundaries, roadmap, generated artifacts, security, testing, or safety rules, agents must update this file and README.md in the same change when those user-facing truths change.

## Project Identity

Project name: NeedleStart.

NeedleStart is an agent-native, SEO-first React framework for fast, large-scale web applications. It uses Bun for local workflow and the default adapter path, Vite/Rolldown for frontend build leverage, and a custom Needle compiler for route intelligence, SEO, graph, API generation, manifests, and agent context.

## Current Phase

Current phase: Phase 0, project constitution.

The repository currently contains documentation and planning artifacts. Do not invent implemented behavior in docs unless the implementation exists or the text clearly marks it as planned.

Use `docs/status.md` as the status truth table.

## Required Documentation Sync

Every agent change must evaluate whether these files need updates:

- `README.md`
- `AGENTS.md`
- `VISION.md`
- `ARCHITECTURE.md`
- `SECURITY.md`
- `docs/status.md`
- `docs/roadmap.md`
- `docs/risk-mitigation.md`
- `docs/package-map.md`
- `docs/task-backlog.md`
- `docs/cli.md`
- `docs/config.md`
- `docs/routing.md`
- `docs/manifest-contracts.md`
- `docs/security.md`
- `docs/testing.md`

Update `README.md` when:

- Setup commands change.
- Package structure changes.
- The prototype status changes.
- Public positioning changes.
- A user-facing feature becomes real.
- A planned feature is removed, renamed, or significantly rescoped.
- Command invocation examples change.

Update `AGENTS.md` when:

- Build, test, lint, typecheck, or dev commands change.
- Safety rules change.
- Generated-file rules change.
- Package ownership or edit boundaries change.
- Agent workflow changes.
- New high-risk areas are introduced.
- Required documentation changes.

Update `docs/status.md` when:

- A planned feature becomes scaffolded, implemented, verified, deferred, removed, or renamed.
- A command becomes runnable or verified.
- A package is added, removed, or renamed.
- A generated artifact is added, removed, or versioned.
- A roadmap phase starts, completes, or changes scope.

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

## Command Conventions

Use `docs/cli.md` as the command contract.

Canonical docs examples:

```bash
bun create needle my-app
cd my-app
needle dev
needle build
needle start
```

Generated app scripts should call the CLI:

```bash
bun run dev
bun run build
bun run start
```

Avoid `bun needle <command>` unless the project intentionally adds that runner form later.

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
needle bench
```

## Repository Rules

- Prefer deterministic compiler output.
- Prefer AST edits over string replacement for TypeScript source.
- Add or update tests for every implemented feature.
- Keep production runtime free of agent metadata.
- Keep CLI JSON output stable, compact, schema-versioned, and documented.
- Public SEO behavior must be tested when implemented.
- New graph edges must include `kind`, `source`, `confidence`, and `why`.
- Do not edit generated files manually.
- Do not add network calls in tests unless explicitly required.
- Do not introduce global mutable state in runtime adapters.
- Do not implement a custom bundler before the Vite/Rolldown path is proven.
- Do not make React Server Components the default render path before stable SSR, SSG, streaming, and the route compiler exist.
- Do not let Needle Map be the only source of truth for safety-critical decisions.
- Treat missing semantic contracts as low-confidence graph data instead of guessing.
- Safe edits must be AST-based, previewable, logged, check-backed, and reversible.
- User application code should not require Bun-only APIs; Bun-specific behavior belongs inside adapter packages.
- Do not expose secret values in manifests, logs, MCP responses, or agent context.

## Generated Files

Planned generated files include:

```txt
.needle/routes.json
.needle/render-manifest.json
.needle/map.json
.needle/graph.json
.needle/seo.report.json
.needle/perf.report.json
.needle/cache.manifest.json
.needle/adapter.manifest.json
.needle/context/*.ctx.json
.needle/context/agent-index.json
.needle/generated/*
.needle/mutations.json
dist/*
```

Rules:

- Generated files must identify their source inputs when practical.
- Generated files must be reproducible across operating systems.
- Generated files must not require manual edits.
- Generated JSON must include schema versions where relevant.
- Generated files must redact secrets.
- Agent metadata must not be shipped in production runtime bundles.
- Generated artifact changes must stay aligned with `docs/manifest-contracts.md`.

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
- Schema validators and serializers.
- Server functions.

## Risk Mitigation Rules

Agents must read `docs/risk-mitigation.md` before changing Needle Map, Agent Kernel, MCP, runtime adapters, or safe edit behavior.

Agents must read `docs/security.md` before changing MCP, safe edits, environment handling, generated manifests, runtime adapters, logging, production output, or file-system tools.

Key rules:

- Build semantic graph extraction in layers: file graph, explicit contracts, convention inference, then optional static analysis.
- Prefer explicit `.contract.ts` files for high-confidence semantic edges.
- Every `GraphEdge` must include `kind`, `source`, `confidence`, and `why`.
- Keep the first prototype scoped to create app, SEO-safe pages, adapter-aware Bun serving, basic map, agent inspection, and safe metadata edit.
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
11. Bun is the speed default, not a portability trap.

## Learning and Collaboration

This project was initially explored with AI assistance for architecture and roadmap clarity. Human maintainers remain accountable for implementation, review, and release decisions. Agents may contribute work only through the same documented contracts, tests, and safety rules as human contributors.

Contributors, human or agent, are expected to:

- Ask clarifying questions when uncertain, except when a scoped best-effort change can safely proceed.
- Document tradeoffs and rejected approaches.
- Update this file and relevant docs when patterns change.
- Keep planned behavior separate from implemented behavior.
- Prefer learning-in-public notes that improve the next contributor's context.

## Package Boundaries

Planned package responsibilities are documented in `docs/package-map.md`.

Do not add cross-package imports casually. Shared types belong in `@needle/core`. Compiler-only code belongs in `@needle/compiler`. Runtime and deployment code belongs in adapter packages such as `@needle/adapter-bun`, `@needle/adapter-node`, and `@needle/adapter-static`. Agent and MCP code must remain dev/build-time unless explicitly designed as a development server feature.

## Testing Expectations

For implemented features, use the smallest complete test set that proves behavior:

- Unit tests for pure parsing, manifest, schema, and graph logic.
- Integration tests for CLI behavior and fixture apps.
- HTTP tests for runtime adapter behavior.
- Snapshot or stable JSON tests for agent-facing output.
- Fixture tests for route discovery, SEO, API routes, and map generation.
- Security redaction tests for config, manifests, MCP, logs, and agent context.
- Safe edit rejection tests as well as success tests.

Test output used by agents must be deterministic.

Use `docs/testing.md` as the detailed testing strategy.

## Documentation Style

- Use direct, durable language.
- Mark planned features as planned.
- Mark implemented features as implemented only after verification.
- Include public API examples for stable or proposed APIs.
- Include "out of scope" notes for phases to prevent scope creep.
- Avoid undocumented magic.
- Keep command examples aligned with `docs/cli.md`.
- Keep generated artifact examples aligned with `docs/manifest-contracts.md`.

## Agent Workflow

Before editing:

1. Read `README.md`.
2. Read this `AGENTS.md`.
3. Read `docs/status.md`.
4. Read the relevant docs under `docs/`.
5. Check whether the task is documentation-only, scaffolding, implementation, or verification.

While editing:

1. Keep changes scoped.
2. Update docs touched by the change.
3. Prefer adding task files from `docs/templates/task-template.md` for implementation work.
4. Keep planned and implemented behavior separate.
5. Update `docs/status.md` when implementation state changes.

Before finishing:

1. Run available checks.
2. If checks cannot run because scaffolding does not exist, state that clearly.
3. Verify `README.md` and `AGENTS.md` still describe the repository honestly.
4. Verify docs stay aligned with `docs/status.md`, `docs/cli.md`, and `docs/manifest-contracts.md` when relevant.
5. Summarize changed files and remaining next steps.
