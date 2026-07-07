# Large-Repo Build Architecture

Status: Planned.

Audience: framework contributors, maintainers, compiler authors, map authors, CLI authors, AI agents.

This page defines the planned large-repo lane for Lumina. The behavior is not implemented yet. It exists so workspace graph, shared files, split apps, affected builds, terminal output, logs, introspection, observability, and speed evidence are designed as one system before broad runtime complexity grows.

## Goal

Lumina should scale to multi-app workspaces without duplicating source files or generated work blindly. The compiler and Lumina Map should understand apps, packages, routes, shared files, generated artifacts, owners, tests, cache boundaries, and deployment targets well enough to build only what changed, explain why it changed, and keep production runtime adapters small.

Large-repo work must answer at least one question:

- Does it reduce repeated compiler or build work?
- Does it improve graph-aware sharing?
- Does it improve build, dev startup, HMR, or affected-check speed?
- Does it make large repos easier to inspect?

## Workspace Graph

Lumina should add a first-class workspace graph that can represent:

- apps,
- packages,
- routes,
- shared components,
- schemas,
- content collections,
- shared assets,
- tests,
- owners,
- generated artifacts,
- cache boundaries,
- deployment targets.

The workspace graph is broader than a single app map. It should connect multiple apps and packages without requiring source files to be copied into each app.

Planned node kinds:

```txt
workspace
app
package
route
layout
page
component
schema
content
asset
test
owner
generatedArtifact
cacheBoundary
deploymentTarget
```

Planned edge kinds:

```txt
workspace.contains
app.usesPackage
app.hasRoute
route.usesSharedFile
file.imports
file.consumedByApp
schema.consumedByRoute
content.consumedByRoute
artifact.generatedFrom
artifact.consumedByAdapter
test.covers
owner.owns
cacheBoundary.appliesTo
deploymentTarget.receivesApp
```

Every edge must include `kind`, `source`, `confidence`, and `why`.

## Shared File Identity

Shared files need stable identity so multiple apps can reference one source file without duplicating content or generated output blindly.

Planned identity fields:

```ts
export type SharedFileIdentity = {
  id: string
  normalizedPath: string
  contentHash: string
  packageName?: string
  owner?: string
  consumers: Array<{
    appId: string
    routeIds: string[]
    importKind: "component" | "schema" | "content" | "asset" | "test" | "unknown"
  }>
  generatedArtifacts: string[]
}
```

Rules:

- Normalize paths to POSIX-style relative paths.
- Use no absolute local paths in public artifacts.
- Use content hashes for source identity.
- Track package and app ownership metadata.
- Track import graph edges and consumer lists.
- Track generated artifact identity separately from source identity.
- Sort consumers, artifacts, routes, and paths deterministically.

## Split-App Support

A Lumina workspace should eventually contain multiple apps that can be built together or separately.

Target shape:

```txt
apps/
  marketing/
  dashboard/
  docs/
packages/
  ui/
  schema/
  content/
  analytics/
lumina.workspace.ts
```

Planned capabilities:

- build one app,
- build all apps,
- build affected apps only,
- share route components without duplication,
- share schemas and content collections,
- emit app-specific manifests,
- emit workspace-level manifests,
- inspect which apps consume a shared file,
- split a route or app into its own app without copying shared packages.

Draft workspace config:

```ts
import { defineWorkspace } from "lumina"

export default defineWorkspace({
  apps: {
    marketing: "apps/marketing",
    dashboard: "apps/dashboard",
    docs: "apps/docs",
  },
  packages: ["packages/*"],
  sharing: {
    mode: "graph",
    allowSharedRoutes: false,
    allowSharedComponents: true,
    allowSharedContent: true,
    duplicateGeneratedAssets: "never-unless-required",
  },
  performance: {
    affectedBuilds: true,
    cache: {
      contentHash: true,
      graphSchemaHash: true,
      packageDependencyHash: true,
    },
    terminal: {
      default: "summary",
      json: true,
      timings: true,
      cacheSummary: true,
    },
  },
})
```

This is a planned API draft. Keep it aligned with [Configuration Contract](config-contract.md), [Manifest Contracts](manifest-contracts.md), and [Versioning And Upgrades](versioning-and-upgrades.md) before implementation.

## Incremental Build Engine Contract

The planned large-repo compiler cache should key work by:

- source content hash,
- normalized config hash,
- package dependency hash,
- compiler version,
- graph schema version,
- app boundary,
- generated artifact schema version.

Rules:

- Invalidate only affected apps, routes, packages, and generated artifacts.
- Avoid deep TypeScript semantic analysis on the default path.
- Support targeted deeper analysis when a feature requests it.
- Keep `.lumina/cache/` deterministic and inspectable.
- Keep cache reports separate from public runtime artifacts.
- Do not hide invalidation behind invisible caching.

## Affected Build And Test Selection

Planned commands:

```bash
lumina build --affected
lumina build --affected --json
lumina check --affected
lumina check --affected --json
lumina test --affected
lumina test --affected --json
lumina map affected <file>
lumina workspace graph --json
lumina workspace apps --json
lumina workspace explain <file> --json
```

All JSON output must be stable, compact, schema-versioned, and usable by agents. Planned data shapes live in [CLI JSON Contract](cli-json-contract.md).

Affected output should answer:

- Which apps changed?
- Which routes changed?
- Which packages changed?
- Which tests should run?
- Which generated artifacts need regeneration?
- Which cache entries were reused or invalidated?
- Why was each app or route affected?

## Developer Escape Hatches

The workspace graph should improve speed and introspection without making Lumina feel like a cage.

Developers should be able to opt out of graph-aware behavior at these levels:

- package,
- app,
- route,
- generated artifact,
- command invocation.

Planned opt-out behavior:

- A package can be excluded from workspace graph ownership and treated as an external dependency.
- An app can disable affected builds and always run full build or check commands.
- A route can opt out of deeper semantic inference while still appearing as a route node.
- A generated artifact can be marked non-shared so each app owns its own output copy.
- A command can bypass affected selection with a full-scope mode when a developer wants certainty over speed.

Opting out should not break the app. Lumina should report what is lost:

- affected builds may become less precise,
- graph explanations may become lower confidence,
- shared-file consumer lists may be incomplete,
- cache reuse may be reduced,
- agent context may include fewer relationships,
- safe edit recommendations may require broader human review.

Rules:

- Escape hatches must be visible in CLI output and JSON output.
- Opt-out diagnostics should be warnings or info unless the setting makes output unsafe or contradictory.
- The default path should recommend graph-aware behavior, but full-repo commands must remain available.
- Runtime adapters must continue to consume generated app artifacts only; escape hatches must not create runtime source discovery.

## Terminal Output And Logs

Large repos need concise output by default and structured detail on demand.

Terminal output rules:

- Use structured phases.
- Keep default output concise.
- Support verbose mode.
- Support JSON mode.
- Use stable diagnostic codes.
- Group warnings by app, package, and route.
- Include timing summary by phase.
- Include cache hit/miss summary.
- Include HMR update summary.
- Include affected app and route summary.
- Include clear next action suggestions.
- Avoid noisy stack traces unless needed.

Example default output:

```txt
Lumina build

Workspace  apps=3 packages=12 routes=1,842 changed=7
Cache      hits=1,721 misses=121 reusedArtifacts=94%
Affected   apps=marketing, docs routes=38 tests=12

Phase                 Time      Status
route discovery        82ms     ok
workspace graph        41ms     ok
render manifest       109ms     ok
vite build          4.82s       ok
adapter output        133ms     ok

Done in 5.31s
```

This example is output shape only. It is not benchmark evidence.

## Observability And Introspection

Lumina should expose large-repo observability without adding production payload by default.

Planned reports:

```txt
.lumina/workspace.json
.lumina/workspace-graph.json
.lumina/affected.json
.lumina/build-trace.json
.lumina/cache-report.json
.lumina/hmr-report.json
.lumina/split-report.json
```

Report purposes:

| Report | Purpose |
| --- | --- |
| `.lumina/workspace.json` | Workspace apps, packages, settings, and generated artifact index. |
| `.lumina/workspace-graph.json` | Cross-app graph for shared files, packages, routes, tests, owners, and artifacts. |
| `.lumina/affected.json` | Affected apps, routes, packages, tests, and reasons. |
| `.lumina/build-trace.json` | Build phases, timings, cache behavior, and diagnostics. |
| `.lumina/cache-report.json` | Cache keys, hits, misses, invalidations, and reused artifact summary. |
| `.lumina/hmr-report.json` | Dev server update scope, invalidated modules, route updates, and timings. |
| `.lumina/split-report.json` | Planned app or route split analysis, shared dependencies, and generated artifact movement. |

All reports must avoid secrets, absolute local paths, random IDs, and machine-specific values unless explicitly marked as raw benchmark data.

## Package Scope

Likely owners:

| Package | Large-repo responsibility |
| --- | --- |
| `@lumina/core` | Workspace, app, package, shared-file, artifact, graph, diagnostic, and report types. |
| `@lumina/compiler` | Workspace discovery, graph extraction, incremental planning, affected build selection, generated reports. |
| `@lumina/map` | Workspace graph query engine, affected queries, shared-file consumers, explain output. |
| `@lumina/cli` | Terminal output, JSON output, affected commands, workspace commands. |
| `@lumina/vite-plugin` | Graph-aware dev server integration, route-file update reports, direct local imported component affected-route reports, planned app-scoped invalidation. |
| Runtime adapters | Consume app-specific generated output only; never rediscover workspace source at runtime. |

## Runtime Boundary

Production runtime adapters must consume app-specific generated output only.

They must not:

- rediscover workspace source files,
- generate the workspace graph,
- read build traces for request handling,
- load agent context,
- load devtools,
- run split-app analysis,
- inspect `.lumina/cache/` on the request path.

## Implementation Tasks

Planned PR-sized tasks are recorded in [Task Backlog](task-backlog.md):

- workspace graph contract,
- shared file identity and artifact identity,
- split-app planning,
- affected build, check, and test selection,
- terminal output and logs,
- observability reports,
- large-repo fixtures and snapshots.

## Tests Required

When implementation begins, add fixtures for:

- single app, small repo,
- multi-app workspace,
- shared component package consumed by multiple apps,
- shared schema package consumed by API or hot API routes,
- shared content collection consumed by docs and marketing apps,
- changed shared file affecting multiple apps,
- changed app-local file affecting one app only,
- route moved from one app to another,
- split-app plan output,
- generated workspace graph snapshot,
- affected build output snapshot,
- terminal JSON output snapshot,
- cache hit/miss report snapshot.

Large-scale fixtures should eventually include:

- 1,000 routes,
- 10,000 components or modules,
- multiple apps,
- shared packages with high fanout,
- affected build timing evidence,
- HMR timing evidence.

## Definition Of Done

The first large-repo documentation pass is done when:

- large-repo architecture is documented,
- shared file identity is documented,
- workspace graph shape is documented,
- split-app behavior is documented,
- affected build, test, and check behavior is documented,
- terminal output contract is documented,
- observability and report artifacts are documented,
- roadmap and task backlog include PR-sized implementation steps,
- planned behavior is not described as implemented,
- speed gates are tied to fixtures, snapshots, and raw benchmark evidence.

## Out Of Scope For First Pass

- Custom bundler.
- Runtime source discovery.
- Runtime workspace graph generation.
- Default telemetry.
- Cloud-specific deployment adapters.
- Full distributed cache service.
- Automatic repo splitting that mutates user files without a safe edit transaction.
- Public claims that Lumina is faster than another framework before equivalent benchmark evidence exists.
