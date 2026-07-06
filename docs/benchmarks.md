# Benchmarks

Status: Planned.

Audience: maintainers, performance reviewers, future website visitors.

Lumina must not make benchmark claims without raw data and methodology.

Current status: benchmark docs and fixture plans exist, but benchmark fixture files, benchmark commands, and raw results do not exist yet. The docs are ready for speed evidence; they are not speed evidence.

## Planned Benchmark Areas

- Static route build and serve.
- SSR latency.
- API route latency.
- Hot API route latency.
- Large route graph generation.
- Incremental graph update.
- Memory usage.

## Rule

Every public performance claim must link to:

- Benchmark methodology.
- Raw results.
- Runtime versions.
- Hardware or environment.
- Comparable implementation details.

See `docs/benchmark-methodology.md`.

## Out Of Scope

- Marketing claims without raw data.
- Best-run-only reporting.
- Comparisons that do not run equivalent behavior.
