# MVP Alpha Documentation Readiness Implementation Plan

Status: Proposed.
Audience: maintainers, documentation contributors, AI agents.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine Lumina documentation so it is accurate, MVP-focused, consistent with Lumina positioning, and ready before core MVP Alpha implementation starts.

**Architecture:** This is a documentation-first readiness pass. It does not implement framework behavior; it clarifies the MVP Alpha target, separates MVP behavior from future platform ambition, and aligns onboarding, map, examples, route/file conventions, roadmap, and agent rules around the same first prototype.

**Tech Stack:** Markdown documentation, Bun workspace verification scripts, TypeScript documentation check scripts, PowerShell-compatible verification commands.

## Global Constraints

- Product name: Lumina.
- Positioning: app-graph-native, agent-native, SEO-first React framework that illuminates large application structure through the Lumina Map.
- Current implementation state: Phase 1 monorepo scaffold; no CLI, route discovery, rendering, map generation, MCP, safe edits, or generated `.lumina/*` artifacts exist yet.
- MVP Alpha must stay focused on route discovery, Lumina Map generation, basic explicit render modes, CLI inspection tools, `lumina inspect why`, and a working demo app.
- All unimplemented behavior must be labeled `Target MVP behavior`, `Planned for MVP Alpha`, or `Future`.
- Do not claim commands pass unless they are current repository maintenance commands and fresh verification proves them.
- Preserve existing documentation standards, freshness policy, verification process, contracts, and current-vs-planned honesty.
- Keep README.md and AGENTS.md synchronized when commands, phase status, generated files, package boundaries, roadmap, or agent workflow language changes.
- Run `bun run check`, `git diff --check`, and stale-name searches before committing.

---

## File Structure

Planned files and responsibilities:

- `README.md`: public first screen, current status, MVP Alpha promise, target quick start, and docs navigation.
- `VISION.md`: product thesis and MVP Alpha framing without losing long-term vision.
- `ARCHITECTURE.md`: MVP Alpha architecture slice, what runtime/compiler/map pieces are in scope, and what remains future.
- `AGENTS.md`: agent rules for MVP Alpha docs/code work, including required docs to read and status language rules.
- `docs/getting-started.md`: primary practical onboarding guide for the target MVP prototype experience.
- `docs/lumina-map.md`: centerpiece document for MVP map behavior, generated artifacts, CLI inspection, example output, and human/agent value.
- `docs/status.md`: current scaffold evidence plus explicit MVP Alpha target scope and non-goals.
- `docs/roadmap.md`: near-term MVP Alpha phases separated from long-term roadmap.
- `docs/mvp-alpha-scope.md`: lightweight source of truth for included, deferred, verification, demo-app, and readiness requirements.
- `docs/examples-catalog.md`: demo app entry and future example inventory aligned with MVP Alpha.
- `docs/examples.md`: concise explanation of the MVP demo app, expected routes, generated artifacts, and verification boundaries.
- `docs/file-conventions.md`: exact MVP starter conventions versus future file conventions.
- `docs/README.md`: docs hub link to the MVP Alpha scope and any changed primary routes.
- `docs/public/README.md`, `docs/public/docs.md`, `docs/public/index.md`, `docs/public/roadmap.md`, and relevant public guide/reference pages: public-facing MVP wording.
- `docs/docs-verification.md`, `docs/docs-maintenance-checklist.md`, `docs/agent-enforcement.md`: update check language only if the MVP scope adds new required consistency checks.
- `scripts/check-docs.ts`: add or adjust guardrails only where current checks would miss MVP scope drift or stale terminology.

## Task 1: MVP Alpha Scope Source Of Truth

**Files:**
- Create: `docs/mvp-alpha-scope.md`
- Modify: `docs/README.md`
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `docs/status.md`
- Modify: `docs/roadmap.md`

**Interfaces:**
- Consumes: objective file, README current status, AGENTS workflow rules, existing roadmap.
- Produces: canonical MVP Alpha scope terms referenced by onboarding, map, examples, file conventions, and public docs.

- [ ] **Step 1: Create `docs/mvp-alpha-scope.md`**

Create a document with:

```md
# MVP Alpha Scope

Status: Planned.
Audience: maintainers, framework contributors, AI agents, early prototype users.

This page defines the first Lumina MVP Alpha target. It is a target scope, not a claim that framework behavior exists today.

## Current Evidence

The repository currently has the Phase 1 scaffold: Bun workspace, package placeholders, shared `@lumina/core` scaffold types, `@lumina/compiler` route discovery, generated `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, minimal `lumina dev` Vite SSR route serving, CI, and verification scripts. It does not yet have build/start CLI behavior, route HMR, virtual route modules, client hydration, production runtime serving, or Lumina Map query CLI behavior.

## MVP Alpha Goal

MVP Alpha should prove that a small React app can be created, discovered, rendered, mapped, inspected, and explained through Lumina's compiler and CLI.

## Included In MVP Alpha

- Create a demo app from the workspace or `bun create lumina` target flow.
- Discover file-based routes from `app/`.
- Support a root layout and basic pages.
- Support explicit render modes for `staticPage()` and a minimal SSR mode.
- Generate `.lumina/routes.json`.
- Generate `.lumina/render-manifest.json`.
- Generate `.lumina/map.json` as the first Lumina Map output.
- Expose `lumina routes --json`.
- Expose `lumina inspect --json`.
- Expose `lumina inspect why`.
- Include a demo app that shows the Lumina Map and inspection workflow.
- Keep JSON output deterministic and compact.

## Deferred Until After MVP Alpha

- API routes.
- Hot API schemas.
- Full SEO engine.
- Full cache system.
- MCP server.
- Safe edit writes.
- Agent context capsules beyond a basic map-informed explanation.
- Node adapter runtime.
- Static export adapter.
- Migration tooling.
- Benchmarked performance claims.
- Devtools dashboard.

## MVP Demo App

The first demo app should contain:

- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/(marketing)/pricing/page.tsx`
- `app/blog/[slug]/page.tsx`
- `components/Hero.tsx`
- `components/PricingCard.tsx`
- `lumina.config.ts`

The demo should prove route discovery, render mode extraction, generated manifests, Lumina Map nodes and edges, and `lumina inspect why`.

## Verification Required Before Calling MVP Alpha Ready

- Fresh `bun run check` passes.
- MVP fixture tests prove route discovery, manifest output, map output, and inspect output.
- Generated JSON snapshots are deterministic.
- README, AGENTS, status, roadmap, getting started, examples, file conventions, and Lumina Map docs agree on MVP scope.
- Public docs do not claim future features exist.

## Out Of Scope

- Replacing long-term contracts with MVP-only contracts.
- Weakening documentation standards.
- Claiming implementation exists before code and tests prove it.
```

- [ ] **Step 2: Link the scope doc**

Add `docs/mvp-alpha-scope.md` to:

- README documentation list.
- `docs/README.md` start-here section.
- AGENTS required documentation sync list.
- `docs/status.md` current next-step section.
- `docs/roadmap.md` current status or MVP Alpha section.

- [ ] **Step 3: Verify Task 1**

Run:

```powershell
bun run docs:check
git diff --check
```

Expected: docs checks and whitespace check pass.

- [ ] **Step 4: Commit Task 1**

Run:

```powershell
git add README.md AGENTS.md docs/README.md docs/status.md docs/roadmap.md docs/mvp-alpha-scope.md
git commit -m "docs: define lumina mvp alpha scope"
```

## Task 2: Root Positioning And Status Alignment

**Files:**
- Modify: `README.md`
- Modify: `VISION.md`
- Modify: `ARCHITECTURE.md`
- Modify: `AGENTS.md`
- Modify: `CONTRIBUTING.md`
- Modify: `GOVERNANCE.md`
- Modify: `SECURITY.md`
- Modify: `CODE_OF_CONDUCT.md`

**Interfaces:**
- Consumes: `docs/mvp-alpha-scope.md`
- Produces: top-level docs that point readers toward MVP Alpha without losing long-term ambition.

- [ ] **Step 1: Rewrite README first-screen status**

Keep the Lumina brand promise, but add an MVP Alpha paragraph near the top:

```md
Lumina is preparing an MVP Alpha focused on route discovery, explicit render modes, the first Lumina Map output, and CLI inspection. The current repository is still Phase 1 scaffold; MVP commands below are target behavior until implementation and fixture evidence exist.
```

- [ ] **Step 2: Add README MVP Alpha section**

Add a section after current status:

```md
## MVP Alpha Target

MVP Alpha should prove:

1. A small app can be created from the Lumina starter target.
2. `app/` routes are discovered deterministically.
3. Static and basic SSR render modes are explicit.
4. `.lumina/routes.json`, `.lumina/render-manifest.json`, and `.lumina/map.json` are generated.
5. `lumina routes --json`, `lumina inspect --json`, and `lumina inspect why` explain the app.
6. A demo app shows why the Lumina Map matters for humans and agents.

See MVP Alpha Scope at `docs/mvp-alpha-scope.md`.
```

- [ ] **Step 3: Reframe VISION**

Add an `MVP Alpha Proof` section:

```md
## MVP Alpha Proof

The first proof is intentionally narrow: Lumina should make a small React app visible. Route discovery, render mode extraction, the initial Lumina Map, and inspection commands are enough to prove the category before larger runtime, SEO, MCP, safe edit, migration, and benchmark work begins.
```

- [ ] **Step 4: Reframe ARCHITECTURE**

Add an `MVP Alpha Architecture Slice` section:

```md
## MVP Alpha Architecture Slice

MVP Alpha should include only the compiler and runtime pieces needed to discover routes, produce manifests, render a small demo app, generate the first file-level Lumina Map, and answer `lumina inspect why`. Anything that requires broad runtime complexity stays future unless it directly supports this proof.
```

- [ ] **Step 5: Update AGENTS**

Add `docs/mvp-alpha-scope.md` to required sync and add an MVP rule:

```md
- MVP Alpha docs and implementation must keep route discovery, basic render modes, Lumina Map output, CLI inspection, and the demo app as the center. Do not pull MCP, safe edits, API routes, migration, or benchmark claims into MVP Alpha unless the scope doc is updated in the same change.
```

- [ ] **Step 6: Verify Task 2**

Run:

```powershell
bun run docs:check
git diff --check
rg -n "MVP Alpha|Lumina Map|lumina inspect why" README.md VISION.md ARCHITECTURE.md AGENTS.md CONTRIBUTING.md GOVERNANCE.md SECURITY.md CODE_OF_CONDUCT.md
```

Expected: checks pass; legacy project-name terms do not appear.

- [ ] **Step 7: Commit Task 2**

Run:

```powershell
git add README.md VISION.md ARCHITECTURE.md AGENTS.md CONTRIBUTING.md GOVERNANCE.md SECURITY.md CODE_OF_CONDUCT.md
git commit -m "docs: align root docs with mvp alpha"
```

## Task 3: Getting Started MVP Rewrite

**Files:**
- Modify: `docs/getting-started.md`
- Modify: `docs/public/guides/create-app.md`
- Modify: `docs/public/reference/project-structure.md`

**Interfaces:**
- Consumes: `docs/mvp-alpha-scope.md`, `docs/file-conventions.md`
- Produces: primary practical onboarding path for target MVP behavior.

- [ ] **Step 1: Rewrite `docs/getting-started.md` structure**

Replace the broad current guide with this section order:

```md
# Getting Started

Status: Planned.
Audience: new users, app developers, AI agents.

This is the target MVP Alpha onboarding path. The repository currently has the Phase 1 scaffold plus route discovery, `.lumina/routes.json`, `.lumina/render-manifest.json`, `.lumina/map.json`, `lumina routes --json`, `lumina inspect --json`, `lumina inspect why`, and minimal `lumina dev` Vite SSR route serving; app creation, build/start, route HMR, virtual route modules, client hydration, and production runtime serving are not implemented yet.

## What You Will Build In MVP Alpha
## Current Repository Commands
## Target MVP App Creation
## Demo App Structure
## Start The Dev Server
## Inspect Routes
## Inspect Why A Route Works
## Inspect The Lumina Map
## Generated Files
## Troubleshooting During MVP Alpha
## What Is Deferred
## Source Of Truth
```

- [ ] **Step 2: Add target command flow**

Use this exact target flow:

```bash
bun create lumina my-app
cd my-app
lumina dev
lumina routes --json
lumina inspect / --json
lumina inspect why /
lumina map --json
```

State immediately after the code block:

```md
Target MVP behavior: these commands are the intended prototype experience. They must not be described as working until implementation and fixture evidence exist.
```

- [ ] **Step 3: Add demo app structure**

Document the MVP demo app files from `docs/mvp-alpha-scope.md`, including route mappings:

```txt
app/page.tsx -> /
app/about/page.tsx -> /about
app/(marketing)/pricing/page.tsx -> /pricing
app/blog/[slug]/page.tsx -> /blog/:slug
```

- [ ] **Step 4: Add expected generated files**

For MVP only, document:

```txt
.lumina/routes.json
.lumina/render-manifest.json
.lumina/map.json
```

Move `.lumina/seo.report.json`, `.lumina/perf.report.json`, `.lumina/context/*`, `.lumina/mutations.json`, API outputs, and adapter copies into a clearly marked future section.

- [ ] **Step 5: Update public guide and project structure reference**

Update `docs/public/guides/create-app.md` and `docs/public/reference/project-structure.md` to mirror the MVP flow and deferred feature boundaries.

- [ ] **Step 6: Verify Task 3**

Run:

```powershell
bun run docs:check
git diff --check
rg -n "Target MVP behavior|bun create lumina|lumina inspect why|\\.lumina/routes.json|\\.lumina/map.json" docs/getting-started.md docs/public/guides/create-app.md docs/public/reference/project-structure.md
```

Expected: checks pass and MVP terms appear in all three docs.

- [ ] **Step 7: Commit Task 3**

Run:

```powershell
git add docs/getting-started.md docs/public/guides/create-app.md docs/public/reference/project-structure.md
git commit -m "docs: rewrite getting started for mvp alpha"
```

## Task 4: Lumina Map Centerpiece Rewrite

**Files:**
- Modify: `docs/lumina-map.md`
- Modify: `docs/app-graph-visual.md`
- Modify: `docs/public/concepts/app-graph.md`
- Modify: `docs/public/guides/lumina-map.md`
- Modify: `docs/public/guides/agent-context.md`

**Interfaces:**
- Consumes: `docs/mvp-alpha-scope.md`, `docs/routing-contract.md`, `docs/manifest-contracts.md`
- Produces: strong MVP-centered Lumina Map explanation.

- [ ] **Step 1: Add MVP Map overview**

At the top of `docs/lumina-map.md`, add:

```md
## MVP Alpha Map

For MVP Alpha, the Lumina Map is a deterministic file-level graph generated from discovered routes, route source files, imported components, render mode declarations, and basic ownership or source metadata when present. It should be useful before deeper semantic contracts exist.
```

- [ ] **Step 2: Split MVP and future node/edge lists**

Create:

```md
## MVP Alpha Nodes
## MVP Alpha Edges
## Future Nodes And Edges
```

MVP nodes:

```txt
route
layout
page
component
config
manifest
```

MVP edges:

```txt
route.source
route.layout
file.imports
route.renderMode
route.generates
```

- [ ] **Step 3: Add example generated map output**

Add an example for the demo app:

```json
{
  "schemaVersion": "lumina.map.v0",
  "generatedAt": "2026-07-06T00:00:00.000Z",
  "appRoot": ".",
  "nodes": [
    { "id": "route:/", "kind": "route", "label": "/" },
    { "id": "file:app/page.tsx", "kind": "page", "label": "app/page.tsx" },
    { "id": "file:components/Hero.tsx", "kind": "component", "label": "components/Hero.tsx" }
  ],
  "edges": [
    {
      "id": "edge:route-home-source",
      "from": "route:/",
      "to": "file:app/page.tsx",
      "kind": "route.source",
      "source": "file",
      "confidence": "high",
      "why": "app/page.tsx defines the root page route."
    },
    {
      "id": "edge:home-imports-hero",
      "from": "file:app/page.tsx",
      "to": "file:components/Hero.tsx",
      "kind": "file.imports",
      "source": "static-analysis",
      "confidence": "high",
      "why": "app/page.tsx imports components/Hero.tsx."
    }
  ]
}
```

- [ ] **Step 4: Add CLI inspection examples**

Document:

```bash
lumina map --json
lumina inspect / --json
lumina inspect why /
lumina inspect why components/Hero.tsx
```

Label all as `Target MVP behavior`.

- [ ] **Step 5: Clarify agent value**

Add a section:

```md
## Why Agents Need The Map

Agents should use the MVP map to narrow context, identify affected routes, explain why a file matters, and choose checks. The MVP map does not authorize writes. Safe edits and MCP writes remain future work.
```

- [ ] **Step 6: Update public map docs**

Mirror the MVP map story in public app-graph and Lumina Map guide pages. Keep future semantic graph material linked, not dominant.

- [ ] **Step 7: Verify Task 4**

Run:

```powershell
bun run docs:check
git diff --check
rg -n "MVP Alpha Map|route.source|file.imports|lumina inspect why|lumina.map.v0|safe edits.*future|MCP.*future" docs/lumina-map.md docs/app-graph-visual.md docs/public/concepts/app-graph.md docs/public/guides/lumina-map.md docs/public/guides/agent-context.md
```

Expected: checks pass and MVP map examples are present.

- [ ] **Step 8: Commit Task 4**

Run:

```powershell
git add docs/lumina-map.md docs/app-graph-visual.md docs/public/concepts/app-graph.md docs/public/guides/lumina-map.md docs/public/guides/agent-context.md
git commit -m "docs: make lumina map the mvp centerpiece"
```

## Task 5: Roadmap, Status, Examples, And File Conventions

**Files:**
- Modify: `docs/status.md`
- Modify: `docs/roadmap.md`
- Modify: `docs/task-backlog.md`
- Modify: `docs/examples-catalog.md`
- Modify: `docs/examples.md`
- Modify: `docs/file-conventions.md`
- Modify: `docs/public/roadmap.md`
- Modify: `docs/public/reference/examples.md`
- Modify: `docs/public/reference/file-conventions.md`

**Interfaces:**
- Consumes: `docs/mvp-alpha-scope.md`
- Produces: all planning and example docs agree on the exact MVP prototype.

- [ ] **Step 1: Update status**

Add to `docs/status.md`:

```md
## MVP Alpha Target Status

MVP Alpha is planned, not implemented. Route discovery, generated route/render/map artifacts, `lumina routes --json`, `lumina inspect --json`, and `lumina inspect why` exist; rendering and a demo app remain.
```

- [ ] **Step 2: Add roadmap MVP lane**

Add before long-term phases:

```md
## MVP Alpha Lane

1. Core model hardening for route, render, manifest, and graph output.
2. Route discovery and deterministic `.lumina/routes.json`.
3. Basic render mode extraction and `.lumina/render-manifest.json`.
4. File-level Lumina Map and `.lumina/map.json`.
5. CLI inspection: `lumina routes --json`, `lumina inspect --json`, and `lumina inspect why`.
6. Demo app proving the workflow.
```

- [ ] **Step 3: Update task backlog near-term tasks**

Reframe PR 1A through PR 4 around MVP Alpha. Add a note that API routes, MCP, safe edits, migration, Node adapter, and benchmarks are post-MVP unless explicitly pulled into the scope doc.

- [ ] **Step 4: Update examples catalog**

Add first row:

```md
| MVP Alpha Demo | `examples/mvp-alpha-demo/` | Planned | Route discovery, basic render modes, generated manifests, Lumina Map, and CLI inspection. |
```

Update Basic Starter purpose from `bun create needle` to `bun create lumina`.

- [ ] **Step 5: Update examples overview**

Add:

```md
## MVP Alpha Demo

The first example to build should be `examples/mvp-alpha-demo/`. It should demonstrate the same files and routes listed in MVP Alpha Scope, and it should not include API routes, MCP, safe edits, auth, databases, or benchmark claims.
```

- [ ] **Step 6: Update file conventions**

Add:

```md
## MVP Alpha File Conventions

MVP Alpha should support:

- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/(marketing)/pricing/page.tsx`
- `app/blog/[slug]/page.tsx`
- `components/*.tsx`
- `lumina.config.ts`

MVP Alpha should defer API routes, optional catch-all segments, error routes, not-found routes, contract files, app-local AGENTS generation, and llms outputs.
```

- [ ] **Step 7: Update public roadmap/examples/file-conventions pages**

Mirror the same MVP/future separation in public-facing docs.

- [ ] **Step 8: Verify Task 5**

Run:

```powershell
bun run docs:check
git diff --check
rg -n "MVP Alpha Demo|examples/mvp-alpha-demo|MVP Alpha File Conventions|post-MVP|\\.lumina/map.json|lumina inspect why" docs/status.md docs/roadmap.md docs/task-backlog.md docs/examples-catalog.md docs/examples.md docs/file-conventions.md docs/public/roadmap.md docs/public/reference/examples.md docs/public/reference/file-conventions.md
```

Expected: checks pass and all docs contain aligned MVP terms.

- [ ] **Step 9: Commit Task 5**

Run:

```powershell
git add docs/status.md docs/roadmap.md docs/task-backlog.md docs/examples-catalog.md docs/examples.md docs/file-conventions.md docs/public/roadmap.md docs/public/reference/examples.md docs/public/reference/file-conventions.md
git commit -m "docs: align roadmap examples and conventions with mvp alpha"
```

## Task 6: Consistency, Guardrails, And Completion Audit

**Files:**
- Modify: `scripts/check-docs.ts`
- Modify: `docs/docs-verification.md`
- Modify: `docs/docs-maintenance-checklist.md`
- Modify: `docs/agent-enforcement.md`
- Modify: `docs/documentation-completion-audit.md`

**Interfaces:**
- Consumes: all previous tasks.
- Produces: verification evidence and durable drift checks.

- [ ] **Step 1: Add MVP scope guardrails if needed**

Inspect `scripts/check-docs.ts`. If no current check ensures `docs/mvp-alpha-scope.md` is linked from README, AGENTS, docs hub, status, and roadmap, add a guardrail that requires those links.

- [ ] **Step 2: Add MVP wording checks if needed**

Add checks only if they are stable and useful:

```ts
const mvpAlphaDocs = [
  "README.md",
  "docs/status.md",
  "docs/roadmap.md",
  "docs/getting-started.md",
  "docs/lumina-map.md",
  "docs/examples-catalog.md",
  "docs/file-conventions.md",
];
```

Require each file to contain `MVP Alpha`.

- [ ] **Step 3: Update verification docs**

Add a section to `docs/docs-verification.md`:

```md
### MVP Alpha Scope Check

Run:

```powershell
rg -n "MVP Alpha|Target MVP behavior|Planned for MVP Alpha|Future" README.md AGENTS.md docs/mvp-alpha-scope.md docs/status.md docs/roadmap.md docs/getting-started.md docs/lumina-map.md docs/examples-catalog.md docs/examples.md docs/file-conventions.md
```

Expected result: the MVP Alpha scope is visible in root positioning, onboarding, map, status, roadmap, examples, and file conventions.
```

- [ ] **Step 4: Update completion audit**

Add rows proving:

- Root positioning is MVP-aligned.
- Getting started reflects target MVP behavior.
- Lumina Map is the MVP centerpiece.
- MVP included/deferred scope is explicit.
- Examples and file conventions align with MVP Alpha.
- Full checks passed.

- [ ] **Step 5: Final verification**

Run:

```powershell
bun run check
git diff --check
git status --short --branch
Run the legacy project-name audit across README.md, AGENTS.md, VISION.md, ARCHITECTURE.md, CONTRIBUTING.md, GOVERNANCE.md, SECURITY.md, CODE_OF_CONDUCT.md, docs, packages, scripts, tests, .github, package.json, and tsconfig.json.
rg -n "MVP Alpha|Target MVP behavior|Planned for MVP Alpha|Future" README.md AGENTS.md docs/mvp-alpha-scope.md docs/status.md docs/roadmap.md docs/getting-started.md docs/lumina-map.md docs/examples-catalog.md docs/examples.md docs/file-conventions.md
```

Expected:

- `bun run check` passes.
- `git diff --check` passes.
- Stale old-name search has no matches.
- MVP scope search shows coverage across root, status, roadmap, onboarding, map, examples, and conventions.

- [ ] **Step 6: Commit Task 6**

Run:

```powershell
git add scripts/check-docs.ts docs/docs-verification.md docs/docs-maintenance-checklist.md docs/agent-enforcement.md docs/documentation-completion-audit.md
git commit -m "docs: enforce mvp alpha documentation readiness"
```

## Execution Handoff

This plan is approval-gated because the objective requests a detailed plan before widespread changes.

Plan complete and saved to `docs/superpowers/plans/2026-07-06-mvp-alpha-docs-readiness.md`.

Two execution options:

1. Subagent-Driven (recommended): dispatch focused workers per task with review checkpoints.
2. Inline Execution: execute tasks in this session using executing-plans with verification after each task.

## Self-Review

- Spec coverage: Covers root branding and positioning, getting started, Lumina Map centerpiece, MVP scope/status, roadmap, examples, file conventions, consistency checks, verification, and documentation standards.
- Placeholder scan: No TBD/TODO/fill-in placeholders are used. Each task names exact files, target sections, commands, and expected verification.
- Type and terminology consistency: Uses Lumina, MVP Alpha, Target MVP behavior, Planned for MVP Alpha, `.lumina/*`, `lumina inspect why`, `@lumina/*`, and `examples/mvp-alpha-demo/` consistently.
