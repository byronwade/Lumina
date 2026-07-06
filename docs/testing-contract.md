# Testing Contract

Status: Planned.

Audience: framework contributors, maintainers, CI authors, AI agents.

This page defines the testing contract for Lumina. Initial scaffold checks, route-discovery fixture tests, route artifact/CLI JSON tests, and benchmark skeleton path/status tests exist; broader feature-specific test tooling is still planned. The contract exists so package scaffolding, compiler work, runtime adapters, route fixtures, public docs, diagnostics, benchmarks, and agent workflows share one evidence model.

## Goals

- Every implemented feature has the smallest complete test set that proves its behavior.
- Compiler, manifest, CLI, and agent-facing JSON outputs are snapshot-tested with deterministic ordering.
- Runtime behavior is tested through HTTP fixtures, not only unit tests.
- Browser behavior is tested through production-like builds when the feature depends on real rendering, hydration, navigation, or public HTML.
- Accessibility checks are treated as browser and public-HTML evidence, not only lint output.
- Performance tests are separated from correctness tests and follow [Benchmark Methodology](benchmark-methodology.md).
- Performance report tests follow [Performance Contract](performance-contract.md) and avoid treating benchmark best-case numbers as correctness tests.
- Tests do not require external network access unless the task explicitly documents why.
- Security-sensitive changes include negative tests for rejection, sanitization, and secret exclusion.

## Research Notes

This contract follows current patterns from modern framework and test tooling docs:

- Bun ships a built-in Jest-compatible runner with TypeScript/JSX support, snapshots, watch mode, coverage, and CI features.
- Bun snapshot updates use an explicit update flag and write snapshot files next to tests.
- Vitest documents snapshots as reference artifacts that should be committed and reviewed; CI should fail on mismatches or missing snapshots.
- Vitest is designed to reuse Vite config and transforms, which matters for frontend framework tests.
- Playwright supports browser tests, web server setup, test artifacts, traces, screenshots, retries, and multiple projects.
- Playwright traces are useful for debugging failed CI runs.
- Testing Library emphasizes tests that resemble how users interact with pages rather than component internals.
- Next.js recommends running Playwright against built production output for closer end-to-end behavior.

Source links:

- [Bun test runner](https://bun.com/docs/test)
- [Bun snapshot updates](https://bun.com/docs/guides/test/update-snapshots)
- [Vitest snapshots](https://vitest.dev/guide/snapshot)
- [Vitest overview](https://vitest.dev/)
- [Playwright configuration](https://playwright.dev/docs/test-configuration)
- [Playwright trace viewer](https://playwright.dev/docs/trace-viewer)
- [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles/)
- [Next.js Playwright testing](https://nextjs.org/docs/pages/guides/testing/playwright)
- [Accessibility Contract](accessibility-contract.md)
- [Security Contract](security-contract.md)
- [Performance Contract](performance-contract.md)

## Planned Test Layers

| Layer | Purpose | Example surfaces |
| --- | --- | --- |
| Unit | Prove pure functions and small modules. | Path normalization, route segment parsing, schema parsing, cache header generation. |
| Fixture | Prove compiler behavior against realistic project trees. | Route discovery, manifests, diagnostics, SEO reports, map generation. |
| Snapshot | Prove stable JSON and generated output. | CLI JSON, `.lumina/*.json`, generated route manifests, diagnostics. |
| Integration | Prove packages work together. | CLI commands, compiler plus Vite plugin, config loading, generated output. |
| HTTP | Prove runtime behavior through requests. | SSR, static assets, API routes, hot APIs, cache headers, errors. |
| Browser | Prove user-visible browser behavior. | Hydration, navigation, public HTML, accessibility smoke tests, error pages. |
| Security | Prove high-risk behavior is constrained. | Secret exclusion, auth cache rejection, safe edit rejection, production error sanitization. |
| Performance | Prove speed claims with raw evidence. | Hot API benchmark, route discovery timing, build timing, manifest size. |

## Commands

Initial scaffold commands:

```bash
bun test
bun run typecheck
bun run docs:check
bun run structure:check
bun run performance:check
bun run check
```

Future target scripts as implementation grows:

```bash
bun run test:unit
bun run test:fixtures
bun run test:integration
bun run test:http
bun run test:browser
bun run test:snapshots
bun run test:security
```

Do not document future target scripts as passing until they exist and local evidence proves it.

## Fixture Layout

Planned layout:

```txt
tests/
  fixtures/
    route-discovery/
    api-routes/
    schema/
    cache/
    seo/
    diagnostics/
    safe-edits/
    large-app/
  integration/
  http/
  browser/
  security/
  snapshots/
  helpers/
```

Rules:

- Fixture apps must be small enough to understand but realistic enough to catch cross-file behavior.
- Fixture outputs must normalize paths to POSIX separators.
- Fixture outputs must not include absolute local paths, timestamps, random IDs, secrets, or machine-specific data.
- Each fixture should name the contract it proves.
- Large-app fixtures should be separate from small behavior fixtures.

## Snapshot Policy

Snapshot tests are required for stable generated outputs.

Use snapshots for:

- `.lumina/routes.json`
- `.lumina/render-manifest.json`
- `.lumina/seo.report.json`
- `.lumina/perf.report.json` shape, not raw benchmark values
- CLI `--json` envelopes
- Diagnostics ordering and compact fields
- Context capsule output
- Safe-edit dry-run plans

Snapshot rules:

- Snapshot updates must be explicit and reviewed.
- CI must fail on unexpected snapshot changes.
- Snapshots must avoid volatile values.
- Large snapshots should be split by feature or fixture.
- Human-readable formatting can change more freely than JSON contracts.

## Contract-To-Test Mapping

| Contract | Required future tests |
| --- | --- |
| [CLI JSON Contract](cli-json-contract.md) | JSON envelope snapshots, exit-code tests, stdout/stderr separation. |
| [Diagnostics Contract](diagnostics-contract.md) | Code stability, source locations, related locations, remediations, docs links, ordering, secret exclusion. |
| [Configuration Contract](config-contract.md) | Loading order, env precedence, invalid config diagnostics, normalized output, secret exclusion. |
| [Routing Contract](routing-contract.md) | Segment grammar, route IDs, conflicts, sorting, API route discovery, generated manifest snapshots. |
| [API Route Contract](api-route-contract.md) | Method exports, request body policy, response normalization, validation, production error behavior, adapter parity. |
| [Schema Contract](schema-contract.md) | Parse result shape, issue paths, query coercion, serializers, OpenAPI mapping, unsupported feature diagnostics. |
| [Cache Contract](cache-contract.md) | Header mapping, tags, revalidation metadata, unsafe auth cache rejection, micro-cache behavior. |
| [SEO Contract](seo-contract.md) | Metadata merge, canonical rules, sitemap output, robots output, JSON-LD escaping, meaningful HTML checks. |
| [Accessibility Contract](accessibility-contract.md) | Semantic HTML checks, keyboard paths, visible focus, route focus behavior, form errors, docs-page accessibility smoke tests. |
| [Security Contract](security-contract.md) | Secret exclusion, production error sanitization, security header assertions, high-risk write rejection, advisory/release evidence when publishing exists. |
| [Performance Contract](performance-contract.md) | Performance report snapshots, budget diagnostics, browser metric evidence, benchmark metadata, raw-result location checks. |
| [Safe Edit Transactions](safe-edit-transactions.md) | Preview, rejection, AST application, affected checks, mutation log, undo path. |

## CI Gates

Initial CI after Phase 1 scaffold runs:

1. `bun install`
2. `bun run check`

Future CI should add targeted jobs as implementation grows:

- fixture snapshots,
- HTTP adapter matrix,
- browser smoke tests,
- security-sensitive negative tests,
- benchmark smoke job that does not publish claims,
- release compatibility checks.

## Browser Test Rules

Browser tests should be used when behavior depends on a real browser.

Rules:

- Use production-like build output for end-to-end tests when practical.
- Capture traces, screenshots, and videos only for failed or explicitly requested runs.
- Store artifacts outside source snapshots.
- Avoid visual thresholds as proof of functional behavior.
- Prefer user-facing queries and interactions over implementation details.

## Network And Time Rules

- Tests do not use external network calls by default.
- Tests that need a local server must start and stop it deterministically.
- Long-running tests need explicit timeout expectations.
- Benchmarks do not run in the default correctness suite.
- Randomized order is allowed only with recorded seeds.

## Evidence Reporting

Every implementation PR should report:

- commands run,
- fixtures touched,
- snapshots updated,
- contracts covered,
- unavailable checks and why,
- benchmark evidence when performance claims are made,
- security or privacy notes when high-risk areas are touched.

## Out Of Scope Until Implementation Exists

- Claiming coverage percentages.
- Publishing benchmark rankings.
- Adding CI badges.
- Requiring browser tests for every unit-level change.
- Running external SaaS services in default tests.

## Related Docs

- [Testing Overview](testing.md)
- [Documentation Verification](docs-verification.md)
- [Benchmark Methodology](benchmark-methodology.md)
- [Product Build Readiness](product-build-readiness.md)
- [Diagnostics Contract](diagnostics-contract.md)
- [Security](security.md)
