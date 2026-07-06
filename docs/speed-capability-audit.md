# Speed Capability Audit

Status: Planned.

Audience: maintainers, framework contributors, performance reviewers, AI agents.

This audit checks whether NeedleStart has made explicit speed decisions for every major framework surface before implementation deepens. It is documentation evidence, not product benchmark evidence. The repository is in Phase 1 scaffold, so each framework behavior item below remains a planned decision with a proof gate.

## Research Baseline

This audit is based on current primary guidance and the repository contracts:

- [Vite performance](https://vite.dev/guide/performance), [Vite 8](https://vite.dev/blog/announcing-vite8), [Vite 8.1](https://vite.dev/blog/announcing-vite8-1), [Vite build options](https://vite.dev/config/build-options), and [Vite Rolldown integration](https://vite.dev/guide/rolldown) for dev/build speed, CSS splitting, source maps, and output controls.
- [React Compiler](https://react.dev/learn/react-compiler), [React 19](https://react.dev/blog/2024/12/05/react-19), React streaming guidance, and React route-aware code-splitting guidance for rendering and client work.
- [Bun HTTP server](https://bun.com/docs/runtime/http/server) and adapter contracts for runtime speed.
- [web.dev Web Vitals](https://web.dev/articles/vitals), [web.dev INP](https://web.dev/articles/inp), [web.dev image performance](https://web.dev/learn/performance/image-performance), [web.dev font performance](https://web.dev/learn/performance/optimize-web-fonts), [web.dev resource hints](https://web.dev/learn/performance/resource-hints), and [web.dev bfcache](https://web.dev/articles/bfcache) for browser delivery and user experience.
- [MDN 103 Early Hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/103), [MDN fetchpriority](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/fetchpriority), [MDN speculative loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Speculative_loading), [MDN Accept-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Encoding), and [MDN Content-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Encoding) for HTTP and browser hint behavior.

## Coverage Matrix

| Surface | Current decision | Source docs | Proof before verified | Coverage |
| --- | --- | --- | --- | --- |
| Rendering default | Static-first; SSR and streaming only when needed; client-only must be intentional. | [Speed Decisions](speed-decisions.md), [Runtime Contract](runtime-contract.md), [SEO Contract](seo-contract.md) | Static, SSR, streaming, and client-only fixtures with browser and SEO evidence. | Covered as planned |
| Vite/Rolldown build | Use Vite/Rolldown; avoid custom bundler until measured limits require it. | [Speed Decisions](speed-decisions.md), [Architecture](../ARCHITECTURE.md), [Benchmark Methodology](benchmark-methodology.md) | Vite plugin fixtures, build timing, dev startup timing, migration notes. | Covered as planned |
| Large-app dev mode | Evaluate bundled dev mode only when module fan-out is measured. | [Speed Decisions](speed-decisions.md), [Speed Strategy](speed-strategy.md) | Large-app fixture showing request count, reload time, HMR behavior, and memory. | Covered as planned |
| Runtime adapter | Bun first, Node/static early, runtime request path manifest-driven. | [Adapter Contract](adapter-contract.md), [Runtime Contract](runtime-contract.md), [Speed Decisions](speed-decisions.md) | Bun/Node/static adapter parity tests and separate benchmark tracks. | Covered as planned |
| Bun native dispatch | Generated route table remains canonical; Bun adapter may lower compatible routes into native `Bun.serve({ routes })` only with parity and timing evidence. | [Speed Decisions](speed-decisions.md), [Adapter Contract](adapter-contract.md) | Bun native-route fixture, generated-matcher fallback fixture, dispatch timing comparison. | Covered as planned; implementation evidence still required |
| Route matching | Precomputed route tables; no source discovery on request. | [Routing Contract](routing-contract.md), [Compiler IR](compiler-ir.md), [Runtime Contract](runtime-contract.md) | Route manifest snapshots and runtime tests proving generated artifacts are used. | Covered as planned |
| Compiler scaling | Content-hash caching, normalized IDs, deterministic sorting, layered graph extraction. | [Compiler IR](compiler-ir.md), [Needle Map](needle-map.md), [Speed Decisions](speed-decisions.md) | Thousand-route fixture, changed-file update timing, graph query timing. | Covered as planned |
| Bundle hygiene | Avoid barrel imports, broad globs, non-static generated imports, and route-agnostic client bundles. | [Speed Decisions](speed-decisions.md), [Performance Contract](performance-contract.md) | Route chunk snapshots and bundle report diagnostics. | Covered as planned |
| Route code splitting | Split route code from the generated route graph; avoid render-triggered lazy waterfalls for route boundaries. | [Speed Decisions](speed-decisions.md), [Performance Contract](performance-contract.md) | Route chunk manifest snapshots, browser waterfall trace, navigation fixture. | Covered as planned |
| CSS delivery | Keep Vite/Rolldown CSS splitting on by default and budget CSS per route. | [Speed Decisions](speed-decisions.md), [Performance Contract](performance-contract.md) | CSS chunk snapshots, FOUC/browser fixture, route CSS budget. | Covered as planned |
| Production debug payloads | Production source maps and verbose debug payloads are off by default; hidden source maps require explicit config. | [Speed Decisions](speed-decisions.md), [Security Contract](security-contract.md) | Build output inspection, public asset scan, source-map config fixture. | Covered as planned |
| React Compiler | Optional build capability until compatibility and value are proven. | [Speed Decisions](speed-decisions.md), [Performance Contract](performance-contract.md) | React fixture, compiler diagnostics, render snapshots, escape-hatch docs. | Covered as planned |
| React streaming | Opt-in route capability; Suspense used to remove critical-path waterfalls. | [Speed Decisions](speed-decisions.md), [Runtime Contract](runtime-contract.md), [Performance Contract](performance-contract.md) | Streaming fixture, hydration test, server error/Suspense behavior test. | Covered as planned |
| Async waterfalls | Start independent work early and await late in SSR/API paths. | [Speed Strategy](speed-strategy.md), [Speed Decisions](speed-decisions.md) | SSR/API fixtures that compare serial vs parallel dependency paths. | Covered as planned |
| Client payload | Public JS, CSS, hydration, HTML, LCP asset, and route context budgets. | [Performance Contract](performance-contract.md), [Public Performance Reference](public/reference/performance.md) | `.needle/perf.report.json`, browser evidence, budget diagnostics. | Covered as planned |
| INP | Budget client JS, third-party scripts, hydration, and long-running interaction work. | [Performance Contract](performance-contract.md), [Speed Decisions](speed-decisions.md) | Browser interaction fixture and trace evidence. | Covered as planned |
| Images | Generated responsive images, dimensions, AVIF/WebP targets, LCP metadata. | [Speed Decisions](speed-decisions.md), [Performance Contract](performance-contract.md) | Image manifest, fallback tests, LCP evidence. | Covered as planned |
| Fonts | Self-hosted WOFF2, minimal families/weights, `font-display`, route-critical preloads only. | [Speed Decisions](speed-decisions.md), [Performance Contract](performance-contract.md) | Font manifest, CLS/LCP evidence, preload diagnostics. | Covered as planned |
| Resource hints | Generate DNS prefetch, preconnect, preload, preinit only from known route assets. | [Speed Decisions](speed-decisions.md), [Performance Contract](performance-contract.md) | Browser fixture and report snapshot for generated hints. | Covered as planned |
| Fetch priority | Use `fetchpriority` only for proven route-critical assets. | [Speed Decisions](speed-decisions.md), [Performance Contract](performance-contract.md) | Browser LCP fixture across at least one public route. | Covered as planned |
| Speculation rules | Use document speculation from route knowledge and user intent, not blanket prerendering. | [Speed Decisions](speed-decisions.md), [Performance Contract](performance-contract.md) | Network budget, privacy review, browser navigation fixture. | Covered as planned |
| 103 Early Hints | Treat as adapter capability after route-critical assets are known. | [Speed Decisions](speed-decisions.md), [Adapter Contract](adapter-contract.md), [Manifest Contracts](manifest-contracts.md) | Adapter capability flag, Link header snapshots, browser timing evidence. | Covered as planned; implementation evidence still required |
| bfcache | Avoid framework defaults that block browser back/forward cache. | [Speed Decisions](speed-decisions.md), [Performance Contract](performance-contract.md) | Browser back/forward fixture and disqualifier scan. | Covered as planned |
| Compression | Precompress static text assets and negotiate response encoding where supported. | [Speed Decisions](speed-decisions.md), [Adapter Contract](adapter-contract.md) | Adapter header snapshots and transfer-size fixture. | Covered as planned |
| Cache headers | Explicit cache plans, tags, revalidation, micro-cache only by opt-in. | [Cache Contract](cache-contract.md), [Speed Decisions](speed-decisions.md) | Cache metadata snapshots and adapter header tests. | Covered as planned |
| Hot API | Generated validators/serializers and micro-cache for selected endpoints only. | [Hot API Path](hot-api-path.md), [API Route Contract](api-route-contract.md), [Schema Contract](schema-contract.md) | Normal vs hot API benchmark with equivalent behavior. | Covered as planned |
| Third-party scripts | Defer, isolate, and budget external scripts; no critical-path default. | [Speed Decisions](speed-decisions.md), [Performance Contract](performance-contract.md) | Script budget report and example review. | Covered as planned |
| Agent context | Compact route context and affected-check selection instead of repository-wide reads. | [Agent Kernel](agent-kernel.md), [Machine-Readable Documentation](machine-readable-docs.md), [Speed Strategy](speed-strategy.md) | Context size budgets, map query timing, affected-check fixture. | Covered as planned |
| Field measurement | RUM and Core Web Vitals field data are optional app instrumentation, never default framework telemetry. | [Speed Decisions](speed-decisions.md), [Performance Contract](performance-contract.md) | Optional web-vitals example, no-default-telemetry test, field-data claim policy. | Covered as planned |
| Benchmarks | Raw data, methodology, equivalent behavior, variance, and separate tracks. | [Benchmark Methodology](benchmark-methodology.md), [Performance Contract](performance-contract.md) | Raw result folder, environment metadata, commit SHA, commands. | Covered as planned |

## Current Judgment

The documentation now covers the major speed decision surfaces as planned behavior. The largest remaining risk is not missing docs, but future implementation drift:

- Vite/Rolldown version choices must be refreshed before speed-sensitive implementation pins runtime or build dependencies; the 2026-07-06 snapshot points to current stable Vite 8.x/Rolldown.
- React Compiler must not become a default before fixtures prove compatibility.
- Browser-delivery optimizations must stay route-aware and budget-backed.
- Route code splitting, CSS splitting, source-map output, and telemetry must stay explicit defaults with fixture evidence before any exception.
- 103 Early Hints should be modeled as an adapter capability, not a universal default.
- Public speed claims must wait for raw data and comparable behavior.

## Required Follow-Up At Implementation Time

After Phase 1 scaffold and before speed-sensitive implementation:

- Pin actual Vite/Rolldown/Bun/React versions in package docs and lockfile evidence after a fresh source check.
- Default to current stable Vite 8.x/Rolldown if scaffold work starts from the 2026-07-06 research snapshot and no blocking regression is found.
- Add fixtures that can later prove build speed, route discovery speed, and browser delivery behavior.

Before runtime/adapters are marked verified:

- Implement adapter capability flags for compression and 103 Early Hints from the planned contract fields.
- Prove Bun, Node, and static paths separately.
- Prove cache headers and compressed output with HTTP tests.

Before public performance claims:

- Run browser traces for LCP, INP, CLS, bfcache, and resource hints.
- Store raw benchmark results.
- Link claims to fixture source, methodology, and commit SHA.

## Out Of Scope

- Claiming any speed decision is implemented.
- Claiming NeedleStart beats another framework.
- Changing exact package versions without refreshing source evidence.
- Treating this audit as benchmark data.
