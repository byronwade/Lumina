# Manifest Contracts

Status: Planned.

Audience: framework contributors, runtime adapter authors, AI agents.

Manifest contracts are the stable bridge between the compiler, runtime adapters, CLI, Needle Map, Agent Kernel, MCP, devtools, and tests.

Shared diagnostic fields in manifests should follow [Diagnostics Contract](diagnostics-contract.md).

## Planned Generated Artifacts

| Manifest | Purpose |
| --- | --- |
| `.needle/routes.json` | Discovered routes. |
| `.needle/render-manifest.json` | Render modes and cache metadata. |
| `.needle/map.json` | Public app graph output. |
| `.needle/graph.json` | Compiler and agent graph data. |
| `.needle/seo.report.json` | SEO audit output. |
| `.needle/perf.report.json` | Performance and budget output. Follows [Performance Contract](performance-contract.md). |
| `.needle/context/*.ctx.json` | Route or surface context capsules for agents and tools. |
| `.needle/context/agent-index.json` | Agent context index. |
| `.needle/generated/*` | Generated runtime modules. |
| `dist/adapter.manifest.json` | Adapter capabilities. |
| `dist/*` | Production build output. |

Adapters may copy selected canonical artifacts into deployment-oriented files such as `dist/routes.manifest.json`, `dist/render.manifest.json`, and `dist/seo.report.json`. The `.needle/*` files remain the source contracts for compiler, CLI, MCP, Agent Kernel, devtools, and tests.

## Routes Manifest Draft

`.needle/routes.json` should be the source of truth for discovered route files after compilation. The detailed planned route grammar lives in [Routing Contract](routing-contract.md).

Draft route manifest envelope:

```json
{
  "schemaVersion": "needle.routes.v0",
  "generatedAt": "2026-07-06T00:00:00.000Z",
  "source": {
    "config": "needle.config.ts",
    "routeRoot": "app"
  },
  "routes": []
}
```

Draft route entry:

```json
{
  "id": "app.blog.$slug.page",
  "kind": "page",
  "path": "/blog/:slug",
  "sourceFile": "app/blog/[slug]/page.tsx",
  "params": [{ "name": "slug", "type": "string", "required": true }],
  "layouts": ["app/layout.tsx"],
  "routeGroups": [],
  "diagnostics": []
}
```

The final schema must be backed by route-discovery fixtures before it is marked implemented.

API route entries should follow [API Route Contract](api-route-contract.md) for method lists, schema flags, cache metadata, hot API flags, and API diagnostics.

Schema references should follow [Schema Contract](schema-contract.md), especially stable schema IDs, source-file references, OpenAPI mapping, and serializer diagnostics.

Cache fields should follow [Cache Contract](cache-contract.md), especially cache modes, scopes, TTLs, stale windows, tags, generated headers, diagnostics, and revalidation metadata.

SEO report fields should follow [SEO Contract](seo-contract.md), especially metadata resolution, sitemap inclusion reasons, robots policy, structured data status, diagnostics, and stable route ordering.

Performance report fields should follow [Performance Contract](performance-contract.md), especially route budgets, browser-delivery metadata, resource hints, compression evidence, bfcache eligibility, diagnostics, and benchmark evidence.

## Performance And Delivery Fields

`.needle/perf.report.json` should become the shared place for browser-delivery evidence that the compiler, adapters, CLI, docs, and agents can inspect.

Planned route-level delivery fields:

```json
{
  "routeId": "app.index.page",
  "delivery": {
    "assets": {
      "scripts": [],
      "styles": [],
      "images": [],
      "fonts": []
    },
    "chunks": {
      "initial": [],
      "async": [],
      "css": [],
      "waterfallRisks": []
    },
    "sourceMaps": {
      "public": false,
      "hidden": false
    },
    "resourceHints": [
      {
        "rel": "preload",
        "as": "image",
        "href": "/assets/hero.avif",
        "source": "compiler",
        "why": "Likely LCP image for /"
      }
    ],
    "earlyHints103": {
      "eligible": true,
      "adapterSupported": false,
      "linkHeaders": []
    },
    "compression": {
      "staticPrecompressed": true,
      "dynamicText": "adapter-dependent",
      "encodings": ["br", "gzip"]
    },
    "bfcache": {
      "eligible": true,
      "knownBlockers": []
    },
    "fieldData": {
      "rumEnabled": false,
      "source": "none"
    }
  }
}
```

Rules:

- Delivery metadata must come from route assets, render output, config, or adapter capability manifests, not from guesses.
- Route asset paths must be normalized and public-artifact safe.
- `resourceHints` must include `rel`, `href`, `source`, and `why`.
- Early Hints fields must distinguish route eligibility from adapter support.
- Compression fields must distinguish static precompression from dynamic response compression.
- bfcache fields must list known blockers instead of hiding them behind a single pass/fail label.
- `chunks` must distinguish initial, async, and CSS chunks and must list known browser waterfall risks.
- `sourceMaps` must distinguish public from hidden source maps.
- `fieldData.rumEnabled` must default to false unless app config explicitly enables field instrumentation.

## Contract Rules

- Include schema version.
- Normalize paths across operating systems.
- Sort arrays by stable keys.
- Keep agent-facing JSON compact.
- Avoid absolute local paths in public artifacts.
- Document source inputs when practical.

Schema version changes must follow [Versioning And Upgrades](versioning-and-upgrades.md). Required field additions, field removals, field renames, field meaning changes, and observable ordering or path-normalization changes require migration notes.

## Draft Envelope

Every generated JSON artifact should eventually use a predictable envelope:

```json
{
  "schemaVersion": "needle.routes.v0",
  "generatedAt": "2026-07-06T00:00:00.000Z",
  "source": {
    "config": "needle.config.ts"
  }
}
```

The exact fields belong in the concrete manifest schema once implementation exists.

CLI JSON output has its own planned envelope in [CLI JSON Contract](cli-json-contract.md). Manifest JSON and CLI JSON should share core route, graph, SEO, diagnostic, and check shapes where practical, but they do not need identical top-level envelopes.

Config-derived manifest fields should follow [Configuration Contract](config-contract.md), especially path normalization and secret-exclusion rules.

Diagnostic fields should follow [Diagnostics Contract](diagnostics-contract.md), especially stable codes, severity values, source locations, remediations, docs links, related locations, and secret-exclusion rules.

Adapter manifest fields should follow [Adapter Contract](adapter-contract.md), especially runtime name, package name, entry path, public directory, capability booleans, unsupported features, environment variable names, diagnostics, and evidence requirements.

## Out Of Scope

- Final JSON schemas before implementation.
- Backward compatibility guarantees before the first release.
- Runtime rediscovery of source files.
