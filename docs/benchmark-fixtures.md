# Benchmark Fixtures

Status: Planned.

Audience: maintainers, performance reviewers, compiler contributors, runtime adapter authors, AI agents.

This page defines the planned fixture set for proving NeedleStart speed claims. It complements [Benchmark Methodology](benchmark-methodology.md), [Performance Contract](performance-contract.md), [Speed Strategy](speed-strategy.md), [Speed Decisions](speed-decisions.md), and [Performance Evidence Checklist](checklists/performance-evidence.md).

No benchmark fixture exists yet. Do not report results from this page.

## Fixture Rules

Every benchmark fixture must have:

- Stable name.
- Purpose.
- Source path.
- Status label.
- Required commands.
- Equivalent behavior definition.
- Raw result output path.
- Runtime versions.
- Dependency versions.
- Expected generated artifacts.
- Review owner or maintainer role.

Fixture output must be deterministic enough to compare across commits. When a fixture intentionally uses generated data, the generator must use a fixed seed.

## Planned Fixture Matrix

| Fixture | Purpose | Primary metrics | Initial status |
| --- | --- | --- | --- |
| `basic-static` | Small static site baseline. | build time, route JS, CSS, HTML bytes, static serve latency | Planned |
| `basic-ssr` | Minimal SSR route behavior. | SSR latency, cold start, response size, hydration bytes | Planned |
| `streaming-ssr` | Streaming path and shell timing. | time to first byte, shell flush, full response time | Planned |
| `api-json` | Standard API route path. | latency, throughput, validation overhead when enabled | Planned |
| `hot-api` | Generated hot API path. | latency, throughput, serializer cost, micro-cache behavior | Planned |
| `blog-seo` | Public content and SEO-heavy pages. | HTML completeness, metadata output, sitemap/robots time | Planned |
| `dashboard-client` | Client-heavy route with intentional hydration. | JS bytes, chunk count, hydration count, browser metrics | Planned |
| `large-route-graph` | Large app route discovery and graph output. | discovery time, graph time, context size, manifest size | Planned |
| `adapter-bun` | Bun adapter output. | static asset latency, SSR latency, API latency, headers | Planned |
| `adapter-node` | Node compatibility output. | parity, latency, unsupported diagnostics | Planned |
| `adapter-static` | Static export output. | export time, emitted file count, invalid route diagnostics | Planned |
| `docs-site` | Future public docs site. | build time, search index size, page payload, accessibility checks | Planned |
| `agent-context` | Agent context generation. | context generation time, capsule size, query latency | Planned |
| `safe-edit` | Safe metadata edit path. | dry-run time, apply time, affected check time, undo time | Planned |

## Fixture Requirements

### `basic-static`

Must prove:

- Static route emits HTML.
- Route manifest records static mode.
- Browser payload stays within planned budgets.
- Static output can be served by Bun and static adapters when those exist.

### `basic-ssr`

Must prove:

- SSR route renders on request.
- Production errors are sanitized.
- Cache defaults are explicit.
- Bun and Node adapters return equivalent output when Node support exists.

### `hot-api`

Must prove:

- Request params validate.
- Response serialization is generated or explicitly marked generic.
- Invalid input returns structured diagnostics.
- Benchmark compares equivalent API behavior and explains differences.

### `large-route-graph`

Must prove:

- Route sorting is deterministic across operating systems.
- Graph extraction stays within documented time and size budgets.
- Context capsules remain bounded.
- Diagnostics remain stable for duplicate routes and unsupported conventions.

### `docs-site`

Must prove:

- Public Markdown routes build.
- Frontmatter validates.
- Navigation matches [Website Content Map](website-content-map.md).
- `docs-index.json`, `llms.txt`, and `llms-full.txt` generation rules are followed when implemented.
- Keyboard navigation and status labels remain accessible.

## Raw Result Layout

Planned result path:

```txt
benchmarks/results/<date>-<commit>/<fixture>/
  metadata.json
  raw-runs.jsonl
  summary.json
  environment.txt
  README.md
```

`metadata.json` should include commit SHA, fixture name, runtime versions, dependency versions, hardware, operating system, command, warmup details, run count, and whether results are lab-only or field data.

## Claim Rules

- Do not publish best-run-only numbers.
- Do not compare fixtures with different behavior.
- Do not mix Bun and Node results without labeling them.
- Do not use lab results as field-data claims.
- Do not publish browser-delivery claims without route asset evidence.
- Do not mark any performance doc verified until raw fixture evidence exists.

## Out Of Scope For Phase 0

- Benchmark implementation.
- Synthetic results.
- CI performance gates.
- Public claims that NeedleStart is faster than another framework.
