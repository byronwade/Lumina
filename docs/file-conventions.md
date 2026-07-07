# File Conventions

Status: Planned.

Audience: app developers, framework contributors, AI agents.

This page documents file and folder conventions for Lumina apps. The route-discovery subset and explicit `staticPage()` / `ssr()` render declarations are implemented for compiler fixtures; config loading, metadata, client hydration, and production SSR/API behavior remain planned.

For exact route parsing, route IDs, sorting, conflict diagnostics, and fixture requirements, see [Routing Contract](routing-contract.md).

## MVP Alpha File Conventions

MVP Alpha route discovery currently supports source fixtures that use:

- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/docs/page.tsx`
- `app/benchmarks/page.tsx`
- `app/examples/page.tsx`
- `app/roadmap/page.tsx`
- `app/blog/[slug]/page.tsx`
- `components/*.tsx`
- `lumina.config.ts`

MVP Alpha should defer rendered HTML behavior, config loading, optional catch-all segments, error routes, not-found routes, contract files, app-local AGENTS generation, and llms outputs.

These conventions are the starter surface for `apps/www/`, scaffolded examples, and `bun create lumina` target behavior.

## Application Root

Planned files:

```txt
app/
lumina.config.ts
package.json
public/
```

`app/` contains routes, layouts, API routes, metadata, and route-specific conventions.

## Pages

Planned page convention:

```txt
app/page.tsx
app/about/page.tsx
app/blog/[slug]/page.tsx
```

Target route mapping:

| File | URL |
| --- | --- |
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/blog/[slug]/page.tsx` | `/blog/:slug` |
| `app/docs/[...parts]/page.tsx` | `/docs/*` |
| `app/(marketing)/pricing/page.tsx` | `/pricing` |

Route groups in parentheses organize files without changing the URL path.

Optional catch-all segments such as `[[...slug]]` are reserved for later support and should produce an unsupported-convention diagnostic until implemented.

## Layouts

Planned layout convention:

```txt
app/layout.tsx
app/dashboard/layout.tsx
```

Layouts wrap nested pages in route order. The exact layout component contract will be documented after React rendering is implemented.

## API Routes

Planned API convention:

```txt
app/api/health.ts
app/api/users/[id].ts
```

Target route mapping:

| File | URL |
| --- | --- |
| `app/api/health.ts` | `/api/health` |
| `app/api/users/[id].ts` | `/api/users/:id` |

API files should export HTTP method handlers such as `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` once API routes are implemented.

## Render Mode Exports

Implemented MVP render mode export:

```ts
import { staticPage } from "lumina"

export const render = staticPage()
```

`staticPage()` and `ssr()` declarations compile into the render manifest rather than being rediscovered at runtime. Deferred helpers such as `prerender()`, `stream()`, `clientOnly()`, and `apiHot()` remain planned and should produce diagnostics if declared before support lands.

## Metadata Exports

Planned metadata export:

```ts
import { defineMeta } from "lumina"

export const meta = defineMeta({
  title: "Pricing",
  description: "Pricing for a Lumina app.",
  canonical: "/pricing",
})
```

Public pages should fail SEO checks when required metadata is missing once `lumina seo` exists.

## Contract Files

Planned contract convention:

```txt
components/ProductCard.contract.ts
app/pricing/page.contract.ts
```

Contract files are planned as high-confidence semantic inputs for Lumina Map. They should describe relationships that are too important for agents to infer from imports alone.

## Special Files

Planned special files:

| File | Status | Purpose |
| --- | --- | --- |
| `app/not-found.tsx` | Planned | Route-level or app-level 404 UI. |
| `app/error.tsx` | Planned | Route-level or app-level error UI. |
| `lumina.config.ts` | Planned | Framework config. |
| `AGENTS.md` | Planned app-local generated artifact | Agent operating guide for a user app. This does not describe the hand-maintained Lumina repository root `AGENTS.md`. |
| `llms.txt` | Planned app-local or public-docs artifact | Compact AI-readable project summary. |
| `llms-full.txt` | Planned app-local or public-docs artifact | Full AI-readable project context. |

## Generated Files

Generated files are planned under `.lumina/` and `dist/`. They must not be edited manually.

See [API Reference](api-reference.md), [Manifest Contracts](manifest-contracts.md), and [Routing Contract](routing-contract.md) for planned generated file responsibilities.

## Determinism Rules

When implemented, file convention output must:

- Normalize paths across operating systems.
- Sort routes deterministically.
- Ignore route groups in URL paths.
- Preserve enough source information for Lumina Map and agent context.
- Emit helpful diagnostics for invalid or conflicting routes.
- Keep route IDs stable across operating systems and independent of absolute local paths.
- Snapshot route order, parameters, and diagnostics in route-discovery fixtures once implementation exists.

