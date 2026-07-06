# Machine-Readable Documentation

Status: Planned.

Audience: AI agents, maintainers, framework contributors.

NeedleStart should make documentation consumable by humans and AI agents. Machine-readable docs are planned outputs, not implemented behavior.

## Planned Outputs

| Output | Purpose | Production bundle? |
| --- | --- | --- |
| `AGENTS.md` | App-local operating guide for AI agents in generated user applications. | No production runtime bundles |
| `llms.txt` | Compact public docs or app-local summary for AI tools. | No production runtime bundles |
| `llms-full.txt` | Full AI-readable public docs or app-local context. | No production runtime bundles |
| `docs-index.json` | Index of docs pages, status, audience, tags, and source paths. | Public docs artifact only |
| `.needle/context/*.ctx.json` | Route or surface context capsules for apps. | No production runtime bundles |
| `.needle/context/agent-index.json` | Index of generated agent context. | No production runtime bundles |

The root `AGENTS.md` in this repository is not generated. It remains the authoritative hand-maintained operating guide for contributors and AI agents working on NeedleStart itself. Generated `AGENTS.md` files are planned only for user applications created or managed by NeedleStart.

## `docs-index.json` Draft

```json
{
  "schemaVersion": "needle.docs-index.v0",
  "docsVersion": "unreleased",
  "generatedAt": "2026-07-06T00:00:00.000Z",
  "pages": [
    {
      "path": "docs/routing.md",
      "title": "Routing",
      "status": "planned",
      "audience": ["app developers", "AI agents"],
      "tags": ["routing", "file-conventions"],
      "source": "manual"
    },
    {
      "path": "docs/routing-contract.md",
      "title": "Routing Contract",
      "status": "planned",
      "audience": ["framework contributors", "runtime adapter authors", "AI agents"],
      "tags": ["routing", "manifests", "diagnostics"],
      "source": "manual"
    },
    {
      "path": "docs/api-route-contract.md",
      "title": "API Route Contract",
      "status": "planned",
      "audience": ["framework contributors", "runtime adapter authors", "security reviewers", "AI agents"],
      "tags": ["api-routes", "schemas", "diagnostics", "manifests"],
      "source": "manual"
    },
    {
      "path": "docs/schema-contract.md",
      "title": "Schema Contract",
      "status": "planned",
      "audience": ["framework contributors", "API route authors", "runtime adapter authors", "AI agents"],
      "tags": ["schemas", "validation", "serializers", "openapi"],
      "source": "manual"
    },
    {
      "path": "docs/cache-contract.md",
      "title": "Cache Contract",
      "status": "planned",
      "audience": ["framework contributors", "runtime adapter authors", "performance reviewers", "AI agents"],
      "tags": ["cache", "headers", "revalidation", "manifests"],
      "source": "manual"
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

Machine-readable docs should be generated once the docs index or public docs pipeline exists. Until then, this page is the contract draft.

Use [Documentation Verification](docs-verification.md) to check that `llms.txt`, `llms-full.txt`, `docs-index.json`, schema versions, and generated agent context remain documented consistently while the outputs are still planned.

Version behavior should follow [Versioning And Upgrades](versioning-and-upgrades.md).

Public docs metadata and route behavior should follow [Public Docs Site Architecture](public-docs-site-architecture.md) so generated docs indexes match the future website.

Routing and route-manifest pages should follow [Routing Contract](routing-contract.md) so docs indexes, public reference pages, and generated route context agree on route terminology.

API route docs should follow [API Route Contract](api-route-contract.md) so docs indexes, public reference pages, generated route context, and future OpenAPI output agree on handler terminology.

Schema docs should follow [Schema Contract](schema-contract.md) so docs indexes, public reference pages, generated route context, and future OpenAPI output agree on validation and serializer terminology.

Cache docs should follow [Cache Contract](cache-contract.md) so docs indexes, public reference pages, route context, manifests, and future cache reports agree on cache terminology.

## Out Of Scope

- Embedding full source code in public AI docs by default.
- Shipping agent metadata in production runtime bundles.
- Letting AI docs override `AGENTS.md` or security policy.

