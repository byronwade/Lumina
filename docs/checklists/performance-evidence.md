# Performance Evidence Checklist

Status: Planned.

Audience: performance reviewers, maintainers, implementation contributors, AI agents.

Use this checklist before making or reviewing speed claims. It complements [Performance Contract](../performance-contract.md), [Speed Decisions](../speed-decisions.md), and [Benchmark Methodology](../benchmark-methodology.md).

## Claim Scope

Classify the claim before collecting evidence:

- build time,
- dev server startup,
- HMR or route update time,
- static serving,
- SSR latency,
- streaming behavior,
- API route latency,
- hot API throughput,
- public route payload,
- browser delivery,
- Core Web Vitals lab result,
- real-user field data,
- agent context or graph query speed.

## Required Evidence

Every public performance claim needs:

- fixture source,
- commit SHA,
- runtime versions,
- dependency versions,
- hardware and operating system,
- command and flags,
- warmup details,
- run count,
- raw results,
- variance or distribution,
- equivalent behavior explanation.

## Browser Delivery Evidence

When touched, collect evidence for:

- route JS bytes,
- route CSS bytes,
- chunk count,
- hydration count,
- likely LCP asset,
- image dimensions and variants,
- font loading behavior,
- resource hints,
- 103 Early Hints,
- compression,
- bfcache eligibility,
- third-party script cost,
- production source-map exposure,
- optional RUM payload behavior.

## Report Checks

`.needle/perf.report.json` should eventually show:

- route ID,
- path,
- render mode,
- payload sizes,
- chunk metadata,
- source-map status,
- delivery metadata,
- diagnostics,
- budget status.

## Red Flags

Do not publish the claim if:

- only the best run is reported,
- fixture behavior is not equivalent,
- Bun and Node paths are mixed together,
- lab and field data are presented as the same thing,
- source maps or debug payloads inflate public output,
- telemetry is enabled by default,
- route-critical assets are guessed instead of derived from route evidence.

## Docs To Update

- [Performance Contract](../performance-contract.md)
- [Speed Decisions](../speed-decisions.md)
- [Speed Capability Audit](../speed-capability-audit.md)
- [Benchmark Methodology](../benchmark-methodology.md)
- [Public Performance Reference](../public/reference/performance.md)
