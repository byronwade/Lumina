# Cache System Contract

NeedleStart cache behavior is planned. This document defines the target cache model, cache plans, cache tags, headers, invalidation, hot API micro-cache, manifests, diagnostics, and testing requirements.

The core rule is simple: no invisible caching.

Every cacheable route, function, component, or API response must expose its cache plan in a manifest. Cache tags must be queryable by Needle Map and visible to agents.

## Goals

- Make caching explicit and inspectable.
- Default dynamic server behavior to safe `no-store` behavior.
- Let static and prerendered routes express cache and revalidation metadata.
- Support route and API cache tags.
- Make cache impact visible through Needle Map.
- Avoid cache invalidation magic.
- Keep runtime cache logic small and adapter-aware.

## Non-Goals

Initially out of scope:

- Distributed cache.
- Global edge cache integration.
- Cache persistence across deployments.
- Arbitrary custom cache backends.
- Automatic semantic cache inference.
- Full stale-while-revalidate runtime engine.

## Cache Plan

Draft type:

```ts
export type CachePlan = {
  mode: "no-store" | "static" | "prerender" | "public" | "private" | "micro"
  ttl?: string
  revalidate?: string
  tags?: string[]
  headers?: Record<string, string>
  key?: string
  reason: string
}
```

Rules:

- Every plan must explain `reason`.
- `ttl` and `revalidate` use documented duration strings.
- `tags` are stable strings.
- `headers` are generated from the plan, not hand-waved.
- `key` must not include secrets or raw user tokens.

## Duration Strings

Planned duration syntax:

| Example | Meaning |
| --- | --- |
| `100ms` | 100 milliseconds. |
| `1s` | 1 second. |
| `30s` | 30 seconds. |
| `10m` | 10 minutes. |
| `1h` | 1 hour. |
| `1d` | 1 day. |

Rules:

- Invalid duration strings fail config or render mode validation.
- Hot API micro-cache TTLs should be intentionally short.
- Adapter capabilities may impose max TTLs.

## Defaults

| Surface | Default cache behavior |
| --- | --- |
| Hashed static assets | Immutable public cache. |
| Static HTML from `staticPage()` | Public cache policy determined by adapter/static output. |
| Prerendered HTML | Cache policy derives from `prerender()` revalidation metadata. |
| SSR routes | `no-store` unless route opts in. |
| Normal API routes | `no-store` unless route opts in. |
| Hot API routes | `no-store` unless `apiHot()` config opts into micro-cache. |
| Health endpoint | `no-store`. |

## Render Mode Integration

### `staticPage()`

```ts
export const render = staticPage()
```

Planned cache result:

```json
{
  "mode": "static",
  "reason": "Route is compiled to static HTML."
}
```

Static pages are generated at build time. Runtime adapters serve files with conservative HTML headers unless configured otherwise.

### `prerender()`

```ts
export const render = prerender({
  revalidate: "10m",
  tags: ["blog"],
})
```

Planned cache result:

```json
{
  "mode": "prerender",
  "revalidate": "10m",
  "tags": ["blog"],
  "reason": "Route is prerendered and can be revalidated by tag."
}
```

### `ssr()`

```ts
export const render = ssr({
  cache: "no-store",
})
```

Default SSR cache is `no-store`.

SSR may opt into public or private caching later, but it must emit an explicit plan.

### `apiHot()`

```ts
export const render = apiHot({
  validate: true,
  serialize: "generated",
  cache: {
    ttl: "100ms",
    key: ({ params }) => `user:${params.id}`,
    tags: ({ params }) => [`user:${params.id}`],
  },
})
```

Hot API micro-cache rules:

- Opt-in only.
- Short TTL by default.
- Cache key must be deterministic.
- Cache key must not include secrets.
- Tags must be exposed in cache manifest.
- 4xx and 5xx responses should not be cached by default.

## Cache Tags

Cache tags connect runtime behavior to Needle Map.

Examples:

```ts
export const render = prerender({
  revalidate: "10m",
  tags: ["blog", "post:list"],
})
```

```ts
export const render = apiHot({
  cache: {
    ttl: "100ms",
    tags: ({ params }) => [`user:${params.id}`],
  },
})
```

Rules:

- Tags are strings.
- Tags should be stable and human-readable.
- Tags must not contain secrets.
- Tags should appear as `cacheTag` nodes in Needle Map.
- Affected queries should answer which routes and APIs use a tag.

## Invalidation

Planned API:

```ts
import { revalidateTag } from "needlestart/cache"

await revalidateTag("blog")
```

Initial behavior may be limited to diagnostics and local runtime support.

Rules:

- Invalidation must report affected routes and APIs when possible.
- Invalidation must not pretend to affect external caches that NeedleStart does not control.
- Adapter manifests should document invalidation support.

## Cache Headers

Suggested header policy:

| Cache plan | Header intent |
| --- | --- |
| Hashed static asset | `Cache-Control: public, max-age=31536000, immutable` |
| HTML default | Conservative route-specific policy. |
| SSR default | `Cache-Control: no-store` |
| API default | `Cache-Control: no-store` |
| Hot API micro-cache | Header depends on whether micro-cache is internal only or public. |
| Health endpoint | `Cache-Control: no-store` |

Rules:

- HTML headers derive from render mode and route cache plan.
- API headers derive from route cache plan.
- Internal micro-cache does not automatically imply public HTTP cache.
- Cache status may appear in dev logs, but production logging must avoid sensitive data.

## Cache Manifest

`cache.manifest.json` should describe cache behavior.

```ts
export type CacheManifest = {
  schemaVersion: string
  routes: Array<{
    id: string
    path: string
    mode: string
    plan: CachePlan
    tags: string[]
    headers?: Record<string, string>
  }>
  tags: Array<{
    tag: string
    usedBy: string[]
  }>
  diagnostics: NeedleDiagnostic[]
}
```

Example:

```json
{
  "schemaVersion": "1.0.0",
  "routes": [
    {
      "id": "app.blog.$slug.page",
      "path": "/blog/:slug",
      "mode": "prerender",
      "plan": {
        "mode": "prerender",
        "revalidate": "10m",
        "tags": ["blog"],
        "reason": "Route declares prerender revalidation."
      },
      "tags": ["blog"]
    }
  ],
  "tags": [
    {
      "tag": "blog",
      "usedBy": ["app.blog.$slug.page"]
    }
  ],
  "diagnostics": []
}
```

## Needle Map Integration

Needle Map should represent:

- Cache tags as nodes.
- Routes using cache tags.
- APIs using cache tags.
- Components or contracts that declare cache behavior.
- Invalidation functions that affect tags.

Planned edges:

- `usesCacheTag`
- `affectsCacheTag`
- `invalidatesCacheTag`

Every cache-related edge must include `source`, `confidence`, and `why`.

## Agent and MCP Integration

Agent context should include cache summary for a route:

```json
{
  "route": "/blog/:slug",
  "cache": {
    "mode": "prerender",
    "revalidate": "10m",
    "tags": ["blog"]
  },
  "checks": ["cache", "seo", "render"]
}
```

MCP read tools may expose:

- `get_cache_report`
- cache section in `get_route_context`
- cache tag impact in `get_impact_map`

MCP write tools must not change cache behavior unless the safe edit transaction marks the edit as medium or high risk and runs affected checks.

## Diagnostics

| Code | Meaning |
| --- | --- |
| `NS_CACHE_INVALID_DURATION` | Cache duration string is invalid. |
| `NS_CACHE_TAG_INVALID` | Cache tag is malformed. |
| `NS_CACHE_TAG_SECRET` | Cache tag appears to contain a secret. |
| `NS_CACHE_KEY_SECRET` | Cache key appears to contain a secret. |
| `NS_CACHE_INVISIBLE` | Cacheable behavior exists without manifest plan. |
| `NS_CACHE_UNSUPPORTED_ADAPTER` | Selected adapter does not support requested cache behavior. |
| `NS_CACHE_REVALIDATE_UNSUPPORTED` | Revalidation is configured but unsupported. |
| `NS_CACHE_HEADER_CONFLICT` | Explicit headers conflict with route cache plan. |

## Testing Requirements

Cache tests should cover:

- Default SSR `no-store`.
- Default API `no-store`.
- Hashed static asset immutable cache header.
- `prerender()` revalidation metadata.
- Hot API micro-cache opt-in.
- Invalid duration rejection.
- Cache tag manifest output.
- Cache tag Needle Map nodes.
- Cache diagnostics in agent context.
- Adapter unsupported cache behavior.
- Secret redaction in cache keys and tags.

## Out of Scope Initially

- Distributed cache.
- External CDN purge API.
- Cache persistence across deploys.
- Background revalidation workers.
- Global cache analytics.
- Automatic cache inference from data fetching.
