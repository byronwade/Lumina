# CLI Reference

Status: Planned.

Audience: app developers, AI agents.

The `@lumina/cli` package is scaffolded, but no Lumina CLI command behavior exists yet. This page is the public-facing reference home for planned commands.

| Planned command | Purpose |
| --- | --- |
| `lumina dev` | Start local development. |
| `lumina build` | Build app output and generated artifacts. |
| `lumina start` | Start a built app. |
| `lumina routes` | Inspect discovered routes. |
| `lumina inspect` | Inspect a route, file, or generated artifact. |
| `lumina check` | Run framework-aware checks. |
| `lumina test` | Run framework-aware test selection. |
| `lumina seo` | Run SEO audits. |
| `lumina map` | Query Lumina Map. |
| `lumina workspace` | Inspect workspace graph, apps, and shared-file impact. |
| `lumina agent` | Generate or inspect agent context. |
| `lumina mcp` | Start MCP server. |
| `lumina edit` | Preview, apply, inspect, and undo safe-edit transactions. |
| `lumina migrate` | Prototype migration workflows. |
| `lumina bench` | Run benchmark fixtures and emit evidence metadata. |

Exact options, outputs, and exit codes will be documented after implementation.

## Planned Command Variants

These variants are referenced by public guides, roadmap, and internal contracts:

```txt
lumina inspect why
lumina build --affected
lumina check --affected
lumina test --affected
lumina map file
lumina map route
lumina map affected
lumina map explain
lumina workspace graph
lumina workspace apps
lumina workspace explain
lumina agent init
lumina agent context
lumina agent task
lumina agent plan
lumina agent apply
lumina agent log
lumina edit undo
lumina migrate from-next
lumina seo --route
lumina seo --sitemap
lumina seo --strict
```

## Planned JSON Automation Surface

Commands that agents, scripts, or CI should consume need stable `--json` output once implemented. The initial planned JSON command surfaces are:

```txt
lumina build --json
lumina build --affected --json
lumina routes --json
lumina inspect --json
lumina check --json
lumina check --affected --json
lumina test --affected --json
lumina seo --json
lumina map --json
lumina workspace graph --json
lumina workspace apps --json
lumina workspace explain <file> --json
lumina agent context --json
lumina edit --json
lumina migrate --json
lumina bench --json
```

These JSON outputs are planned, not implemented. The shared envelope, diagnostic shape, exit-code policy, and stability rules live in [CLI JSON Contract](../../cli-json-contract.md).

## Source

- [Internal CLI Reference](../../cli.md)
- [CLI JSON Contract](../../cli-json-contract.md)
- [Diagnostics Contract](../../diagnostics-contract.md)

