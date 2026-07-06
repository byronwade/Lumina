# CLI Reference

Status: Planned.

Audience: app developers, framework contributors, AI agents.

This page is the future reference for `needle` commands. No CLI implementation exists yet.

Machine-readable command behavior is planned in [CLI JSON Contract](cli-json-contract.md). Human output may evolve, but `--json` output, exit codes, diagnostic codes, and schema versions become stable contracts once released.

## Planned Commands

| Command | Purpose | JSON output required? |
| --- | --- | --- |
| `needle dev` | Start local development. | No |
| `needle build` | Build app, manifests, graph, SEO, and adapter output. | Yes |
| `needle start` | Start built output. | No |
| `needle routes` | List route manifest entries. | Yes |
| `needle inspect` | Inspect route, file, or artifact details. | Yes |
| `needle check` | Run framework-aware checks. | Yes |
| `needle seo` | Run SEO audit. | Yes |
| `needle map` | Query Needle Map. | Yes |
| `needle agent` | Generate or inspect agent context. | Yes |
| `needle mcp` | Start MCP server. | No |
| `needle edit` | Preview, apply, inspect, and undo safe-edit transactions. | Yes |
| `needle migrate` | Prototype framework migration workflows. | Yes |
| `needle bench` | Run planned benchmark fixtures and emit evidence metadata. | Yes |

## Planned Command Variants

These variants are referenced by roadmap, guide, and contract docs. They remain planned until `@needle/cli` implements and tests them:

| Command variant | Purpose |
| --- | --- |
| `needle inspect why` | Explain route render, cache, SEO, and risk decisions. |
| `needle map file` | Show graph details, route usage, and risk notes for one source file. |
| `needle map route` | Show the graph slice and route context for one route. |
| `needle map affected` | Show affected routes, files, and checks for a changed target. |
| `needle map explain` | Explain why a graph relationship or impact result exists. |
| `needle agent init` | Generate or refresh app-local agent guidance once app generation exists. |
| `needle agent context` | Emit a route or surface context capsule. |
| `needle agent task` | Create a structured task record from graph data and templates. |
| `needle agent plan` | Generate a deterministic task skeleton from graph data. |
| `needle agent apply` | Apply a validated safe-edit plan through the safe edit transaction path. |
| `needle agent log` | Read agent mutation, task, or context history. |
| `needle edit undo` | Roll back an applied safe edit by mutation ID. |
| `needle migrate from-next` | Prototype migration from a Next.js-style app. |
| `needle seo --route` | Run SEO checks for one route. |
| `needle seo --sitemap` | Inspect planned sitemap output. |
| `needle seo --strict` | Treat warnings as check failures for SEO automation. |

## Reference Requirements

Each command must eventually document:

- Syntax.
- Options.
- Exit codes.
- Human output.
- Stable `--json` output.
- Generated files read or written.
- Checks or tests that prove behavior.

## Planned Global Flags

These global flags are planned, not implemented:

| Flag | Purpose |
| --- | --- |
| `--json` | Emit structured JSON for commands that support automation. |
| `--cwd <path>` | Run against a specific project root. |
| `--config <path>` | Use a specific `needle.config.ts`. |
| `--verbose` | Emit additional human-readable progress or diagnostic detail. |
| `--quiet` | Reduce non-essential human output. |

Do not rely on these flags until `@needle/cli` exists and tests pass.

## Planned Exit Code Policy

Exit codes are planned in [CLI JSON Contract](cli-json-contract.md). Commands should return `0` for success and non-zero for usage errors, validation failures, check failures, unsafe edit rejection, missing implementation, or unavailable dependencies.

## Out Of Scope

- Claiming command behavior before `@needle/cli` exists.
- Defining final option names before implementation.
- Human-output formatting beyond planned examples.
