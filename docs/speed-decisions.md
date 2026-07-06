# Speed Decisions

Status: Planned.

Audience: framework contributors, runtime authors, compiler authors, performance reviewers, AI agents.

This page records the speed-sensitive product and engineering decisions NeedleStart should carry into implementation. It is not benchmark evidence. It is the decision guardrail that keeps the project pointed at proven fast paths while preventing premature custom infrastructure.

## Research Baseline

Current primary guidance supports these choices. This baseline was refreshed on 2026-07-06 and must be refreshed again before implementation pins dependency versions:

- [Vite performance guide](https://vite.dev/guide/performance) emphasizes keeping browser and transform work lean during development.
- [Vite 8](https://vite.dev/blog/announcing-vite8) moved Vite to a single Rolldown-powered bundler, and [Vite 8.1](https://vite.dev/blog/announcing-vite8-1) continues that stable line. If scaffolding started from this research snapshot, the default candidate would be current stable Vite 8.x with Rolldown.
- Vite's current documentation exposes Rolldown options through Vite rather than asking frameworks to build their own bundler.
- Vite supports production dynamic imports, CSS code splitting, minification, build manifests, and production source-map controls that NeedleStart should expose through framework decisions instead of custom build machinery.
- Vite has introduced experimental bundled dev mode for large apps where unbundled module fan-out becomes the bottleneck.
- [React 19](https://react.dev/blog/2024/12/05/react-19) exposes resource loading APIs such as `preload`, `preinit`, `preconnect`, and `prefetchDNS`.
- React's current guidance favors framework or router-integrated code splitting over lazy imports that only start after a component renders.
- [React Compiler](https://react.dev/learn/react-compiler) documents automatic build-time memoization for React applications.
- React streaming SSR with Suspense lets frameworks send useful HTML before every async branch finishes.
- [Bun HTTP server](https://bun.com/docs/runtime/http/server), [Bun routing](https://bun.com/docs/runtime/http/routing), and Bun's integrated package manager, runner, and test runner support the fast default runtime path.
- [web.dev Web Vitals](https://web.dev/articles/vitals) and [Google Search Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) keep LCP, INP, and CLS as the public-page quality targets.
- [Lighthouse performance budgets](https://web.dev/articles/use-lighthouse-for-performance-budgets) support enforcing budgets for metric values, resource sizes, and resource counts.
- [web.dev image performance](https://web.dev/learn/performance/image-performance) recommends modern formats, responsive sizing, and LCP-aware image delivery.
- [web.dev font performance](https://web.dev/learn/performance/optimize-web-fonts) recommends careful font preloading and render behavior.
- [web.dev resource hints](https://web.dev/learn/performance/resource-hints), [MDN speculative loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Speculative_loading), and [MDN fetchpriority](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/fetchpriority) document browser delivery hints that can help only when applied accurately.
- [MDN 103 Early Hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/103) documents sending preliminary resource hints before the final response is ready.
- [web.dev bfcache guidance](https://web.dev/articles/bfcache) treats back/forward cache eligibility as a major navigation-performance surface.
- [MDN Accept-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Encoding) and [MDN Content-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Encoding) define HTTP compression negotiation and response encoding.

## Decision Summary

| Area | Decision | Why | Evidence before verified |
| --- | --- | --- | --- |
| Rendering default | Static-first, SSR only when needed, client-only only when intentional. | Static HTML removes per-request render cost and protects SEO. | Static fixture output, HTTP tests, SEO checks, browser smoke. |
| Frontend build | Use Vite/Rolldown as the build engine. | Proven ecosystem leverage and faster path than a custom bundler. | Vite plugin fixtures, build output snapshots, large-app build timing. |
| Vite version posture | If scaffolding starts from the 2026-07-06 research snapshot, target current stable Vite 8.x/Rolldown; refresh before pinning. | Vite/Rolldown performance is moving quickly; version pinning belongs to implementation evidence. | Scaffold lockfile, migration notes, Vite build/dev fixtures. |
| Custom bundler | Do not build one before Vite/Rolldown limits are measured. | Bundler work is high cost and not the product wedge. | Documented bottleneck, failed mitigation, benchmark evidence. |
| Runtime default | Bun adapter first, with Node and static adapters early. | Bun gives the speed default; Node/static reduce adoption risk. | Adapter parity tests and separate Bun/Node/static benchmark tracks. |
| Runtime shape | Generated, manifest-driven server with no source discovery on request. | Request path stays small and predictable. | Runtime tests proving only generated artifacts are loaded. |
| Bun route dispatch | Keep generated route tables canonical; let `@needle/adapter-bun` lower compatible routes into native `Bun.serve({ routes })` only when parity and timing tests prove it is faster. | Bun's router can be a fast adapter primitive, but cross-adapter behavior must stay generated and inspectable. | Bun route-dispatch benchmark, route parity fixtures, fallback-path tests. |
| React rendering | Use streaming SSR and Suspense as opt-in route capabilities. | Streams useful HTML sooner without making every route dynamic. | Streaming fixture, hydration tests, error-boundary tests. |
| Resource loading | Generate React resource hints only from known route assets. | Preload and preinit help only when accurate; wrong hints waste bandwidth. | Browser tests and report snapshots for generated hints. |
| React Compiler | Evaluate as an opt-in build capability before making it a default. | Automatic memoization can reduce re-render cost, but compiler compatibility must be proven against framework output. | React fixture, compiler diagnostics, render behavior snapshots. |
| Route code splitting | Split route code from the generated route graph, and preload route chunks from navigation intent or known route transitions. | Route-integrated splitting avoids initial-bundle bloat without introducing render-triggered waterfalls. | Route chunk manifest snapshots, browser waterfall trace, navigation fixture. |
| Client payload | Enforce public route JS, CSS, hydration, LCP asset, and other payload budgets. | INP and LCP regressions often come from excess client work. | `.needle/perf.report.json`, browser evidence, budget diagnostics. |
| CSS delivery | Use Vite/Rolldown CSS splitting by default; keep CSS route-aware and budgeted. | One global CSS payload hurts first load, while late CSS can cause visual instability. | CSS chunk snapshots, FOUC/browser fixture, route CSS budget. |
| Bundle hygiene | Avoid broad barrels and non-analyzable imports in generated code. | Static imports and route-level chunks keep bundling predictable. | Bundle report and route chunk snapshots. |
| Production debug payloads | Do not expose production source maps or verbose debug payloads by default; allow hidden source maps only through explicit config. | Debug artifacts can increase deploy size and leak source detail without improving user speed. | Build output inspection, source-map config test, public asset scan. |
| Data waterfalls | Start independent async work early and await late in SSR/API paths. | Waterfalls dominate perceived latency even when individual calls are fast. | SSR/API fixture timings and traceable async test cases. |
| Hot APIs | Use generated validators, serializers, and explicit micro-cache only for selected endpoints. | Fast path stays opt-in, measurable, and semantically clear. | Normal vs hot API benchmark with equivalent behavior. |
| Caching | Explicit cache plans, tags, headers, and revalidation metadata. | Hidden caching causes correctness and security failures. | Cache metadata snapshots and adapter header tests. |
| Images | Prefer generated responsive images with AVIF/WebP targets and LCP metadata. | Images often dominate LCP and transfer size. | Image manifest, browser LCP evidence, fallback tests. |
| Fonts | Prefer self-hosted WOFF2, minimal families/weights, `font-display`, and route-known preloads. | Font loading can block text rendering or cause layout shifts. | Font manifest and browser CLS/LCP evidence. |
| Compression | Precompress static text assets and negotiate response encoding. | Text transfer size matters, but already-compressed media should not be recompressed. | Adapter compression tests and header snapshots. |
| 103 Early Hints | Model Early Hints as an adapter capability, not a universal default. | Early Hints help only when critical assets are known before the response is ready and the adapter/platform supports them. | Adapter capability flag, Link header snapshots, browser timing evidence. |
| Navigation prediction | Use prefetch/speculation only from route knowledge and user intent. | Over-eager speculation burns bandwidth and can trigger unwanted work. | Browser fixture, network budget, privacy review. |
| bfcache | Avoid framework defaults that block back/forward cache. | Browser page restoration can make repeat navigations instant. | Browser navigation test and disqualifier scan. |
| Third-party scripts | Defer, isolate, and budget third-party scripts. | External scripts can dominate INP, LCP, and reliability. | Script budget report and example review. |
| Compiler scaling | Content-hash caches, normalized path IDs, deterministic ordering, layered graph extraction. | Large apps need incremental graph and route updates. | Thousand-route fixture, changed-file update timing, snapshot stability. |
| Agent speed | Compact route context and affected-check selection instead of repo-wide reads. | Agent workflows become faster and cheaper as apps grow. | Context size budget, affected-check fixture, map query timing. |
| Field measurement | Treat RUM and Core Web Vitals field data as optional app instrumentation, not framework runtime default. | Real-user data is essential for claims, but telemetry must not add default payload or privacy risk. | Optional web-vitals example, no-default-telemetry test, field-data claim policy. |
| Metrics | Separate lab, field, build, runtime, and benchmark evidence. | One fast number is not enough to support public claims. | Benchmark methodology and raw result storage. |

## Decision Ladder

When speed and complexity conflict, choose in this order:

1. Remove work from the request path.
2. Move safe work to compile time.
3. Generate smaller route-specific artifacts.
4. Use platform primitives through adapters.
5. Add explicit cache plans.
6. Add route-level budgets and diagnostics.
7. Benchmark only after equivalent behavior is proven.

If a decision adds runtime work to every request, it needs a stronger justification than a decision that affects only a configured route.

## Build-Time Decisions

- Route discovery, render-mode classification, SEO extraction, cache plan generation, API handler registry generation, and agent context generation belong in the compiler.
- The compiler should use content hashes for source files, config, package versions, and schema versions.
- Deep semantic TypeScript analysis should be optional or targeted; it should not block the default fast path.
- Generated manifests should be compact enough to load quickly and stable enough to snapshot.
- Large-app fixtures must include route count, component count, generated artifact size, and changed-file update timing.
- Vite/Rolldown should be upgraded deliberately with migration notes and build/dev fixture evidence.
- Current scaffold work should prefer the stable Vite 8.x/Rolldown line unless a fresh source check finds a newer stable line or a blocking regression.
- Route-level dynamic imports should be generated from the route graph where useful; component-level `React.lazy` should not become the primary framework splitting strategy for route boundaries.
- CSS code splitting should stay enabled by default unless a measured fixture proves a route or adapter needs a different output shape.
- Production source maps should default off for public output. Hidden source maps may be generated for error reporting only when config explicitly enables them and deployment docs explain where they are stored.
- Generated code should avoid barrel imports, broad glob imports, non-static paths, and route-agnostic client bundles.
- React Compiler should be treated as an optional build capability until fixture evidence proves compatibility and value.

## Runtime Decisions

- Runtime adapters consume generated manifests and handlers.
- Static asset and prerendered HTML lookup happen before SSR and API handlers.
- API and hot API handlers bypass React rendering.
- Request routing uses precomputed route tables.
- `@needle/adapter-bun` may use native `Bun.serve({ routes })` dispatch for compatible static, API, and parameter routes, but the generated route table remains the canonical source and every native-lowered route needs parity coverage.
- Per-request mutable state must stay request-scoped.
- Node compatibility must not force user application code to use Bun-only APIs.

## React Decisions

- Server-rendered public HTML is the default target for public pages.
- Streaming SSR is a route capability, not a blanket default.
- Suspense boundaries should be used to remove critical-path waterfalls, not to hide avoidable slow work.
- Client components must be explicit and budgeted.
- Route-level code splitting should be coordinated with route data and resource hints so chunk fetches can start before a lazy component renders.
- Framework-generated resource hints must come from route asset knowledge, not guesswork.
- Non-urgent client updates should use React transition patterns when examples or framework-owned UI need them.
- Manual memoization should be used only for measured cases or public examples that teach a real pattern.
- Framework-owned components should avoid unnecessary state subscriptions, inline component definitions, and repeated derived state work.

## Browser Delivery Decisions

- The compiler should identify likely LCP assets for public routes when possible.
- LCP images should support responsive sizing, explicit dimensions, modern formats, and `fetchpriority` only when evidence shows the asset is critical.
- Font loading should minimize families and weights, prefer WOFF2, use `font-display`, and preload only route-critical fonts.
- CSS delivery should preserve route-level CSS chunks and avoid render-blocking global payload growth.
- Generated resource hints should distinguish DNS prefetch, preconnect, preload, preinit, and speculation rules.
- Speculation rules should target document navigations, while preload/prefetch should target route-known subresources.
- Framework defaults should avoid `unload` patterns and other choices that reduce bfcache eligibility.
- Static text assets should support precompressed output where adapters or hosts can serve it correctly.
- 103 Early Hints should be emitted only when an adapter can send them correctly and the route has proven critical resources.
- Do not compress already-compressed assets such as images, archives, and most media.
- Third-party scripts should load after critical rendering unless a route explicitly marks them critical.

## Measurement Decisions

- Public examples target Core Web Vitals thresholds, but verified claims require browser evidence and, for production claims, real-user field data or a clearly labeled lab-only scope.
- Optional RUM helpers may exist later, but the framework must not ship analytics or telemetry in production apps by default.
- The performance report should separate lab trace data, local benchmark data, build data, and field data.
- Field instrumentation must be documented as an app choice with privacy, sampling, endpoint, and payload-size controls.

## API And Cache Decisions

- Normal API routes remain simple and correct first.
- Hot API routes require explicit opt-in through `apiHot()`.
- Generated validators and serializers must be benchmarked against equivalent normal behavior.
- Micro-cache requires explicit TTL and must reject auth/session-sensitive defaults.
- Cache behavior is visible in manifests and diagnostics.

## Rejected Until Proven

| Rejected default | Why |
| --- | --- |
| Custom bundler first | High build-system cost before product wedge is proven. |
| Bun-only user app APIs | Fast default should not become adoption lock-in. |
| Runtime route discovery | Adds request-path cost and makes behavior harder to inspect. |
| Default client-only rendering | Hurts SEO, LCP, and crawlability. |
| Component-only lazy splitting for route boundaries | Fetching code only after render can create avoidable network waterfalls. |
| Default React Server Components | Adds product complexity before SSR, SSG, streaming, and route compiler are stable. |
| React Compiler default | Automatic memoization is promising, but a framework default needs compatibility, diagnostics, and fixture evidence. |
| Edge-first architecture | Deployment-specific optimization before core adapter contracts exist. |
| Hot API for every endpoint | Increases generated complexity without evidence every endpoint needs it. |
| Invisible caching | Performance wins that cannot be inspected are correctness risks. |
| Blanket prefetch or prerender | Speculative work can waste bandwidth, hurt privacy, and trigger unwanted server work. |
| Blanket resource hints | Incorrect preload/preconnect/preinit choices can delay more important resources. |
| Blanket 103 Early Hints | Premature hints can waste bandwidth and require adapter/platform support. |
| Blanket image optimization at request time | Runtime image transforms can add latency and memory pressure; build-time generation should be proven first. |
| Public source maps by default | Debug payloads should not increase public artifact size or expose source detail without explicit config. |
| Default telemetry | Real-user measurement is valuable, but it must be opt-in to avoid payload and privacy costs. |
| Benchmark rankings before fixtures | Public speed claims need raw data, methodology, and equivalent behavior. |

## Implementation Gates

Before implementation expands a speed-sensitive surface, it must name:

- Which decision above it follows.
- Which generated artifact or route budget changes.
- Which fixture proves the behavior.
- Which benchmark, if any, is required.
- Which public claim remains forbidden until evidence exists.
- Which browser delivery surface changes: image, font, script, compression, 103 Early Hints, resource hint, speculation, or bfcache.

Before public speed claims, implementation must provide:

- Raw benchmark results.
- Fixture source.
- Runtime and dependency versions.
- Hardware or hosted environment.
- Warmup and run counts.
- Variance or distribution.
- Equivalent behavior explanation.
- Commit SHA.

## Related Docs

- [Speed Strategy](speed-strategy.md)
- [Performance Contract](performance-contract.md)
- [Benchmark Methodology](benchmark-methodology.md)
- [Runtime Contract](runtime-contract.md)
- [Adapter Contract](adapter-contract.md)
- [Cache Contract](cache-contract.md)
- [API Route Contract](api-route-contract.md)
- [Schema Contract](schema-contract.md)
- [Testing Contract](testing-contract.md)
