# CLI Reference

Status: Scaffolded.

Audience: app developers, AI agents.

The `@lumina/cli` package implements the first route inspection paths, minimal map affected query, benchmark skeleton list, minimal dev-server path, and static build/start path: `lumina routes <appPath> --json`, `lumina inspect <appPath> --json`, `lumina inspect <appPath> why <route>`, `lumina map affected <appPath> <file> --json`, `lumina bench --list --json`, `lumina dev <appPath>`, `lumina build <appPath>`, and `lumina start <appPath>`, available locally as `bun run lumina -- ...`. Other Lumina CLI commands remain planned.

| Command | Purpose | Status |
| --- | --- | --- |
| `lumina dev` | Start local development. | Implemented for minimal `<appPath>` Vite SSR route serving, route-specific dev hydration bundles, browser-verified interactive root-route hydration, `virtual:lumina/routes`, route-file update reports, and direct local imported component affected-route reports; broader component-level browser HMR planned |
| `lumina build` | Build app output and generated artifacts. | Implemented for build-time static page routes; SSR/API output planned |
| `lumina start` | Start a built app. | Implemented for static HTML in `dist/public`; SSR/API serving planned |
| `lumina routes` | Inspect discovered routes. | Implemented for `<appPath> --json` |
| `lumina inspect` | Inspect a route, file, or generated artifact. | Implemented for `<appPath> --json` and `<appPath> why <route>` |
| `lumina check` | Run framework-aware checks. | Planned |
| `lumina test` | Run framework-aware test selection. | Planned |
| `lumina seo` | Run SEO audits. | Planned |
| `lumina map` | Query Lumina Map. | Implemented only for `affected <appPath> <file> --json`; broader map queries planned |
| `lumina workspace` | Inspect workspace graph, apps, and shared-file impact. | Planned |
| `lumina agent` | Generate or inspect agent context. | Planned |
| `lumina mcp` | Start MCP server. | Planned |
| `lumina edit` | Preview, apply, inspect, and undo safe-edit transactions. | Planned |
| `lumina migrate` | Prototype migration workflows. | Planned |
| `lumina bench` | Run benchmark fixtures and emit evidence metadata. | Implemented only for `--list --json`; benchmark execution remains planned |

Exact options, outputs, and exit codes will be documented after implementation.

Current local dev-server usage:

```bash
bun run lumina -- dev apps/www
bun run lumina -- dev apps/www --port 5173
bun run lumina -- dev apps/www --once
```

The implemented dev path writes the first `.lumina` artifacts, exposes route-specific dev hydration bundles, hydrates a browser-tested root-route counter, exposes `virtual:lumina/routes`, emits `.lumina/hmr-report.json` for route-file changes and direct local imported component affected-route reports, and renders page routes on the server. The implemented build/start path emits static HTML, route-specific production client bundles, initial build/performance report artifacts, deployment manifest copies, and serves static built output through `@lumina/adapter-bun`. The implemented browser smoke hydrates the root-route counter in dev and built output. The implemented map affected path reports route impact from direct local import edges. The implemented benchmark list path emits skeleton benchmark status without running benchmarks or publishing timings. `lumina start` requires prior build output and reports a clean error when `dist/` artifacts are missing. SSR/API production behavior, broader component-level browser HMR, and broader Lumina Map query modes remain planned.

`lumina dev` uses the selected port strictly. If the default port or a provided `--port` value is already occupied, rerun with a different `--port` value.

## Planned Command Variants

These variants are referenced by public guides, roadmap, and internal contracts:

```txt
lumina inspect why
lumina build --affected
lumina check --affected
lumina test --affected
lumina map file
lumina map route
lumina map affected <appPath> <file> --json
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
lumina bench --list --json
lumina bench --json
```

`lumina routes <appPath> --json`, `lumina inspect <appPath> --json`, `lumina map affected <appPath> <file> --json`, `lumina build <appPath> --json`, and `lumina bench --list --json` are implemented. The other JSON outputs are planned, not implemented. The shared envelope, diagnostic shape, exit-code policy, and stability rules live in [CLI JSON Contract](../../cli-json-contract.md).

## Source

- [Internal CLI Reference](../../cli.md)
- [CLI JSON Contract](../../cli-json-contract.md)
- [Diagnostics Contract](../../diagnostics-contract.md)

