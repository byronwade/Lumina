# Documentation Verification

Status: Scaffolded.

Audience: maintainers, contributors, AI agents.

This page defines the repeatable checks that keep Lumina documentation build-ready. It complements [Documentation Freshness Policy](docs-freshness-policy.md) and [Documentation Maintenance Checklist](docs-maintenance-checklist.md) by naming exact checks, expected evidence, implemented scaffold checks, and current scaffold limitations.

## Why This Exists

Documentation quality needs proof. Mature documentation systems combine editorial standards, link validation, reference consistency, machine-readable contracts, and status discipline. Lumina now has a lightweight Bun workspace scaffold, so the first verification layer exists as local scripts and CI. This page remains the human-readable source of truth for what those checks mean and what evidence reviewers should report.

Research backing:

- Diataxis separates tutorials, how-to guides, reference, and explanation so readers can find the right kind of help.
- Google and Microsoft developer documentation guidance emphasizes clear, consistent technical writing.
- OpenAPI treats machine-readable API descriptions as source-controlled contracts that can drive docs, tests, and automation.
- AI-native documentation patterns increasingly expose `llms.txt`, `llms-full.txt`, and machine-readable indexes for agents.

## Current Manual Checks

Run these checks before finishing documentation, navigation, public-docs, package-structure, command, generated-file, or agent-workflow changes. Use [Agent Enforcement Matrix](agent-enforcement.md) to map each gate to the rules it currently enforces. The automated subset runs through:

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

Automated coverage in `bun run docs:check` also rejects pre-scaffold command-limitation language, stale pre-expansion audit tasks, stale improvement-matrix PR-template tasks, public compiler/runtime wording that implies implemented behavior, and PR-template diagnostic severity wording, so old "no scaffold," "missing docs homes," "add PR template later," or unimplemented present-tense behavior evidence cannot be mistaken for current repository status. It also requires documentation audit matrix pages to distinguish editorial `Current quality` values from canonical `Status:` labels.

Planned overview pages for Cache, Lumina Map, Agent Kernel, MCP, and Safe Edit Transactions must state that the behavior is not implemented yet until package behavior and feature-specific evidence exist.

Planned feature overviews must use planned acceptance criteria and `should` wording instead of current-tense "Definition of Done" bullets until the behavior exists and feature-specific evidence proves it.

README prototype goals and future roadmap or backlog acceptance bullets must also use `should` wording until the corresponding package behavior, fixtures, and checks exist.

README feature and differentiator sections must label planned framework capabilities as planned and avoid public-facing present-tense capability claims until the prototype exists.

Public API draft examples must say they are planned and not implemented yet unless the behavior has feature-specific implementation evidence.

Internal and public CLI reference tables must make the planned status visible in their headings or status columns. For example, use `JSON output required once implemented?` instead of a present-tense `JSON output required?` heading while `@lumina/cli` has no behavior.

Automated coverage also requires README, AGENTS, Vision, product strategy, public home, and glossary docs to keep the canonical product identity aligned: Lumina is an `app-graph-native, SEO-first React framework` for humans and AI agents, the semantic app graph is the first-class primitive, public pages can use the short promise `Your app ships with a map`, short-form positioning should use `Build like Next.js` and `Type like TanStack Start`, and public agent workflow pages should use the `Agent-Safe Workflows` label instead of older agent-native product wording. Public index and roadmap pages must also name the current Phase 1 scaffold evidence: Bun workspace, package placeholders, shared core types, CI, and enforcement scripts.

Top-level speed positioning must stay static-first and evidence-aware until benchmarks exist. `bun run performance:check` rejects unsupported public speed slogans such as `Ship fast with Bun and Vite`, `Bun-speed`, `Bun-first runtime paths`, generic `planned fast runtime paths`, `fastest safe rendering strategy`, or `maximum speed`.

### 5. Navigation Coverage Check

```powershell
rg -n "first-contribution|review-checklist|threat-model|benchmark-fixtures|examples-catalog|docs-site-build-plan|decisions/README|checklists/README|public-frontmatter-standard|glossary|product-build-readiness|agent-enforcement|project-structure|docs-verification|public-docs-site-architecture|docs-freshness-policy|docs-maintenance-checklist" README.md AGENTS.md docs\README.md docs\public\README.md docs\public\docs.md docs\website-content-map.md
```

Expected result: new durable docs are discoverable from the relevant root, docs hub, public docs, or website map surfaces.

Automated coverage in `bun run docs:check` also requires every public page under `docs/public/`, except the public home and directory README, to be linked from `docs/public/docs.md`, `docs/public/README.md`, and `docs/website-content-map.md`.

### 6. Status Language Check

```powershell
bun run docs:check
```

Expected result: every Markdown file under `docs/` has top-level `Status:` and `Audience:` lines near the top, and every top-level `Status:` line uses a canonical title-case label with a period: `Draft.`, `Proposed.`, `Planned.`, `Scaffolded.`, `Implemented.`, `Verified.`, or `Deprecated.`. Pages that need nuance should add a separate `Scope:`, `Evidence:`, or prose note instead of embedding explanation in the status line.

Automated coverage in `bun run docs:check` also requires the project status doc, documentation standard, public frontmatter standard, and public docs site architecture to keep the mapping between internal status labels and public frontmatter values aligned: `Draft.` to `draft`, `Proposed.` to `proposed`, `Planned.` to `planned`, `Scaffolded.` to `scaffolded`, `Implemented.` to `implemented`, `Verified.` to `verified`, and `Deprecated.` to `deprecated`.

Automated coverage also requires embedded planning fields in `docs/roadmap.md` and `docs/task-backlog.md` to use `Phase status:` and `Task status:` instead of bare `Status:`. Bare `Status:` is reserved for the top-level page metadata block so agents and docs tooling do not confuse page status with phase or task state.

### 7. Package And Prototype Scope Check

```powershell
bun run docs:check
```

Expected result: package names and paths stay aligned across `docs/package-map.md`, `docs/phase-1-build-plan.md`, and `docs/task-backlog.md`; prototype CLI examples use the planned `lumina ...` command form; adapter docs use `packages/adapters/bun`, `packages/adapters/node`, and `packages/adapters/static`; adapter manifest prose uses `dist/adapter.manifest.json`; and scaffold status language does not drift back to pre-scaffold wording.

Automated coverage in `bun run docs:check` also requires the AGENTS required-documentation-sync list to include existing root docs, docs hub, status, roadmap, package map, documentation standards, freshness rules, maintenance rules, verification rules, feature contracts, runtime and compiler contracts, public-docs planning, public docs root pages, release and migration docs, speed and performance docs, Phase 1 build plan, product build readiness, and task backlog files that agents must evaluate on every change.

It also parses the AGENTS required-documentation-sync section directly. Every path listed there must exist, and every canonical must-check documentation contract, security, performance, public-docs, and checklist file must remain listed there. It also discovers every Markdown file under `docs/skills/` and `docs/subagents/` and requires each playbook file to appear in the AGENTS sync list.

Vision, prototype, public-roadmap, Phase 1 build plan, task backlog, and contributor docs must describe Bun serving through `@lumina/adapter-bun` or the Bun adapter path instead of generic "Bun serving" or "Bun server" wording that could imply a separate active runtime package.

Feature scheduling gates in compiler IR and risk-mitigation docs must use `planned acceptance criteria` wording for tests and agent demos, rather than ambiguous current-tense definition-of-done wording.

The current implementation path must stay aligned across README, project status, roadmap, public roadmap, product-readiness, and backlog docs: Phase 1A expands and stabilizes the shared core data model, then begins route discovery. Current-status and verification docs must distinguish scaffolded adapter packages from unimplemented runtime adapter behavior.

### 7A. Agent Enforcement Matrix Check

```powershell
rg -n "Agent Enforcement Matrix|bun run docs:check|bun run structure:check|bun run performance:check|bun run typecheck|bun test|bun run check|planned, scaffolded, implemented, and verified|performance claims|root skills|root subagents" README.md AGENTS.md docs\README.md docs\agent-enforcement.md docs\product-build-readiness.md docs\docs-maintenance-checklist.md
```

Expected result: agent rules, automation commands, claim gates, performance evidence, and root playbook placement rules remain connected from README, AGENTS, docs hub, build-readiness docs, and the maintenance checklist.

Automated coverage in `bun run docs:check` also requires `docs/agent-enforcement.md` to exist, be linked from README and the docs hub, appear in AGENTS required-documentation-sync, keep the command and claim-gate vocabulary aligned, and use the single combined root playbook placement rule.

### 7B. MVP Alpha Scope Check

```powershell
rg -n "MVP Alpha|Target MVP behavior|Planned for MVP Alpha|Future" README.md AGENTS.md docs/mvp-alpha-scope.md docs/status.md docs/roadmap.md docs/getting-started.md docs/lumina-map.md docs/examples-catalog.md docs/examples.md docs/file-conventions.md
```

Expected result: the MVP Alpha scope is visible in root positioning, onboarding, map, status, roadmap, examples, and file conventions.

Automated coverage in `bun run docs:check` requires README, status, roadmap, getting started, Lumina Map, examples catalog, and file conventions to keep `MVP Alpha` visible before core prototype work starts. It also requires `docs/mvp-alpha-scope.md` to be linked from README, AGENTS, and the docs hub.

### 8. Machine-Readable Docs Contract Check

```powershell
rg -n "llms\.txt|llms-full\.txt|docs-index\.json|schemaVersion|generatedAt" docs\machine-readable-docs.md docs\agent-kernel.md docs\mcp-server.md docs\public-docs.md
```

Expected result: machine-readable docs outputs remain documented as planned, schema-versioned, deterministic, and separate from production runtime bundles.

Automated coverage in `bun run docs:check` also requires machine-readable docs, Agent Kernel, MCP, and public docs readiness docs to keep `llms.txt`, `llms-full.txt`, `docs-index.json`, `schemaVersion`, `generatedAt`, deterministic output, and production-runtime-bundle exclusion language aligned. It also requires Agent Kernel artifact tables to label `.lumina/*` and `dist/*` outputs as planned while generated artifacts remain unimplemented.

Automated coverage also requires machine-readable docs to distinguish `.lumina/*` compiler or agent source contracts from deployment-shaped `dist/*` copies.

Automated coverage also requires the Agent Kernel, machine-readable docs, and public Agent Context guide to name the planned context artifacts `.lumina/context/*.ctx.json` and `.lumina/context/agent-index.json`.

Automated coverage also requires the internal MCP server contract and public MCP reference to list the same initial planned read tools: `list_routes`, `get_route`, `get_route_context`, `get_related_files`, `get_impact_map`, `get_component_contract`, `get_schema`, `get_seo_report`, `get_perf_report`, and `get_cache_report`. It also requires both docs to list the same planned write tools: `create_page`, `create_api_route`, `edit_route_meta`, `edit_component_contract`, `add_component_to_route`, `run_affected_checks`, `apply_safe_patch`, `read_agent_log`, `get_mutation`, and `undo_mutation`. Planned MCP resources must stay aligned too: `lumina://routes`, `lumina://route/%2Fpricing`, `lumina://map/file/components%2FProductCard.tsx`, `lumina://seo/report`, `lumina://perf/report`, and `lumina://context/public`.

### 9. Public Docs Site Contract Check

```powershell
rg -n "frontmatter|canonical|docs-index\.json|llms\.txt|route mapping|renderer|public-frontmatter-standard|docs-site-build-plan" docs\public-docs-site-architecture.md docs\public-frontmatter-standard.md docs\docs-site-build-plan.md docs\public-docs.md docs\website-content-map.md docs\machine-readable-docs.md
```

Expected result: public docs metadata, routes, navigation, source mapping, renderer assumptions, and machine-readable outputs remain connected.

Automated coverage in `bun run docs:check` also requires public docs architecture, public frontmatter, docs-site build plan, public docs readiness, website content map, and machine-readable docs pages to keep frontmatter, canonical route, route mapping, renderer, source mapping, `docs-index.json`, `llms.txt`, and related source-doc vocabulary aligned. It also requires public docs architecture and public frontmatter docs to list the same canonical public status values: `draft`, `proposed`, `planned`, `scaffolded`, `implemented`, `verified`, and `deprecated`.

Automated coverage also requires the public docs architecture route table to identify itself as representative and to point to [Website Content Map](website-content-map.md) as the complete planned public navigation inventory.

### 10. Testing Contract Check

```powershell
rg -n "testing-contract|test:fixtures|test:http|test:browser|snapshot|Fixture Layout|CI Gates|no external network|deterministic" README.md AGENTS.md docs\testing-contract.md docs\testing.md docs\docs-verification.md docs\product-build-readiness.md docs\public\reference\testing.md
```

Expected result: test layers, fixture layout, snapshot policy, CI gates, network rules, deterministic output, testing overview, and public reference docs remain connected.

### 11. CLI JSON Contract Check

```powershell
rg -n "schemaVersion|diagnostics|Exit Codes|--json|stdout|exit-code|lumina.cli|CLI JSON|cli-json-contract|diagnostics-contract|lumina inspect why|lumina map file|lumina map route|lumina map affected|lumina map explain|lumina agent init|lumina agent context|lumina agent task|lumina agent plan|lumina agent apply|lumina agent log|lumina edit undo|lumina migrate from-next|lumina seo --route|lumina seo --sitemap|lumina seo --strict" docs\cli-json-contract.md docs\cli.md docs\api-reference.md docs\manifest-contracts.md docs\lumina-map.md docs\agent-kernel.md docs\mcp-server.md docs\diagnostics-contract.md docs\public\reference\cli.md docs\public\guides\lumina-map.md
```

Expected result: command automation behavior and planned command variants remain connected across CLI reference, API reference, manifests, Lumina Map, Agent Kernel, MCP docs, and public CLI docs.

Automated coverage in `bun run docs:check` also requires `docs/cli-json-contract.md` and `docs/public/reference/cli.md` to list every planned JSON automation command: `lumina build --json`, `lumina routes --json`, `lumina inspect --json`, `lumina check --json`, `lumina seo --json`, `lumina map --json`, `lumina agent context --json`, `lumina edit --json`, `lumina migrate --json`, and `lumina bench --json`. Public CLI docs must also label the command table as planned while no CLI behavior exists.

Automated coverage also requires the internal Lumina Map contract and public Lumina Map guide to list the same planned map command surfaces: `lumina map`, `lumina map --json`, `lumina map file`, `lumina map route`, `lumina map affected`, and `lumina map explain`.

### 12. Diagnostics Contract Check

```powershell
rg -n "diagnostics-contract|LuminaDiagnostic|severity|DiagnosticCategory|remediation|related|source location|code frame|ROUTE_DUPLICATE_PATH|diagnostic codes|deterministic|stable ordering|Command status" README.md AGENTS.md docs\diagnostics-contract.md docs\cli-json-contract.md docs\api-reference.md docs\manifest-contracts.md docs\compiler-ir.md docs\runtime-contract.md docs\public\reference\diagnostics.md
```

Expected result: diagnostic code rules, severity values, categories, source locations, remediations, docs links, deterministic JSON behavior, stable ordering, command status mapping, manifests, compiler/runtime docs, and public reference docs remain connected.

Automated coverage in `bun run docs:check` also requires internal and public diagnostics docs to keep severity, deterministic ordering, code, message, remediation, docs-link, `why`, `related`, `children`, and `tags` vocabulary aligned.

The same automated coverage rejects stale diagnostics summary wording that describes diagnostic severity as generic levels in AGENTS, the docs hub, the maintenance checklist, the product readiness checklist, the completion audit, or manifest contracts.

### 13. Configuration Contract Check

```powershell
rg -n "lumina.config|defineConfig|environment|env|server-only|public prefix|\\.env\\*|normalized|schemaVersion|secret|adapter|runtime.name" docs\config-contract.md docs\config.md docs\public\reference\config.md docs\api-reference.md docs\runtime-contract.md docs\adapters.md docs\security.md docs\manifest-contracts.md
```

Expected result: config loading, validation, environment behavior, normalized output, adapter selection, runtime/adapter ownership, `dist/adapter.manifest.json` `runtime.name`, and secret-exclusion rules remain connected.

Automated coverage in `bun run docs:check` also requires config, public config, and config contract docs to keep server-only env, public prefix, `.env*`, secret, generated artifact, diagnostics, adapter package, and `runtime.name` language aligned.

Config docs must tie final default readiness to config-loading behavior, not package existence or generic package implementation. The Phase 1 package scaffold can exist while config loading remains planned.

Automated coverage also requires config, public config, and config contract docs to keep normalized config vocabulary aligned: `schemaVersion`, `root`, `runtime`, `adapter`, `outDir`, `luminaDir`, and `mode`.

### 14. Adapter Contract Check

```powershell
rg -n "adapter-contract|Adapter Contract|routes\.manifest\.json|render\.manifest\.json|seo\.report\.json|adapter\.manifest\.json|ADAPTER_|health endpoint|static export|@lumina/adapter-bun|@lumina/adapter-node|@lumina/adapter-static|capabilities|nativeRouteDispatch|Bun\.serve|compression|Early Hints|resourceHints|bfcache" README.md AGENTS.md docs\adapter-contract.md docs\adapters.md docs\deployment.md docs\compatibility.md docs\runtime-contract.md docs\manifest-contracts.md docs\public\reference\adapters.md
```

Expected result: adapter packages, generated output, adapter manifest fields, capabilities, native route dispatch, compression, Early Hints, resource hints, bfcache-aware delivery, environment behavior, health endpoint behavior, static export rules, diagnostics, deployment docs, compatibility docs, and public reference docs remain connected.

Automated coverage in `bun run docs:check` also requires adapter contract, adapter architecture, and public adapter reference docs to keep `@lumina/adapter-bun`, `@lumina/adapter-node`, `@lumina/adapter-static`, `dist/routes.manifest.json`, `dist/render.manifest.json`, `dist/seo.report.json`, `dist/adapter.manifest.json`, `runtime.name`, `capabilities`, `nativeRouteDispatch`, `Bun.serve`, health endpoint, static export, `ADAPTER_` diagnostics, compression, Early Hints, `resourceHints`, and bfcache language aligned.

Adapter and runtime docs must explicitly distinguish scaffolded adapter packages from unimplemented adapter and runtime behavior.

Automated coverage also rejects Bun or Node wording that implies separate runtime package ownership where the intended contract is an adapter path.

### 15. Manifest Contract Check

```powershell
rg -n "routes\.json|render-manifest\.json|map\.json|graph\.json|seo\.report\.json|perf\.report\.json|agent-index\.json|mutations\.json|routes\.manifest\.json|render\.manifest\.json|adapter\.manifest\.json|schema version|normalized paths|stable ordering|source inputs|absolute local paths" AGENTS.md docs\agent-kernel.md docs\api-reference.md docs\config-contract.md docs\examples-contract.md docs\getting-started.md docs\machine-readable-docs.md docs\manifest-contracts.md docs\runtime-contract.md docs\public\reference\config.md docs\public\reference\manifest-contracts.md docs\public\reference\project-structure.md
```

Expected result: generated artifact names, deployment-copy artifact names, schema version rules, normalized paths, stable ordering, source-input documentation, public-artifact path safety, and generated-file edit rules remain connected across agent rules, Agent Kernel docs, API reference, config contract, examples contract, getting-started output, machine-readable docs, internal manifests, runtime contract, public config reference, public manifest reference, and public project structure docs.

Automated coverage in `bun run docs:check` also requires canonical `.lumina/*` artifact names, named `dist/*` deployment-copy artifacts, and generated artifact contract-rule vocabulary to stay aligned across these docs.

Automated coverage also requires internal and public manifest contract docs to link the same source contracts for routing, API routes, schema, cache, SEO, performance, and diagnostics.

Onboarding, prototype, and API route docs must name `.lumina/routes.json`, `.lumina/render-manifest.json`, and deployment-copy artifacts when relevant instead of generic "route and render manifests" or "render/runtime manifests" wording.

### 16. Routing Contract Check

```powershell
rg -n "routing-contract|Route ID|ROUTE_DUPLICATE_PATH|ROUTE_UNSUPPORTED_CONVENTION|routes\.json|routeGroups|sourceFile|app/api/users/\[id\]\.ts|optional catch-all|unsupported-convention|stable across operating systems|route discovery" README.md AGENTS.md docs\routing-contract.md docs\routing.md docs\file-conventions.md docs\compiler-ir.md docs\manifest-contracts.md docs\api-routes.md docs\public\reference\file-conventions.md docs\public\reference\project-structure.md docs\public\reference\routing.md
```

Expected result: route grammar, dynamic API examples, route IDs, manifest fields, optional catch-all unsupported-convention behavior, diagnostics, fixture requirements, overview docs, and public references remain connected.

Automated coverage in `bun run docs:check` requires public routing and file-convention tables to label planned files, routes, URLs, and route types as planned while route discovery remains unimplemented.

Automated coverage in `bun run docs:check` also requires routing, file-convention, and public routing docs to keep the dynamic API example, optional catch-all status, unsupported-convention diagnostic wording, route IDs, and cross-OS stability language aligned.

Automated coverage in `bun run docs:check` requires the README first screen to explain that the checkout is still Phase 1 scaffold and that broad product language describes target framework behavior, not current runtime behavior.

Automated coverage in `bun run docs:check` also requires `docs/documentation-completion-audit.md` to use documentation coverage labels and documentation-scoped audit headings, not broad completion status labels. Completion-audit rows must distinguish covered documentation from implemented framework behavior, launch readiness, package readiness, and benchmark evidence.

### 17. Examples Contract Check

```powershell
rg -n "examples-contract|examples-catalog|Examples And Templates Contract|Verified|Runnable|Scaffolded|bun create needle|--example|large-app-fixture|agent-demo|blog-seo|reference/examples" README.md AGENTS.md docs\risk-mitigation.md docs\examples-contract.md docs\examples-catalog.md docs\examples.md docs\getting-started.md docs\public\guides\create-app.md docs\public\reference\examples.md docs\product-build-readiness.md docs\testing-contract.md
```

Expected result: example status labels, starter-template requirements, create-command examples, fixture expectations, risk-mitigation example names, public references, and verification evidence remain connected.

Automated coverage in `bun run docs:check` also requires generated app package scripts (`bun run dev`, `bun run build`, and `bun run start`) to stay documented as wrappers around `lumina dev`, `lumina build`, and `lumina start` in the onboarding and examples docs. Example command blocks must not list both `bun run build` and direct `lumina build` as separate required build steps.

Onboarding and create-app docs must name the current scaffold evidence consistently: Bun workspace, package placeholders, shared core types, CI, and enforcement scripts. They must also keep app creation and CLI behavior marked as not implemented.

Automated coverage also rejects stale example names or create-command flags such as `--template agent-demo`, `large-monorepo-fixture`, and `blog-seo-with-map`; use `--example`, `examples/agent-demo/`, `playgrounds/large-app-fixture/`, and `examples/blog-seo/` instead.

Automated coverage in `bun run docs:check` also requires onboarding target-result bullets in `docs/getting-started.md` and `docs/public/guides/create-app.md` to use planned `should` wording until app creation, route output, SEO metadata, Lumina Map, and agent context behavior are implemented.

Prototype docs must describe the first public prototype and first working slice as planned proof targets until the prototype exists. Use `should prove` or `is intended to prove` for target scope, not wording that implies the proof has already happened.

Prototype-scope docs should use `first working slice` and `first public prototype` instead of stale `MVP` shorthand or older "agent-native wedge" phrasing. The first working slice is the smaller proof path; the first public prototype is the broader demo target. The public roadmap must use `is intended to prove` wording for the first working slice until that slice is implemented and verified. Prototype-scope docs should use `adapter-aware server output` and `documented Node/static paths` for the broader prototype adapter boundary.

Automated coverage in `bun run docs:check` also requires every public guide page that shows planned commands or APIs to state the matching behavior is not implemented yet. This includes create-app, static page, API route, hot API route, SEO metadata, Lumina Map, and agent context workflows.

### 18. API Route Contract Check

```powershell
rg -n "api-route-contract|API_METHOD|ApiRouteContext|Request|Response|VALIDATION_FAILED|methods|hot API|bodyLimit|no-store|generated manifests|security|diagnostics" README.md AGENTS.md docs\api-route-contract.md docs\api-routes.md docs\schema.md docs\hot-api-path.md docs\runtime-contract.md docs\security.md docs\manifest-contracts.md docs\public\reference\api-routes.md
```

Expected result: API handler context, method exports, request/response behavior, validation, diagnostics, hot API integration, security rules, manifests, and public reference docs remain connected.

Automated coverage in `bun run docs:check` also requires API route contract, API route overview, and public API route reference docs to keep `ApiRouteContext`, Web `Request` and `Response`, `VALIDATION_FAILED`, method exports, `API_METHOD_` diagnostics, hot API integration, `bodyLimit`, `no-store`, generated manifests, security, and diagnostics language aligned.

Automated coverage in `bun run docs:check` also requires API route contract, API route overview, public guide, public reference docs, roadmap, and task backlog to use planned `should` wording for request, return, handler behavior, and API route acceptance criteria until implementation exists. Roadmap and backlog docs also state that "Definition of done" sections are planned acceptance criteria unless the section is explicitly marked `Verified.` or `Scaffolded.` with evidence. Runtime docs must mark adapter-aware server entry generation as planned until the compiler actually emits it.

### 18A. Render Mode Contract Check

```powershell
rg -n "RenderMode|staticPage|prerender|ssr|stream|clientOnly|client-only|app/api|hot-api|apiHot" README.md AGENTS.md packages\core\src\index.ts docs\api-reference.md docs\compiler-ir.md docs\runtime-contract.md docs\roadmap.md docs\public\reference\render-modes.md docs\public\reference\api-routes.md
```

Expected result: public helper names, ordinary API route mode, manifest literal values, compiler IR, runtime docs, roadmap, and the `@lumina/core` `RenderMode` union remain connected.

Automated coverage in `bun run docs:check` also requires `@lumina/core`, compiler IR, API reference, runtime contract, roadmap, public render-mode reference, and public API route reference docs to keep `RenderMode`, `staticPage()`, `prerender()`, `ssr()`, `stream()`, `clientOnly()`, ordinary `app/api/` `renderMode: "api"`, explicit `apiHot()` `renderMode: "hot-api"`, `.lumina/render-manifest.json`, and every render-mode literal aligned.

### 19. Schema Contract Check

```powershell
rg -n "schema-contract|SchemaResult|SchemaIssue|InferInput|InferOutput|SCHEMA_|OpenAPI|query coercion|serializer|manifest references|diagnostics" README.md AGENTS.md docs\schema-contract.md docs\schema.md docs\api-route-contract.md docs\hot-api-path.md docs\manifest-contracts.md docs\api-reference.md docs\public\reference\schema.md
```

Expected result: schema helpers, validation result shape, issue shape, type inference, query coercion, serializer behavior, OpenAPI mapping, diagnostics, manifest references, and public reference docs remain connected.

Automated coverage in `bun run docs:check` also requires schema contract, schema overview, and public schema reference docs to keep `SchemaResult`, `SchemaIssue`, `InferInput`, `InferOutput`, `SCHEMA_` diagnostics, OpenAPI, query coercion, serializer, diagnostics, and manifest-reference language aligned.

### 20. Cache Contract Check

```powershell
rg -n "cache-contract|CachePlan|CACHE_|Cache-Control|revalidateTag|micro-cache|stale-while-revalidate|cache tags|no-store|generated manifests|diagnostics|secrets" README.md AGENTS.md docs\cache-contract.md docs\cache.md docs\runtime-contract.md docs\speed-strategy.md docs\api-route-contract.md docs\hot-api-path.md docs\manifest-contracts.md docs\security.md docs\public\reference\cache.md
```

Expected result: cache plan shape, defaults, headers, tags, revalidation, micro-cache behavior, diagnostics, generated manifests, security rules, speed docs, and public reference docs remain connected.

Automated coverage in `bun run docs:check` also requires cache contract, cache overview, and public cache reference docs to keep `Cache-Control`, cache tags, `revalidateTag`, micro-cache, `no-store`, diagnostics, generated manifests, and secret-exclusion language aligned. It also requires cache reference docs to name the current scaffolded `@lumina/core` `CachePlan` fields so planned expanded APIs cannot be mistaken for implemented behavior.

### 21. SEO Contract Check

```powershell
rg -n "seo-contract|defineMeta|generateMeta|SEO_|sitemap|robots|structured data|canonical|seo.report|severity|meaningful initial HTML|client-only" README.md AGENTS.md docs\seo-contract.md docs\seo-engine.md docs\api-reference.md docs\manifest-contracts.md docs\runtime-contract.md docs\cache-contract.md docs\public\reference\seo.md docs\public\guides\seo-metadata.md
```

Expected result: metadata API, merge rules, sitemap output, robots output, structured data, diagnostics, manifests, runtime/cache interaction, and public reference docs remain connected.

Automated coverage in `bun run docs:check` also requires SEO contract, SEO overview, public SEO reference, and public SEO metadata guide docs to keep `defineMeta`, `generateMeta`, sitemap, robots, structured data, canonical URLs, `.lumina/seo.report.json`, diagnostic severity, meaningful initial HTML, and client-only fallback language aligned.

Performance report examples and references must use budget status values of `pass`, `warning`, or `fail`; use `warning`, not `warn`, to keep report wording aligned with diagnostic severity values.

### 22. Accessibility Contract Check

```powershell
rg -n "accessibility-contract|Accessibility Contract|WCAG 2.2 AA|keyboard|visible focus|semantic HTML|A11Y_|route focus|form errors|testing evidence|conformance claim|reference/accessibility" README.md AGENTS.md docs\accessibility-contract.md docs\accessibility.md docs\testing-contract.md docs\seo-contract.md docs\docs-verification.md docs\product-build-readiness.md docs\public-docs.md docs\public\reference\accessibility.md
```

Expected result: WCAG target language, semantic HTML, keyboard behavior, focus behavior, form errors, diagnostics, testing evidence, public docs readiness, SEO overlap, and public reference docs remain connected.

Automated coverage in `bun run docs:check` also requires accessibility contract, overview, and public reference docs to keep WCAG 2.2 AA target language, semantic HTML, keyboard behavior, visible focus, route focus, form errors, `A11Y_` diagnostics, testing evidence, and no-conformance-claim language aligned.

### 23. Security Contract Check

```powershell
rg -n "security-contract|Security Contract|threat-model|Threat Model|threat model|secret|production error|security headers|vulnerability|advisory|provenance|supply chain|high-risk|human sign-off|testing evidence" README.md AGENTS.md SECURITY.md .github\PULL_REQUEST_TEMPLATE.md docs\security-contract.md docs\threat-model.md docs\security.md docs\testing-contract.md docs\docs-verification.md docs\product-build-readiness.md docs\public\reference\security.md
```

Expected result: security target language, high-risk surfaces, threat model requirements, secret handling, production error behavior, security headers, advisory flow, supply-chain release rules, testing evidence, and public reference docs remain connected.

Automated coverage in `bun run docs:check` also requires root security policy, security contract, security overview, and public security reference docs to keep high-risk, threat model, secret handling, production error, security headers, vulnerability, advisory, provenance, supply chain, human sign-off, and testing evidence language aligned.

### 24. Safe Edit And Agent Write Contract Check

```powershell
rg -n "dry-run|AST|format|affected checks|\\.lumina/mutations\\.json|undo|human sign-off|MCP write tools|CLI writes" AGENTS.md docs\safe-edit-transactions.md docs\agent-kernel.md docs\mcp-server.md docs\public\concepts\safe-edits.md docs\security-contract.md docs\threat-model.md docs\product-build-readiness.md
```

Expected result: safe edits, Agent Kernel, MCP write tools, security rules, threat model, and readiness gates agree on dry-run previews, AST edits, formatting, affected checks, mutation logs, undo, shared CLI/MCP write paths, and high-risk human sign-off.

Automated coverage in `bun run docs:check` also requires the core safe-edit contract vocabulary to stay aligned across AGENTS, safe edit transactions, Agent Kernel, MCP, and public safe edit docs.

Automated coverage also requires safe edit transaction result vocabulary to stay aligned across the internal safe-edit contract, MCP contract, and public Safe Edits page: mutation ID, risk tier, affected files, affected routes, checks, and rollback availability.

### 25. Performance Contract Check

```powershell
rg -n "performance-contract|Performance Contract|benchmark-fixtures|Core Web Vitals|LCP|INP|CLS|perf.report|PERF_|budget|benchmark evidence|delivery|chunk count|source-map|RUM|field data|resourceHints|Early Hints|compression|bfcache|reference/performance" README.md AGENTS.md .github\PULL_REQUEST_TEMPLATE.md docs\performance-contract.md docs\performance.md docs\speed-strategy.md docs\benchmark-methodology.md docs\benchmark-fixtures.md docs\testing-contract.md docs\manifest-contracts.md docs\docs-verification.md docs\product-build-readiness.md docs\public\reference\performance.md
```

Expected result: route budgets, Core Web Vitals target language, performance reports, delivery fields, chunk counts, source-map exposure, optional RUM and field-data policy, diagnostics, benchmark evidence, testing evidence, manifest references, public claim rules, and public reference docs remain connected.

Automated coverage in `bun run docs:check` also requires performance contract, performance overview, and public performance reference docs to keep Core Web Vitals, LCP, INP, CLS, `.lumina/perf.report.json`, `PERF_` diagnostics, budgets, benchmark evidence, delivery metadata, chunk count, source-map, RUM, field data, resource hints, Early Hints, compression, and bfcache language aligned.

### 26. Speed Decision Check

```powershell
rg -n "speed-capability-audit|Speed Capability Audit|speed-decisions|Speed Decisions|Vite/Rolldown|Vite 8|bundled dev|custom bundler|Bun native dispatch|nativeRouteDispatch|route code splitting|CSS delivery|source maps|RUM|field data|React Compiler|React streaming|103 Early Hints|resource hints|resourceHints|fetchpriority|speculation|bfcache|compression|images|fonts|async waterfall|hot API|payload budget|compiler scaling|rejected defaults" README.md AGENTS.md ARCHITECTURE.md docs\speed-capability-audit.md docs\speed-decisions.md docs\speed-strategy.md docs\performance-contract.md docs\benchmark-methodology.md docs\product-build-readiness.md docs\docs-verification.md docs\task-backlog.md
```

Expected result: speed-sensitive architecture choices, browser-delivery choices, rejected defaults, implementation gates, performance reports, benchmark methodology, README, AGENTS, architecture, and backlog remain connected.

Automated coverage in `bun run docs:check` also requires speed decisions, speed capability audit, speed strategy, performance contract, benchmark methodology, product build readiness, and task backlog docs to keep Vite/Rolldown, Vite 8, bundled dev mode, custom bundler avoidance, native route dispatch, route code splitting, CSS delivery, source maps, RUM, field data, React Compiler, React streaming, 103 Early Hints, resource hints, fetchpriority, speculation, bfcache, compression, images, fonts, async waterfall, hot API, payload budget, compiler scaling, and rejected-default language aligned.

### 27. Contributor, ADR, Checklist, And Glossary Check

```powershell
rg -n "first-contribution|Architecture Decision Records|decisions/README|Implementation Checklists|checklists/phase-1-scaffold|checklists/adapter-implementation|checklists/performance-evidence|public-frontmatter-standard|Glossary" README.md AGENTS.md docs\README.md docs\docs-verification.md docs\website-content-map.md docs\public-docs-site-architecture.md docs\public\README.md
```

Expected result: first-contribution guidance, ADRs, implementation checklists, public frontmatter rules, and glossary coverage remain discoverable from repository entrypoints and docs verification.

Automated coverage in `bun run docs:check` also requires first contribution, ADR index, checklist index, and glossary docs to keep task backlog, documentation verification, AGENTS, planned/implemented status, docs hub, tradeoffs, rejected alternatives, implementation evidence, source contracts, public frontmatter, review checklist, threat note, benchmark fixture, and Vite/Rolldown vocabulary aligned.

### 28. Review, Threat, Fixture, Example, And Docs-Site Check

```powershell
rg -n "review-checklist|threat-model|benchmark-fixtures|examples-catalog|docs-site-build-plan|PULL_REQUEST_TEMPLATE" README.md AGENTS.md .github\PULL_REQUEST_TEMPLATE.md docs\README.md docs\docs-verification.md docs\security-contract.md docs\benchmark-methodology.md docs\examples-contract.md docs\public-docs-site-architecture.md docs\website-content-map.md
```

Expected result: review gates, threat-model requirements, benchmark fixture planning, example catalog planning, docs-site implementation phases, and PR template evidence remain connected.

Automated coverage in `bun run docs:check` also requires review checklist, threat model, benchmark fixtures, examples catalog, docs-site build plan, and pull request template docs to keep threat-note, trusted/untrusted input, human sign-off, raw benchmark data, equivalent behavior, field data, examples status, public guide mapping, renderer decision, frontmatter validation, machine-readable output, quality gate, and command-evidence vocabulary aligned. Public examples must describe the planned Hot API example through generated validation, serialization, and optional micro-cache behavior rather than unsupported speed wording.

### 29. Release Version Placeholder Check

```powershell
rg -n "0\.0\.0|private scaffold placeholder|workspace metadata|not release tags|not published release versions|compatibility guarantees" README.md docs\status.md docs\release.md docs\versioning-and-upgrades.md
```

Expected result: README, status, release, and versioning docs all state that current `0.0.0` package manifest versions are private scaffold placeholders, not published release versions or compatibility guarantees.

Automated coverage in `bun run docs:check` also requires this wording to stay aligned across README, project status, release process, and versioning policy docs.

## Script Targets

The initial Bun workspace exposes these package scripts:

```json
{
  "scripts": {
    "docs:check": "bun scripts/check-docs.ts",
    "structure:check": "bun scripts/check-structure.ts",
    "performance:check": "bun scripts/check-performance-docs.ts",
    "test": "bun test tests/**/*.test.ts",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "check": "bun run docs:check && bun run structure:check && bun run performance:check && bun run typecheck && bun test"
  }
}
```

Target behavior:

- `docs:check` validates required docs, required links, local Markdown links, root docs metadata, every `docs/` Markdown file's top-level status and audience metadata, status definition wording, durable internal docs hub coverage, local directory index coverage for prompts, decisions, checklists, skills, and subagents, every Markdown status label format, public docs navigation, source-section consistency, and source-map coverage, AI playbook placement, AGENTS required-sync coverage, agent enforcement matrix coverage, verification-section coverage, scaffold-status and public scaffold-status language, historical pre-scaffold status labeling, scaffolded-package-versus-implemented-package wording, current-vs-planned structure claims, current root placeholder-test wording, build-readiness evidence wording, agent-output naming guardrails, package-map/build-plan/backlog package coverage, planned CLI command surface and prefix consistency, config/adapter contract terms, adapter package paths, render-mode contract wording, generated artifact names and rules, machine-readable docs contracts, public docs-site contracts, contributor and review-evidence vocabulary, speed-decision vocabulary, safe-edit contract vocabulary, shared-core scaffold terminology, and the current `bun.lockb` lockfile name.
- `structure:check` validates workspace script commands, package names, package entrypoints, TypeScript scaffold files, CI, forbidden runtime dependencies on agent-only packages, and shared-core type ownership outside `@lumina/core`.
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
- Whether top-level docs status and audience metadata stayed complete.
- Whether public docs navigation changed.
- Whether public docs metadata, route mapping, source mapping, or renderer assumptions changed.
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
- Whether route budgets, Core Web Vitals target language, performance diagnostics, `.lumina/perf.report.json`, route chunk fields, source-map exposure, RUM policy, benchmark evidence, or public speed claims changed.
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
