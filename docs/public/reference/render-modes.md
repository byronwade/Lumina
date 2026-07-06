# Render Modes

Status: Planned.

Audience: app developers, framework contributors.

Render modes tell NeedleStart how each route should execute. The shared scaffold contract is the `RenderMode` type in `@needle/core`.

## Planned APIs

```ts
export const render = staticPage()
export const render = prerender({ revalidate: "10m" })
export const render = ssr()
export const render = stream()
export const render = clientOnly()
export const render = apiHot({ validate: true })
```

These APIs are planned and not implemented.

## Render Mode Mapping

| Developer surface | Manifest value |
| --- | --- |
| `staticPage()` | `"static"` |
| `prerender()` | `"prerender"` |
| `ssr()` | `"ssr"` |
| `stream()` | `"stream"` |
| `clientOnly()` | `"client-only"` |
| API route file under `app/api/` | `"api"` |
| `apiHot()` | `"hot-api"` |

The manifest values above must stay aligned with `@needle/core` `RenderMode`, [Compiler IR](../../compiler-ir.md), and generated route or render manifests.

## Source

- [Compiler IR](../../compiler-ir.md)
- [Runtime Contract](../../runtime-contract.md)
- [API Route Contract](../../api-route-contract.md)

