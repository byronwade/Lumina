# CLI Reference

Status: Scaffolded.

Audience: app developers, framework contributors, AI agents.

This page is the reference for `lumina` commands. `@lumina/cli` currently implements `lumina routes <appPath> --json` through the local `bun run lumina -- routes <appPath> --json` script. Other commands remain planned.

Machine-readable command behavior is planned in [CLI JSON Contract](cli-json-contract.md). Human output may evolve, but `--json` output, exit codes, diagnostic codes, and schema versions become stable contracts once released.

## Planned Commands

| Command | Purpose | Status | JSON output required once implemented? |
| --- | --- | --- |
| `lumina dev` | Start local development. | Planned | No |
| `lumina build` | Build app, manifests, graph, SEO, and adapter output. | Planned | Yes |
| `lumina start` | Start built output. | Planned | No |
| `lumina routes` | List route manifest entries. | Implemented for `<appPath> --json` | Yes |
| `lumina inspect` | Inspect route, file, or artifact details. | Planned | Yes |
| `lumina check` | Run framework-aware checks. | Planned | Yes |
| `lumina test` | Run framework-aware test selection. | Planned | Yes |
| `lumina seo` | Run SEO audit. | Planned | Yes |
| `lumina map` | Query Lumina Map. | Planned | Yes |
| `lumina workspace` | Inspect workspace graph, apps, and shared-file impact. | Planned | Yes |
| `lumina agent` | Generate or inspect agent context. | Planned | Yes |
| `lumina mcp` | Start MCP server. | Planned | No |
| `lumina edit` | Preview, apply, inspect, and undo safe-edit transactions. | Planned | Yes |
| `lumina migrate` | Prototype framework migration workflows. | Planned | Yes |
| `lumina bench` | Run planned benchmark fixtures and emit evidence metadata. | Planned | Yes |

## Planned Command Variants

These variants are referenced by roadmap, guide, and contract docs. They remain planned until `@lumina/cli` implements and tests them:

| Command variant | Purpose |
| --- | --- |
| `lumina inspect why` | Explain route render, cache, SEO, and risk decisions. |
| `lumina build --affected` | Build only apps, routes, packages, and artifacts selected by the workspace graph. |
| `lumina check --affected` | Run framework checks selected by affected workspace graph output. |
| `lumina test --affected` | Run tests selected by affected apps, routes, packages, and shared files. |
| `lumina map file` | Show graph details, route usage, and risk notes for one source file. |
| `lumina map route` | Show the graph slice and route context for one route. |
| `lumina map affected` | Show affected routes, files, and checks for a changed target. |
| `lumina map explain` | Explain why a graph relationship or impact result exists. |
| `lumina workspace graph` | Emit or inspect the planned workspace graph. |
| `lumina workspace apps` | List workspace apps, package dependencies, and generated artifact owners. |
| `lumina workspace explain` | Explain why one file, package, app, route, or artifact affects another. |
| `lumina agent init` | Generate or refresh app-local agent guidance once app generation exists. |
| `lumina agent context` | Emit a route or surface context capsule. |
| `lumina agent task` | Create a structured task record from graph data and templates. |
| `lumina agent plan` | Generate a deterministic task skeleton from graph data. |
| `lumina agent apply` | Apply a validated safe-edit plan through the safe edit transaction path. |
| `lumina agent log` | Read agent mutation, task, or context history. |
| `lumina edit undo` | Roll back an applied safe edit by mutation ID. |
| `lumina migrate from-next` | Prototype migration from a Next.js-style app. |
| `lumina seo --route` | Run SEO checks for one route. |
| `lumina seo --sitemap` | Inspect planned sitemap output. |
| `lumina seo --strict` | Treat warnings as check failures for SEO automation. |

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
| `--config <path>` | Use a specific `lumina.config.ts`. |
| `--verbose` | Emit additional human-readable progress or diagnostic detail. |
| `--quiet` | Reduce non-essential human output. |

Do not rely on these flags until the owning command implements and tests them. The `--json` flag is implemented for `lumina routes <appPath>`.

## Planned Exit Code Policy

Exit codes are planned in [CLI JSON Contract](cli-json-contract.md). Commands should return `0` for success and non-zero for usage errors, validation failures, check failures, unsafe edit rejection, missing implementation, or unavailable dependencies.

## Out Of Scope

- Claiming command behavior before the specific `@lumina/cli` command exists.
- Defining final option names before implementation.
- Human-output formatting beyond planned examples.
