# CLI Reference

Status: Planned.

Audience: app developers, AI agents.

The `@needle/cli` package is scaffolded, but no NeedleStart CLI command behavior exists yet. This page is the public-facing reference home for planned commands.

| Planned command | Purpose |
| --- | --- |
| `needle dev` | Start local development. |
| `needle build` | Build app output and generated artifacts. |
| `needle start` | Start a built app. |
| `needle routes` | Inspect discovered routes. |
| `needle inspect` | Inspect a route, file, or generated artifact. |
| `needle check` | Run framework-aware checks. |
| `needle seo` | Run SEO audits. |
| `needle map` | Query Needle Map. |
| `needle agent` | Generate or inspect agent context. |
| `needle mcp` | Start MCP server. |
| `needle edit` | Preview, apply, inspect, and undo safe-edit transactions. |
| `needle migrate` | Prototype migration workflows. |
| `needle bench` | Run benchmark fixtures and emit evidence metadata. |

Exact options, outputs, and exit codes will be documented after implementation.

## Planned Command Variants

These variants are referenced by public guides, roadmap, and internal contracts:

```txt
needle inspect why
needle map affected
needle map explain
needle agent context
needle agent plan
needle edit undo
needle migrate from-next
needle seo --route
needle seo --sitemap
needle seo --strict
```

## Planned JSON Automation Surface

Commands that agents, scripts, or CI should consume need stable `--json` output once implemented. The initial planned JSON command surfaces are:

```txt
needle build --json
needle routes --json
needle inspect --json
needle check --json
needle seo --json
needle map --json
needle agent context --json
needle edit --json
needle migrate --json
needle bench --json
```

These JSON outputs are planned, not implemented. The shared envelope, diagnostic shape, exit-code policy, and stability rules live in [CLI JSON Contract](../../cli-json-contract.md).

## Source

- [Internal CLI Reference](../../cli.md)
- [CLI JSON Contract](../../cli-json-contract.md)
- [Diagnostics Contract](../../diagnostics-contract.md)

