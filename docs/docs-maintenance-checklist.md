# Documentation Maintenance Checklist

Status: Planned.
Audience: maintainers, documentation contributors, AI agents.

Use this checklist before merging documentation, package, command, architecture, safety, or release changes.

Also apply `docs/docs-freshness-policy.md` for any change that can make docs stale.

## Always Check

- `README.md` still describes current status honestly.
- `AGENTS.md` still gives correct agent workflow and safety rules.
- `docs/status.md` matches the real project phase.
- `docs/mvp-alpha-scope.md` still matches the real MVP Alpha target when route discovery, render modes, Lumina Map output, CLI inspection, demo-app scope, or deferred work changes.
- `docs/README.md` links to any new durable docs.
- `.github/PULL_REQUEST_TEMPLATE.md` still reflects the required review gates.
- `docs/docs-freshness-policy.md` still reflects current docs freshness rules.
- `docs/docs-verification.md` still reflects the checks contributors are expected to run.
- `docs/agent-enforcement.md` still maps agent rules to the current docs, structure, performance, typecheck, and test gates.
- `docs/testing-contract.md` still reflects test layers, fixture layout, snapshot policy, CI gates, browser artifacts, network rules, and evidence reporting.
- `docs/versioning-and-upgrades.md` still reflects public API, manifest, generated-file, compatibility, and release policy.
- `docs/diagnostics-contract.md` still reflects diagnostic codes, severity values, source locations, remediations, docs links, JSON behavior, security rules, and fixtures.
- `docs/config-contract.md` still reflects config loading, validation, environment-variable, and normalized-output behavior.
- `docs/adapter-contract.md` still reflects adapter inputs, outputs, manifest fields, capabilities, static export behavior, environment variables, health endpoints, compatibility evidence, diagnostics, and fixtures.
- `docs/examples-contract.md` still reflects example statuses, README requirements, create-command integration, generated-artifact expectations, verification evidence, and public guide linking rules.
- `docs/routing-contract.md` still reflects route discovery, route IDs, sorting, diagnostics, manifest fields, and fixtures.
- `docs/api-route-contract.md` still reflects API handlers, method exports, request and response behavior, schemas, diagnostics, security rules, manifest fields, and fixtures.
- `docs/schema-contract.md` still reflects schema helpers, validation result shape, issue shape, query coercion, serializers, OpenAPI mapping, diagnostics, manifest fields, and fixtures.
- `docs/cache-contract.md` still reflects cache modes, headers, tags, revalidation, micro-cache behavior, diagnostics, security rules, manifest fields, and fixtures.
- `docs/seo-contract.md` still reflects metadata helpers, metadata merge behavior, sitemap output, robots output, structured data, diagnostics, security rules, SEO report fields, and fixtures.
- `docs/accessibility-contract.md` still reflects WCAG target language, semantic HTML, keyboard behavior, focus behavior, forms, diagnostics, public docs requirements, and test evidence.
- `docs/security-contract.md` still reflects high-risk surfaces, threat model rules, secret handling, production error behavior, security headers, agent/MCP write rules, vulnerability intake, supply-chain release rules, and evidence requirements.
- `docs/performance-contract.md` still reflects route budgets, Core Web Vitals target language, `.lumina/perf.report.json`, performance diagnostics, benchmark evidence, and public speed-claim rules.
- `docs/speed-decisions.md` still reflects rendering defaults, build pipeline choices, runtime request path, React Compiler, React streaming, resource hints, fetch priority, speculation rules, bfcache, image/font delivery, compression, hot APIs, cache strategy, compiler scaling, rejected defaults, and benchmark positioning.
- `docs/speed-capability-audit.md` still maps every major speed surface to a decision, source docs, proof gate, and implementation follow-up.
- `docs/public-docs-site-architecture.md` and `docs/website-content-map.md` still reflect public docs metadata, routing, navigation, source mapping, and renderer decisions.
- Planned, scaffolded, implemented, and verified behavior are clearly separated.
- New examples are either verified or clearly marked as planned.

## Update README When

- Public positioning changes.
- Setup commands change.
- Package structure changes.
- Prototype status changes.
- A user-facing feature becomes real.
- A planned feature is removed, renamed, or significantly rescoped.

## Update AGENTS When

- Commands change.
- Safety rules change.
- Generated-file rules change.
- Package ownership or edit boundaries change.
- Agent workflow changes.
- New high-risk areas are introduced.

## Update Status, Roadmap, And Backlog When

- A phase starts, completes, or changes scope.
- A package is added or removed.
- A new command is added.
- A feature moves from planned to scaffolded, implemented, or verified.
- A risk changes priority.
- MVP Alpha included or deferred scope changes.

## Update Reference Docs When

- CLI syntax changes: update `docs/cli.md`.
- Test commands, fixture layout, snapshot policy, CI behavior, browser artifact behavior, network rules, or evidence reporting changes: update `docs/testing.md`, `docs/testing-contract.md`, `docs/docs-verification.md`, and affected feature contracts.
- CLI JSON, diagnostics, or exit codes change: update `docs/cli-json-contract.md`.
- Diagnostic shape, code naming, source location, remediation, docs-link, child diagnostic, or JSON ordering changes: update `docs/diagnostics-contract.md`, `docs/cli-json-contract.md`, `docs/manifest-contracts.md`, affected feature contracts, and public diagnostics reference.
- Config fields change: update `docs/config.md`.
- Config loading, validation, env behavior, or normalized output changes: update `docs/config-contract.md`.
- Adapter package, adapter manifest, deployment output, static export, health endpoint, compatibility evidence, or adapter capability changes: update `docs/adapters.md`, `docs/adapter-contract.md`, `docs/deployment.md`, `docs/compatibility.md`, `docs/runtime-contract.md`, `docs/manifest-contracts.md`, and public adapter reference.
- Example, starter template, fixture, or create-command example support changes: update `docs/examples.md`, `docs/examples-contract.md`, `docs/getting-started.md`, `docs/public/guides/create-app.md`, `docs/public/reference/examples.md`, `docs/testing-contract.md`, and `docs/compatibility.md` when platform evidence changes.
- File conventions or route discovery change: update `docs/file-conventions.md`, `docs/routing.md`, `docs/routing-contract.md`, `docs/compiler-ir.md`, `docs/manifest-contracts.md`, and public reference docs.
- API route behavior changes: update `docs/api-routes.md`, `docs/api-route-contract.md`, `docs/schema.md`, `docs/hot-api-path.md`, `docs/runtime-contract.md`, `docs/security.md`, `docs/manifest-contracts.md`, and public API route reference.
- Schema behavior changes: update `docs/schema.md`, `docs/schema-contract.md`, `docs/api-route-contract.md`, `docs/hot-api-path.md`, `docs/manifest-contracts.md`, `docs/api-reference.md`, and public schema reference.
- Cache behavior changes: update `docs/cache.md`, `docs/cache-contract.md`, `docs/runtime-contract.md`, `docs/speed-strategy.md`, `docs/api-route-contract.md`, `docs/hot-api-path.md`, `docs/manifest-contracts.md`, `docs/security.md`, and public cache reference.
- SEO behavior changes: update `docs/seo-engine.md`, `docs/seo-contract.md`, `docs/api-reference.md`, `docs/manifest-contracts.md`, `docs/runtime-contract.md`, `docs/cache-contract.md`, and public SEO reference.
- Accessibility behavior, accessibility diagnostics, route focus behavior, framework-owned form errors, public docs UI, or accessibility evidence changes: update `docs/accessibility.md`, `docs/accessibility-contract.md`, `docs/testing-contract.md`, `docs/seo-contract.md`, and public accessibility reference.
- Generated files change: update `docs/manifest-contracts.md`, `docs/api-reference.md`, `docs/runtime-contract.md`, `docs/agent-kernel.md`, `docs/machine-readable-docs.md`, and public manifest or project-structure references.
- Manifest schema versions change: update `docs/versioning-and-upgrades.md` and machine-readable docs.
- Public helpers change: update `docs/api-reference.md`.
- Agent JSON changes: update `docs/agent-kernel.md` and `docs/mcp-server.md`.

## Update Versioning Docs When

- Public API compatibility changes.
- CLI output, exit codes, or options change.
- Diagnostic codes, categories, schema fields, or severity behavior change.
- Config fields are added, renamed, deprecated, or removed.
- Manifest schema versions change.
- `llms.txt`, `llms-full.txt`, or `docs-index.json` changes version behavior.
- A compatibility statement is added or removed.
- A release includes breaking changes, deprecations, or migration notes.

## Update Public Website Docs When

- A page should become user-facing website content.
- Product positioning changes.
- Comparisons change.
- Examples are added.
- Launch or migration messaging changes.
- Public content in `docs/public/` changes or needs a new page.
- Public docs metadata, route mapping, sidebar behavior, or renderer assumptions change.

## Update Machine-Readable Docs When

- Agent-facing JSON changes.
- `llms.txt`, `llms-full.txt`, or `docs-index.json` behavior changes.
- New docs status labels or audience labels are introduced.
- Generated context capsules change.

## Update Benchmarks When

- A performance claim is added.
- A benchmark fixture changes.
- Hardware, runtime version, dependency version, or methodology changes.
- Raw benchmark data changes.
- Route budgets, Core Web Vitals target language, performance diagnostics, or `.lumina/perf.report.json` changes.

Performance-sensitive changes should update `docs/performance.md`, `docs/performance-contract.md`, `docs/speed-strategy.md`, `docs/benchmark-methodology.md`, `docs/testing-contract.md`, `docs/manifest-contracts.md`, and public performance reference when applicable.
Speed-sensitive architecture decisions should also update `docs/speed-decisions.md` and explain whether the change follows or revises an existing decision.
Whole-system speed reviews should update `docs/speed-capability-audit.md` when a new speed surface, proof gate, or implementation follow-up appears.

## Update Speed Strategy When

- Compiler work changes build-time or incremental behavior.
- Runtime or adapter work adds request-path overhead.
- Rendering defaults, React streaming, resource hints, or hydration behavior change.
- Route modes, hot APIs, cache behavior, or generated manifests change.
- SEO metadata, sitemap generation, robots output, or public HTML checks change.
- Agent-facing JSON grows or changes shape.
- New performance budgets or benchmark fixtures are introduced.
- Test fixture, snapshot, or CI behavior changes that affect performance evidence.
- Public speed positioning changes.

## Update Speed Decisions When

- Vite/Rolldown usage changes.
- Vite bundled dev mode becomes a default, fallback, or rejected option.
- Bun, Node, static, edge, or worker runtime priorities change.
- React Compiler, React streaming, Suspense, resource hints, fetch priority, speculation rules, bfcache, or hydration defaults change.
- Image, font, script, or compression defaults change.
- 103 Early Hints support is added, removed, or scoped.
- Hot API, schema generation, or micro-cache defaults change.
- Runtime request routing adds per-request work.
- Compiler graph or route discovery scaling strategy changes.
- A rejected default becomes viable because benchmark evidence exists.

## Update Security Docs When

- A high-risk area is implemented.
- MCP write tools are added.
- Safe edit behavior changes.
- Runtime request routing changes.
- Environment variable behavior changes.
- Secret handling, production error behavior, security headers, package publishing, advisory handling, or supply-chain evidence changes.
- A vulnerability report is received.

Security-sensitive changes should update `docs/security.md`, `docs/security-contract.md`, `SECURITY.md` when reporting policy changes, `docs/testing-contract.md` when evidence requirements change, and every affected feature contract.

## Use Templates When

- Adding an implementation task: start from `docs/templates/task-template.md`.
- Adding an architecture decision: start from `docs/templates/adr-template.md`.
- Adding a documentation page: start from `docs/templates/documentation-page-template.md`.

## Verify Docs With

- `git diff --check`.
- The local Markdown link check in `docs/docs-verification.md`.
- The placement check that keeps AI playbooks under `docs/skills/` and `docs/subagents/`.
- Status-language review for unsupported implementation, speed, security, compatibility, or benchmark claims.
