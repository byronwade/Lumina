# Lumina Marketing App

Status: Verified.

This is the first Lumina marketing website source fixture. It exists so the compiler and CLI can
exercise a real app-shaped route tree through route discovery, CLI inspection, minimal dev serving,
static build output, and static built-output serving.

The public pages use a local shadcn-style source component layer under `components/ui/`, a
`components.json` file for future shadcn CLI additions, and a Tailwind v4 entry file at
`app/globals.css`. The current Lumina renderer still inlines the app-owned CSS from `styles.ts` so
the fixture can prove the marketing and docs surface without changing Lumina's broader CSS delivery
contract. The About, Benchmarks, Examples, and Roadmap pages use the same card, badge, icon, evidence
strip, and source-path patterns as the docs surface so the public app reads as one coherent
framework site.

The root layout supports light and dark mode through shadcn-style CSS variables, the `dark` class on
`html`, a header theme toggle, and `localStorage` persistence under `lumina-theme`. The homepage graph
relationship preview uses the same theme tokens so light and dark mode both apply to the primary
visual surface. The inline CSS path and `app/globals.css` should stay aligned until Lumina implements
direct CSS asset delivery for the app renderer.

The docs area is a public-docs route scaffold inspired by documentation systems such as Next.js: it
has a docs home, lane pages, topic pages, source-path cards, reference lanes, active sidebar
navigation, status language, an SSR `/docs/search` route backed by a bundled docs index, and an SSR
`/docs/*` inventory viewer backed by metadata for the current `docs/public/` page set. The catch-all
route now renders a bundled Markdown body snapshot for mapped public docs pages, and docs pages use a
complete in-app public-docs inventory sidebar grouped by lane. Docs article pages include route/source
metadata, previous and next navigation, related source-doc cards, and keep-reading links. Static builds
also emit deterministic preview artifacts at `dist/public/docs-index.json`, `dist/public/docs-navigation.json`,
`dist/public/llms.txt`, and `dist/public/llms-full.txt`. It is not yet a frontmatter parser,
generated static docs router, or broader machine-readable docs pipeline.

## Routes

- `/`
- `/about`
- `/docs`
- `/docs/start`
- `/docs/concepts`
- `/docs/concepts/app-graph`
- `/docs/guides`
- `/docs/guides/create-app`
- `/docs/reference`
- `/docs/reference/cli`
- `/docs/reference/routing`
- `/docs/reference/manifest-contracts`
- `/docs/search`
- `/docs/deployment`
- `/docs/community`
- `/docs/*` for Markdown-backed public-doc inventory pages
- `/benchmarks`
- `/examples`
- `/roadmap`

## Current Verification

From the repository root:

```bash
bun run lumina -- routes apps/www --json
bun run lumina -- inspect apps/www --json
bun run lumina -- inspect apps/www why /
bun run lumina -- dev apps/www --once
bun run lumina -- build apps/www --json
bun run lumina -- start apps/www --once
```

These commands generate and inspect:

- `.lumina/routes.json`
- `.lumina/render-manifest.json`
- `.lumina/map.json`
- `.lumina/build-trace.json`
- `.lumina/perf.report.json`
- `dist/routes.manifest.json`
- `dist/render.manifest.json`
- `dist/adapter.manifest.json`
- `dist/public/docs-index.json`
- `dist/public/docs-navigation.json`
- `dist/public/llms.txt`
- `dist/public/llms-full.txt`
- `dist/public/*.html`

## Known Limitations

- Hydration is currently proven for the root marketing route and counter fixture, not for a complete
  application interaction model.
- Broader component-level browser HMR is not implemented yet beyond direct local imported component affected-route reports.
- Production SSR/API serving is not implemented yet.
- Benchmark pages describe status only and make no performance claims.
