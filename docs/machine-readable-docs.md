# Machine-Readable Documentation

Status: Planned.

Audience: AI agents, maintainers, framework contributors.

Lumina should make documentation consumable by humans and AI agents. The full machine-readable docs pipeline is planned. The current `apps/www` static build emits a deterministic preview slice for the bundled public docs inventory: `dist/public/docs-index.json`, `dist/public/docs-navigation.json`, `dist/public/llms.txt`, and `dist/public/llms-full.txt`.

## Planned Outputs

| Output | Purpose | Production surface |
| --- | --- | --- |
| `AGENTS.md` | App-local operating guide for AI agents in generated user applications. | Agent-only app-local artifact; not a production runtime bundle |
| `llms.txt` | Compact public docs or app-local summary for AI tools. | `apps/www` public preview artifact exists; broader docs or agent artifact remains planned |
| `llms-full.txt` | Full AI-readable public docs or app-local context. | `apps/www` public preview artifact exists; broader docs or agent artifact remains planned |
| `docs-index.json` | Index of docs pages, status, audience, tags, and source paths. | `apps/www` public preview artifact exists; broader public docs artifact remains planned |
| `docs-navigation.json` | Sidebar and navigation sections with page status, source, and lane metadata. | `apps/www` public preview artifact exists; broader public docs artifact remains planned |
| `.lumina/routes.json` | Stable route manifest for apps. | Compiler source contract; adapter output consumes deployment-shaped `dist/*` copies |
| `.lumina/render-manifest.json` | Render modes and cache metadata for apps. | Compiler source contract; adapter output consumes deployment-shaped `dist/*` copies |
| `.lumina/map.json` | Queryable Lumina Map output for apps. | Compiler and agent source contract; not a production runtime bundle |
| `.lumina/map.readable.json` | Human- and agent-oriented Lumina Map export with labels, summaries, and source-doc links. | Agent and docs source contract; not a production runtime bundle |
| `.lumina/map.summary.md` | Markdown summary of routes, owners, risk surfaces, generated files, and recommended checks. | Agent and docs source contract; not a production runtime bundle |
| `.lumina/graph.json` | Compiler and agent graph data for apps. | Compiler and agent source contract; not a production runtime bundle |
| `.lumina/seo.report.json` | SEO audit output for apps. | Compiler and audit source contract; adapter output may copy report data into `dist/seo.report.json` |
| `.lumina/perf.report.json` | Performance and budget output for apps. | Compiler and audit source contract; not a production runtime bundle |
| `.lumina/workspace.json` | Workspace apps, packages, settings, and generated artifact index. | Compiler, CLI, map, and agent source contract; not a production runtime bundle |
| `.lumina/workspace-graph.json` | Cross-app graph for shared files, packages, routes, tests, owners, and artifacts. | Compiler, map, and agent source contract; not a production runtime bundle |
| `.lumina/affected.json` | Affected apps, routes, packages, tests, generated artifacts, and reasons. | CLI, CI, and agent source contract; not a production runtime bundle |
| `.lumina/build-trace.json` | Build phases, timings, cache behavior, and diagnostics. | Build observability artifact; not a production runtime bundle |
| `.lumina/cache-report.json` | Cache keys, hits, misses, invalidations, and reused artifact summary. | Build observability artifact; not a production runtime bundle |
| `.lumina/hmr-report.json` | Dev server update scope, invalidated modules, route updates, and timings. | Dev observability artifact; not a production runtime bundle |
| `.lumina/split-report.json` | Planned app or route split analysis, shared dependencies, and generated artifact movement. | Planning artifact; not a production runtime bundle |
| `.lumina/context/*.ctx.json` | Route or surface context capsules for apps. | Agent source contract; not a production runtime bundle |
| `.lumina/context/agent-index.json` | Index of generated agent context. | Agent source contract; not a production runtime bundle |
| `.lumina/mutations.json` | Safe edit mutation log for apps. | Agent and safe-edit source contract; not a production runtime bundle |
| `.lumina/generated/*` | Generated runtime modules for apps. | May feed production build output, but not agent metadata |
| `.lumina/generated/server-entry.ts` | Implemented Bun adapter-aware server entry. | Production build output |
| `.lumina/generated/client/*.tsx` | Generated source entries for route hydration bundles. | Build source artifact; not served directly in production |
| `.lumina/client/*.js` | Generated route-specific hydration bundles before adapter copying. | Compiler build artifact copied into production output when static build runs |
| `dist/public/_lumina/client/*.js` | Generated route-specific production hydration bundles for static built pages. | Production static asset |
| `dist/public/docs-index.json` | Deterministic `apps/www` public docs preview index generated from the bundled docs inventory. | Public static asset |
| `dist/public/docs-navigation.json` | Deterministic `apps/www` public docs preview navigation generated from the bundled docs inventory and curated docs lanes. | Public static asset |
| `dist/public/llms.txt` | Deterministic `apps/www` compact public docs preview for AI-assisted reading. | Public static asset |
| `dist/public/llms-full.txt` | Deterministic `apps/www` full public docs preview for AI-assisted reading. | Public static asset |
| `dist/routes.manifest.json` | Deployment-oriented route manifest copy for adapters. | Adapter artifact |
| `dist/render.manifest.json` | Deployment-oriented render manifest copy for adapters. | Adapter artifact |
| `dist/seo.report.json` | Deployment-oriented SEO report copy for adapters. | Adapter artifact |
| `dist/adapter.manifest.json` | Adapter capabilities and deployment output metadata. | Adapter artifact |
| `dist/*` | Production build output. | Yes |

The root `AGENTS.md` in this repository is not generated. It remains the authoritative hand-maintained operating guide for contributors and AI agents working on Lumina itself. Generated `AGENTS.md` files are planned only for user applications created or managed by Lumina.

Canonical generated artifact names must stay aligned with [Manifest Contracts](manifest-contracts.md), [API Reference](api-reference.md), [Runtime Contract](runtime-contract.md), [Agent Kernel](agent-kernel.md), and public reference docs. The `.lumina/*` files are compiler and agent source contracts. The named `dist/*` files are adapter-shaped deployment outputs. The readable map exports are planned documentation products: they should explain graph evidence without becoming production runtime inputs.

## `docs-index.json` Draft

```json
{
  "schemaVersion": "lumina.docs-index.v0",
  "docsVersion": "unreleased",
  "pages": [
    {
      "slug": "reference/routing",
      "href": "/docs/reference/routing",
      "source": "docs/public/reference/routing.md",
      "title": "Routing",
      "description": "File route behavior, current support, and planned grammar.",
      "status": "Planned",
      "lane": "Reference",
      "related": ["docs/routing.md"],
      "headings": ["Current Status", "Implemented Route Shapes"],
      "keywords": ["routing", "file-conventions"],
      "searchText": "Routing File route behavior..."
    },
    {
      "slug": "reference/security",
      "href": "/docs/reference/security",
      "source": "docs/public/reference/security.md",
      "title": "Security",
      "description": "Security posture, high-risk areas, and safety boundaries.",
      "status": "Planned",
      "lane": "Reference",
      "related": ["docs/security-contract.md", "docs/threat-model.md"],
      "headings": ["Current Status", "High-Risk Surfaces"],
      "keywords": ["security", "threat-model"],
      "searchText": "Security Security posture..."
    }
  ]
}
```

The current `apps/www` preview omits `generatedAt` so repeated static builds can produce byte-stable JSON. Future versioned docs may add a deterministic version or build identifier when releases exist.

## `docs-navigation.json` Draft

```json
{
  "schemaVersion": "lumina.docs-navigation.v0",
  "docsVersion": "unreleased",
  "sections": [
    {
      "title": "Reference",
      "kind": "curated",
      "links": [
        {
          "title": "Security",
          "href": "/docs/reference/security",
          "status": "Planned",
          "source": "docs/public/reference/security.md",
          "lane": "Reference",
          "description": "Security posture, high-risk areas, and safety boundaries."
        }
      ]
    },
    {
      "title": "Reference",
      "kind": "inventory",
      "links": [
        {
          "title": "Security",
          "href": "/docs/reference/security",
          "status": "Planned",
          "source": "docs/public/reference/security.md",
          "lane": "Reference",
          "description": "Security posture, high-risk areas, and safety boundaries."
        }
      ]
    }
  ]
}
```

## Rules

- Include schema versions.
- Include docs or package version context once releases exist.
- Keep output deterministic.
- Use normalized POSIX-style paths.
- Do not include secrets, private tokens, or local machine paths.
- Keep AI-facing JSON compact.
- Link each generated item back to its source doc when practical.
- Distinguish docs for the framework repository from generated docs for user applications.
- Do not let generated app-local agent files override this repository's root `AGENTS.md`.

## Maintenance

Machine-readable docs should be generated by the full docs index or public docs pipeline once that pipeline exists. Until then, this page is the broader contract draft and the `apps/www` build output is a preview slice.

Use [Documentation Verification](docs-verification.md) to check that `llms.txt`, `llms-full.txt`, `docs-index.json`, `docs-navigation.json`, schema versions, deterministic output, optional `generatedAt` behavior, and generated agent context remain documented consistently while the broader outputs are still planned.

Version behavior should follow [Versioning And Upgrades](versioning-and-upgrades.md).

Public docs metadata and route behavior should follow [Public Docs Site Architecture](public-docs-site-architecture.md) so generated docs indexes match the future website.

The future renderer, route mapping, frontmatter, canonical URLs, source docs, and website navigation should stay connected through [Public Frontmatter Standard](public-frontmatter-standard.md), [Docs Site Build Plan](docs-site-build-plan.md), and [Website Content Map](website-content-map.md).

Routing and route-manifest pages should follow [Routing Contract](routing-contract.md) so docs indexes, public reference pages, and generated route context agree on route terminology.

API route docs should follow [API Route Contract](api-route-contract.md) so docs indexes, public reference pages, generated route context, and future OpenAPI output agree on handler terminology.

Schema docs should follow [Schema Contract](schema-contract.md) so docs indexes, public reference pages, generated route context, and future OpenAPI output agree on validation and serializer terminology.

Cache docs should follow [Cache Contract](cache-contract.md) so docs indexes, public reference pages, route context, manifests, and future cache reports agree on cache terminology.

## Out Of Scope

- Embedding full source code in public AI docs by default.
- Shipping agent metadata in production runtime bundles.
- Letting AI docs override `AGENTS.md` or security policy.

