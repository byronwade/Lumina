# Performance Contract

Status: Planned.

Audience: framework contributors, performance reviewers, app developers, CI authors, AI agents.

This page defines the planned performance contract for NeedleStart. Performance tooling is not implemented yet. The contract exists so route budgets, Core Web Vitals, build timing, hot API benchmarks, generated reports, public claims, and agent-facing diagnostics use the same evidence model.

## Research Notes

NeedleStart should connect speed claims to current web performance guidance:

- [web.dev Web Vitals](https://web.dev/articles/vitals) defines LCP, INP, and CLS thresholds for good user experience.
- [Google Search Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) describes Core Web Vitals as real-world user experience metrics for loading, interactivity, and visual stability.
- [Chrome Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview) documents Lighthouse as an automated tool for performance, accessibility, SEO, and other quality checks.
- [Chrome Lighthouse performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) explains that Lighthouse performance scores are weighted metric scores and should not be treated as the only evidence.
- [Lighthouse performance budgets](https://web.dev/articles/use-lighthouse-for-performance-budgets) show that budgets can track metric values plus resource size and count.
- [Lighthouse variability](https://developers.google.com/web/tools/lighthouse/variability) explains why lab scores vary and why repeated runs and controlled environments matter.
- [Vite performance guide](https://vite.dev/guide/performance) frames performance work around slow server starts, page loads, and builds.
- [Vite production build guide](https://vite.dev/guide/build) documents the production build path that NeedleStart should not obscure.
- [Vite build options](https://vite.dev/config/build-options) documents CSS code splitting, production source-map controls, minification, and build manifests that affect public payloads.
- [React 19](https://react.dev/blog/2024/12/05/react-19) documents resource loading APIs such as `preload`, `preinit`, `preconnect`, and `prefetchDNS`.
- [React Compiler](https://react.dev/learn/react-compiler) documents build-time automatic memoization.
- [web.dev image performance](https://web.dev/learn/performance/image-performance), [web.dev font performance](https://web.dev/learn/performance/optimize-web-fonts), [web.dev resource hints](https://web.dev/learn/performance/resource-hints), [MDN fetchpriority](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/fetchpriority), [MDN 103 Early Hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/103), and [web.dev bfcache](https://web.dev/articles/bfcache) inform browser-delivery budgets.
- [Speed Decisions](speed-decisions.md) records the framework-level choices for Vite/Rolldown, Bun, React streaming, payload budgets, hot APIs, caching, and benchmarks.

## Goals

- Make route performance visible before public speed claims.
- Keep public page budgets stricter than private or dashboard routes.
- Separate lab metrics, build metrics, runtime metrics, and benchmark results.
- Generate stable performance reports for agents and CI.
- Require raw data and methodology for public comparisons.
- Keep performance diagnostics actionable without hiding exact evidence.

## Performance Surfaces

| Surface | What to measure | Initial evidence |
| --- | --- | --- |
| Public HTML route | HTML size, JS size, CSS size, render mode, metadata/SEO status. | `.needle/perf.report.json`, route manifest, browser smoke test. |
| Interactive route | Hydration component count, route JS, route CSS, browser metrics. | Browser fixture, payload report, diagnostics. |
| Streaming route | Time to first useful HTML, Suspense boundary behavior, hydration integrity. | Streaming fixture and browser test. |
| Route chunks | Route JS chunks, async chunks, CSS chunks, preloaded chunks, and waterfall risk. | Chunk manifest snapshot and browser waterfall trace. |
| Asset delivery | Image variants, font preloads, CSS delivery, script priority, compression, bfcache eligibility. | Browser fixture, asset manifest, header snapshot. |
| API route | Handler latency, validation overhead, cache behavior. | HTTP fixture, benchmark fixture when claims are made. |
| Hot API route | Generated validator/serializer cost and throughput. | Benchmark fixture with raw results. |
| Route discovery | File count, route count, elapsed time, diagnostics count. | Fixture timing and generated manifest snapshots. |
| Build | Cold build, incremental build, output size, generated artifact size. | Build timing report and fixture metadata. |
| Agent output | Context size, route capsule size, graph query cost. | Agent fixture and size budget. |

## Core Web Vitals Target

NeedleStart should treat Core Web Vitals as public-page quality signals:

| Metric | Planned target for public examples | Notes |
| --- | --- | --- |
| LCP | 2.5s or less | Lab values are not the same as field data. |
| INP | 200ms or less | Replaces older FID-oriented guidance for current Core Web Vitals. |
| CLS | 0.1 or less | Layout stability must be protected by examples and generated UI. |

These are targets, not verified claims. Public docs must not claim examples meet Core Web Vitals until browser evidence exists.

## Budget Types

NeedleStart should support several budget kinds:

| Budget | Applies to | Example |
| --- | --- | --- |
| Route JS | Public pages, interactive pages. | Public pages warn above planned `80kb`. |
| Route CSS | Public pages, interactive pages. | Warn above planned `30kb`. |
| Route chunk count | Public pages, interactive pages. | Warn when splitting creates excessive startup requests or render waterfalls. |
| HTML size | Public pages. | Warn on unexpectedly large static HTML. |
| Hydration count | Public pages. | Warn when too many client components hydrate by default. |
| LCP asset size | Public pages. | Warn when likely LCP image is too large. |
| Resource hints | Public pages. | Warn when generated hints are missing, excessive, or unproven. |
| Image variants | Public pages. | Warn when route-critical images lack dimensions or responsive outputs. |
| Font weight count | Public pages. | Warn when route-critical font loading is excessive or unplanned. |
| Third-party script cost | Public pages. | Warn when external script work is critical-path or unbudgeted. |
| Source-map exposure | Production output. | Warn when public assets expose source maps without explicit config. |
| Compression | Static text assets and SSR responses. | Warn when compressible text is uncompressed in an adapter that supports compression. |
| 103 Early Hints | SSR or dynamic routes with known critical assets. | Warn when configured hints are unsupported by the selected adapter or not backed by route assets. |
| bfcache eligibility | Public pages. | Warn when framework-owned code introduces known disqualifiers. |
| Manifest size | Generated artifacts. | Warn when agent-facing JSON grows unexpectedly. |
| Build time | Compiler and bundler work. | Compare against fixture baseline. |
| API latency | API and hot API routes. | Only benchmark with controlled methodology. |

Exact default thresholds must be finalized with fixtures before implementation marks them verified.

## Planned Config Shape

Draft config:

```ts
import { defineConfig } from "needlestart"

export default defineConfig({
  performance: {
    budgets: {
      publicPageJs: "80kb",
      routeCss: "30kb",
      publicHtml: "80kb",
      lcpImageMaxBytes: "180kb",
      maxHydrationComponents: 12,
      routeContextMaxBytes: "24kb",
    },
    delivery: {
      compression: {
        staticPrecompressed: true,
        dynamicText: "adapter",
        encodings: ["br", "gzip"],
      },
      resourceHints: {
        emitHtmlLinks: true,
        allowEarlyHints103: "adapter",
        allowSpeculationRules: false,
      },
      images: {
        formats: ["avif", "webp"],
        requireDimensions: true,
      },
      fonts: {
        preferSelfHostedWoff2: true,
        preloadRouteCriticalOnly: true,
      },
      bfcache: {
        failOnFrameworkBlockers: true,
      },
      debugArtifacts: {
        publicSourceMaps: false,
        hiddenSourceMaps: false,
      },
      rum: {
        enabled: false,
      },
    },
    failBuildOnBudget: true,
  },
})
```

This is a target API. It must stay aligned with [Configuration Contract](config-contract.md) before implementation.

## Performance Report

Planned `.needle/perf.report.json` shape:

```json
{
  "schemaVersion": "0.1.0",
  "generatedAt": "2026-01-01T00:00:00.000Z",
  "routes": [
    {
      "routeId": "app.index.page",
      "path": "/",
      "mode": "static",
      "jsBytes": 18432,
      "cssBytes": 6144,
      "chunkCount": 3,
      "sourceMaps": {
        "public": false,
        "hidden": false
      },
      "htmlBytes": 12800,
      "hydrationComponents": 2,
      "delivery": {
        "assets": {
          "scripts": [],
          "styles": [],
          "images": [
            {
              "href": "/assets/hero.avif",
              "bytes": 122880,
              "width": 1600,
              "height": 900,
              "likelyLcp": true,
              "fetchPriority": "high"
            }
          ],
          "fonts": []
        },
        "resourceHints": [
          {
            "rel": "preload",
            "as": "image",
            "href": "/assets/hero.avif",
            "source": "compiler",
            "why": "Likely LCP image for /"
          }
        ],
        "earlyHints103": {
          "eligible": true,
          "adapterSupported": false,
          "linkHeaders": []
        },
        "compression": {
          "staticPrecompressed": true,
          "dynamicText": "adapter-dependent",
          "encodings": ["br", "gzip"]
        },
        "bfcache": {
          "eligible": true,
          "knownBlockers": []
        }
      },
      "budgets": [
        {
          "name": "publicPageJs",
          "status": "pass",
          "actual": 18432,
          "limit": 81920
        }
      ],
      "diagnostics": []
    }
  ],
  "benchmarks": [],
  "diagnostics": []
}
```

Reports must avoid absolute local paths, secrets, random IDs, and machine-specific values unless explicitly part of a raw benchmark result.

Budget status values must use `pass`, `warning`, or `fail`. Use `warning`, not `warn`, so performance reports align with the shared diagnostic severity vocabulary.

Delivery fields must stay route-specific. Do not emit blanket preloads, preconnects, speculation rules, fetch priorities, compression claims, or Early Hints for assets that are not tied to route output or adapter capability evidence.

Production debug artifacts must be reported separately from runtime payloads. Public source maps, inline source maps, verbose debug JSON, and oversized diagnostics are performance and security review items unless explicit config and deployment policy allow them.

## Diagnostics

Planned diagnostic families:

| Code prefix | Meaning |
| --- | --- |
| `PERF_BUDGET_` | Route or artifact exceeds a configured budget. |
| `PERF_PUBLIC_JS_` | Public page ships too much JavaScript. |
| `PERF_ROUTE_CHUNK_` | Route splitting creates excessive chunks or a browser waterfall. |
| `PERF_HYDRATION_` | Public page hydrates too much client UI. |
| `PERF_LCP_` | Likely LCP asset or HTML issue. |
| `PERF_CLS_` | Layout-shift risk in examples or generated UI. |
| `PERF_INP_` | Interaction risk from large client bundles or handlers. |
| `PERF_RESOURCE_HINT_` | Missing, excessive, or unproven preload/preinit/preconnect hints. |
| `PERF_IMAGE_` | Missing image dimensions, missing responsive variants, or oversized LCP asset. |
| `PERF_FONT_` | Excessive font files, missing font-display policy, or unproven font preload. |
| `PERF_SCRIPT_` | Third-party or framework-owned script blocks the critical path. |
| `PERF_SOURCE_MAP_` | Production source-map output is public, inline, or larger than policy allows. |
| `PERF_COMPRESSION_` | Text response or static asset is not compressed when adapter support exists. |
| `PERF_EARLY_HINTS_` | Early Hints are unsupported, excessive, or not backed by known critical route assets. |
| `PERF_BFCACHE_` | Framework-owned behavior risks back/forward cache eligibility. |
| `PERF_BUILD_` | Build or route-discovery timing regression. |
| `PERF_AGENT_CONTEXT_` | Agent-facing context is too large or unstable. |

Diagnostics should link to docs and include actionable remediation. They must follow [Diagnostics Contract](diagnostics-contract.md).

## Benchmark Evidence

Benchmark claims must follow [Benchmark Methodology](benchmark-methodology.md).

Required evidence for public comparisons:

- Fixture source.
- Runtime versions.
- Dependency versions.
- Hardware and operating system.
- Command and flags.
- Warmup and run counts.
- Raw results.
- Variance or distribution.
- Equivalent behavior explanation.
- Commit SHA.

Do not compare hot API routes against normal API routes without explaining generated validation, serialization, caching, and runtime differences.

## Lab And Field Data

NeedleStart can generate lab evidence through local browser or benchmark fixtures. Field data depends on real user traffic and hosting conditions.

Docs must distinguish:

- Build-time budgets.
- Lab browser metrics.
- Synthetic benchmarks.
- Real-user field data.

Do not imply that lab metrics guarantee Google Search outcomes or production user experience.

Real-user monitoring may be documented later as an optional app integration. It must not become default framework telemetry, and any example must document privacy, sampling, endpoint ownership, and payload-size controls.

## Agent And CI Behavior

Agents and CI should be able to:

- Read `.needle/perf.report.json`.
- Identify budget failures by route ID.
- Link performance diagnostics to source docs.
- Suggest scoped remediation.
- Avoid large raw benchmark payloads in normal agent context.
- Attach raw benchmark files only when requested or needed for review.
- Treat field data and RUM payloads as opt-in app artifacts, not framework default context.

## Out Of Scope For The Current Scaffold

- Real performance reports.
- Verified Core Web Vitals.
- Raw benchmark results.
- Performance CI.
- Field data collection.
- Default telemetry or analytics collection.
- Public speed rankings.

## Build Readiness

Before NeedleStart makes public speed claims, it should have:

- Performance report contract.
- Budget config contract.
- Speed decision gate.
- Fixture and benchmark methodology.
- Browser or benchmark evidence.
- Raw data location.
- Status language that separates target speed from verified speed.
- Browser-delivery checks for images, fonts, scripts, compression, resource hints, and bfcache when those surfaces are touched.
- Route chunk, CSS chunk, source-map, and RUM-default checks when those surfaces are touched.

This page provides the contract. Implementation must replace planned language with measured evidence as tooling becomes real.
