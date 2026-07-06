# Lumina Rename And Documentation Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

Status: Planned.

Audience: maintainers, documentation contributors, AI agents.

**Goal:** Rename the project from NeedleStart to Lumina and upgrade the documentation into an Alpha-ready product surface without claiming unimplemented framework behavior.

**Architecture:** The rename is split into an approval gate, a controlled mechanical rename, then product-quality documentation rewrites. Automated checkers must be updated in the same sequence so old names are removed intentionally and new Lumina conventions become enforceable.

**Tech Stack:** Bun workspace, TypeScript scripts, Markdown documentation, package manifests, PowerShell-compatible verification commands.

## Global Constraints

- Product name: Lumina.
- Positioning: Lumina is the app-graph-native, agent-native React framework that illuminates the full structure of large applications.
- Primary graph feature: Lumina Map.
- Public themes: illumination and clarity, semantic map, agent-native workflows, explicit SEO-first behavior, built for scale.
- Current implementation status: Phase 1 scaffold; route discovery, rendering, CLI behavior, runtime adapter behavior, map generation, MCP tools, safe edits, generated docs outputs, and benchmark evidence remain planned until implemented.
- Widespread rename execution requires maintainer approval after this plan is reviewed.
- Planned behavior must be labeled `Planned for Alpha` or `Target Alpha behavior` until implementation exists.
- README and AGENTS must stay synchronized when package names, commands, generated files, phase status, or safety rules change.
- Use `apply_patch` for manual edits.
- Run `bun run check` and `git diff --check` before each commit.

---

## File Structure

Planned primary files and responsibilities:

- `docs/superpowers/plans/2026-07-06-lumina-rename-documentation.md`: this implementation plan and approval gate.
- `docs/README.md`: docs hub link to this plan and later renamed docs.
- `README.md`: public-facing Lumina positioning, Alpha status, quick-start target UX, feature overview, and docs navigation.
- `AGENTS.md`: agent operating guide after rename, including Lumina package names, commands, generated files, safety rules, and docs sync rules.
- `package.json`: root package name and scripts metadata after approval.
- `packages/**/package.json`: package scope rename from `@needle/*` to `@lumina/*` and `create-needle` to `create-lumina`.
- `packages/**/src/**/*.ts`: exported type names and scaffold strings that intentionally move from Needle naming to Lumina naming.
- `scripts/check-docs.ts`: required docs list, package map, command names, generated artifact names, stale-name guardrails, and public positioning enforcement.
- `scripts/check-structure.ts`: package names, runtime boundary checks, forbidden dependencies, and shared type ownership after package rename.
- `scripts/check-performance-docs.ts`: renamed product docs paths and performance claim guardrails.
- `tests/**/*.ts`: scaffold tests that reference package names, root scripts, shared types, or playbook locations.
- `docs/status.md`: current status under Lumina, plus Alpha readiness distinction.
- `docs/getting-started.md`: target Alpha onboarding flow and honest current scaffold status.
- `docs/roadmap.md`: renamed roadmap and Alpha milestones.
- `docs/task-backlog.md`: package, command, artifact, and Alpha task rename.
- `docs/package-map.md`: package ownership after `@lumina/*` rename.
- `docs/cli.md` and `docs/cli-json-contract.md`: planned `lumina ...` command surface and JSON contracts.
- `docs/config.md` and `docs/config-contract.md`: planned `lumina.config.ts`, environment prefix, and normalized config naming.
- `docs/manifest-contracts.md`, `docs/machine-readable-docs.md`, `docs/agent-kernel.md`, `docs/mcp-server.md`, `docs/safe-edit-transactions.md`: `.lumina/*`, `lumina://...`, schema versions, docs outputs, context capsules, and agent contracts.
- `docs/needle-map.md`: rename path to `docs/lumina-map.md`, with old file removed or replaced by an intentional short redirect note only if local link checks require it.
- `docs/skills/needle-map-designer.md`: rename path to `docs/skills/lumina-map-designer.md` and update all links.
- `docs/public/**`: public website source copy rewritten to Lumina positioning and Alpha readiness.
- `docs/assets/*.svg`: alt text and embedded labels, if any, renamed from NeedleStart or Needle Map to Lumina and Lumina Map.
- `.github/PULL_REQUEST_TEMPLATE.md`: docs freshness and verification language after rename.
- `VISION.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `GOVERNANCE.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`: top-level naming and product identity.

## Proposed Naming Conventions

| Old name | New name | Notes |
| --- | --- | --- |
| NeedleStart | Lumina | Product and repository identity. |
| Needle Map | Lumina Map | Primary semantic app graph product feature. |
| Needle compiler | Lumina compiler | Planned compiler layer. |
| Needle Agent / Agent Kernel | Lumina Agent / Agent Kernel | Use `Lumina Agent` for product copy, `Agent Kernel` for architecture. |
| `needlestart` | `lumina` | Public package import, if package name is available. |
| `create-needle` | `create-lumina` | Planned create package and command target. |
| `@needle/core` | `@lumina/core` | Package scope rename, subject to npm scope availability. |
| `needle dev` | `lumina dev` | Planned CLI command. |
| `needle.config.ts` | `lumina.config.ts` | Planned config file. |
| `.needle/*` | `.lumina/*` | Planned generated artifacts, with migration note for old paths. |
| `needle://routes` | `lumina://routes` | Planned MCP resource URI prefix. |
| `NEEDLE_*` env vars | `LUMINA_*` env vars | Planned adapter/config environment variables. |
| `needle.routes.v0` | `lumina.routes.v0` | Planned schema-version prefix. |
| `docs/needle-map.md` | `docs/lumina-map.md` | Rename docs file and update links. |
| `docs/skills/needle-map-designer.md` | `docs/skills/lumina-map-designer.md` | Rename skill playbook and update links. |

## High-Risk Rename Items

- **npm package scope availability:** verify `@lumina` and `lumina` package availability before treating them as release names. Mitigation: mark as planned package names until owner confirms package publication strategy.
- **GitHub repository rename:** current remote points to `byronwade/NeedleStart`. Mitigation: do not change git remote until owner confirms repository rename; document this as an owner action.
- **CLI compatibility:** existing planned docs use `needle ...`; Alpha may need `needle` aliases or a clean `lumina` break. Mitigation: document `lumina ...` as target Alpha command and old `needle ...` as pre-rename planning terminology, not supported behavior.
- **Generated artifact path compatibility:** `.needle/*` has many planned references. Mitigation: rename target artifacts to `.lumina/*` and add a migration note that no generated artifacts exist yet, so there is no runtime migration in the current scaffold.
- **Schema-version compatibility:** `needle.*.v0` examples are planned only. Mitigation: rename to `lumina.*.v0` before implementation locks schema versions.
- **Public docs links:** file renames can break local links. Mitigation: run `bun run docs:check` after each file move.
- **Search false positives:** historical notes may intentionally mention the old name. Mitigation: allow old name only in a dedicated "formerly NeedleStart" rename note and migration/ADR files.

## Task 1: Approval Gate And Plan Publication

**Priority:** P0.

**Estimated effort:** 30-45 minutes.

**Files:**
- Create: `docs/superpowers/plans/2026-07-06-lumina-rename-documentation.md`
- Modify: `docs/README.md`

**Interfaces:**
- Consumes: attached objective file at `C:\Users\bcw19\.codex\attachments\75403af5-3df2-4c88-8393-c3aa8c3d02dc\goal-objective.md`
- Produces: approved task sequence for the rename executor

- [ ] **Step 1: Confirm repository state**

Run:

```powershell
git status --short --branch
rg -n "NeedleStart|Needle Map|needle dev|@needle|create-needle|needlestart|\.needle" README.md AGENTS.md package.json docs packages scripts .github
```

Expected: branch is clean before the plan edit; search shows current old-name surface area.

- [ ] **Step 2: Save this plan**

Create `docs/superpowers/plans/2026-07-06-lumina-rename-documentation.md` with this full content.

- [ ] **Step 3: Link the plan from the docs hub**

Add this bullet under `docs/README.md` Start Here:

```md
- Lumina Rename And Documentation Overhaul Plan: link to `superpowers/plans/2026-07-06-lumina-rename-documentation.md` as the approval-gated plan for the rename and Alpha documentation upgrade.
```

- [ ] **Step 4: Verify plan-only change**

Run:

```powershell
bun run docs:check
git diff --check
```

Expected: documentation checks pass; `git diff --check` reports no whitespace errors.

- [ ] **Step 5: Commit the plan-only change**

Run:

```powershell
git add docs/superpowers/plans/2026-07-06-lumina-rename-documentation.md docs/README.md
git commit -m "docs: add lumina rename plan"
git push origin main
```

Expected: commit and push succeed.

## Task 2: Mechanical Product Rename

**Priority:** P0 after approval.

**Estimated effort:** 2-4 hours.

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `VISION.md`
- Modify: `ARCHITECTURE.md`
- Modify: `CONTRIBUTING.md`
- Modify: `GOVERNANCE.md`
- Modify: `SECURITY.md`
- Modify: `CODE_OF_CONDUCT.md`
- Modify: `docs/**/*.md`
- Modify: `docs/assets/*.svg`
- Modify: `.github/PULL_REQUEST_TEMPLATE.md`

**Interfaces:**
- Consumes: approved naming conventions from this plan
- Produces: user-facing documentation that uses Lumina consistently

- [ ] **Step 1: Create an old-name baseline**

Run:

```powershell
rg -n "NeedleStart|Needle Map|Needle compiler|Needle Agent|needle dev|needle build|needle start|needle routes|needle inspect|needle check|needle seo|needle map|needle agent|needle mcp|needle edit|needle migrate|needle bench|@needle|create-needle|needlestart|needle.config.ts|\.needle|needle://" README.md AGENTS.md VISION.md ARCHITECTURE.md CONTRIBUTING.md GOVERNANCE.md SECURITY.md CODE_OF_CONDUCT.md docs .github > rename-baseline.txt
```

Expected: baseline file captures old-name references for the batch. Delete `rename-baseline.txt` before committing unless it is intentionally added as evidence.

- [ ] **Step 2: Replace product identity in top-level docs**

Update:

```txt
NeedleStart -> Lumina
Needle Map -> Lumina Map
Needle compiler -> Lumina compiler
needlestart -> lumina
```

In:

```txt
README.md
AGENTS.md
VISION.md
ARCHITECTURE.md
CONTRIBUTING.md
GOVERNANCE.md
SECURITY.md
CODE_OF_CONDUCT.md
```

Keep one historical sentence in README or status docs:

```md
Lumina was previously documented under the working name NeedleStart during Phase 1 planning.
```

- [ ] **Step 3: Replace docs naming and command vocabulary**

Update docs to use:

```txt
lumina dev
lumina build
lumina start
lumina routes
lumina inspect
lumina check
lumina seo
lumina map
lumina agent
lumina mcp
lumina edit
lumina migrate
lumina bench
```

Replace direct imports in planned examples:

```ts
import { defineMeta, staticPage } from "lumina"
import { apiHot, schema } from "lumina"
```

- [ ] **Step 4: Rename generated artifact vocabulary**

Replace planned generated outputs:

```txt
.needle/routes.json -> .lumina/routes.json
.needle/render-manifest.json -> .lumina/render-manifest.json
.needle/map.json -> .lumina/map.json
.needle/graph.json -> .lumina/graph.json
.needle/seo.report.json -> .lumina/seo.report.json
.needle/perf.report.json -> .lumina/perf.report.json
.needle/context/*.ctx.json -> .lumina/context/*.ctx.json
.needle/context/agent-index.json -> .lumina/context/agent-index.json
.needle/mutations.json -> .lumina/mutations.json
.needle/generated/* -> .lumina/generated/*
```

Replace MCP resource prefix examples:

```txt
needle://routes -> lumina://routes
needle://route/%2Fpricing -> lumina://route/%2Fpricing
needle://map/file/components%2FProductCard.tsx -> lumina://map/file/components%2FProductCard.tsx
needle://seo/report -> lumina://seo/report
needle://perf/report -> lumina://perf/report
needle://context/public -> lumina://context/public
```

- [ ] **Step 5: Rename map docs paths**

Run:

```powershell
git mv docs/needle-map.md docs/lumina-map.md
git mv docs/skills/needle-map-designer.md docs/skills/lumina-map-designer.md
```

Update links from:

```txt
docs/needle-map.md -> docs/lumina-map.md
needle-map.md -> lumina-map.md
skills/needle-map-designer.md -> skills/lumina-map-designer.md
```

- [ ] **Step 6: Verify mechanical rename**

Run:

```powershell
rg -n "NeedleStart|Needle Map|Needle compiler|Needle Agent|needlestart|create-needle|@needle|needle dev|needle build|needle start|needle routes|needle inspect|needle check|needle seo|needle map|needle agent|needle mcp|needle edit|needle migrate|needle bench|needle.config.ts|\.needle|needle://" README.md AGENTS.md VISION.md ARCHITECTURE.md CONTRIBUTING.md GOVERNANCE.md SECURITY.md CODE_OF_CONDUCT.md docs .github
bun run docs:check
git diff --check
```

Expected: old-name matches only appear in the deliberate historical rename note or in checker patterns that intentionally reject stale old names.

- [ ] **Step 7: Commit**

Run:

```powershell
git add README.md AGENTS.md VISION.md ARCHITECTURE.md CONTRIBUTING.md GOVERNANCE.md SECURITY.md CODE_OF_CONDUCT.md docs .github
git commit -m "docs: rename project to lumina"
git push origin main
```

Expected: commit and push succeed.

## Task 3: Package, Script, And Test Rename

**Priority:** P0 after Task 2.

**Estimated effort:** 2-3 hours.

**Files:**
- Modify: `package.json`
- Modify: `packages/**/package.json`
- Modify: `packages/**/src/**/*.ts`
- Modify: `scripts/check-docs.ts`
- Modify: `scripts/check-structure.ts`
- Modify: `scripts/check-performance-docs.ts`
- Modify: `tests/**/*.ts`
- Modify: `tsconfig.json`

**Interfaces:**
- Consumes: Lumina package naming from Task 2
- Produces: checkers and tests aligned with Lumina package names and commands

- [ ] **Step 1: Rename package manifests**

Use these target names:

```txt
needlestart -> lumina
create-needle -> create-lumina
@needle/cli -> @lumina/cli
@needle/core -> @lumina/core
@needle/compiler -> @lumina/compiler
@needle/vite-plugin -> @lumina/vite-plugin
@needle/react -> @lumina/react
@needle/router -> @lumina/router
@needle/seo -> @lumina/seo
@needle/map -> @lumina/map
@needle/agent -> @lumina/agent
@needle/mcp -> @lumina/mcp
@needle/cache -> @lumina/cache
@needle/schema -> @lumina/schema
@needle/devtools -> @lumina/devtools
@needle/adapter-bun -> @lumina/adapter-bun
@needle/adapter-node -> @lumina/adapter-node
@needle/adapter-static -> @lumina/adapter-static
```

- [ ] **Step 2: Decide type-name compatibility**

Use these target type names in code and docs:

```txt
NeedleApp -> LuminaApp
NeedleDiagnostic -> LuminaDiagnostic
```

Keep generic names unchanged:

```txt
RouteNode
GraphEdge
RenderMode
CachePlan
AdapterManifest
```

If keeping old exported type aliases for compatibility, mark them as planned compatibility aliases in docs and tests. If not keeping aliases, remove old names completely.

- [ ] **Step 3: Update check scripts**

Update `scripts/check-docs.ts` and `scripts/check-structure.ts` package arrays and command arrays to target Lumina:

```ts
const plannedLuminaCommands = [
  "lumina dev",
  "lumina build",
  "lumina start",
  "lumina routes",
  "lumina inspect",
  "lumina check",
  "lumina seo",
  "lumina map",
  "lumina agent",
  "lumina mcp",
  "lumina edit",
  "lumina migrate",
  "lumina bench",
]
```

Add stale-name rejection for user-facing docs:

```ts
{
  file: "README.md",
  pattern: /NeedleStart|Needle Map|@needle|needle dev|\\.needle/i,
  message: "README.md should use Lumina naming after the rename.",
}
```

- [ ] **Step 4: Update tests**

Update scaffold tests to expect:

```txt
lumina
@lumina/core
LuminaApp
LuminaDiagnostic
docs/skills/lumina-map-designer.md
```

- [ ] **Step 5: Verify package rename**

Run:

```powershell
bun install
bun run check
git diff --check
rg -n "NeedleStart|Needle Map|@needle|create-needle|needlestart|NeedleApp|NeedleDiagnostic|needle dev|\.needle" package.json packages scripts tests docs README.md AGENTS.md
```

Expected: full check passes; old names appear only in deliberate historical rename notes or stale-name guardrails.

- [ ] **Step 6: Commit**

Run:

```powershell
git add package.json bun.lockb packages scripts tests tsconfig.json docs README.md AGENTS.md
git commit -m "chore: rename packages and checks to lumina"
git push origin main
```

Expected: commit and push succeed.

## Task 4: Alpha README And Public Positioning Upgrade

**Priority:** P1 after Tasks 2 and 3.

**Estimated effort:** 2-3 hours.

**Files:**
- Modify: `README.md`
- Modify: `VISION.md`
- Modify: `docs/product-strategy.md`
- Modify: `docs/public/index.md`
- Modify: `docs/public/docs.md`
- Modify: `docs/public/roadmap.md`
- Modify: `docs/public/concepts/app-graph.md`
- Modify: `docs/public/concepts/agent-native.md`
- Modify: `docs/public/concepts/speed.md`

**Interfaces:**
- Consumes: Lumina naming and Phase 1 scaffold status
- Produces: Alpha-facing positioning that is confident but honest

- [ ] **Step 1: Rewrite README first screen**

Use this target opening structure:

```md
# Lumina

**The app-graph-native, agent-native React framework for large applications.**

Lumina illuminates the structure of modern React apps. It gives developers familiar framework ergonomics while making routes, render modes, cache plans, SEO surfaces, tests, ownership, generated files, and agent-safe edit boundaries visible through the Lumina Map.

Your app ships with a map.

Build like Next.js.

Type like TanStack Start.

Work with agents through structured contracts instead of guesswork.
```

Keep current scaffold status near the top.

- [ ] **Step 2: Add Alpha status language**

Use this exact status sentence where relevant:

```md
Lumina is moving toward Alpha. The current repository is still Phase 1 scaffold: Bun workspace, package placeholders, shared core types, CI, and enforcement scripts exist; framework runtime behavior remains planned.
```

- [ ] **Step 3: Upgrade public concept copy**

Use these section names across public pages:

```txt
Illumination And Clarity
Lumina Map
Agent-Native Workflows
Explicit SEO-First Behavior
Built For Scale
```

- [ ] **Step 4: Verify positioning**

Run:

```powershell
rg -n "NeedleStart|Needle Map|needle dev|@needle|\.needle|maximum speed|fastest safe rendering strategy" README.md VISION.md docs/public docs/product-strategy.md
bun run check
git diff --check
```

Expected: old names absent except deliberate historical note; full check passes.

- [ ] **Step 5: Commit**

Run:

```powershell
git add README.md VISION.md docs/product-strategy.md docs/public
git commit -m "docs: sharpen lumina alpha positioning"
git push origin main
```

Expected: commit and push succeed.

## Task 5: Lumina Map And Agent-Native Documentation Upgrade

**Priority:** P1 after Task 4.

**Estimated effort:** 3-4 hours.

**Files:**
- Modify: `docs/lumina-map.md`
- Modify: `docs/app-graph-visual.md`
- Modify: `docs/agent-kernel.md`
- Modify: `docs/mcp-server.md`
- Modify: `docs/safe-edit-transactions.md`
- Modify: `docs/machine-readable-docs.md`
- Modify: `docs/public/reference/mcp.md`
- Modify: `docs/public/concepts/app-graph.md`
- Modify: `docs/public/concepts/safe-edits.md`
- Modify: `docs/public/guides/agent-context.md`
- Modify: `docs/public/guides/needle-map.md` or rename to `docs/public/guides/lumina-map.md`

**Interfaces:**
- Consumes: Lumina Map naming
- Produces: docs that explain the map and agent workflows as product features

- [ ] **Step 1: Rename public guide path if approved**

Run:

```powershell
git mv docs/public/guides/needle-map.md docs/public/guides/lumina-map.md
```

Update docs navigation links from `needle-map.md` to `lumina-map.md`.

- [ ] **Step 2: Add productized docs output model**

In `docs/machine-readable-docs.md`, define planned outputs:

```txt
docs-index.json
llms.txt
llms-full.txt
.lumina/context/*.ctx.json
.lumina/context/agent-index.json
.lumina/map.readable.json
.lumina/map.summary.md
```

Label all as `Planned for Alpha` until generators exist.

- [ ] **Step 3: Strengthen Lumina Map explanation**

Ensure `docs/lumina-map.md` answers:

```txt
What is the Lumina Map?
What nodes and edges exist?
How does it explain why a route renders, caches, indexes, or depends on another file?
What can agents read?
What can agents edit?
What is out of scope until implementation?
```

- [ ] **Step 4: Verify agent docs**

Run:

```powershell
rg -n "Needle Map|needle://|\.needle|NeedleStart|needle agent|needle mcp" docs/lumina-map.md docs/app-graph-visual.md docs/agent-kernel.md docs/mcp-server.md docs/safe-edit-transactions.md docs/machine-readable-docs.md docs/public
bun run check
git diff --check
```

Expected: old agent/map names absent except deliberate historical note; full check passes.

- [ ] **Step 5: Commit**

Run:

```powershell
git add docs
git commit -m "docs: elevate lumina map and agent workflows"
git push origin main
```

Expected: commit and push succeed.

## Task 6: Getting Started, Examples, And Alpha Roadmap

**Priority:** P1 after Task 5.

**Estimated effort:** 2-3 hours.

**Files:**
- Modify: `docs/getting-started.md`
- Modify: `docs/public/guides/create-app.md`
- Modify: `docs/examples.md`
- Modify: `docs/examples-contract.md`
- Modify: `docs/examples-catalog.md`
- Modify: `docs/public/reference/examples.md`
- Modify: `docs/roadmap.md`
- Modify: `docs/task-backlog.md`
- Modify: `docs/product-build-readiness.md`
- Modify: `docs/prototype-acceptance.md`

**Interfaces:**
- Consumes: Lumina command and package naming
- Produces: Alpha-ready onboarding and roadmap docs

- [ ] **Step 1: Update target onboarding commands**

Use:

```bash
bun create lumina my-app
cd my-app
lumina dev
```

State:

```md
This is Target Alpha behavior. App creation and CLI behavior are not implemented in the current scaffold.
```

- [ ] **Step 2: Update examples catalog**

Keep planned examples, but align names with Lumina:

```txt
Basic Starter
Blog SEO
API Route
Hot API
Static Export
Node Adapter
Dashboard Client
Ecommerce
Agent Demo
Docs Site
Large App Fixture
```

Add that `Agent Demo` must showcase Lumina Map inspection, context capsule generation, safe edit preview, mutation log, and undo.

- [ ] **Step 3: Add Alpha roadmap framing**

Use these milestone labels:

```txt
Phase 1A: Core model and route discovery
Alpha Slice: create app, Lumina Map preview, SEO-safe route, Bun adapter output
Alpha Agent Slice: context capsule, read-only MCP, safe metadata edit preview
Post-Alpha: migration, broader adapters, benchmark evidence
```

- [ ] **Step 4: Verify onboarding and examples**

Run:

```powershell
rg -n "bun create needle|needle dev|NeedleStart|Needle Map|create-needle|@needle|\.needle" docs/getting-started.md docs/public/guides/create-app.md docs/examples.md docs/examples-contract.md docs/examples-catalog.md docs/public/reference/examples.md docs/roadmap.md docs/task-backlog.md docs/product-build-readiness.md docs/prototype-acceptance.md
bun run check
git diff --check
```

Expected: old onboarding names absent except deliberate historical note; full check passes.

- [ ] **Step 5: Commit**

Run:

```powershell
git add docs/getting-started.md docs/public/guides/create-app.md docs/examples.md docs/examples-contract.md docs/examples-catalog.md docs/public/reference/examples.md docs/roadmap.md docs/task-backlog.md docs/product-build-readiness.md docs/prototype-acceptance.md
git commit -m "docs: align lumina alpha onboarding"
git push origin main
```

Expected: commit and push succeed.

## Task 7: Final Rename Guardrails And Completion Audit

**Priority:** P0 before closing the goal.

**Estimated effort:** 1-2 hours.

**Files:**
- Modify: `scripts/check-docs.ts`
- Modify: `scripts/check-structure.ts`
- Modify: `scripts/check-performance-docs.ts`
- Modify: `docs/docs-verification.md`
- Modify: `docs/documentation-completion-audit.md`
- Modify: `docs/docs-maintenance-checklist.md`
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: completed rename tasks
- Produces: durable stale-name detection and completion evidence

- [ ] **Step 1: Add stale old-name guardrails**

Add guardrails that fail user-facing docs for old names unless the file is an approved rename-history file:

```txt
NeedleStart
Needle Map
needlestart
create-needle
@needle/
needle dev
needle build
needle start
needle routes
needle inspect
needle check
needle seo
needle map
needle agent
needle mcp
needle edit
needle migrate
needle bench
needle.config.ts
.needle/
needle://
```

- [ ] **Step 2: Update docs verification runbook**

Add commands:

```powershell
rg -n "NeedleStart|Needle Map|needlestart|create-needle|@needle|needle dev|needle build|needle start|needle routes|needle inspect|needle check|needle seo|needle map|needle agent|needle mcp|needle edit|needle migrate|needle bench|needle.config.ts|\.needle|needle://" README.md AGENTS.md VISION.md ARCHITECTURE.md docs packages scripts tests .github
bun run check
git diff --check
```

- [ ] **Step 3: Update completion audit**

Add rows proving:

```txt
Lumina naming is used across public-facing docs.
Package naming is aligned or explicitly blocked by owner-only package scope decisions.
CLI command docs use lumina.
Generated artifact docs use .lumina.
Lumina Map docs explain map purpose and agent usage.
Alpha docs are honest about planned behavior.
Machine-readable docs outputs are planned or partially implemented.
```

- [ ] **Step 4: Run final verification**

Run:

```powershell
bun run check
git diff --check
git status --short --branch
rg -n "NeedleStart|Needle Map|needlestart|create-needle|@needle|needle dev|needle build|needle start|needle routes|needle inspect|needle check|needle seo|needle map|needle agent|needle mcp|needle edit|needle migrate|needle bench|needle.config.ts|\.needle|needle://" README.md AGENTS.md VISION.md ARCHITECTURE.md docs packages scripts tests .github
```

Expected: full check passes; branch is clean after commit; stale old-name matches are limited to documented rename-history or guardrail files.

- [ ] **Step 5: Commit**

Run:

```powershell
git add scripts docs AGENTS.md
git commit -m "docs: enforce lumina rename guardrails"
git push origin main
```

Expected: commit and push succeed.

## Approval And Execution Options

This plan is approval-gated. Do not execute Tasks 2 through 7 until the maintainer approves the rename direction, package scope, CLI name, generated artifact path, and whether old `needle` aliases are wanted for Alpha.

Plan complete and saved to `docs/superpowers/plans/2026-07-06-lumina-rename-documentation.md`. Two execution options:

1. Subagent-Driven (recommended): dispatch a fresh subagent per task, review between tasks, fast iteration.
2. Inline Execution: execute tasks in this session using executing-plans, batch execution with checkpoints for review.

## Self-Review

- Spec coverage: The plan covers rename execution, documentation as core product feature, Alpha launch alignment, high-risk rename items, and machine-readable/agent-optimized docs.
- Placeholder scan: The plan does not use TBD, TODO, or later-without-scope language. Planned future behavior is explicitly marked as planned because implementation does not exist.
- Type consistency: Lumina package names, command names, config names, generated artifact names, and map naming are consistent across tasks.
