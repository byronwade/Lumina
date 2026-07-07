# Render Modes

Status: Implemented.

Audience: app developers, framework contributors.

Render modes tell Lumina how each route should execute. The shared scaffold contract is the `RenderMode` type in `@lumina/core`. The current MVP implementation supports `staticPage()` and `ssr()` render declarations through `@lumina/react` and records them in `.lumina/render-manifest.json`.

## APIs

```ts
export const render = staticPage()
export const render = ssr()
export const render = prerender({ revalidate: "10m" })
export const render = stream()
export const render = clientOnly()
export const render = apiHot({ validate: true })
```

`staticPage()` and `ssr()` are implemented for MVP Alpha render declarations. `prerender()`, `stream()`, `clientOnly()`, and `apiHot()` remain planned; declaring them should produce compiler diagnostics instead of pretending runtime support exists.

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

The manifest values above must stay aligned with `@lumina/core` `RenderMode`, [Compiler IR](../../compiler-ir.md), `.lumina/render-manifest.json`, and generated route manifests.

## Contract Vocabulary

Public render-mode docs are checked against the same planned contract terms as the internal API and compiler docs:

- `staticPage()`, `prerender()`, `ssr()`, `stream()`, `clientOnly()`, and `apiHot()`.
- `RenderMode` literals: `"static"`, `"prerender"`, `"ssr"`, `"stream"`, `"client-only"`, `"api"`, and `"hot-api"`.
- Ordinary `app/api/` files compile to `renderMode: "api"`.
- `apiHot()` is the explicit opt-in to `renderMode: "hot-api"`.
- `.lumina/render-manifest.json` is the canonical planned render manifest.

## Source

- [Compiler IR](../../compiler-ir.md)
- [Runtime Contract](../../runtime-contract.md)
- [API Route Contract](../../api-route-contract.md)

