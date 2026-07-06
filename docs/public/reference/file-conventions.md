# File Conventions

Status: Planned.

Audience: app developers, AI agents.

NeedleStart plans to use file-based routing under `app/`.

| File | URL |
| --- | --- |
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/blog/[slug]/page.tsx` | `/blog/:slug` |
| `app/docs/[...parts]/page.tsx` | `/docs/*` |
| `app/(marketing)/pricing/page.tsx` | `/pricing` |
| `app/api/health.ts` | `/api/health` |
| `app/api/users/[id].ts` | `/api/users/:id` |

Route groups in parentheses organize files without changing the URL path. Optional catch-all segments such as `[[...slug]]` are reserved for later support and should produce an unsupported-convention diagnostic until implemented.

Route IDs must be deterministic, path-derived, stable across operating systems, and independent of absolute local paths.

## Source

- [File Conventions](../../file-conventions.md)
- [Routing](../../routing.md)
- [Routing Contract](../../routing-contract.md)
- [Public Routing Reference](routing.md)

