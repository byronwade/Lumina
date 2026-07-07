# Website Content Map

Status: Planned.

Audience: docs site builders, maintainers, AI agents.

This page maps repository docs to future public website pages.

The route and metadata contract for these pages is defined in [Public Docs Site Architecture](public-docs-site-architecture.md) and [Public Frontmatter Standard](public-frontmatter-standard.md).

This map is also the planned source mapping input for the future docs renderer, `docs-index.json`, `docs-navigation.json`, `llms.txt`, and `llms-full.txt`. Keep route mapping, frontmatter expectations, canonical URLs, source mapping, and machine-readable docs output aligned when public pages move.

## Planned Website Navigation

- Home: `docs/public/index.md`.
- Docs: `docs/public/docs.md`.
- Roadmap: `docs/public/roadmap.md`.
- Concepts:
  - App graph: `docs/public/concepts/app-graph.md`.
  - SEO-first rendering: `docs/public/concepts/seo-first.md`.
  - Agent-safe workflows: `docs/public/concepts/agent-native.md`.
  - Whole-system speed: `docs/public/concepts/speed.md`.
  - Compiler/runtime split: `docs/public/concepts/compiler-runtime.md`.
  - Safe edits: `docs/public/concepts/safe-edits.md`.
- Guides:
  - Create app: `docs/public/guides/create-app.md`.
  - Static page: `docs/public/guides/static-page.md`.
  - SEO metadata: `docs/public/guides/seo-metadata.md`.
  - API route: `docs/public/guides/api-route.md`.
  - Hot API route: `docs/public/guides/hot-api.md`.
  - Lumina Map: `docs/public/guides/lumina-map.md`.
  - Agent context: `docs/public/guides/agent-context.md`.
- Reference:
  - CLI: `docs/public/reference/cli.md`.
  - Diagnostics: `docs/public/reference/diagnostics.md`.
  - Config: `docs/public/reference/config.md`.
  - Adapters: `docs/public/reference/adapters.md`.
  - Examples: `docs/public/reference/examples.md`.
  - Project structure: `docs/public/reference/project-structure.md`.
  - File conventions: `docs/public/reference/file-conventions.md`.
  - Routing: `docs/public/reference/routing.md`.
  - API routes: `docs/public/reference/api-routes.md`.
  - Schema: `docs/public/reference/schema.md`.
  - Cache: `docs/public/reference/cache.md`.
  - SEO: `docs/public/reference/seo.md`.
  - Accessibility: `docs/public/reference/accessibility.md`.
  - Security: `docs/public/reference/security.md`.
  - Performance: `docs/public/reference/performance.md`.
  - Render modes: `docs/public/reference/render-modes.md`.
  - Manifest contracts: `docs/public/reference/manifest-contracts.md`.
  - Testing: `docs/public/reference/testing.md`.
  - MCP: `docs/public/reference/mcp.md`.
- Deployment:
  - Overview: `docs/public/deployment/overview.md`.
  - Benchmarks: `docs/public/deployment/benchmarks.md`.
- Comparisons: `docs/public/comparisons/overview.md`.
- Community:
  - Overview: `docs/public/community/overview.md`.
  - Contributing: `docs/public/community/contributing.md`.
  - Governance: `docs/public/community/governance.md`.

## Source Mapping

| Website area | Source docs |
| --- | --- |
| Home | `README.md`, `VISION.md` |
| Public home | `docs/public/index.md`, `README.md`, `VISION.md` |
| Public docs landing | `docs/public/docs.md`, `docs/README.md`, `docs/public-docs-site-architecture.md`, `docs/public-frontmatter-standard.md`, `docs/docs-site-build-plan.md` |
| Getting Started | `docs/public/guides/create-app.md`, `docs/public/reference/examples.md`, `docs/getting-started.md`, `docs/examples-contract.md`, `docs/status.md`, `docs/mvp-alpha-scope.md`, `docs/task-backlog.md` |
| Guides | `docs/public/guides/*`, `docs/guides.md` |
| API Reference | `docs/public/reference/*`, `docs/api-reference.md`, `docs/cli.md`, `docs/cli-json-contract.md`, `docs/diagnostics-contract.md`, `docs/config.md`, `docs/adapter-contract.md`, `docs/examples-contract.md`, `docs/examples-catalog.md`, `docs/file-conventions.md`, `docs/routing-contract.md`, `docs/api-route-contract.md`, `docs/schema-contract.md`, `docs/cache-contract.md`, `docs/seo-contract.md`, `docs/accessibility-contract.md`, `docs/security-contract.md`, `docs/threat-model.md`, `docs/performance-contract.md`, `docs/benchmark-fixtures.md`, `docs/testing-contract.md`, `docs/product-build-readiness.md` |
| Concepts | `docs/public/concepts/*`, `ARCHITECTURE.md`, `docs/lumina-map.md`, `docs/agent-kernel.md` |
| Deployment | `docs/public/deployment/*`, `docs/deployment.md`, `docs/adapters.md`, `docs/compatibility.md` |
| Community | `docs/public/community/*`, `CONTRIBUTING.md`, `GOVERNANCE.md`, `CODE_OF_CONDUCT.md`, `docs/first-contribution.md` |
| Comparisons | `docs/public/comparisons/*`, `docs/comparisons.md`, `docs/documentation-research.md` |

## Public Source Coverage

Every internal source linked by a public page must also be listed here so the future docs site can validate source links, related-doc metadata, and machine-readable docs output.

- `SECURITY.md`
- `docs/api-routes.md`
- `docs/benchmark-methodology.md`
- `docs/benchmarks.md`
- `docs/cache.md`
- `docs/compiler-ir.md`
- `docs/config-contract.md`
- `docs/docs-site-build-plan.md`
- `docs/docs-freshness-policy.md`
- `docs/docs-verification.md`
- `docs/engineering-standards.md`
- `docs/getting-started.md`
- `docs/hot-api-path.md`
- `docs/machine-readable-docs.md`
- `docs/maintainer-guide.md`
- `docs/manifest-contracts.md`
- `docs/mcp-server.md`
- `docs/mvp-alpha-scope.md`
- `docs/open-source-community.md`
- `docs/operating-cadence.md`
- `docs/package-map.md`
- `docs/performance.md`
- `docs/phase-1-build-plan.md`
- `docs/public-docs-site-architecture.md`
- `docs/public-frontmatter-standard.md`
- `docs/roadmap.md`
- `docs/routing.md`
- `docs/runtime-contract.md`
- `docs/safe-edit-transactions.md`
- `docs/schema.md`
- `docs/security.md`
- `docs/seo-engine.md`
- `docs/speed-decisions.md`
- `docs/speed-strategy.md`
- `docs/task-backlog.md`
- `docs/testing.md`
- `docs/website-content-map.md`
