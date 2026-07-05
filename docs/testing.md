# Testing Strategy

NeedleStart testing must prove framework behavior, generated contracts, agent safety, and runtime output without hiding uncertainty. This document defines the planned test taxonomy, fixture strategy, stable JSON requirements, benchmark rules, and CI gates.

No tests exist yet because the repository is still in Phase 0. These requirements become active as packages are scaffolded and implemented.

## Goals

- Keep compiler and graph behavior deterministic.
- Verify public framework behavior through fixtures.
- Test runtime adapters through real HTTP requests.
- Protect agent-facing JSON from accidental drift.
- Prove safe edits reject dangerous requests as well as apply valid ones.
- Make performance claims reproducible.
- Avoid network calls in tests unless a test explicitly requires them.

## Test Types

| Test type | Purpose | Examples |
| --- | --- | --- |
| Unit | Pure logic with no filesystem or runtime server. | Segment parser, config normalization, schema validators. |
| Fixture | Compile small apps and assert generated output. | Route discovery, SEO reports, map generation. |
| Integration | Run CLI flows against fixtures. | `needle routes --json`, `needle build`, `needle check`. |
| HTTP | Start built output and make requests. | Static page, SSR page, API route, hot API route, 404, 500. |
| Stable JSON | Snapshot or structural tests for machine output. | Routes manifest, SEO report, map output, adapter manifest. |
| Safe edit | Dry-run, apply, reject, and undo transactions. | Metadata edit, rejected auth edit, rollback. |
| MCP | Protocol-level tool tests. | `list_routes`, `get_route_context`, rejected write tool. |
| Benchmark | Reproducible performance measurement. | Normal API vs hot API, large route graph build. |

## Package-Level Expectations

| Package | Required early tests |
| --- | --- |
| `@needle/core` | Type shape tests, config normalization, diagnostics, manifest schemas. |
| `@needle/compiler` | Route discovery fixtures, render mode extraction, manifest generation. |
| `@needle/vite-plugin` | Dev server integration, virtual modules, HMR route manifest update. |
| `@needle/react` | SSR rendering, layout order, hydration smoke test. |
| `@needle/router` | Route matching, priority, params, catch-all behavior. |
| `@needle/seo` | Metadata extraction, sitemap, robots, JSON audit output. |
| `@needle/schema` | Validator and serializer behavior. |
| `@needle/cache` | Cache plan normalization, tag mapping, diagnostics. |
| `@needle/map` | Graph generation, affected queries, explain edge output. |
| `@needle/agent` | Context capsule output, task skeletons, safe edit orchestration. |
| `@needle/mcp` | Read-only tools, safe write rejection, output shape. |
| `@needle/adapter-bun` | HTTP behavior for built output. |
| `@needle/adapter-node` | Compatibility HTTP behavior. |
| `@needle/adapter-static` | Static export and unsupported route rejection. |
| `create-needle` | Generated app shape and package scripts. |

## Fixture Apps

Fixtures should live under:

```txt
tests/fixtures/
```

Planned fixtures:

```txt
tests/fixtures/
  basic/
  routing/
  layouts/
  seo-public/
  api-routes/
  hot-api/
  cache-tags/
  map-basic/
  safe-edits/
  dangerous-areas/
  adapter-static/
  adapter-node/
  large-app-smoke/
```

### `basic`

Proves:

- Root page route.
- Root layout.
- Static render mode.
- Basic metadata.
- Successful build.

### `routing`

Proves:

- Static routes.
- Dynamic routes.
- Catch-all routes.
- Route groups.
- Collision diagnostics.
- Deterministic manifest order.

### `layouts`

Proves:

- Root and nested layout order.
- Route group layouts.
- Not found and error page conventions once implemented.

### `seo-public`

Proves:

- Title, description, canonical.
- Sitemap inclusion.
- Robots output.
- Structured data validation.
- Missing metadata failures.

### `api-routes`

Proves:

- Common HTTP methods.
- Dynamic API params.
- Plain object to JSON response.
- Response passthrough.
- Dev and production error behavior.

### `hot-api`

Proves:

- Params validation.
- Query validation.
- Body validation.
- Response serialization.
- Structured 400 errors.
- Normal API vs hot API benchmark fixture.

### `cache-tags`

Proves:

- Cache plan manifests.
- Cache tags as map nodes.
- Explicit cache headers.
- Revalidation diagnostics.

### `map-basic`

Proves:

- File-level graph.
- Import edges.
- Route to component relationships.
- Test naming conventions.
- Affected query.
- Explain query.

### `safe-edits`

Proves:

- Metadata dry run.
- Metadata apply.
- Mutation log append.
- Undo.
- Affected checks.

### `dangerous-areas`

Proves rejection and high-risk behavior for:

- Auth.
- Billing.
- Schemas.
- Cache invalidation.
- Server functions.
- File-system write tools.
- Public SEO routes.

### `large-app-smoke`

Proves:

- Deterministic route discovery on many routes.
- Graph generation scalability.
- Stable output size.
- Incremental graph update target once incremental compilation exists.

## Stable JSON Testing

Agent-facing JSON must be stable. Tests should cover:

- Route manifest.
- Render manifest.
- SEO report.
- Cache manifest.
- Map manifest.
- Performance report.
- Adapter manifest.
- Agent context capsule.
- MCP tool responses.
- Safe edit transaction output.

Rules:

- Sort arrays by stable keys.
- Normalize paths to POSIX style.
- Avoid absolute paths.
- Avoid timestamps in stable snapshots.
- Redact secrets.
- Include schema versions.
- Prefer structural assertions for fields likely to evolve.
- Use golden snapshots only when output ordering and fields are intentional.

## Golden File Policy

Golden files are useful for manifests and CLI JSON. They can also become fossil traps. Use them carefully.

Rules:

- Golden files must be reviewed when changed.
- Golden files must not include machine-specific paths.
- Golden files must not include secrets.
- Golden files must be generated from small fixtures.
- A changed golden file must correspond to an intentional contract change.

Suggested location:

```txt
tests/fixtures/<fixture>/expected/
```

## CLI Testing

CLI tests should verify:

- Exit codes.
- Human output smoke checks.
- JSON output shape.
- Diagnostics.
- `--ci` non-interactive behavior.
- `--quiet` and `--verbose` basics.
- `--json` does not print unrelated human text.

Commands that write files must be tested with:

- `--dry-run`.
- Apply mode.
- Rejection mode.
- Rollback or cleanup.

## HTTP Testing

Runtime adapter tests should make real HTTP requests against built output.

Minimum HTTP cases:

- Static page returns HTML.
- SSR page returns HTML.
- API route returns JSON.
- Hot API route validates input.
- 404 returns correct status.
- 500 hides stack traces in production.
- Hashed static assets get immutable cache headers.
- HTML cache headers match route cache plan.
- Health endpoint behavior matches config.

HTTP tests must not depend on external network services.

## Safe Edit Testing

Safe edit tests must include both success and rejection.

Required cases:

- Low-risk metadata edit dry run.
- Low-risk metadata edit apply.
- Append-only mutation log.
- Undo restores previous content.
- Unknown field rejected.
- Missing target rejected.
- Invalid schema value rejected.
- String replacement path unavailable.
- High-risk edit rejected without override.
- High-risk edit requires explicit override.
- Affected checks run after dry run and apply.

Metrics to collect later:

- False positive rejection rate.
- False negative missed breakage rate.
- Valid edit first-pass success rate after dry run.
- Rollback success rate.

## MCP Testing

MCP tests should verify:

- Server starts in read-only mode.
- `list_routes` returns compact stable JSON.
- `get_route_context` returns expected capsule.
- `get_related_files` uses map query engine.
- `get_impact_map` includes edge confidence.
- `get_seo_report` does not expose secrets.
- Write tools are unavailable before safe edit support.
- Write tools route through safe edit transaction after safe edit support exists.

Use a deterministic local client harness. Do not require external LLMs for tests.

## Security Testing

Security tests should include fake secrets:

```txt
NEEDLE_FAKE_SECRET=sk_test_this_should_not_appear
DATABASE_URL=postgres://user:password@example.com/db
AUTH_TOKEN=fake-token
```

Assert that generated output does not include raw secret values.

Required security test areas:

- Config redaction.
- Manifest redaction.
- MCP response redaction.
- Agent context redaction.
- Request log redaction.
- Path traversal rejection.
- Production bundle exclusion of agent metadata.

## Benchmark Policy

Benchmarks are required before performance claims are introduced.

Planned benchmark fixtures:

```txt
benchmarks/
  hello-static/
  hello-ssr/
  json-api-normal/
  json-api-hot/
  blog-1000-pages/
  ecommerce-10000-products/
  large-app-2000-routes/
```

Benchmark outputs should include:

- Environment summary.
- Bun or Node version.
- CPU and platform when available.
- Commit SHA.
- Fixture name.
- Warmup policy.
- Measurement duration.
- Median and percentile results when applicable.

Performance claims must be backed by reproducible benchmark commands.

## CI Gates

Early CI should run:

```bash
bun install
bun test
bun run typecheck
```

After packages exist, CI should add:

- Lint or formatting check if the project adopts one.
- Fixture compile tests.
- Stable JSON tests.
- HTTP adapter tests.
- Security redaction tests.

Later CI should add:

- Agent simulator harness.
- Safe edit chaos fixture.
- Benchmark smoke checks, not full long-running benchmarks.

## Agent Simulator Harness

The agent simulator should exercise the agent workflow without calling an external LLM.

Required flow:

1. Load fixture app.
2. Inspect routes through the same APIs used by MCP.
3. Read route context.
4. Dry-run metadata edit.
5. Apply metadata edit.
6. Run affected checks.
7. Read mutation log.
8. Undo mutation.
9. Attempt rejected dangerous edit.
10. Assert outputs are stable JSON.

This harness proves the product wedge without making tests depend on model behavior.

## Test Naming

Suggested naming:

```txt
*.test.ts          unit tests
*.fixture.test.ts  fixture compile tests
*.http.test.ts     HTTP runtime tests
*.json.test.ts     stable JSON contract tests
*.safe.test.ts     safe edit tests
*.mcp.test.ts      MCP tests
```

## Out of Scope Initially

- Browser visual regression testing.
- Cross-browser test matrix.
- Real cloud deployment tests.
- External LLM test loops.
- Load testing in every CI run.
- Full Next.js migration parity tests.

## Documentation Rule

When a feature is implemented, update the relevant docs with:

- Tests required.
- Fixture used.
- Commands to run.
- Known untested areas.
- Whether output is stable JSON.
