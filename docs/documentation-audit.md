# Documentation Strategy Audit

Status: Draft.

Audience: maintainers, documentation contributors, AI agents.

This audit evaluates the NeedleStart documentation system against the goal of becoming a top-tier framework documentation experience. It is based on the current repository state and current public documentation patterns from leading framework and developer-tool projects.

Detailed research notes live in `docs/documentation-research.md`.
The full file-by-file improvement matrix lives in `docs/documentation-matrix.md`.

## 1. Executive Summary

NeedleStart already has unusually strong early architecture, risk, agent-safety, and product-positioning documentation. Its biggest gap is not depth of thought; it is information architecture for different audiences. Mature framework docs separate onboarding, guides, reference, concepts, examples, deployment, release, security, governance, and contributor workflows. NeedleStart now has initial lanes for those areas, but most are still planned reference homes.

The highest-impact move is to keep building a docs system where every feature has a status, a quick example, exact API/reference details, generated artifacts, agent notes, verification requirements, and out-of-scope boundaries.

## 2. Current Docs Strengths

- Clear product thesis: app-graph-native, SEO-first, React, human and AI agent collaboration.
- Strong architecture split between compiler intelligence and small runtime adapters.
- Explicit risk mitigation for semantic graphs, safe edits, MCP tools, and Bun adoption.
- Good agent workflow foundations in `AGENTS.md`, `docs/skills/`, and `docs/subagents/`.
- Repeated warnings against claiming implementation before it exists.
- Early acceptance demo and task backlog give contributors a concrete direction.

## 3. Current Docs Weaknesses

- Many public-framework docs homes now exist, including status, governance, security, release, testing, CLI, config, routing, deployment, examples, compatibility, and benchmark methodology. The current weakness is that most are planned-contract homes until implementation fills them with verified behavior.
- Several docs are architecture-first and not yet beginner-first.
- Reference homes now exist for commands, config, manifests, file conventions, and major feature contracts; helper-specific pages and verified examples still need implementation-backed detail.
- Website-readiness is early: most docs are repo planning docs rather than polished public website content.
- Contributor and maintainer processes need more explicit governance, release, security, and review paths.
- Machine-readable docs outputs now have a planned inventory and `docs-index.json` draft in `docs/machine-readable-docs.md`; generators, validation, and real output examples are still future work.

## 4. Biggest Market Opportunities

- Own the app-graph-native docs category with first-class map, manifest, and agent-context references.
- Make AI-agent docs a product surface, not a side note.
- Make benchmark honesty a trust advantage by requiring raw data and methodology before performance claims.
- Publish migration and comparison docs that are frank about what NeedleStart does not replace.
- Turn generated app metadata into docs artifacts: `llms.txt`, `docs-index.json`, route context capsules, manifest references, and graph explanations.

## 5. Competitor Documentation Lessons

| Reference project | Docs strength | Docs weakness | What NeedleStart should learn | What NeedleStart should avoid |
| --- | --- | --- | --- | --- |
| [Next.js](https://nextjs.org/docs) | Clear Getting Started, Guides, and API Reference lanes. | Large surface can be hard to scan across App/Pages history. | Use simple top-level lanes and exact API reference pages. | Letting historical modes make new users unsure which path to follow. |
| [Astro](https://docs.astro.build/en/getting-started/) | Beginner-friendly tutorials, recipes, and contributor-friendly docs culture. | Some feature depth is spread across guide and reference pages. | Use recipes for task workflows and make docs contribution easy. | Hiding exact contracts inside prose guides only. |
| [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/overview) | Strong typed-router positioning and modern full-stack concepts. | Younger docs surface than mature frameworks. | Be explicit about app contracts and typed route graph. | Under-documenting deployment and operational details early. |
| [TanStack Router](https://tanstack.com/router/latest/docs/overview) | Excellent type-safety and route-as-contract framing. | Advanced concepts can feel dense for beginners. | Make route graph concepts precise and API-backed. | Making app-graph docs too abstract before examples exist. |
| [React Router](https://reactrouter.com/) / [Remix](https://v2.remix.run/docs/guides/api-routes/) | Strong route-module mental model and open governance signal. | Transition history can confuse users about product boundaries. | Explain route modules and governance clearly. | Ambiguous migration/version messaging. |
| [Vite](https://vite.dev/config/) | Concise guide/config/reference split and exact config examples. | Not a full app framework, so app-level guidance is limited. | Keep config reference exact and compact. | Mixing framework vision into low-level reference pages. |
| [SvelteKit](https://svelte.dev/docs/kit) | Detailed file conventions and routing reference. | Dense pages can overwhelm first-time users. | File conventions need their own exact page. | Making one page carry tutorial, concept, and API reference at once. |
| [Nuxt](https://nuxt.com/docs/4.x/getting-started/introduction) | Strong directory-structure docs, deployment breadth, and convention clarity. | Module ecosystem can expand navigation quickly. | Document directory structure and adapters early. | Letting plugin/module growth obscure the core path. |
| [Supabase](https://supabase.com/docs) | Product-oriented docs lanes: Start, Products, Build, Manage, Reference, Resources. | Very broad platform surface requires heavy navigation. | Segment audiences by job and product surface. | Over-broad navigation before the product exists. |
| [Stripe](https://docs.stripe.com/) and [Stripe API Reference](https://docs.stripe.com/api) | Deep API reference, quickstarts, versioning, sandbox/test-mode clarity. | Payment domain complexity requires many cross-links. | Treat APIs, versions, examples, and test modes as first-class. | Performance or safety claims without test environments and evidence. |
| [Vercel](https://vercel.com/docs) and [Build Output API](https://vercel.com/docs/build-output-api) | Deployment docs connect guides, APIs, build output, and platform concepts. | Platform breadth can blur framework-neutral guidance. | Document adapter/build output contracts precisely. | Tying NeedleStart docs too tightly to one host. |
| [Open Source Guides](https://opensource.guide/leadership-and-governance/) | Clear governance questions and role framing. | General advice needs project-specific translation. | Define maintainer roles, escalation, and decision records. | Leaving governance implicit until conflict appears. |

See `docs/documentation-research.md` for project-by-project notes.

## 6. Audience Analysis

| Audience | What they need | Current state | Priority improvement |
| --- | --- | --- | --- |
| New users | Honest status, quick start, simple mental model. | Getting-started page now exists but app creation remains planned. | Add beginner tutorial after app creation and the default starter are verified. |
| App developers | Routing, config, SEO, API, deployment, examples. | Reference homes now exist; implementation absent. | Fill guides as features land. |
| Framework contributors | Architecture, package map, tasks, tests. | Strong. | Add task-level acceptance criteria and testing docs. |
| Maintainers | Governance, release, security, review process. | Added initial governance/security/release homes. | Define maintainer roles before public launch. |
| AI agents | AGENTS, stable JSON, safe edit rules, package boundaries. | Strong early foundation, with a planned machine-readable docs contract. | Implement and validate generated docs indexes once the docs pipeline exists. |
| Security reviewers | Threat model, high-risk areas, reporting path. | High-risk areas documented; policy added. | Add threat-model docs per high-risk feature. |
| Open source program reviewers | License, conduct, governance, security, contribution path. | License exists; conduct/governance/security added. | Add maintainer and release policy detail. |
| Future website visitors | Public positioning, examples, comparisons. | Early. | Build website content map and public docs readiness checks. |

## 7. Documentation Information Architecture Review

The desired IA is:

- Start Here: README, status, getting started, roadmap.
- Learn: guides, examples, file conventions, routing.
- Reference: CLI, config, APIs, manifests, generated files, adapters.
- Concepts: architecture, compiler IR, runtime, Needle Map, Agent Kernel, SEO, safe edits.
- Operations: deployment, testing, benchmarks, release, security, governance.
- Community: contributing, code of conduct, open source community, decisions.
- Agent Docs: AGENTS, skills, subagents, MCP, safe edit transactions, machine-readable outputs.

## 8. Website-Readiness Review

Current docs are useful as source material but not yet a complete public docs site. Public pages need frontmatter, audience labels, status labels, page descriptions, and a navigation map. `docs/public-docs.md` and `docs/website-content-map.md` should become the bridge from repo docs to website content.

## 9. Contributor-Readiness Review

Contributor direction is strong for architecture and Phase 1. Missing pieces are issue labels, review ownership, release expectations, and exact feature-specific testing commands once package behavior exists.

## 10. Maintainer-Readiness Review

Maintainer docs need governance, release, security intake, decision records, and benchmark approval rules. This pass adds initial homes, but they need detail as implementation starts.

## 11. Agent-Readiness Review

Agent readiness is a differentiator. The docs already define stable JSON expectations, safe edit rules, graph edge requirements, AI playbooks, and the planned `docs-index.json`, `llms.txt`, and `llms-full.txt` outputs. The next step is to implement deterministic generation, validation, and real output examples once the docs pipeline exists.

## 12. Missing Docs

Before this pass, requested docs missing from the repo included code of conduct, governance, security policy, status, product strategy, open source community, CLI, config, routing, manifest contracts, deployment, testing, API routes, schema, cache, benchmarks, benchmark methodology, accessibility, public docs, website content map, comparisons, examples, compatibility, release, app graph visual, and prompts.

## 13. Duplicated Or Confusing Docs

- `docs/skills/` and `docs/subagents/` are the canonical AI collaboration playbooks; do not add root mirrors.
- Runtime package naming previously mixed `@needle/server-bun` and adapter packages; current docs now prefer adapter package names.

## 14. Docs That Should Be Split

- `README.md` should stay concise; deeper setup and status belong in `docs/getting-started.md` and `docs/status.md`.
- `docs/api-reference.md` should eventually split into `docs/cli.md`, `docs/config.md`, helper APIs, and manifest contracts.
- `docs/needle-map.md` may later split graph model, query API, contracts, and generated JSON reference.

## 15. Docs That Should Be Merged

- Keep AI collaboration playbooks in `docs/skills/` and `docs/subagents/`; link them from root docs instead of duplicating them at the repository root.
- Benchmark content should eventually merge around methodology plus raw-results folders rather than scattered claims.

## 16. Docs That Need Diagrams

- Compiler pipeline.
- Request lifecycle.
- Generated artifact flow.
- Needle Map layered extraction.
- Safe edit transaction lifecycle.
- MCP read/write safety path.
- Adapter build output path.

## 17. Docs That Need Examples

- `needle.config.ts`.
- File-based routing.
- Metadata and SEO.
- API routes.
- Hot API routes.
- Needle Map query output.
- Agent context capsules.
- Safe edit transaction JSON.
- Adapter manifest.

## 18. Docs That Need Status Warnings

All planned feature docs should carry status warnings until code exists. This includes CLI, config, routing, deployment, API routes, schema, cache, MCP, safe edits, and benchmarks.

## 19. Docs That Need Better Cross-Links

- README should link status, getting started, guides, reference, and governance/security before public launch.
- Docs hub should remain the canonical navigation source.
- Architecture docs should link package map, compiler IR, runtime contract, and adapters.
- Safe edit docs should link MCP and Agent Kernel docs.
- Benchmark docs should link performance and methodology.

## 20. Highest-Impact Improvements

| Improvement | Impact | Effort | Urgency |
| --- | --- | --- | --- |
| Keep docs status-aware with implemented/planned/scaffolded/verified labels. | High | Low | Immediate |
| Add missing governance/security/release/testing docs. | High | Medium | Immediate |
| Create exact CLI/config/routing/manifest references. | High | Medium | Phase 1 |
| Add machine-readable docs index and llms output plan. | High | Medium | Phase 1-2 |
| Add public website content map. | Medium | Low | Early docs foundation |
| Add benchmark methodology before any speed claims. | High | Low | Before benchmarks |
| Add examples after create-command support and fixture layout exist. | High | Medium | Phase 1-2 |

## Doc-By-Doc Improvement Matrix

The table below summarizes the highest-signal findings. The complete matrix is maintained in `docs/documentation-matrix.md`.

| File | Audience | Current quality | Main problem | Recommended fix | Priority | Effort | Website-ready? | Agent-ready? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `README.md` | All | Strong | Too much planning detail for future website homepage | Keep concise; link deeper docs | High | Low | Partial | Partial |
| `VISION.md` | Maintainers, contributors | Strong | Some claims are aspirational | Add status framing if surfaced publicly | Medium | Low | Partial | Yes |
| `ARCHITECTURE.md` | Contributors | Strong | Dense for beginners | Add diagrams and links | Medium | Medium | No | Yes |
| `AGENTS.md` | AI agents | Strong | Needs updates as commands become real | Keep synced with scaffold | High | Low | No | Yes |
| `CONTRIBUTING.md` | Contributors | Good | Lacks governance/security/release links | Link new governance docs | High | Low | Partial | Partial |
| `CODE_OF_CONDUCT.md` | Community | New | Needs maintainer contact when ready | Add private contact before launch | High | Low | Partial | Partial |
| `GOVERNANCE.md` | Maintainers | New | Lightweight | Expand roles before public launch | High | Medium | Partial | Partial |
| `SECURITY.md` | Security reviewers | New | No private intake yet | Add contact and supported versions after release | High | Low | Partial | Partial |
| `docs/status.md` | All | New | Must stay current | Update every phase change | High | Low | Yes | Yes |
| `docs/README.md` | All | Good | Navigation still early | Keep as canonical docs hub | High | Low | Yes | Yes |
| `docs/documentation-standard.md` | Writers, agents | Good | Needs examples as docs grow | Add frontmatter examples later | High | Low | No | Yes |
| `docs/docs-maintenance-checklist.md` | Maintainers, agents | New | Needs enforcement in PR template | Add PR template later | High | Low | No | Yes |
| `docs/getting-started.md` | New users | Good planned page | No working app yet | Replace planned flow with verified tutorial after app creation exists | High | Medium | Partial | Yes |
| `docs/guides.md` | App developers | Good planned index | No implemented guide content | Fill per feature | High | High | Partial | Partial |
| `docs/api-reference.md` | Developers, agents | Good planned index | Needs split references | Split as APIs stabilize | High | Medium | Partial | Yes |
| `docs/file-conventions.md` | Developers, agents | Good planned reference | Needs implementation evidence | Add diagnostics and tests later | High | Medium | Partial | Yes |
| `docs/phase-1-build-plan.md` | Contributors | Strong | Only covers Phase 1 | Keep scoped | High | Low | No | Yes |
| `docs/roadmap.md` | Maintainers | Strong | Long | Add status table later | Medium | Low | Partial | Yes |
| `docs/task-backlog.md` | Contributors | Strong | Large linear list | Move tasks to issues later | Medium | Medium | No | Yes |
| `docs/package-map.md` | Contributors | Strong | Package names and entrypoints are scaffolded; behavior remains planned | Update when package boundaries or behavior change | High | Low | No | Yes |
| `docs/compiler-ir.md` | Contributors, agents | Strong | Needs schema version examples | Add manifest contracts | High | Medium | No | Yes |
| `docs/runtime-contract.md` | Contributors | Good | Needs adapter test expectations | Link deployment/testing docs | Medium | Low | No | Yes |
| `docs/adapters.md` | Contributors, deployers | Good | Needs deployment guide | Link deployment and compatibility | Medium | Low | Partial | Partial |
| `docs/needle-map.md` | Contributors, agents | Strong | Needs visual examples | Add diagrams and fixtures | High | Medium | Partial | Yes |
| `docs/agent-kernel.md` | Agents | Strong | Needs schemas | Add stable JSON schema references | High | Medium | No | Yes |
| `docs/mcp-server.md` | Agents | Good | Needs tool schemas | Add exact schemas as implemented | High | Medium | No | Yes |
| `docs/safe-edit-transactions.md` | Maintainers, agents | Strong | Needs threat tests | Add security test plan | High | Medium | No | Yes |
| `docs/seo-engine.md` | App developers | Good | Needs guide examples | Add route examples after implementation | Medium | Medium | Partial | Partial |
| `docs/hot-api-path.md` | Advanced developers | Good | Needs benchmark methodology link | Link benchmarks | Medium | Low | Partial | Partial |
| `docs/performance.md` | Maintainers | Good | Claims need methodology | Link benchmark methodology | High | Low | Partial | Partial |
| `docs/migration.md` | Adopters | Good | Needs compatibility table | Link compatibility/comparisons | Medium | Low | Partial | Partial |
| `docs/prototype-acceptance.md` | Maintainers | Good | Needs status warning | Add when public-facing | Medium | Low | No | Yes |
| `docs/glossary.md` | All | Basic | Sparse | Expand as APIs land | Low | Low | Yes | Yes |
| `docs/decisions/*` | Maintainers | Good | Need more ADRs as direction changes | Keep using ADR template | Medium | Low | No | Yes |
| `docs/templates/*` | Contributors | Good | Could include docs task template | Add docs template later | Low | Low | No | Yes |
| `docs/skills/*` and `docs/subagents/*` | AI agents | Good | Canonical docs-side playbooks | Keep linked from README, AGENTS, and docs hub | Medium | Low | No | Yes |
| Requested but newly scaffolded reference docs | All | New | Need content as implementation lands | Fill by phase | High | Medium | Partial | Partial |

## Proposed Final Documentation Architecture

README structure:

- Product promise.
- Current status.
- Quick start.
- Why NeedleStart.
- Core concepts.
- Documentation links.
- Contributing/security/governance links.

Docs website navigation:

- Start: Introduction, Status, Installation, Project Structure.
- Learn: Routing, Rendering, SEO, API Routes, Needle Map, Agent Workflows.
- Guides: Task walkthroughs.
- Reference: CLI, Config, File Conventions, APIs, Manifests, JSON Schemas.
- Deploy: Bun, Node, Static, adapter capabilities.
- Compare: Next.js, TanStack, Astro, SvelteKit, Nuxt.
- Community: Contributing, Governance, Security, Releases.

Contributor docs:

- Contributing, task template, ADR template, package map, testing, status, backlog.

Maintainer docs:

- Governance, release, security, benchmark methodology, decision records.

Agent docs:

- AGENTS, docs skills, docs subagents, MCP, safe edits, agent context, stable JSON schemas.

Reference docs:

- CLI, config, routing, file conventions, helpers, manifests, generated files.

Examples docs:

- Basic app, blog SEO, ecommerce, dashboard, agent demo, large app fixture.

Benchmark docs:

- Methodology, fixtures, raw results, comparison rules, environment metadata.

Release and governance docs:

- Release process, support policy, security policy, maintainer roles, code of conduct.

Public website pages:

- Homepage, docs landing, why app graph, SEO, agents, comparisons, examples, roadmap, community.

Future generated docs outputs:

- `llms.txt`.
- `llms-full.txt`.
- `docs-index.json`.
- Manifest schema references.
- Route context capsule examples.
- API reference generated from source comments where useful.

## Implementation Plan

### Phase A: Immediate Cleanup

Goal: make status, navigation, governance, and safety obvious.

Files: README, AGENTS, docs hub, status, governance, security, conduct, checklist.

Acceptance criteria: new contributor can identify current project status and next task without chat history.

Risks: adding too many placeholders. Keep each page explicit about planned status.

Verification: link check and status-language search.

### Phase B: Clarity And Linking

Goal: connect all existing architecture docs into beginner, contributor, maintainer, and agent paths.

Files: docs hub, getting started, guides, API reference, file conventions, package map.

Acceptance criteria: each major doc has audience, status, and related links.

Risks: duplicated content. Prefer links over repeated explanations.

Verification: docs hub review and local link checker.

### Phase C: Public Website Readiness

Goal: prepare docs to become website content.

Files: public docs, website content map, comparisons, examples, accessibility.

Acceptance criteria: public pages are status-aware and avoid unverified claims.

Risks: marketing hype before implementation. Keep vision separate from current behavior.

Verification: search for unsupported performance or implementation claims.

### Phase D: Contributor And Maintainer Polish

Goal: make open source operations credible.

Files: contributing, governance, release, security, testing, task templates.

Acceptance criteria: contributors know how to propose work; maintainers know how to review and release.

Risks: process overhead too early. Keep early governance lightweight.

Verification: dry-run a contributor path from README to task template.

### Phase E: AI-Agent And Machine-Readable Docs

Goal: make agent context exact and stable.

Files: AGENTS, agent kernel, MCP, safe edits, manifest contracts, docs index plan.

Acceptance criteria: every agent-facing output has schema-versioned JSON examples.

Risks: agents trusting planned behavior. Status labels must stay visible.

Verification: stable JSON examples and generated-file rules.

### Phase F: Examples, Benchmark, And Launch Docs

Goal: support credible adoption.

Files: examples, benchmarks, benchmark methodology, deployment, compatibility, comparisons.

Acceptance criteria: every benchmark claim links to raw data and methodology.

Risks: misleading comparisons. Compare specific workflows, not generic framework identity.

Verification: benchmark methodology checklist.

### Phase G: Long-Term Docs Maintenance System

Goal: prevent docs decay.

Files: docs maintenance checklist, PR templates, docs index, generated reference.

Acceptance criteria: feature changes update docs as part of definition of done.

Risks: manual sync burden. Generate docs where possible after package APIs and schema-owned outputs exist.

Verification: use `bun run docs:check` and `bun run check` for documentation changes in the current scaffold.

## Final PR Summary Draft

What changed:

- Added documentation strategy audit and competitor lessons.
- Added status, governance, security, code of conduct, and maintenance checklist scaffolds.
- Added public docs lanes for getting started, guides, API reference, and file conventions.
- Added Phase 1 build plan and adapter package clarification.

Why it matters:

- Contributors can understand the current state and next implementation path.
- Maintainers have governance and safety homes before public growth.
- AI agents have clearer routing to stable contracts and safe workflows.
- Future public website content has a source structure.

Audiences that benefit:

- New users, app developers, framework contributors, maintainers, AI agents, security reviewers, open source reviewers, and future website visitors.

Competitor lessons applied:

- Next.js-style getting started/guides/API reference lanes.
- Astro-style task guide culture.
- Vite-style precise config reference.
- Stripe-style API/reference and versioning discipline.
- Vercel-style build output and deployment contract thinking.
- Open source governance guidance from Open Source Guides.

Current verification gate:

- `git diff --check`.
- `bun run docs:check`.
- `bun run structure:check`.
- `bun run performance:check`.
- `bun run typecheck`.
- `bun test`.
- `bun run check`.

The automated gate verifies the current documentation, scaffold structure, performance-claim hygiene, TypeScript surface, and scaffold tests. It does not prove framework runtime behavior, generated manifests, adapters, MCP tools, safe edits, or benchmark results.

Remaining follow-up work:

- Fill each new reference home as implementation lands.
- Add docs frontmatter when the public docs site exists.
- Add PR templates and generated docs index.
- Add raw benchmark result storage once benchmark commands exist.

## Research Sources

- Next.js docs: <https://nextjs.org/docs>
- Astro docs: <https://docs.astro.build/>
- TanStack Start docs: <https://tanstack.com/start/latest/docs/framework/react/overview>
- TanStack Router docs: <https://tanstack.com/router/latest/docs/framework/react/overview>
- React Router docs: <https://reactrouter.com/>
- Remix docs: <https://v2.remix.run/docs>
- Vite docs: <https://vite.dev/>
- SvelteKit docs: <https://svelte.dev/docs/kit>
- Nuxt docs: <https://nuxt.com/docs>
- Supabase docs: <https://supabase.com/docs>
- Stripe docs: <https://docs.stripe.com/>
- Vercel docs: <https://vercel.com/docs>
- Open Source Guides governance: <https://opensource.guide/leadership-and-governance/>
