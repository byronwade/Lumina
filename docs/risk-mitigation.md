# Risk Mitigation Strategy

Status: Planned.
Audience: maintainers, framework contributors, AI agents.

NeedleStart is taking on hard problems: semantic graph extraction, agent-safe edits, framework execution scope, adoption against incumbents, and Bun adoption concerns. These are solvable only if they are designed into the architecture and process from day one.

## 1. Semantic Graph Extraction Is Hard

### Problem

File imports are easy. Real semantic understanding is harder: data flow, prop usage, SEO impact, cache impact, ownership, and affected checks are expensive and error-prone.

Simple dependency tools capture syntactic relationships. NeedleStart's value comes from semantic relationships:

- A component reads `product.price` from a schema.
- A layout affects LCP and structured data across many routes.
- A cache tag invalidates prerendered pages and API responses.
- A file is owned by a team through CODEOWNERS or an explicit contract.

Heavy convention and deep static analysis both create maintenance burden. NeedleStart must use both carefully and never pretend low-confidence inference is certain.

### Strategy

Needle Map must use a layered extraction model.

Layer 0, structural graph:

- Phase: file graph v1.
- Nodes: files, routes, components, APIs, schemas, tests, content.
- Edges: `imports`, `renders`, `defines`, `coveredByTest`.
- Implementation: use `ts-morph`, Oxc, or another structured parser plus a deterministic dependency walker.
- Output: persist to `.needle/map.json` with stable IDs.
- Performance target: deterministic and fast, with incremental rebuilds designed for sub-200ms updates on large apps.

Layer 1, contract graph:

- Phase: contract graph expansion.
- Introduce `.contract.ts` files beside components, routes, schemas, APIs, and server functions.
- Treat contracts as the highest-signal source of semantic edges.
- Prefer contracts over inference when both exist.
- Extract strong `usesProps`, `affectsSeo`, `usesCacheTag`, and `ownedBy` edges with high confidence.

Example:

```ts
export default componentContract({
  name: "ProductCard",
  props: {
    product: ref("ProductPublic"),
    variant: enum_("compact", "full").default("compact"),
  },
  seo: {
    role: "product-summary",
    mayContainLcpImage: true,
  },
  cache: {
    tags: ({ product }) => [`product:${product.id}`],
  },
  tests: {
    unit: "components/ProductCard.test.tsx",
    visual: "components/ProductCard.stories.tsx",
  },
  ownership: "billing-team",
})
```

Layer 2, inferred semantic edges:

- Convention-based inference.
- Examples include loader exports, metadata exports, `render = staticPage()` declarations, route cache tags, schema exports, and named tests.
- Only infer when the source is explicit and the edge can explain itself.

Layer 3, later:

- Lightweight static analysis for prop drilling and data consumption.
- Only add when contracts are present.
- Run on demand or in targeted checks, not as a build-blocking default.
- Never guess on ambiguous code.

### Implementation Recommendations

- Keep the full graph in memory during dev and build.
- Persist graph cache to `.needle/cache/graph.json`.
- Key persistent cache entries by source content hash, config hash, parser version, and graph schema version.
- Add `@needle/map` query APIs:
  - `getAffected(node)`
  - `explainEdge(edgeId)`
  - `query("route:/pricing affectedBy component:ProductCard")`
- Expose graph queries through MCP immediately:
  - `get_impact_map`
  - `get_related_files`
  - `get_route_context`

### Graph Edge Rules

Every graph edge must include:

- `kind`
- `source`
- `confidence`
- `why`

Recommended source values include `contract`, `import`, `convention`, `typescript`, `compiler`, and `manual`.

Missing contracts should produce low-confidence edges rather than confident guesses.

### Failure Modes to Prevent

- Over-inference early, causing agents to trust bad edges.
- Graph bloat from too many low-confidence edges.
- Non-deterministic output across operating systems or filesystems.
- Safety decisions relying on inferred edges without validation.

### Guardrail

Never let Needle Map be the only source of truth for safety-critical decisions. Combine graph data with explicit contracts, allow-lists, runtime validation, and affected checks.

### Dogfooding Requirement

NeedleStart should use its own Needle Map once the map exists. If the graph lies during framework development, the project should feel that pain early and fix it.

### Success Metric

An agent using only Needle Map and MCP tools can answer "What must change if I edit ProductCard?" with more than 90 percent recall on a fixture app, and humans prefer it over manual searching.

## 2. Execution Scope Is Brutal

### Problem

A strong React meta-framework is already a large project. Adding a semantic graph, Agent Kernel, MCP server, and safe edit system multiplies the complexity.

This is a build-time distributed-system problem: routing, render modes, caching, metadata, bundling, deployment, graph augmentation, safe edits, and MCP all need to agree on the same source of truth.

### Strategy

The first working slice must stay ruthlessly scoped:

- Create app.
- Render SEO-safe pages.
- Serve through `@needle/adapter-bun`.
- Generate a basic Needle Map.
- Let an agent inspect the app.
- Let an agent safely edit metadata through MCP or CLI.

The broader first public prototype acceptance scope may include API routes, a hot API path, read-only MCP tools, adapter-aware server output, and documented Node/static paths. Keep the working slice small enough to prove the map and safe-edit wedge before expanding to that public demo.

Cut from the first public release:

- Streaming SSR.
- React Server Components.
- Partial prerendering.
- Full content system.
- Full devtools dashboard.
- Large-app sharding.
- Full deployment adapter matrix.

### Architecture Discipline

- Runtime stays tiny.
- Compiler and build-time graph carry the complexity.
- Shared immutable data model must be stabilized in `@needle/core`: `NeedleApp`, `RouteNode`, `GraphEdge`, `NeedleDiagnostic`, `RenderMode`, `CachePlan`, and `AdapterManifest`.
- CLI, compiler, map, agent, MCP, and devtools must read the same core model instead of duplicating local shapes.
- Build pipeline is discovery -> IR -> graph augmentation -> codegen -> manifests.
- Runtime consumes generated artifacts and should not rediscover source structure.
- Never implement a feature in the runtime if it can be solved at compile time.

Every new feature must answer three questions before being scheduled:

1. Does it improve Needle Map or the Agent Kernel?
2. Can it be implemented with minimal production runtime code?
3. Does it have clear planned acceptance criteria with tests and an agent demo?

If the answer is no, it is lower priority for the first working slice and should not enter the first public prototype unless it directly strengthens the demo.

### Incremental Build Discipline

- Persistent build cache keyed by content hash and config hash.
- Route-level invalidation driven by the graph.
- Recompile changed routes and their dependents, not the whole app.
- Parallel compilation where possible.
- Stable manifests so agent-facing output can be diffed.

### Process Discipline

- Use `docs/templates/task-template.md` for every implementation issue.
- Keep `docs/compiler-ir.md` and `docs/needle-map.md` current.
- Run regular graph integrity reviews.
- Break known dependencies on purpose and verify that Needle Map plus affected checks catch the impact.
- Phases 0 through 7 should focus on compiler IR, route discovery, rendering basics, and the first graph.

### Ownership Model

Small-team ownership should split along these lines:

- Compiler and Needle Map.
- Runtime and Vite plugin.
- Agent Kernel, MCP, and safe edits.

All owners must use the same core data model: `NeedleApp`, `RouteNode`, `GraphEdge`, `NeedleDiagnostic`, `RenderMode`, `CachePlan`, and `AdapterManifest`.

### Success Metric

The runtime adapter packages stay intentionally small, and the first working slice with map plus basic safe metadata edit ships within the planned prototype window.

## 3. Adoption Moat

### Problem

Next.js has massive inertia. TanStack Start already owns much of the typed and explicit full-stack niche.

### Strategy

NeedleStart must win on a new axis instead of trying to lead with parity:

- Market as the framework built for the age of AI agents building and maintaining apps.
- Lead with a demo where an agent safely changes a large app using Needle tools.
- Make `needle map explain` and `needle agent plan` output useful enough to share.
- Build migration tools and guides that preserve as much existing app structure as possible.

### Positioning Hierarchy

Use this order in marketing and user-facing documentation:

1. Built for the age of AI agents building and maintaining apps.
2. SEO-safe public pages and Bun-first adapter paths, backed by fixtures before public claims.
3. Familiar React meta-framework ergonomics.

### Killer Onboarding Experiences

- `bun create needle my-app --example agent-demo`
- `needle agent context --route /pricing --json`
- `needle map explain components/ProductCard.tsx`
- A simple visual Needle Map explorer at `http://localhost:3434/__needle/map`
- A demo where an agent uses MCP to inspect, edit metadata, run affected checks, and report the mutation log.

### Migration Tooling

Prototype migration before the full deployment adapter phase:

- `needle migrate from-next`
- Convert App Router pages, metadata, layouts, and simple dynamic routes.
- Preserve as much source as possible.
- Generate `.contract.ts` stubs where semantics are ambiguous instead of guessing.
- Emit a migration report with skipped files, generated contracts, and manual review items.

See `docs/migration.md`.

### Ecosystem Plays

- Ship static, Bun, Docker, and Node adapters early enough to reduce adoption risk.
- Provide first-class rules for agent tools through `AGENTS.md`, `llms.txt`, and MCP.
- Build a simple visual Needle Map early, even before a polished devtools dashboard.
- Provide examples or plugins for popular stacks such as Tailwind, shadcn/ui, Drizzle, and Better Auth.
- Provide Cursor, Windsurf, and Claude rule files that point agents to `AGENTS.md` and the MCP server.
- Publish benchmarks for hot APIs and agent task completion time.

### Community Flywheel

- Open source from the beginning.
- Keep `CONTRIBUTING.md` and `AGENTS.md` strong.
- Generate excellent `llms.txt` and `llms-full.txt`.
- Host a public Needle Map showcase repository for anonymized real app graphs.
- Maintain high-quality examples:
  - `examples/agent-demo/`
  - `playgrounds/large-app-fixture/`
  - `examples/blog-seo/`
- Make demos focus on graph, agent, and SEO workflows rather than generic framework parity.

### Revenue Direction

Keep the framework open source. If revenue is needed later, consider hosted Needle Map, enterprise audit logs, safe edit governance, or CI graph services.

### Success Metric

Within six months of public launch, three to five non-trivial production apps or open-source projects choose NeedleStart specifically because of Needle Map and agent workflows.

## 4. Bun Dependency Perception

### Problem

Some teams still treat Bun as too risky for production adoption.

### Strategy

Bun should remain the default because speed matters, but NeedleStart must avoid making Bun a hard adoption blocker.

Rules:

- Default to Bun for `needle dev` and `needle start`.
- Document Node compatibility prominently.
- Move adapter abstraction into the Phase 7-8 window instead of treating it as a late deployment concern.
- Avoid requiring Bun-only APIs in user application code.
- Keep Bun-specific APIs inside runtime adapter packages.

### Adapter Abstraction

Create adapter packages early:

- `@needle/adapter-bun`: default, uses `Bun.serve` and generated route matcher.
- `@needle/adapter-node`: uses Node `http` or a lightweight server with compatibility shims.
- `@needle/adapter-static`: pure static export.
- Later: Cloudflare, Vercel, Docker, and other deployment targets.

Config:

```ts
export default defineConfig({
  runtime: "bun",
  adapter: "bun",
})
```

Generated server entry:

```ts
// .needle/generated/server-entry.ts
import { createServer } from "@needle/adapter-bun"
```

See `docs/adapters.md`.

### Benchmarking

Public benchmarks should compare:

- `apiHot` on Bun against ordinary framework API routes.
- Cold start.
- Memory usage.
- Throughput.
- Static serving.
- SSR latency.
- Bundle size.
- Bun adapter vs Node adapter vs comparable Next.js path.

The target message is: default experience is Bun for maximum speed, with Node and static adapter paths designed early enough to avoid Bun lock-in.

### Failure Modes to Prevent

- User applications importing Bun-only APIs directly.
- Node adapter lagging so teams treat Bun as mandatory.
- Benchmarks that compare unrealistic toy paths only.
- Runtime adapter logic leaking into compiler core.

### Success Metric

More than 70 percent of new projects use the Bun path, with no recurring deployment complaints caused by Bun-only requirements.

## 5. Safe Edit Trust

### Problem

One bad automated edit can damage trust in both the framework and its agent story.

### Defense in Depth

Safe edits must use a full `SafeEditTransaction` model:

1. Validate that the target exists.
2. Validate that the field is editable for that node type.
3. Check risk tier.
4. Apply the patch in memory using AST.
5. Regenerate affected graph slices.
6. Run affected checks.
7. Produce a dry-run diff and impact report.
8. Apply only when dry-run passes or an explicit override is present.
9. Write files.
10. Append to `.needle/mutations.json`.
11. Trigger incremental rebuild.
12. Re-run affected checks.
13. Emit structured result for MCP and CLI.
14. Support rollback through `needle edit undo`.

See `docs/safe-edit-transactions.md`.

### Risk Tiers

Low risk:

- Metadata.
- Copy.
- Simple structured block props.

Medium risk:

- Adding components.
- Updating component contracts.
- Updating route contracts.

High risk:

- Auth.
- Billing.
- Cache invalidation.
- Server functions.
- Schemas.
- Deployment adapters.
- File-system write tools.

High-risk edits require explicit `--force`, human confirmation, or an equivalent safe-edit override.

In production workflows, high-risk edits require explicit human sign-off.

### Transparency

Every safe edit must explain:

- What changed.
- Why the field was editable.
- Which routes and files were affected.
- Which checks ran.
- Whether the checks passed.
- What risk tier was assigned.

MCP tools must expose the full transaction so agents can reason about risk.

### Testing Strategy

Create a fixture app with known dangerous areas. Run simulated agent edits against it in CI. The graph and checks should catch nearly all intentional breakage before edits are considered trustworthy.

The fixture should include auth, billing, schemas, cache invalidation, server functions, and public SEO routes.

Measure false positive rejection rate, false negative missed breakage rate, valid edit first-pass success rate, and rollback success rate.

### Failure Modes to Prevent

- Silent AST patches that compile but change the wrong field.
- Safe edit output that hides risk or affected files.
- MCP write tools bypassing the same validation path as CLI writes.
- Missing rollback for applied edits.
- Tests that only cover successful edits and not rejected edits.

### Success Metric

Safe edits produce zero silent breaks in demo scenarios and catch nearly all intentional breaking edits in fixture simulations.

## Summary Table

| Risk | Primary mitigation | When to tackle | Success metric |
| --- | --- | --- | --- |
| Semantic graph | Layered extraction with contracts first | Phases 11-13 | Agents prefer Needle Map over search. |
| Execution scope | Tight first working slice and shared data model | Day 1 | First working slice proves the map and safe-edit wedge quickly. |
| Adoption | Lead with agent demo and migration story | Marketing and examples | Teams choose NeedleStart because of map and agent workflows. |
| Bun perception | Adapter abstraction and benchmarks | Phase 7-8 | Bun by default, Node-compatible by design. |
| Safe edits | Defense in depth and risk tiers | Safe edit phase | No silent breaks in demo scenarios. |

## Immediate Next Actions

After the monorepo skeleton:

1. Stabilize `NeedleApp`, `RouteNode`, `GraphEdge`, `NeedleDiagnostic`, `RenderMode`, `CachePlan`, and `AdapterManifest` in `@needle/core` beyond the current scaffold placeholders.
2. Implement the file-level graph and basic affected query as the first non-trivial feature.
3. Build an agent simulator script that uses MCP tools once available to perform metadata edits and assert that checks pass.
4. Write the marketing one-pager: "NeedleStart: the framework where changing code does not feel like operating without a map."
