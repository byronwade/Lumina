# Routing Contract

Status: Planned.

Audience: framework contributors, app developers, runtime adapter authors, AI agents.

This page defines the route-discovery contract for Lumina. The initial `@lumina/compiler` package API now implements the MVP page/API route grammar and in-memory routes manifest shaping covered by fixture tests. CLI integration, generated `.lumina/routes.json` files, unsupported-convention diagnostics, case-collision diagnostics, runtime matching, and broader route conventions remain planned.

## Contract Goals

Route discovery must produce one deterministic route graph that can feed:

- `.lumina/routes.json`.
- render and adapter manifests.
- Lumina Map route nodes.
- CLI and MCP route inspection.
- fixture tests and public reference docs.

Runtime adapters must consume generated route artifacts instead of rediscovering source files.

## App Route Root

Lumina plans to discover app routes under `app/`.

```txt
app/
  layout.tsx
  page.tsx
  about/
    page.tsx
  blog/
    [slug]/
      page.tsx
  docs/
    [...parts]/
      page.tsx
  (marketing)/
    pricing/
      page.tsx
  api/
    health.ts
```

The route root may become configurable later through `lumina.config.ts`, but the first route-discovery implementation should treat `app/` as the only supported source root.

## Route File Kinds

| Source file | Planned kind | URL rule |
| --- | --- | --- |
| `app/page.tsx` | `page` | `/` |
| `app/**/page.tsx` | `page` | folder path without route groups |
| `app/**/layout.tsx` | `layout` | wraps nested page routes; not a route by itself |
| `app/api/**/*.ts` | `api` | file path below `app/api/` |
| `app/not-found.tsx` | `notFound` | app-level 404 UI; not a route by itself |
| `app/**/not-found.tsx` | `notFound` | route-level 404 UI; not a route by itself |
| `app/error.tsx` | `error` | app-level error UI; not a route by itself |
| `app/**/error.tsx` | `error` | route-level error UI; not a route by itself |

The first implementation should keep the supported route-file set small. Unsupported special files should emit diagnostics instead of being ignored silently when their names look like framework conventions.

## Segment Grammar

Route segment parsing should be explicit and shared by compiler, router, manifest tests, and docs.

| Segment | Meaning | URL contribution | Param shape |
| --- | --- | --- | --- |
| `page.tsx` | Page marker | none | none |
| `layout.tsx` | Layout marker | none | none |
| `api` | API namespace | `/api` | none |
| `about` | Static segment | `/about` | none |
| `[slug]` | Dynamic segment | `/:slug` | `{ name: "slug", type: "string" }` |
| `[...parts]` | Catch-all segment | `/*parts` in internal matcher, displayed as `/docs/*` in human docs | `{ name: "parts", type: "string[]" }` |
| `(marketing)` | Route group | none | none |

Reserved but not required for the first route-discovery milestone:

- Optional catch-all segments such as `[[...slug]]`.
- Parallel routes.
- Intercepted routes.
- Middleware or proxy file conventions.
- Per-segment route matchers.

If these reserved patterns appear before support exists, route discovery should emit an unsupported-convention diagnostic with the source file and the nearest supported alternative.

## URL Mapping

Planned mapping examples:

| Source file | Kind | Route path | Params |
| --- | --- | --- | --- |
| `app/page.tsx` | `page` | `/` | `[]` |
| `app/about/page.tsx` | `page` | `/about` | `[]` |
| `app/blog/[slug]/page.tsx` | `page` | `/blog/:slug` | `slug: string` |
| `app/docs/[...parts]/page.tsx` | `page` | `/docs/*` | `parts: string[]` |
| `app/(marketing)/pricing/page.tsx` | `page` | `/pricing` | `[]` |
| `app/api/health.ts` | `api` | `/api/health` | `[]` |
| `app/api/users/[id].ts` | `api` | `/api/users/:id` | `id: string` |

Human docs may show dynamic routes as `/blog/:slug` and catch-all routes as `/docs/*`. Machine-readable manifests should keep structured parameter data so tools do not need to parse display strings.

## Route IDs

Route IDs must be stable across operating systems and independent of absolute local paths.

Planned route ID rules:

1. Start from the POSIX-normalized source path relative to the application root, keeping the `app/` prefix.
2. Remove the file extension.
3. Convert `/` to `.`.
4. Convert `[name]` to `$name`.
5. Convert `[...name]` to `$name.splat`.
6. Convert route groups such as `(marketing)` to `$group_marketing` so source-distinct routes remain distinguishable.
7. Append `.api` for API files whose filename is not already a route marker.

Examples:

| Source file | Route ID |
| --- | --- |
| `app/page.tsx` | `app.page` |
| `app/blog/[slug]/page.tsx` | `app.blog.$slug.page` |
| `app/docs/[...parts]/page.tsx` | `app.docs.$parts.splat.page` |
| `app/(marketing)/pricing/page.tsx` | `app.$group_marketing.pricing.page` |
| `app/api/health.ts` | `app.api.health.api` |

The exact syntax can still change before implementation, but the invariant cannot: a route ID must be deterministic, path-derived, and stable enough for manifests, CLI JSON, MCP tools, tests, and mutation logs.

## Route Manifest Shape

`.lumina/routes.json` should include a schema version, generation metadata, source inputs, and sorted route entries.

Draft route entry:

```json
{
  "id": "app.blog.$slug.page",
  "kind": "page",
  "path": "/blog/:slug",
  "sourceFile": "app/blog/[slug]/page.tsx",
  "segments": [
    { "kind": "static", "value": "blog" },
    { "kind": "dynamic", "name": "slug" }
  ],
  "params": [
    { "name": "slug", "type": "string", "required": true }
  ],
  "layouts": ["app/layout.tsx"],
  "routeGroups": [],
  "diagnostics": []
}
```

Draft manifest envelope:

```json
{
  "schemaVersion": "lumina.routes.v0",
  "generatedAt": "2026-07-06T00:00:00.000Z",
  "source": {
    "config": "lumina.config.ts",
    "routeRoot": "app"
  },
  "routes": []
}
```

The initial in-memory manifest schema is implemented in `@lumina/compiler`. File emission to `.lumina/routes.json` remains planned and must continue to follow [Manifest Contracts](manifest-contracts.md).

## Sorting And Matching

Generated route arrays must sort deterministically. Matching priority should be documented before runtime adapters rely on it.

Planned sort key:

1. `kind`, with page routes before API routes only for manifest readability. Runtime matchers may keep separate tables by kind.
2. Static segment count, descending.
3. Dynamic segment count, ascending.
4. Catch-all segment count, ascending.
5. Normalized route path, ascending.
6. Normalized source file, ascending.

Planned match priority within one route kind:

1. Exact static routes.
2. Dynamic routes.
3. Catch-all routes.

If two routes of the same kind normalize to the same path, route discovery must emit a conflict diagnostic instead of picking one. Route groups make this especially important: `app/(marketing)/pricing/page.tsx` and `app/(shop)/pricing/page.tsx` both map to `/pricing` and therefore conflict.

## Diagnostics

Route discovery should report structured diagnostics through the same diagnostic model used by CLI JSON and manifests.

Required planned diagnostic cases:

| Code | Severity | When |
| --- | --- | --- |
| `ROUTE_DUPLICATE_PATH` | `error` | Two files of the same kind produce the same route path. |
| `ROUTE_INVALID_SEGMENT` | `error` | A bracketed segment is malformed. |
| `ROUTE_UNSUPPORTED_CONVENTION` | `warning` or `error` | A known but unsupported convention appears, such as optional catch-all before support exists. |
| `ROUTE_API_METHOD_MISSING` | `warning` | An API route has no supported HTTP method export once API parsing exists. |
| `ROUTE_CASE_COLLISION` | `error` | Two source paths differ only by case on a case-insensitive filesystem. |

Diagnostics must include normalized `file`, route `path` when known, and a concise remediation.

## Fixture Requirements

The first route-discovery implementation should include fixtures for:

- Root page.
- Nested static page.
- Dynamic page.
- Catch-all page.
- Route group page.
- Nested layout collection.
- API route.
- Dynamic API route.
- Duplicate path through route groups.
- Invalid segment syntax.
- Case-collision behavior where the host filesystem allows it.

Snapshot tests should prove route order, IDs, param shapes, diagnostics, and POSIX path normalization.

## Public Docs Requirements

When route discovery lands, update:

- [Routing](routing.md).
- [File Conventions](file-conventions.md).
- [API Routes](api-routes.md).
- [Manifest Contracts](manifest-contracts.md).
- [Compiler IR](compiler-ir.md).
- [Public File Conventions](public/reference/file-conventions.md).
- [Public Project Structure](public/reference/project-structure.md).

Do not move this page from planned to implemented until those docs and route-discovery tests agree.

## Research Notes

This contract adapts current patterns from mature file-based routers:

- Next.js documents project structure, route groups, dynamic segments, optional catch-all segments, and route handler files as explicit conventions.
- SvelteKit documents route groups that do not affect URL paths and keeps route files special within route directories.
- Nuxt documents dynamic and catch-all file routing plus precedence between named parent routes and nested dynamic routes.
- Astro documents file-based routing, dynamic routes, rest parameters, endpoint files, and route precedence.

Lumina should keep the beginner-facing convention familiar while making the machine-readable manifest stricter than most framework docs from the start.

## Out Of Scope

- Final generated schema before implementation.
- Runtime adapter matching code.
- Middleware or proxy routing.
- React Server Components route behavior.
- Internationalized routing.
- Optional catch-all support in the first route-discovery milestone.
