# Cache Contract

Status: Planned.

Audience: framework contributors, app developers, runtime adapter authors, performance reviewers, security reviewers, AI agents.

This page defines the planned cache contract for NeedleStart. Caching is not implemented yet. The contract exists so render modes, API routes, hot APIs, runtime adapters, Needle Map, CLI output, and agent context all explain cache behavior the same way.

## Contract Goals

NeedleStart caching must be:

- explicit rather than inferred silently,
- visible in generated manifests and CLI JSON,
- explainable through Needle Map and `needle inspect`,
- safe by default for SSR and API routes,
- compatible with HTTP cache headers,
- precise about invalidation and stale behavior,
- testable through fixture apps and adapter HTTP tests.

## Default Rules

Planned defaults:

| Surface | Default cache behavior |
| --- | --- |
| Hashed static assets | Public immutable cache. |
| Static HTML | Route-specific cache plan from render mode. |
| Prerendered HTML | Route-specific cache plan with revalidation metadata when configured. |
| SSR routes | `no-store` unless explicitly configured. |
| API routes | `no-store` unless explicitly configured. |
| Hot API routes | `no-store` unless `apiHot()` config opts into micro-cache or response cache. |
| Agent context | Dev/build artifact only; not shipped in production runtime bundles. |

Authenticated, session-sensitive, billing, webhook, and admin routes must never become cacheable through inference.

## Cache Plan Shape

The Phase 1 scaffold currently exposes a minimal `CachePlan` placeholder from `@needle/core`:

```ts
type CachePlan =
  | { mode: "no-store" }
  | {
      mode: "public"
      ttlSeconds: number
      staleWhileRevalidateSeconds?: number
      tags?: string[]
    }
```

This scaffold shape exists so packages, docs, and tests can share one owner for cache metadata before cache behavior exists. It is not the final cache model.

Planned expanded cache plan:

```ts
type CachePlan = {
  mode: "no-store" | "immutable" | "ttl" | "stale-while-revalidate"
  scope: "browser" | "shared" | "server" | "micro"
  ttlSeconds?: number
  staleSeconds?: number
  tags?: string[]
  headers?: Record<string, string>
  reason: string
}
```

Rules:

- `mode` must be explicit.
- `reason` must explain why the plan was chosen.
- `ttlSeconds` and `staleSeconds` must be positive integers when present.
- Tags must be deterministic strings.
- Header output must be derived from the plan, not separately hand-authored by adapters.

The final expanded type belongs in `@needle/core` when implementation starts. Any implementation PR that changes `CachePlan` must update this page, the public cache reference, fixtures, scaffold tests, and generated manifest examples in the same change.

## Public API Draft

Cache APIs are not final, but route-level cache behavior should be explicit in source.

```ts
import { prerender } from "needlestart"

export const render = prerender({
  revalidate: 300,
  cache: {
    tags: ["products"],
    stale: 60,
  },
})
```

API route draft:

```ts
export const config = {
  cache: {
    mode: "ttl",
    ttl: 60,
    tags: ["products"],
  },
}
```

Hot API draft:

```ts
export const render = apiHot({
  cache: {
    ttl: "100ms",
    key: ({ params }) => `user:${params.id}`,
  },
})
```

Exact helper names and option names must be finalized with tests before public API docs mark them implemented.

## HTTP Header Mapping

Cache plans should map to HTTP headers consistently.

Draft mapping:

| Plan | Header direction |
| --- | --- |
| `no-store` | `Cache-Control: no-store` |
| `immutable` hashed asset | `Cache-Control: public, max-age=31536000, immutable` |
| `ttl` public route | `Cache-Control: public, max-age=<ttl>` |
| `ttl` shared cache only | `Cache-Control: public, s-maxage=<ttl>` plus browser policy when configured |
| `stale-while-revalidate` | `Cache-Control` with `max-age`, `s-maxage`, and `stale-while-revalidate` as appropriate |

Rules:

- Generated headers must be visible in manifests or reports.
- Adapter-specific cache features may be added later, but they must not contradict the core plan.
- Manual header overrides must be documented and produce diagnostics if they conflict with the cache plan.

## Cache Tags

Cache tags are planned as named invalidation handles.

Rules:

- Tags must be deterministic.
- Tags must appear in Needle Map when they connect routes, APIs, data sources, or generated artifacts.
- Tags must be listed in route context capsules for affected routes.
- Tags must be excluded from production bundles when they are agent-only metadata.
- Tag names must not include secrets, user tokens, raw emails, or private identifiers.

Tag examples:

```txt
product:list
product:123
docs:sidebar
marketing:pricing
```

## Revalidation

Planned revalidation behaviors:

- `revalidateTag(tag)` invalidates all cache entries associated with a tag.
- `revalidatePath(path)` may be added later for route-path invalidation.
- Stale-while-revalidate behavior must say whether stale content is served while refresh happens.
- Revalidation must produce a structured result for CLI and future MCP tools.
- Revalidation must be logged enough for audit and debugging.

Draft result:

```json
{
  "ok": true,
  "tag": "product:list",
  "matchedEntries": 3,
  "mode": "stale-while-revalidate"
}
```

The first implementation may support only tag metadata and diagnostics before live invalidation exists.

## Micro-Cache

Hot API micro-cache is a separate, explicit cache surface.

Rules:

- Micro-cache must be opt-in.
- Keys must be deterministic and documented.
- TTL should support short durations, including millisecond-scale hot paths if the runtime supports them.
- Micro-cache must never be enabled for auth/session-sensitive data without explicit policy and tests.
- Micro-cache behavior must be visible in performance and cache reports.

## Generated Manifest Fields

Cache metadata should be generated once and consumed by runtime adapters, CLI, MCP, Needle Map, and tests.

Draft render manifest fields:

```json
{
  "routeId": "app.products.page",
  "path": "/products",
  "mode": "prerender",
  "cache": {
    "mode": "stale-while-revalidate",
    "scope": "shared",
    "ttlSeconds": 300,
    "staleSeconds": 60,
    "tags": ["product:list"],
    "headers": {
      "cache-control": "public, s-maxage=300, stale-while-revalidate=60"
    },
    "reason": "prerender route with explicit revalidate metadata"
  }
}
```

Draft cache report fields:

```json
{
  "schemaVersion": "needle.cache-report.v0",
  "routes": [],
  "tags": [],
  "diagnostics": []
}
```

The exact artifact may be part of `.needle/render-manifest.json`, `.needle/perf.report.json`, `.needle/map.json`, or a future `.needle/cache.report.json`. If a new artifact is added, update [Manifest Contracts](manifest-contracts.md), [Versioning And Upgrades](versioning-and-upgrades.md), and AGENTS generated-file rules.

## Diagnostics

Required planned diagnostics:

| Code | Severity | When |
| --- | --- | --- |
| `CACHE_IMPLICIT_DYNAMIC` | `warn` | A dynamic route could be cacheable but has no explicit cache plan. |
| `CACHE_UNSAFE_AUTH` | `error` | Auth/session-sensitive route opts into public/shared caching without an explicit safe policy. |
| `CACHE_TAG_INVALID` | `error` | Cache tag is empty, non-deterministic, or contains disallowed characters. |
| `CACHE_HEADER_CONFLICT` | `error` | Manual cache header conflicts with generated cache plan. |
| `CACHE_TTL_INVALID` | `error` | TTL or stale duration is invalid. |
| `CACHE_MICRO_KEY_UNSAFE` | `error` | Hot API micro-cache key is missing, non-deterministic, or includes unsafe data. |
| `CACHE_REVALIDATION_UNSUPPORTED` | `warn` | Adapter cannot support requested revalidation mode. |

Diagnostics must include route ID, source file, cache plan, and remediation when practical.

## Security Rules

- Default API and SSR cache mode is `no-store`.
- Public/shared caching for user-specific data requires explicit policy and tests.
- Cache tags and keys must not expose secrets or private identifiers.
- Revalidation endpoints or tools must require authorization before public use.
- Cache invalidation must not rely only on inferred Needle Map edges.

Security-sensitive cache behavior should be reviewed with [Security](security.md) and [Risk Mitigation](risk-mitigation.md).

## Fixture Requirements

The first cache implementation should include fixtures for:

- hashed static asset immutable headers,
- static HTML cache plan,
- prerender revalidation plan,
- SSR default `no-store`,
- API default `no-store`,
- explicit API TTL cache,
- hot API micro-cache,
- cache tag listing,
- invalid tag diagnostics,
- conflicting manual header diagnostics,
- unsafe auth route cache diagnostics,
- adapter behavior for Bun and Node once both adapters exist.

HTTP tests should verify headers. Manifest tests should verify stable cache plans, route IDs, tags, diagnostics, and ordering.

## Research Notes

This contract adapts current cache documentation patterns:

- MDN documents `Cache-Control` as the standard response header vocabulary for browsers and shared caches.
- Next.js documents tag-based revalidation and stale-while-revalidate behavior.
- SvelteKit exposes response header control for route data and pages.
- Astro route caching documents route-level cache options and adapter translation.

NeedleStart should keep the underlying HTTP behavior familiar while making cache decisions more inspectable through manifests, diagnostics, and agent-facing context.

## Out Of Scope

- Distributed cache in the first cache implementation.
- Public revalidation endpoints before auth and authorization exist.
- Adapter-specific CDN configuration beyond core cache plan metadata.
- Inferring safe cache behavior for auth, billing, or session routes.
- Claiming cache performance before benchmark fixtures exist.
