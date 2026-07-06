# Agent Enforcement Matrix

Status: Scaffolded.
Audience: AI agents, maintainers, contributors.

This page maps Lumina's agent rules to the checks that currently enforce them. It is the operational bridge between `AGENTS.md`, the documentation contracts, package structure, performance guardrails, and the verification scripts.

The current enforcement layer proves the Phase 1 scaffold, documentation system, route discovery, `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, minimal `lumina dev` SSR route serving, and benchmark/status skeleton paths. It does not prove unimplemented framework behavior such as production build/start behavior, runtime adapter behavior, route HMR, virtual route modules, client hydration, Lumina Map query CLI, MCP tools, or safe edit transactions.

## Enforcement Rule

Agents must treat `bun run check` as the default local quality gate before finishing any non-trivial change.

If a narrower change uses a narrower gate, the final report must state why the full gate was not needed or why it could not run. Unsupported implementation, speed, security, compatibility, benchmark, package, generated-file, or public-docs claims must be fixed before the change is considered review-ready.

## Current Gate Map

| Gate | Enforces | Current command |
| --- | --- | --- |
| Documentation contracts | Required docs, local Markdown links, status labels, AGENTS sync coverage, public docs navigation, MVP Alpha scope visibility, generated-artifact names, current-vs-planned wording, feature-contract vocabulary, and source-map coverage. | `bun run docs:check` |
| Package structure | Workspace package names, package entrypoints, TypeScript scaffold files, CI presence, forbidden runtime dependencies on agent-only packages, and shared-core type ownership. | `bun run structure:check` |
| Performance claim hygiene | Performance docs, benchmark fixture coverage, raw-result rules, and unsupported root or public speed, benchmark, or SEO positioning claims. | `bun run performance:check` |
| Type surface | TypeScript project references and exported scaffold types. | `bun run typecheck` |
| Tests | Placeholder scaffold tests now; feature-specific tests as packages gain behavior. | `bun test` |
| Full scaffold gate | Documentation, structure, performance claim hygiene, typecheck, and tests in sequence. | `bun run check` |

## Agent Workflow Gates

Before editing, agents must identify which docs own the change:

- `README.md` and `docs/status.md` for current phase, public positioning, prototype status, setup commands, and feature status.
- `AGENTS.md` for workflow, safety rules, package boundaries, generated-file rules, and verification commands.
- `docs/mvp-alpha-scope.md` for included MVP Alpha behavior, deferred work, demo-app scope, and readiness evidence before prototype implementation expands.
- `docs/alpha-agent-operating-system.md`, `docs/alpha-work-routing.md`, `docs/alpha-implementation-sequence.md`, and `docs/alpha-drift-prevention.md` for Alpha agent workflow, task routing, implementation order, drift risks, and issue-closure rules.
- `docs/package-map.md`, `docs/phase-1-build-plan.md`, and `docs/task-backlog.md` for package ownership, build sequence, and implementation tasks.
- Feature contracts under `docs/*-contract.md` for behavior, diagnostics, generated artifacts, tests, and evidence.
- `docs/performance-contract.md`, `docs/speed-strategy.md`, `docs/speed-decisions.md`, `docs/implementation-speed-rules.md`, `docs/speed-capability-audit.md`, and `docs/benchmark-methodology.md` for speed-sensitive changes.
- `docs/large-repo-build-architecture.md` for workspace graph, shared-file identity, multi-app workspaces, split-app planning, affected builds, terminal output, HMR summaries, and large-repo observability reports.
- `docs/security-contract.md` and `docs/threat-model.md` for high-risk surfaces.
- `docs/public-docs-site-architecture.md`, `docs/public-frontmatter-standard.md`, `docs/public-docs.md`, and `docs/website-content-map.md` for public docs changes.

While editing, agents must keep planned, scaffolded, implemented, and verified behavior separate. Any doc that names a current command, package, directory, generated artifact, benchmark, example, or public behavior must either be backed by current repository evidence or clearly marked as planned.

Before finishing, agents must run the available gate that matches the change and report exact command results. For docs, structure, performance, package-boundary, or status changes, run `bun run check` unless the change is intentionally narrower and the reason is documented.

## Claim Enforcement

Use this claim gate before adding or changing public-facing text:

- Implementation claims require code and tests.
- Performance claims require benchmark methodology, raw results, fixture names, environment metadata, run counts, and variance.
- Security claims require threat notes, implementation evidence, and tests.
- Compatibility claims require runtime or adapter evidence.
- Public docs claims require a source-of-truth internal doc and no unsupported current-tense behavior.
- Generated-file claims require the artifact name to appear in the manifest contracts and generated-file rules.

If the evidence does not exist, write the claim as planned target behavior.

## Structure Enforcement

Agents must preserve these structure rules:

- AI skill playbooks live under `docs/skills/`.
- AI subagent role briefs live under `docs/subagents/`.
- Tool-specific wrappers under `CLAUDE.md`, `.claude/`, `.agents/skills/`, and `.cursor/rules/` must remain thin pointers to the vendor-neutral docs.
- Root `skills/` and `subagents/` directories are forbidden.
- Shared model types live in `@lumina/core`.
- Runtime packages must not depend on agent-only packages.
- User application code should not require Bun-only APIs; Bun-specific behavior belongs in adapter packages.

`bun run docs:check` and `bun run structure:check` enforce the current scaffold subset of those rules.

## Performance Enforcement

Speed-sensitive work must name the decision it follows or changes. Use:

- `docs/speed-decisions.md` for architecture defaults and rejected alternatives.
- `docs/implementation-speed-rules.md` for code-level speed rules, early benchmark skeletons, dependency pinning, generated artifact provenance, and request-path import guardrails.
- `docs/speed-capability-audit.md` for coverage and remaining evidence.
- `docs/performance-contract.md` for budgets, diagnostics, reports, and claim rules.
- `docs/benchmark-methodology.md` and `docs/benchmark-fixtures.md` for benchmark evidence.
- `docs/checklists/performance-evidence.md` before reviewing public performance claims.

Until browser, fixture, or benchmark evidence exists, performance language must stay in target form.

Runtime request paths must remain generated-artifact driven. Once adapters exist, tests should fail if production request handling imports compiler, map, agent, MCP, docs, or source-discovery code.

Large-repo work must keep workspace graph discovery, build traces, cache reports, HMR reports, split reports, and affected selection outside the production request path.

## Documentation Freshness Enforcement

Every change must evaluate whether it affects:

- setup commands,
- package structure,
- command contracts,
- generated artifacts,
- status labels,
- public docs navigation,
- speed or performance evidence,
- security or threat model rules,
- agent workflow,
- release or versioning policy.

If any item changes, update the owning docs in the same change. If no docs need changes, the final report should say that the docs were checked and why they remained current.

## Known Limits

The current automated checks are strong text and structure guardrails, not proof that every future framework behavior works. They do not replace human review, feature fixtures, HTTP tests, browser evidence, security review, or benchmark runs once implementation begins.
