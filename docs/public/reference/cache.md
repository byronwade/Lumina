# Cache

Status: Planned.

Audience: app developers, AI agents.

NeedleStart caching is planned to be explicit, manifest-backed, and inspectable. The exact planned contract lives in [Cache Contract](../../cache-contract.md).

## Planned Defaults

| Surface | Default |
| --- | --- |
| Hashed static assets | Public immutable cache. |
| Static HTML | Route-specific cache plan. |
| Prerendered HTML | Cache plan with revalidation metadata when configured. |
| SSR routes | `no-store` unless configured. |
| API routes | `no-store` unless configured. |
| Hot API routes | `no-store` unless micro-cache or response cache is configured. |

## Planned Route Cache Example

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

## Planned API Cache Example

```ts
export const config = {
  cache: {
    mode: "ttl",
    ttl: 60,
    tags: ["products"],
  },
}
```

## Current Status

This behavior is not implemented yet. The repository is in Phase 1 scaffold, so examples are target API design rather than verified commands.

The scaffolded `@needle/core` `CachePlan` currently supports only `{ mode: "no-store" }` and a public placeholder with `ttlSeconds`, optional `staleWhileRevalidateSeconds`, and `tags`. The broader cache API shown above remains planned until runtime behavior, manifests, fixtures, and adapter tests exist.

## Source

- [Cache](../../cache.md)
- [Cache Contract](../../cache-contract.md)
- [Runtime Contract](../../runtime-contract.md)
- [Speed Strategy](../../speed-strategy.md)
