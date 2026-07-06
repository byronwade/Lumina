# Documentation Standard

Status: Planned.

Audience: documentation contributors, maintainers, AI agents.

NeedleStart should have documentation quality comparable to a mature framework. That means the docs must help a new developer start quickly, help an experienced developer find exact API details, and help an agent distinguish implemented behavior from planned behavior.

This standard is inspired by mature framework docs that separate getting started material, task guides, API reference, and architecture notes. NeedleStart should use the same separation while remaining honest about the current scaffold status.

## Documentation Lanes

NeedleStart docs should be organized into these lanes:

1. Getting Started: the fastest path from zero to a working app.
2. Guides: task-focused walkthroughs for common jobs.
3. API Reference: exact technical contracts for commands, config, helpers, file conventions, generated files, and JSON output.
4. Concepts: durable explanations of rendering, routing, SEO, Needle Map, Agent Kernel, adapters, and safe edits.
5. Architecture: internal design, package boundaries, compiler/runtime contracts, and decision records.
6. Contributing: how humans and agents safely change the repository.

The current repository has a scaffold, so several pages remain draft references for planned framework behavior. Draft pages are still useful when they define names, boundaries, and acceptance criteria without claiming implementation.

## Page Status Labels

Every Markdown doc should make its status clear near the top:

- Draft: design is exploratory or incomplete.
- Proposed: an architecture decision has been proposed for planning, but implementation has not proven it yet.
- Planned: design is accepted, but implementation does not exist yet.
- Scaffolded: package, file, command, or documentation structure exists, but feature behavior is not complete.
- Implemented: code exists, tests or checks have verified it, and the page describes current behavior.
- Verified: code exists and the required checks, fixtures, or evidence prove the documented behavior.
- Deprecated: behavior exists but should not be used for new work.

Write status lines as `Status: Planned.` with title case and a period. Add a separate `Scope:` line when the page needs nuance. Do not use "Implemented" until the repository contains the code and checks have run. `bun run docs:check` enforces a top-level `Status:` line for every Markdown file under `docs/`.

## Page Shape

Use this structure for feature docs when practical:

```md
# Feature Name

Status: Planned.

Audience: app developers, framework contributors, AI agents.

## What It Does

Short explanation of the user-facing behavior.

## Quick Example

A minimal example. Mark it as planned if not implemented.

## API

Exact function, command, config, or file convention details.

## Generated Output

Generated files, manifests, JSON fields, and determinism rules.

## Agent Notes

What AI agents can inspect, edit, or rely on.

## Tests

Expected unit, integration, fixture, HTTP, or stable JSON tests.

## Out Of Scope

What this feature does not do yet.
```

Not every page needs every section. Reference pages should favor exact tables and schema examples. Guides should favor steps, prerequisites, checks, and troubleshooting.

## Writing Rules

- Keep current behavior separate from target behavior.
- Prefer concrete examples over abstract promises.
- Name files, commands, packages, and generated artifacts exactly.
- Confirm directories, examples, generated files, commands, and benchmark evidence exist before describing them as scaffolded, runnable, implemented, or verified.
- Include deterministic JSON examples for agent-facing output.
- Explain what validates a claim: command, test type, fixture, or acceptance demo.
- Link related architecture and risk docs instead of repeating long rationale.
- Use "planned" and "target UX" when commands or APIs are not implemented.
- Avoid vague claims like "automatic", "smart", or "AI-powered" unless the mechanism is documented.

## Voice And Tone

- Direct, precise, and calm.
- Prefer durable product language over launch hype.
- Say what exists, what is planned, and what is out of scope.
- Use "should" for design principles and "does" only for implemented behavior.
- Do not criticize other frameworks; compare workflows and tradeoffs.

## Audience Labels

Every Markdown doc should name its audience near the top:

```md
Audience: app developers, framework contributors, AI agents.
```

`bun run docs:check` enforces a top-level `Audience:` line for every Markdown file under `docs/`.

Common audience labels:

- new users
- app developers
- framework contributors
- maintainers
- AI agents
- security reviewers
- open source program reviewers
- future website visitors

## Heading Conventions

- Use one `#` heading per page.
- Prefer short noun-phrase section headings.
- Use "Status", "Audience", "What It Does", "API", "Generated Output", "Tests", and "Out Of Scope" consistently.
- Avoid clever headings that make search and agent parsing harder.

## Code Example Rules

- Mark unimplemented examples as planned or draft.
- Keep examples minimal before showing advanced variants.
- Prefer examples that can become fixtures or tests.
- Do not show secrets, tokens, or production credentials.
- For CLI examples, include expected output once implementation exists.
- For JSON examples, include schema versions when the contract is stable.

## Diagrams And Visual Rules

- Diagrams should explain flow or relationships that are hard to scan in prose.
- Every diagram needs surrounding text that names the important nodes and edges.
- Include alt text or a text equivalent.
- Keep generated artifact names exact.
- Do not use diagrams to imply implementation exists.

## Public Docs Frontmatter Rules

When the public docs site exists, each public page should include frontmatter equivalent to:

```yaml
title: Routing
description: File-based routing conventions in NeedleStart.
status: planned
audience:
  - app developers
  - AI agents
```

Do not add frontmatter until the docs site parser exists or a static-site direction is chosen.

## AI-Agent Context Rules

- Make stable contracts easy to find.
- Prefer tables for commands, generated files, and package ownership.
- Keep JSON examples compact and schema-versioned where possible.
- Link from prose pages to exact reference pages.
- Never ask agents to rely on inferred behavior when a manifest, schema, or contract should exist.
- Generated app-local or public-docs agent artifacts such as app-local `AGENTS.md`, `llms.txt`, `llms-full.txt`, and `docs-index.json` must not include secrets.

## Benchmark Claim Rules

- No public benchmark claim without raw data and methodology.
- Link to `docs/benchmark-methodology.md`.
- Include runtime versions, hardware, fixture source, commands, and run count.
- Separate Bun-default performance claims from Node/static compatibility claims.
- Compare equivalent behavior and name what is not equivalent.

## Security Language Rules

- Avoid claiming a feature is secure without threat model, implementation, and tests.
- Use "high risk" for auth, billing, cache invalidation, adapters, filesystem writes, safe edits, MCP writes, environment variables, and runtime routing.
- Document validation, error handling, human sign-off, and rollback behavior for high-risk areas.
- Vulnerability reporting language belongs in root `SECURITY.md`.

## Cross-Linking Rules

- Link user-facing docs to reference docs.
- Link reference docs to architecture only when implementation details matter.
- Link safe edit docs to MCP and Agent Kernel docs.
- Link performance docs to benchmark methodology.
- Link deployment docs to adapter docs and compatibility docs.
- Link roadmap tasks to the relevant design docs.

## Maintenance Checklist

Use `docs/docs-maintenance-checklist.md` before finishing changes that affect docs, package structure, commands, generated files, status, governance, release, security, benchmarks, public docs, or AI-agent workflows.

## Reference Coverage Target

Before the first public prototype, NeedleStart should have reference pages for:

- CLI commands.
- `needle.config.ts`.
- Project structure and file conventions.
- Route conventions.
- Render modes.
- Metadata and SEO APIs.
- API route conventions.
- Hot API schema path.
- Generated `.needle/*` and `dist/*` artifacts.
- Needle Map JSON shape and query APIs.
- Agent context JSON shape.
- MCP tools and resources.
- Adapter manifests.
- Safe edit transaction shape.

## Guide Coverage Target

Before the first public prototype, NeedleStart should have guides for:

- Creating an app.
- Building static pages.
- Adding SSR routes.
- Adding SEO metadata.
- Creating API routes.
- Creating hot API routes.
- Inspecting routes.
- Reading Needle Map output.
- Running affected checks.
- Using agent context.
- Running the MCP server.
- Applying a safe metadata edit.
- Deploying with the Bun adapter.
- Using Node and static adapters.
- Migrating a simple Next.js App Router project.

## Quality Bar

A new developer should be able to:

- Understand the project status in less than two minutes.
- Find the planned command or API they need without reading architecture docs.
- See whether a behavior is implemented or planned.
- Copy a minimal example once implementation exists.
- Know which checks prove the behavior.
- Understand what an AI agent is allowed to inspect or edit.

An AI agent should be able to:

- Locate exact package boundaries.
- Find current command status.
- Avoid inventing implemented behavior.
- Use stable JSON contracts instead of prose-only assumptions.
- Identify required docs to update when package structure, commands, or generated files change.
