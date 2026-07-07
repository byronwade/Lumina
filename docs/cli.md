# CLI Reference

Status: Scaffolded.

Audience: app developers, framework contributors, AI agents.

This page is the reference for `lumina` commands. `@lumina/cli` currently implements `lumina routes <appPath> --json`, `lumina inspect <appPath> --json`, `lumina inspect <appPath> why <route>`, `lumina map affected <appPath> <file> --json`, `lumina bench --list --json`, minimal `lumina dev <appPath>` with timed human startup output, static `lumina build <appPath>`, and static `lumina start <appPath>` through the local `bun run lumina -- ...` script. Other commands remain planned.

Machine-readable command behavior is planned in [CLI JSON Contract](cli-json-contract.md). Human output may evolve, but `--json` output, exit codes, diagnostic codes, and schema versions become stable contracts once released.

## Planned Commands

| Command | Purpose | Status | JSON output required once implemented? |
| --- | --- | --- |
| `lumina dev` | Start local development. | Implemented for minimal `<appPath>` timed startup output, Vite SSR route serving, dynamic and catch-all page route params, search params, app-level and route-level not-found/error components, route-specific dev hydration bundles, browser-verified interactive root-route hydration, `virtual:lumina/routes`, route-file update reports, and direct local imported component affected-route reports; broader component-level browser HMR remains planned | No |
| `lumina build` | Build app, manifests, graph, early reports, and adapter output. | Implemented for build-time static page routes and `--json`; SSR/API output remains planned | Yes |
| `lumina start` | Start built output. | Implemented for static HTML in `dist/public` and generated SSR page routes in `dist/server/ssr-routes.js`; API serving remains planned | No |
| `lumina routes` | List route manifest entries. | Implemented for `<appPath> --json` | Yes |
| `lumina inspect` | Inspect route, file, or artifact details. | Implemented for `<appPath> --json` and `<appPath> why <route>` | Yes |
| `lumina check` | Run framework-aware checks. | Planned | Yes |
| `lumina test` | Run framework-aware test selection. | Planned | Yes |
| `lumina seo` | Run SEO audit. | Planned | Yes |
| `lumina map` | Query Lumina Map. | Implemented only for `affected <appPath> <file> --json`; broader map queries remain planned | Yes |
| `lumina workspace` | Inspect workspace graph, apps, and shared-file impact. | Planned | Yes |
| `lumina agent` | Generate or inspect agent context. | Planned | Yes |
| `lumina mcp` | Start MCP server. | Planned | No |
| `lumina edit` | Preview, apply, inspect, and undo safe-edit transactions. | Planned | Yes |
| `lumina migrate` | Prototype framework migration workflows. | Planned | Yes |
| `lumina bench` | Run planned benchmark fixtures and emit evidence metadata. | Implemented only for `--list --json` benchmark skeleton status; benchmark execution remains planned | Yes |

## Planned Command Variants

These variants are referenced by roadmap, guide, and contract docs. They remain planned until `@lumina/cli` implements and tests them, except for `lumina inspect why`, `lumina dev --port`, `lumina dev --once`, `lumina bench --list --json`, and the minimal `lumina map affected <appPath> <file> --json` query.

| Command variant | Purpose |
| --- | --- |
| `lumina inspect why` | Implemented for route source, layout, render-mode, and artifact evidence. |
| `lumina dev --port <port>` | Implemented for selecting a strict local dev-server port; if the port is occupied, the CLI exits with a clean message instead of probing silently. |
| `lumina dev --once` | Implemented for smoke-starting the dev server, writing artifacts, and closing immediately. |
| `lumina build --affected` | Build only apps, routes, packages, and artifacts selected by the workspace graph. |
| `lumina check --affected` | Run framework checks selected by affected workspace graph output. |
| `lumina test --affected` | Run tests selected by affected apps, routes, packages, and shared files. |
| `lumina map file` | Show graph details, route usage, and risk notes for one source file. |
| `lumina map route` | Show the graph slice and route context for one route. |
| `lumina map affected` | Implemented for direct local import route impact with `<appPath> <file> --json`; affected checks and workspace impact remain planned. |
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
| `lumina bench --list` | Implemented for listing benchmark skeleton status as compact JSON with `--json`. |
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

Do not rely on these flags until the owning command implements and tests them. The `--json` flag is implemented for `lumina routes <appPath>`, `lumina inspect <appPath>`, `lumina map affected <appPath> <file>`, `lumina build <appPath>`, and `lumina bench --list`.

## Implemented Dev Command

Local repository usage:

```bash
bun run lumina -- dev apps/www
bun run lumina -- dev apps/www --port 5173
bun run lumina -- dev apps/www --once
```

The implemented dev command writes `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `.lumina/generated/client/*.tsx`, and `.lumina/client/*.js`, starts a Vite server, renders static, dynamic, and catch-all page routes through React SSR, passes route `params` and `searchParams` to page components, renders nearest app-level or route-level `not-found.tsx` and `error.tsx` components for dev 404/500 responses, exposes route-specific dev hydration bundles through `/@lumina/client/*.js`, hydrates the `apps/www` root route counter in a browser smoke test, exposes `virtual:lumina/routes`, emits `.lumina/hmr-report.json` for route-file changes and direct local imported component affected-route updates, sends a `lumina:routes-updated` dev-server event for route-file changes, and returns stable fallback 404/500 HTML when a special component is missing or fails. Human output shows a quiet startup phase table with measured timings for `route discovery`, `render manifest`, `map generation`, `client bundles`, and `vite server`, followed by total ready time. It does not yet prove broader component-level browser HMR beyond direct local import affected-route reports.

The dev server uses the selected port strictly. If the default `5173` or a provided `--port` value is already occupied, the CLI exits nonzero with a clean port-in-use message and the developer should rerun with another `--port` value.

## Implemented Build Command

Local repository usage:

```bash
bun run lumina -- build apps/www
bun run lumina -- build apps/www --json
```

The implemented build command writes `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `.lumina/build-trace.json`, `.lumina/perf.report.json`, static HTML under `dist/public`, generated SSR route bundles under `dist/server/ssr-routes.js` when explicit SSR page routes exist, route-specific production client bundles under `dist/public/_lumina/client/*.js`, and deployment manifest copies under `dist/routes.manifest.json`, `dist/render.manifest.json`, and `dist/adapter.manifest.json`. Human output shows a quiet phase table with measured timings for `config`, `route discovery`, `render manifest`, `map generation`, `client bundles`, `static output`, optional `ssr server bundle`, and `adapter output`, followed by total elapsed time. JSON mode emits a compact `lumina.cli.v0` envelope with output and manifest paths and does not mix prose into stdout. It does not yet build API routes, SEO reports, or measured benchmark evidence.

## Implemented Start Command

Local repository usage after build:

```bash
bun run lumina -- start apps/www
bun run lumina -- start apps/www --port 4173
bun run lumina -- start apps/www --once
```

The implemented start command serves built static HTML from `dist/public` and generated SSR page routes from `dist/server/ssr-routes.js` through `@lumina/adapter-bun`, reports the built route count from `dist/routes.manifest.json`, and returns stable 404 HTML for unknown routes. The current request path does not need source route files, does not import compiler/map/agent/MCP/devtools code, returns `Cache-Control: no-store` for HTML and SSR responses, returns immutable cache headers for route-specific client bundles, returns sanitized 400 HTML for malformed encoded asset paths, and returns sanitized 500 HTML for failing generated SSR routes. API, health endpoint, compression, and cache-header expansion remain planned.

If build output is missing, `lumina start` exits nonzero with a clean message telling the developer to run `lumina build` first.

## Implemented Map Affected Command

Local repository usage:

```bash
bun run lumina -- map affected apps/www components/Hero.tsx --json
```

The implemented map affected command regenerates `.lumina/map.json`, reads direct local import edges, and emits a compact `lumina.cli.v0` envelope with the target file, affected routes, related files, and map artifact path. It currently covers route impact from direct static imports only. Workspace impact, affected checks, semantic graph queries, `lumina map file`, `lumina map route`, and `lumina map explain` remain planned.

## Implemented Benchmark List Command

Local repository usage:

```bash
bun run lumina -- bench --list --json
```

The implemented benchmark list command emits a compact `lumina.cli.v0` envelope containing the `lumina.benchmark-status.v0` skeleton report from `benchmarks/status.ts`. It lists the first benchmark surfaces and keeps each status at `not implemented` until real benchmark execution and raw results exist. It does not run benchmarks, emit timings, or support public performance claims.

## Planned Exit Code Policy

Exit codes are planned in [CLI JSON Contract](cli-json-contract.md). Commands should return `0` for success and non-zero for usage errors, validation failures, check failures, unsafe edit rejection, missing implementation, or unavailable dependencies.

## Out Of Scope

- Claiming command behavior before the specific `@lumina/cli` command exists.
- Defining final option names before implementation.
- Human-output formatting beyond planned examples.
