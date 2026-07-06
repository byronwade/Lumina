# File Conventions

Status: Planned.

Audience: app developers, framework contributors, AI agents.

This page documents the planned file and folder conventions for NeedleStart apps. These conventions are not implemented yet.

For exact route parsing, route IDs, sorting, conflict diagnostics, and fixture requirements, see [Routing Contract](routing-contract.md).

## Application Root

Planned files:

```txt
app/
needle.config.ts
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

Planned render mode export:

```ts
import { staticPage } from "needlestart"

export const render = staticPage()
```

Render modes should compile into the render manifest rather than being rediscovered at runtime.

## Metadata Exports

Planned metadata export:

```ts
import { defineMeta } from "needlestart"

export const meta = defineMeta({
  title: "Pricing",
  description: "Pricing for a NeedleStart app.",
  canonical: "/pricing",
})
```

Public pages should fail SEO checks when required metadata is missing once `needle seo` exists.

## Contract Files

Planned contract convention:

```txt
components/ProductCard.contract.ts
app/pricing/page.contract.ts
```

Contract files are planned as high-confidence semantic inputs for Needle Map. They should describe relationships that are too important for agents to infer from imports alone.

## Special Files

Planned special files:

| File | Status | Purpose |
| --- | --- | --- |
| `app/not-found.tsx` | Planned | Route-level or app-level 404 UI. |
| `app/error.tsx` | Planned | Route-level or app-level error UI. |
| `needle.config.ts` | Planned | Framework config. |
| `AGENTS.md` | Planned app-local generated artifact | Agent operating guide for a user app. This does not describe the hand-maintained NeedleStart repository root `AGENTS.md`. |
| `llms.txt` | Planned app-local or public-docs artifact | Compact AI-readable project summary. |
| `llms-full.txt` | Planned app-local or public-docs artifact | Full AI-readable project context. |

## Generated Files

Generated files are planned under `.needle/` and `dist/`. They must not be edited manually.

See [API Reference](api-reference.md), [Manifest Contracts](manifest-contracts.md), and [Routing Contract](routing-contract.md) for planned generated file responsibilities.

## Determinism Rules

When implemented, file convention output must:

- Normalize paths across operating systems.
- Sort routes deterministically.
- Ignore route groups in URL paths.
- Preserve enough source information for Needle Map and agent context.
- Emit helpful diagnostics for invalid or conflicting routes.
- Keep route IDs stable across operating systems.
- Snapshot route order, parameters, and diagnostics in route-discovery fixtures once implementation exists.

