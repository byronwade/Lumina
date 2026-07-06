# Manifest Contracts

Status: Planned.

Audience: framework contributors, adapter authors, AI agents.

NeedleStart planned manifests are the contracts between compiler, runtime adapters, CLI, Needle Map, Agent Kernel, MCP, devtools, and tests.

Planned generated files include:

- `.needle/routes.json`
- `.needle/render-manifest.json`
- `.needle/map.json`
- `.needle/graph.json`
- `.needle/seo.report.json`
- `.needle/perf.report.json`
- `.needle/context/*.ctx.json`
- `.needle/context/agent-index.json`
- `.needle/generated/*`
- `dist/adapter.manifest.json`
- `dist/*`

Adapters may also emit deployment-oriented copies such as `dist/routes.manifest.json`, `dist/render.manifest.json`, and `dist/seo.report.json`. The canonical compiler and agent contracts stay under `.needle/`; `dist/*` is the planned production build output surface.

## Source

- [Manifest Contracts](../../manifest-contracts.md)
- [Routing Contract](../../routing-contract.md)
- [API Route Contract](../../api-route-contract.md)
- [Schema Contract](../../schema-contract.md)
- [Cache Contract](../../cache-contract.md)
- [Diagnostics Contract](../../diagnostics-contract.md)
- [Machine-Readable Documentation](../../machine-readable-docs.md)

