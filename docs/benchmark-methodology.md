# Benchmark Methodology

Status: Planned.

Audience: maintainers, performance reviewers, open source program reviewers.

This page defines the standard for benchmark evidence.

Route budget, Core Web Vitals target, performance report, and performance diagnostic rules live in [Performance Contract](performance-contract.md). Planned fixture names and raw result layout live in [Benchmark Fixtures](benchmark-fixtures.md).

Framework-level speed choices live in [Speed Decisions](speed-decisions.md). Benchmarks should prove or challenge those decisions; they should not be written as marketing numbers first.

## Required Metadata

- Date.
- Commit SHA.
- Operating system.
- CPU and memory.
- Runtime versions.
- Dependency versions.
- Fixture name.
- Command run.
- Warmup details.
- Number of runs.
- Raw results.

## Comparison Rules

- Compare equivalent behavior.
- Include source for fixture apps.
- Separate Bun performance from Node compatibility.
- Separate Bun generated-matcher dispatch from Bun native `Bun.serve({ routes })` dispatch when both paths exist.
- Do not compare hot API routes against generic routes without explaining the implementation difference.
- Separate static, SSR, streaming SSR, API, hot API, build-time, and dev-server benchmarks.
- Include whether Vite/Rolldown, Vite bundled dev mode, Bun, Node, or static output was used.
- Separate browser-delivery measurements for images, fonts, scripts, compression, resource hints, speculation rules, and bfcache from server/runtime benchmarks.
- Report variance, not only best runs.

## Raw Results Location

Once benchmarks exist, raw results should live under a stable folder such as:

```txt
benchmarks/results/<date>-<commit>/
```

Do not add synthetic benchmark results.
