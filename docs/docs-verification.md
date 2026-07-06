# Documentation Verification

Status: Scaffolded.

Audience: maintainers, contributors, AI agents.

This page defines the repeatable checks that keep NeedleStart documentation build-ready. It complements [Documentation Freshness Policy](docs-freshness-policy.md) and [Documentation Maintenance Checklist](docs-maintenance-checklist.md) by naming exact checks, expected evidence, implemented scaffold checks, and current scaffold limitations.

## Why This Exists

Documentation quality needs proof. Mature documentation systems combine editorial standards, link validation, reference consistency, machine-readable contracts, and status discipline. NeedleStart now has a lightweight Bun workspace scaffold, so the first verification layer exists as local scripts and CI. This page remains the human-readable source of truth for what those checks mean and what evidence reviewers should report.

Research backing:

- Diataxis separates tutorials, how-to guides, reference, and explanation so readers can find the right kind of help.
- Google and Microsoft developer documentation guidance emphasizes clear, consistent technical writing.
- OpenAPI treats machine-readable API descriptions as source-controlled contracts that can drive docs, tests, and automation.
- AI-native documentation patterns increasingly expose `llms.txt`, `llms-full.txt`, and machine-readable indexes for agents.

## Current Manual Checks

Run these checks before finishing documentation, navigation, public-docs, package-structure, command, generated-file, or agent-workflow changes. The automated subset runs through:

```powershell
bun run docs:check
bun run structure:check
bun run performance:check
bun run check
```

### 1. Git Whitespace Check

```powershell
git diff --check
```

Expected result: exit code `0`.

Windows line-ending warnings are acceptable when Git reports only LF-to-CRLF normalization and no whitespace errors.

### 2. Local Markdown Link Check

```powershell
$files = Get-ChildItem -Recurse -Filter *.md | ForEach-Object { $_.FullName };
$missing = @();
foreach ($file in $files) {
  $dir = Split-Path -Parent $file;
  $content = Get-Content -Raw -LiteralPath $file;
  foreach ($m in [regex]::Matches($content, '\[[^\]]+\]\(([^)#][^)]*)\)')) {
    $target = $m.Groups[1].Value.Trim();
    if ($target -match '^[a-zA-Z][a-zA-Z0-9+.-]*:') { continue }
    $path = ($target -split '#')[0];
    if ([string]::IsNullOrWhiteSpace($path)) { continue }
    $resolved = Join-Path $dir $path;
    if (-not (Test-Path -LiteralPath $resolved)) {
      $rel = Resolve-Path -LiteralPath $file -Relative;
      $missing += "$rel -> $target";
    }
  }
}
if ($missing.Count) {
  $missing | ForEach-Object { Write-Output $_ };
  exit 1
} else {
  Write-Output 'All local Markdown links resolve.'
}
```

Expected result: `All local Markdown links resolve.`

This check does not validate heading anchors or external URLs. Add stricter tooling when the public docs renderer or generated docs index exists.

### 3. Root Playbook Placement Check

```powershell
Test-Path -LiteralPath skills
Test-Path -LiteralPath subagents
Test-Path -LiteralPath docs\skills
Test-Path -LiteralPath docs\subagents
```

Expected result:

```txt
False
False
True
True
```

AI collaboration playbooks belong under `docs/skills/` and `docs/subagents/`, not in root mirrors.

### 4. Planned-Behavior Honesty Search

```powershell
rg -n "\b(implemented|verified|works|passing|production-ready|secure|fastest)\b" README.md AGENTS.md docs
```

Expected result: every match is either:

- describing current documentation status,
- clearly marked as planned target behavior,
- backed by implemented code and checks,
- or listed as an unsupported claim to fix before merge.

This is a review aid, not a binary test.

### 5. Navigation Coverage Check

```powershell
rg -n "first-contribution|review-checklist|threat-model|benchmark-fixtures|examples-catalog|docs-site-build-plan|decisions/README|checklists/README|public-frontmatter-standard|glossary|product-build-readiness|project-structure|docs-verification|public-docs-site-architecture|docs-freshness-policy|docs-maintenance-checklist" README.md AGENTS.md docs\README.md docs\public\README.md docs\public\docs.md docs\website-content-map.md
```

Expected result: new durable docs are discoverable from the relevant root, docs hub, public docs, or website map surfaces.

### 6. Status Language Check

```powershell
bun run docs:check
```

Expected result: every Markdown `Status:` line uses a canonical title-case label with a period: `Draft.`, `Proposed.`, `Planned.`, `Scaffolded.`, `Implemented.`, `Verified.`, or `Deprecated.`. Pages that need nuance should add a separate `Scope:`, `Evidence:`, or prose note instead of embedding explanation in the status line.

### 7. Package And Prototype Scope Check

```powershell
bun run docs:check
```

Expected result: package names and paths stay aligned across `docs/package-map.md`, `docs/phase-1-build-plan.md`, and `docs/task-backlog.md`; prototype CLI examples use the planned `needle ...` command form; adapter docs use `packages/adapters/bun`, `packages/adapters/node`, and `packages/adapters/static`; and scaffold status language does not drift back to pre-scaffold wording.

### 8. Machine-Readable Docs Contract Check

```powershell
rg -n "llms\.txt|llms-full\.txt|docs-index\.json|schemaVersion|generatedAt" docs\machine-readable-docs.md docs\agent-kernel.md docs\mcp-server.md docs\public-docs.md
```

Expected result: machine-readable docs outputs remain documented as planned, schema-versioned, deterministic, and separate from production runtime bundles.

### 9. Public Docs Site Contract Check

```powershell
rg -n "frontmatter|canonical|docs-index\.json|llms\.txt|route mapping|renderer|public-frontmatter-standard|docs-site-build-plan" docs\public-docs-site-architecture.md docs\public-frontmatter-standard.md docs\docs-site-build-plan.md docs\public-docs.md docs\website-content-map.md docs\machine-readable-docs.md
```

Expected result: public docs metadata, routes, navigation, renderer assumptions, and machine-readable outputs remain connected.

### 10. Testing Contract Check

```powershell
rg -n "testing-contract|test:fixtures|test:http|test:browser|snapshot|Fixture Layout|CI Gates|no external network|deterministic" README.md AGENTS.md docs\testing-contract.md docs\testing.md docs\docs-verification.md docs\product-build-readiness.md docs\public\reference\testing.md
```

Expected result: test layers, fixture layout, snapshot policy, CI gates, network rules, deterministic output, testing overview, and public reference docs remain connected.

### 11. CLI JSON Contract Check

```powershell
rg -n "schemaVersion|diagnostics|Exit Codes|--json|stdout|exit-code|needle.cli|CLI JSON|cli-json-contract|diagnostics-contract" docs\cli-json-contract.md docs\cli.md docs\api-reference.md docs\manifest-contracts.md docs\agent-kernel.md docs\mcp-server.md docs\diagnostics-contract.md
```

Expected result: command automation behavior remains connected across CLI reference, API reference, manifests, agent context, and MCP docs.

### 12. Diagnostics Contract Check

```powershell
rg -n "diagnostics-contract|NeedleDiagnostic|DiagnosticCategory|remediation|related|source location|code frame|ROUTE_DUPLICATE_PATH|diagnostic codes" README.md AGENTS.md docs\diagnostics-contract.md docs\cli-json-contract.md docs\api-reference.md docs\manifest-contracts.md docs\compiler-ir.md docs\runtime-contract.md docs\public\reference\diagnostics.md
```

Expected result: diagnostic code rules, levels, categories, source locations, remediations, docs links, JSON behavior, manifests, compiler/runtime docs, and public reference docs remain connected.

### 13. Configuration Contract Check

```powershell
rg -n "needle.config|defineConfig|environment|env|normalized|schemaVersion|secret|adapter" docs\config-contract.md docs\config.md docs\api-reference.md docs\runtime-contract.md docs\adapters.md docs\security.md docs\manifest-contracts.md
```

Expected result: config loading, validation, environment behavior, normalized output, adapter selection, and secret-exclusion rules remain connected.

### 14. Adapter Contract Check

```powershell
rg -n "adapter-contract|Adapter Contract|adapter.manifest|ADAPTER_|health endpoint|static export|@needle/adapter-bun|@needle/adapter-node|@needle/adapter-static|capabilities|nativeRouteDispatch|Bun\.serve|compression|Early Hints|resourceHints|bfcache" README.md AGENTS.md docs\adapter-contract.md docs\adapters.md docs\deployment.md docs\compatibility.md docs\runtime-contract.md docs\manifest-contracts.md docs\public\reference\adapters.md
```

Expected result: adapter packages, generated output, adapter manifest fields, capabilities, native route dispatch, compression, Early Hints, resource hints, bfcache-aware delivery, environment behavior, health endpoint behavior, static export rules, diagnostics, deployment docs, compatibility docs, and public reference docs remain connected.

### 15. Routing Contract Check

```powershell
rg -n "routing-contract|Route ID|ROUTE_DUPLICATE_PATH|routes\.json|routeGroups|sourceFile|catch-all|route discovery" README.md AGENTS.md docs\routing-contract.md docs\routing.md docs\file-conventions.md docs\compiler-ir.md docs\manifest-contracts.md docs\api-routes.md docs\public\reference\file-conventions.md docs\public\reference\project-structure.md docs\public\reference\routing.md
```

Expected result: route grammar, route IDs, manifest fields, diagnostics, fixture requirements, overview docs, and public references remain connected.

### 16. Examples Contract Check

```powershell
rg -n "examples-contract|examples-catalog|Examples And Templates Contract|Verified|Runnable|Scaffolded|bun create needle|--example|large-app-fixture|agent-demo|reference/examples" README.md AGENTS.md docs\examples-contract.md docs\examples-catalog.md docs\examples.md docs\getting-started.md docs\public\guides\create-app.md docs\public\reference\examples.md docs\product-build-readiness.md docs\testing-contract.md
```

Expected result: example status labels, starter-template requirements, create-command examples, fixture expectations, public references, and verification evidence remain connected.

### 17. API Route Contract Check

```powershell
rg -n "api-route-contract|API_METHOD|ApiRouteContext|Request|Response|VALIDATION_FAILED|methods|hot API|bodyLimit" README.md AGENTS.md docs\api-route-contract.md docs\api-routes.md docs\schema.md docs\hot-api-path.md docs\runtime-contract.md docs\security.md docs\manifest-contracts.md docs\public\reference\api-routes.md
```

Expected result: API handler context, method exports, request/response behavior, validation, diagnostics, hot API integration, security rules, manifests, and public reference docs remain connected.

### 18. Schema Contract Check

```powershell
rg -n "schema-contract|SchemaResult|SchemaIssue|InferInput|InferOutput|SCHEMA_|OpenAPI|query coercion|serializer" README.md AGENTS.md docs\schema-contract.md docs\schema.md docs\api-route-contract.md docs\hot-api-path.md docs\manifest-contracts.md docs\api-reference.md docs\public\reference\schema.md
```

Expected result: schema helpers, validation result shape, issue shape, type inference, query coercion, serializer behavior, OpenAPI mapping, diagnostics, manifest references, and public reference docs remain connected.

### 19. Cache Contract Check

```powershell
rg -n "cache-contract|CachePlan|CACHE_|Cache-Control|revalidateTag|micro-cache|stale-while-revalidate|cache tags|no-store" README.md AGENTS.md docs\cache-contract.md docs\cache.md docs\runtime-contract.md docs\speed-strategy.md docs\api-route-contract.md docs\hot-api-path.md docs\manifest-contracts.md docs\security.md docs\public\reference\cache.md
```

Expected result: cache plan shape, defaults, headers, tags, revalidation, micro-cache behavior, diagnostics, manifests, security rules, speed docs, and public reference docs remain connected.

### 20. SEO Contract Check

```powershell
rg -n "seo-contract|defineMeta|generateMeta|SEO_|sitemap|robots|structuredData|canonical|seo.report" README.md AGENTS.md docs\seo-contract.md docs\seo-engine.md docs\api-reference.md docs\manifest-contracts.md docs\runtime-contract.md docs\cache-contract.md docs\public\reference\seo.md docs\public\guides\seo-metadata.md
```

Expected result: metadata API, merge rules, sitemap output, robots output, structured data, diagnostics, manifests, runtime/cache interaction, and public reference docs remain connected.

### 21. Accessibility Contract Check

```powershell
rg -n "accessibility-contract|Accessibility Contract|WCAG|keyboard|focus|semantic HTML|A11Y_|route focus|form errors|reference/accessibility" README.md AGENTS.md docs\accessibility-contract.md docs\accessibility.md docs\testing-contract.md docs\seo-contract.md docs\docs-verification.md docs\product-build-readiness.md docs\public-docs.md docs\public\reference\accessibility.md
```

Expected result: WCAG target language, semantic HTML, keyboard behavior, focus behavior, form errors, diagnostics, testing evidence, public docs readiness, SEO overlap, and public reference docs remain connected.

### 22. Security Contract Check

```powershell
rg -n "security-contract|Security Contract|threat-model|Threat Model|threat model|secret|production error|security headers|vulnerability|advisory|provenance|supply chain|high-risk" README.md AGENTS.md SECURITY.md .github\PULL_REQUEST_TEMPLATE.md docs\security-contract.md docs\threat-model.md docs\security.md docs\testing-contract.md docs\docs-verification.md docs\product-build-readiness.md docs\public\reference\security.md
```

Expected result: security target language, high-risk surfaces, threat model requirements, secret handling, production error behavior, security headers, advisory flow, supply-chain release rules, testing evidence, and public reference docs remain connected.

### 23. Performance Contract Check

```powershell
rg -n "performance-contract|Performance Contract|benchmark-fixtures|Core Web Vitals|LCP|INP|CLS|perf.report|PERF_|budget|benchmark evidence|delivery|chunk count|source-map|RUM|field data|resourceHints|Early Hints|compression|bfcache|reference/performance" README.md AGENTS.md .github\PULL_REQUEST_TEMPLATE.md docs\performance-contract.md docs\performance.md docs\speed-strategy.md docs\benchmark-methodology.md docs\benchmark-fixtures.md docs\testing-contract.md docs\manifest-contracts.md docs\docs-verification.md docs\product-build-readiness.md docs\public\reference\performance.md
```

Expected result: route budgets, Core Web Vitals target language, performance reports, delivery fields, chunk counts, source-map exposure, optional RUM and field-data policy, diagnostics, benchmark evidence, testing evidence, manifest references, public claim rules, and public reference docs remain connected.

### 24. Speed Decision Check

```powershell
rg -n "speed-capability-audit|Speed Capability Audit|speed-decisions|Speed Decisions|Vite/Rolldown|Vite 8|bundled dev|custom bundler|Bun native dispatch|nativeRouteDispatch|route code splitting|CSS delivery|source maps|RUM|field data|React Compiler|React streaming|103 Early Hints|resource hints|resourceHints|fetchpriority|speculation|bfcache|compression|images|fonts|async waterfall|hot API|payload budget|compiler scaling|rejected defaults" README.md AGENTS.md ARCHITECTURE.md docs\speed-capability-audit.md docs\speed-decisions.md docs\speed-strategy.md docs\performance-contract.md docs\benchmark-methodology.md docs\product-build-readiness.md docs\docs-verification.md docs\task-backlog.md
```

Expected result: speed-sensitive architecture choices, browser-delivery choices, rejected defaults, implementation gates, performance reports, benchmark methodology, README, AGENTS, architecture, and backlog remain connected.

### 25. Contributor, ADR, Checklist, And Glossary Check

```powershell
rg -n "first-contribution|Architecture Decision Records|decisions/README|Implementation Checklists|checklists/phase-1-scaffold|checklists/adapter-implementation|checklists/performance-evidence|public-frontmatter-standard|Glossary" README.md AGENTS.md docs\README.md docs\docs-verification.md docs\website-content-map.md docs\public-docs-site-architecture.md docs\public\README.md
```

Expected result: first-contribution guidance, ADRs, implementation checklists, public frontmatter rules, and glossary coverage remain discoverable from repository entrypoints and docs verification.

### 26. Review, Threat, Fixture, Example, And Docs-Site Check

```powershell
rg -n "review-checklist|threat-model|benchmark-fixtures|examples-catalog|docs-site-build-plan|PULL_REQUEST_TEMPLATE" README.md AGENTS.md .github\PULL_REQUEST_TEMPLATE.md docs\README.md docs\docs-verification.md docs\security-contract.md docs\benchmark-methodology.md docs\examples-contract.md docs\public-docs-site-architecture.md docs\website-content-map.md
```

Expected result: review gates, threat-model requirements, benchmark fixture planning, example catalog planning, docs-site implementation phases, and PR template evidence remain connected.

## Script Targets

The initial Bun workspace exposes these package scripts:

```json
{
  "scripts": {
    "docs:check": "bun scripts/check-docs.ts",
    "structure:check": "bun scripts/check-structure.ts",
    "performance:check": "bun scripts/check-performance-docs.ts",
    "check": "bun run docs:check && bun run structure:check && bun run performance:check && bun run typecheck && bun test"
  }
}
```

Target behavior:

- `docs:check` validates required docs, required links, local Markdown links, root docs metadata, durable internal docs hub coverage, top-level status/audience pairing, every Markdown status label format, public docs navigation coverage, AI playbook placement, verification-section coverage, scaffold-status language, package-map/build-plan/backlog package coverage, planned CLI command prefix consistency, adapter package paths, and the current `bun.lockb` lockfile name.
- `structure:check` validates workspace scripts, package names, package entrypoints, TypeScript scaffold files, CI, and forbidden runtime dependencies on agent-only packages.
- `performance:check` validates performance docs, benchmark fixture coverage, raw-result rules, and unsupported root/public speed, benchmark, or SEO positioning claim patterns.
- `check` runs the automated docs, structure, performance, typecheck, and test gates.

Future work can split these into narrower `docs:links`, `docs:claims`, and `docs:index` commands after generated docs indexes exist.

## Evidence To Report

Every documentation-heavy PR should report:

- Which docs were updated.
- Which docs were checked but not changed.
- Whether `git diff --check` passed.
- Whether local Markdown links passed.
- Whether status language was reviewed.
- Whether public docs navigation changed.
- Whether public docs metadata, route mapping, or renderer assumptions changed.
- Whether machine-readable docs contracts changed.
- Whether first-contribution guidance, ADRs, implementation checklists, glossary terms, or public frontmatter rules changed.
- Whether review gates, threat models, benchmark fixtures, examples catalog, docs-site build plan, or pull request template requirements changed.
- Whether test commands, fixture layout, snapshots, CI gates, browser artifacts, security tests, performance tests, or evidence reporting changed.
- Whether CLI JSON, diagnostics, or exit-code contracts changed.
- Whether diagnostic codes, categories, source locations, remediations, docs links, child diagnostics, or JSON diagnostic ordering changed.
- Whether config loading, validation, env behavior, or normalized config output changed.
- Whether adapter packages, adapter manifests, deployment output, static export behavior, health endpoints, adapter env vars, compatibility evidence, or adapter capability claims changed.
- Whether examples, starter templates, fixture evidence, create-command example support, public guide snippets, or example status labels changed.
- Whether route discovery, route IDs, route sorting, route diagnostics, or route manifest fields changed.
- Whether API route handlers, validation, response behavior, diagnostics, security rules, or manifest fields changed.
- Whether schema helpers, validation result shape, query coercion, serializers, OpenAPI mapping, diagnostics, or manifest fields changed.
- Whether cache modes, headers, tags, revalidation, micro-cache behavior, diagnostics, security rules, or manifest fields changed.
- Whether metadata helpers, metadata merge rules, sitemap output, robots output, structured data behavior, SEO diagnostics, security rules, or SEO report fields changed.
- Whether accessibility target language, semantic HTML, keyboard behavior, focus behavior, form errors, accessibility diagnostics, public docs UI, or accessibility evidence changed.
- Whether high-risk surfaces, threat models, secret handling, production errors, security headers, vulnerability intake, package provenance, or security evidence changed.
- Whether route budgets, Core Web Vitals target language, performance diagnostics, `.needle/perf.report.json`, route chunk fields, source-map exposure, RUM policy, benchmark evidence, or public speed claims changed.
- Whether rendering defaults, build pipeline, runtime request path, route code splitting, CSS delivery, production source maps, React Compiler, React streaming, resource hints, fetch priority, 103 Early Hints, speculation rules, bfcache, compression, image/font delivery, client payload, optional RUM, hot API behavior, cache strategy, compiler scaling, or speed decision gates changed.
- Which code checks were unavailable and why.

## CI Path

The initial CI job runs:

1. `bun install`
2. `bun run check`

Manual docs verification remains the source of truth for checks that require reviewer judgment.

## Out Of Scope

- Treating a text search as proof that every claim is correct.
- Validating external URLs on every local run.
- Claiming docs are launch-ready before public pages have frontmatter or a docs-site renderer.
- Claiming product behavior is verified before packages, fixtures, and tests exist.
