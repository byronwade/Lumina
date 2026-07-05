# Benchmark Methodology

NeedleStart benchmarks must be reproducible, version-pinned, raw-data-backed, and honest about what is not comparable.

This methodology applies to future benchmarks against Next.js, Astro, TanStack Start, and any additional comparison targets.

No benchmark results exist yet.

## Methodology Goals

- Make benchmark claims auditable.
- Make benchmark fixtures comparable without flattening framework differences.
- Separate correctness checks from speed measurements.
- Avoid cherry-picking.
- Publish enough raw data for others to rerun and challenge results.

## Fairness Rules

- Use the framework-native implementation for each fixture.
- Use equivalent app semantics.
- Pin framework versions.
- Pin runtime versions.
- Pin package manager versions.
- Disable telemetry where possible and document when not possible.
- Use production builds for production runtime benchmarks.
- Exclude warmup requests from reported latency.
- Run enough repetitions to report variance.
- Keep raw stdout, stderr, and result JSON.
- Mark unsupported features as `not-applicable`, not failed.
- Show known limitations.

## Environment Capture

Every official run must record:

- OS.
- Architecture.
- CPU model.
- Core count.
- Memory.
- Node version.
- Bun version.
- Package manager and version.
- Git commit SHA.
- Framework versions.
- Fixture name.
- Run date.
- CI or local/controlled machine marker.

## Repetitions and Variance

Official benchmark runs should include multiple repetitions.

Recommended initial policy:

- Build benchmarks: at least 5 repetitions.
- Runtime benchmarks: at least 3 process restarts, each with warmup and measured windows.
- Dev benchmarks: at least 5 repetitions.
- Agent-native benchmarks: at least 10 task runs where deterministic scripts are used.

Reports should include:

- Median.
- Minimum.
- Maximum.
- p95 where applicable.
- Standard deviation or interquartile range where useful.

## Warmup Policy

Runtime benchmarks should use a warmup phase.

Example:

```txt
warmup requests: 100
measurement duration: 30s
connections: documented per scenario
```

Warmup requests must not be included in reported latency metrics.

## Build Benchmark Policy

Build benchmarks should distinguish:

- Clean install time, when measured.
- Clean build time.
- Rebuild time.
- Generated output size.
- Client JS size.
- Server output size.
- Manifest/generated artifact size.

Install time should be reported separately because package manager cache state can dominate results.

## Runtime Benchmark Policy

Runtime benchmarks should distinguish:

- Cold start.
- First request.
- Warm request latency.
- Throughput.
- Memory.
- Static route behavior.
- SSR route behavior.
- API route behavior.
- Hot API route behavior.

Use each framework's recommended production path.

## Dev Benchmark Policy

Dev benchmarks should measure:

- Dev server startup.
- First page ready.
- Route manifest generation.
- HMR update latency.
- Memory idle.

Dev benchmarks are often noisy. Treat them as directional unless run in a controlled environment.

## SEO and Output Benchmark Policy

SEO/output benchmarks should report correctness and output size, not just speed.

Checks may include:

- Title exists.
- Description exists.
- Canonical URL exists.
- Meaningful initial HTML exists.
- Sitemap emitted where applicable.
- Robots output emitted where applicable.
- Structured data emitted where applicable.
- Initial JS size.

Do not claim full SEO superiority from synthetic fixtures alone.

## Agent-Native Benchmark Policy

Agent-native benchmarks are a new category.

NeedleStart may have native primitives that other frameworks do not. Benchmark reports must label comparability:

- `native`
- `scripted`
- `manual-search`
- `not-applicable`

Agent-native metrics may include:

- Context bytes required.
- Time to answer impact question.
- Affected check precision.
- Affected check recall.
- Safe edit dry-run time.
- Safe edit apply time.
- Rejected dangerous edit success rate.
- Rollback success rate.

If another framework lacks a native equivalent, compare against a scripted or manual-search baseline and state that it is not a framework-native feature.

## Fixture Requirements

Each benchmark fixture should include:

- README.
- Framework version pins.
- Commands.
- Expected routes.
- Expected output checks.
- Known non-equivalences.
- Raw fixture data generation script when applicable.

Fixtures must not include:

- Real secrets.
- External API dependencies.
- Random output without seeded generation.
- Hidden network calls.

## Raw Data Rules

Raw data should be stored as JSON and optionally summarized as CSV.

Suggested paths:

```txt
benchmarks/results/raw/<run-id>.json
benchmarks/results/summaries/<run-id>.md
benchmarks/results/summaries/<run-id>.csv
```

Raw data must include:

- Environment.
- Commands.
- Exit codes.
- Metrics.
- Checks.
- Logs or log paths.
- Fixture commit.

Do not edit raw data manually after a run. Generate a new run instead.

## Public Report Template

Each public report should use this shape:

```md
# Benchmark Report: <run-id>

## Summary

What was measured.

## Environment

Machine, runtimes, framework versions, commit SHA.

## Fixtures

What each fixture represents.

## Results

Tables and charts.

## Raw Data

Links to raw JSON/CSV.

## Reproduce

Commands to rerun.

## Known Limitations

Noise, unsupported features, non-equivalences.

## What This Benchmark Does Not Prove

Clear boundaries.
```

## Publication Rules

Do not publish a benchmark as official unless:

- Raw data exists.
- Methodology is linked.
- Framework versions are pinned.
- Environment is recorded.
- Reproduction commands are included.
- Known limitations are listed.
- Results are not cherry-picked.

## Benchmark Review Checklist

- [ ] Same semantics across fixtures.
- [ ] Framework-native implementations.
- [ ] Versions pinned.
- [ ] Environment captured.
- [ ] Warmup documented.
- [ ] Repetitions documented.
- [ ] Raw data included.
- [ ] Non-equivalent features labeled.
- [ ] Known limitations included.
- [ ] Public summary avoids overclaiming.

## Documentation Rule

Update this file when:

- Benchmark metrics change.
- Fixture policy changes.
- Public reporting rules change.
- A new framework target is added.
- Official benchmark results are published.
