# Documentation Improvement Matrix

Status: Draft.

Audience: maintainers, documentation contributors, AI agents.

This matrix evaluates the current documentation system file by file. It uses the format required by the documentation audit objective.

| File | Audience | Current quality | Main problem | Recommended fix | Priority | Effort | Website-ready? | Agent-ready? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `README.md` | All | Strong | Broad and still planning-heavy | Keep concise; route detail to docs hub | High | Low | Partial | Partial |
| `VISION.md` | Maintainers, contributors | Strong | Aspirational language could be mistaken for current product if copied public | Add status framing when surfaced on website | Medium | Low | Partial | Yes |
| `ARCHITECTURE.md` | Contributors | Strong | Dense and mostly internal | Add diagrams and link beginner docs | Medium | Medium | No | Yes |
| `AGENTS.md` | AI agents | Strong | Must track commands and package changes closely | Keep required-docs list current | High | Low | No | Yes |
| `CONTRIBUTING.md` | Contributors | Good | Needs enforcement through PR template | Link and use checklist | High | Low | Partial | Partial |
| `CODE_OF_CONDUCT.md` | Community | Good initial | No private contact yet | Add contact before public launch | High | Low | Partial | Partial |
| `GOVERNANCE.md` | Maintainers | Good planned | Area ownership is not real yet | Convert planned roles to real roles as contributors emerge | High | Medium | Partial | Partial |
| `SECURITY.md` | Security reviewers | Good planned | No vulnerability intake contact yet | Add private contact before release | High | Low | Partial | Partial |
| `docs/README.md` | All | Strong | Large navigation may grow unwieldy | Group by docs lanes as site evolves | High | Medium | Yes | Yes |
| `docs/status.md` | All | Strong | Must be updated with every phase change | Make status update part of PR template | High | Low | Yes | Yes |
| `docs/product-strategy.md` | Maintainers, website visitors | Basic | Thin strategic framing | Add market wedge and non-goals after implementation starts | Medium | Medium | Partial | Partial |
| `docs/engineering-standards.md` | Maintainers, contributors, agents | Strong planned | Needs continued enforcement through review | Keep PR template and governance aligned | High | Low | Partial | Yes |
| `docs/operating-cadence.md` | Maintainers, contributors, agents | Good planned | Needs use once implementation starts | Apply at phase boundaries and releases | Medium | Low | Partial | Yes |
| `docs/open-source-community.md` | Contributors, reviewers | Basic | Thin community operations | Add issue triage and discussion policy | Medium | Medium | Partial | Partial |
| `docs/roadmap.md` | Maintainers, contributors | Strong | Long phase list | Add status table or split later | Medium | Medium | Partial | Yes |
| `docs/task-backlog.md` | Contributors | Strong | Large linear backlog | Move active work to issues later | Medium | Medium | No | Yes |
| `docs/package-map.md` | Contributors, agents | Strong | Package names and entrypoints are scaffolded; behavior remains planned | Update when package boundaries or behavior change | High | Low | No | Yes |
| `docs/phase-1-build-plan.md` | Contributors | Strong | Only covers first scaffold phase | Keep scoped; create Phase 2 plan later | High | Low | No | Yes |
| `docs/product-build-readiness.md` | Maintainers, contributors, agents | New | Must be kept aligned with build phases | Use as the first gate before expanding implementation scope | High | Low | Partial | Yes |
| `docs/getting-started.md` | New users | Good planned | App creation commands do not work yet; repository checks do | Replace with verified tutorial after app creation exists | High | Medium | Partial | Yes |
| `docs/guides.md` | App developers | Good index | No real guide bodies yet | Fill as features land | High | High | Partial | Partial |
| `docs/api-reference.md` | Developers, agents | Good index | Needs exact API contracts later | Split into generated references as APIs stabilize | High | High | Partial | Yes |
| `docs/file-conventions.md` | Developers, agents | Good planned | Needs diagnostics and examples from implementation | Add verified route examples | High | Medium | Partial | Yes |
| `docs/cli.md` | Developers, agents | Good planned | No command implementation | Add syntax, exit codes, JSON after CLI exists | High | Medium | Partial | Yes |
| `docs/cli-json-contract.md` | CLI implementers, contributors, agents | New | Contract only until CLI exists | Convert envelope, diagnostics, and exit codes into snapshot and exit-code tests | High | Medium | No | Yes |
| `docs/diagnostics-contract.md` | Compiler, runtime, CLI, MCP, and agent implementers | New | Contract only until diagnostics exist | Convert codes, categories, locations, remediations, docs links, and deterministic JSON ordering into tests | High | Medium | Partial | Yes |
| `docs/config.md` | Developers, agents | Good planned | Defaults are not implemented | Add field table after config exists | High | Medium | Partial | Yes |
| `docs/config-contract.md` | Framework contributors, app developers, adapter maintainers, agents | New | Contract only until config loader exists | Convert loading, env, validation, normalized output, and secret checks into tests | High | Medium | Partial | Yes |
| `docs/routing.md` | Developers, agents | Good planned | Overview depends on deeper contract | Keep paired with `docs/routing-contract.md` and add fixture outputs after implementation | High | Medium | Partial | Yes |
| `docs/routing-contract.md` | Contributors, runtime adapter authors, app developers, agents | New | Contract only until route discovery exists | Convert route IDs, sorting, diagnostics, and fixture expectations into route-discovery tests | High | Medium | Partial | Yes |
| `docs/compiler-ir.md` | Contributors, agents | Strong | Needs schema version examples | Link and expand manifest contracts | High | Medium | No | Yes |
| `docs/manifest-contracts.md` | Contributors, agents | Good planned | Needs concrete schemas | Add schema-versioned JSON when generated | High | High | Partial | Yes |
| `docs/runtime-contract.md` | Runtime contributors | Good | Needs test mapping | Link adapter HTTP tests once available | Medium | Medium | No | Yes |
| `docs/adapters.md` | Deployers, contributors | Good planned | Overview depends on deeper contract | Keep paired with `docs/adapter-contract.md` and add capability tables from implementation | High | Medium | Partial | Partial |
| `docs/adapter-contract.md` | Adapter maintainers, runtime contributors, deployers, agents | New | Contract only until adapters exist | Convert inputs, outputs, manifest fields, capabilities, health endpoint, static export, diagnostics, and fixtures into adapter tests | High | Medium | Partial | Yes |
| `docs/deployment.md` | Deployers | Good planned | No runnable deployment flow | Add verified Bun/Node/static guides later | High | High | Partial | Partial |
| `docs/testing.md` | Contributors, maintainers | Good scaffold overview | Feature-specific test layers remain planned | Keep paired with `docs/testing-contract.md` as feature scripts land | High | Low | No | Yes |
| `docs/testing-contract.md` | Contributors, maintainers, CI authors, agents | New | Contract only until test tooling exists | Convert test layers, fixture layout, snapshots, CI gates, artifacts, browser rules, and evidence reporting into package scripts and CI | High | Medium | Partial | Yes |
| `docs/security.md` | Security reviewers, agents | Good planned | Overview depends on deeper contract | Keep paired with `docs/security-contract.md`; add feature-specific threat models as high-risk features land | High | Medium | Partial | Yes |
| `docs/security-contract.md` | Security reviewers, maintainers, contributors, agents | New | Planned until high-risk features exist | Convert threat model, secret handling, production errors, headers, advisory, and supply-chain evidence rules into implementation checks | High | Medium | Partial | Yes |
| `docs/needle-map.md` | Contributors, agents | Strong | Needs diagrams and fixtures | Add graph fixture examples | High | Medium | Partial | Yes |
| `docs/app-graph-visual.md` | All | Good planned | Visuals not produced yet | Add diagrams with text equivalents | Medium | Medium | Partial | Partial |
| `docs/agent-kernel.md` | Agents, contributors | Strong | Needs generated schema examples | Link machine-readable docs and schemas | High | Medium | No | Yes |
| `docs/mcp-server.md` | Agents | Good planned | Needs exact tool schemas | Add tool schemas as MCP lands | High | Medium | No | Yes |
| `docs/safe-edit-transactions.md` | Agents, security reviewers | Strong | Needs negative test plan | Add rejected-edit fixtures later | High | Medium | No | Yes |
| `docs/seo-engine.md` | App developers | Good planned | Overview depends on deeper contract | Keep paired with `docs/seo-contract.md` and add verified SEO examples later | High | Medium | Partial | Partial |
| `docs/seo-contract.md` | Contributors, app developers, runtime adapter authors, SEO reviewers, agents | New | Contract only until SEO system exists | Convert metadata merge, sitemap, robots, structured data, diagnostics, and report rules into implementation tests | High | Medium | Partial | Yes |
| `docs/api-routes.md` | App developers | Good planned | Overview depends on deeper contract | Keep paired with `docs/api-route-contract.md` and add verified handler examples later | High | Medium | Partial | Partial |
| `docs/api-route-contract.md` | Contributors, app developers, runtime adapter authors, security reviewers, agents | New | Contract only until API routes exist | Convert method exports, context shape, response normalization, diagnostics, cache defaults, and fixtures into implementation tests | High | Medium | Partial | Yes |
| `docs/schema.md` | Developers | Good planned | Overview depends on deeper contract | Keep paired with `docs/schema-contract.md` and add verified DSL examples later | High | Medium | Partial | Partial |
| `docs/schema-contract.md` | Contributors, API route authors, runtime adapter authors, agents | New | Contract only until schema package exists | Convert helpers, result shape, issue shape, coercion, serializers, OpenAPI mapping, diagnostics, and fixtures into tests | High | Medium | Partial | Yes |
| `docs/cache.md` | Developers, agents | Good planned | Overview depends on deeper contract | Keep paired with `docs/cache-contract.md` and add verified cache examples later | High | Medium | Partial | Yes |
| `docs/cache-contract.md` | Contributors, runtime adapter authors, performance reviewers, security reviewers, agents | New | Contract only until cache system exists | Convert cache modes, headers, tags, revalidation, micro-cache, diagnostics, manifests, and fixtures into implementation tests | High | Medium | Partial | Yes |
| `docs/performance.md` | Maintainers | Good planned | Overview depends on deeper contract | Keep paired with `docs/performance-contract.md`; add verified report examples later | High | Low | Partial | Partial |
| `docs/performance-contract.md` | Contributors, performance reviewers, app developers, agents | New | Planned until performance tooling exists | Convert budgets, Core Web Vitals targets, perf reports, diagnostics, and benchmark evidence into implementation checks | High | Medium | Partial | Yes |
| `docs/speed-decisions.md` | Contributors, runtime authors, compiler authors, performance reviewers, agents | New | Decisions are planned until implementation proves them | Keep current with Vite/Rolldown, Bun, React streaming, resource hints, hot APIs, caching, compiler scaling, rejected defaults, and benchmark evidence | High | Medium | Partial | Yes |
| `docs/speed-capability-audit.md` | Maintainers, performance reviewers, agents | New | Audit is docs-level until implementation evidence exists | Keep every major speed surface mapped to a decision, source docs, proof gate, and follow-up evidence | High | Low | Partial | Yes |
| `docs/speed-strategy.md` | Contributors, maintainers, agents | Strong planned | Needs benchmark evidence as implementation lands | Keep speed gates tied to tasks, performance contract, and benchmarks | High | Medium | Partial | Yes |
| `docs/benchmarks.md` | Maintainers | Good planned | No raw results | Add results folder after benchmarks exist | High | Medium | Partial | Partial |
| `docs/benchmark-methodology.md` | Maintainers | Strong planned | Needs fixtures and raw data format later | Add example result file later | High | Medium | Partial | Partial |
| `docs/accessibility.md` | Docs maintainers | Good planned | Overview depends on deeper contract | Keep paired with `docs/accessibility-contract.md`; expand with verified examples later | High | Medium | Partial | Partial |
| `docs/accessibility-contract.md` | App developers, docs maintainers, QA reviewers, agents | New | Planned until tooling and examples exist | Convert WCAG target, semantic HTML, keyboard, focus, forms, diagnostics, and evidence rules into implemented checks | High | Medium | Partial | Yes |
| `docs/public-docs.md` | Website editors | Good planned | No docs-site system yet | Add frontmatter once parser exists | Medium | Medium | Partial | Partial |
| `docs/public-docs-site-architecture.md` | Docs site builders, maintainers, agents | New | Renderer not chosen yet | Use as the contract for metadata, routes, navigation, and machine-readable outputs | High | Medium | Partial | Yes |
| `docs/public/*` | Future website visitors, app developers, agents | Good planned | Public content is source-ready but not site-rendered | Keep concise, status-aware, and linked to source docs | High | Medium | Partial | Partial |
| `docs/public/reference/project-structure.md` | App developers, contributors, agents | New | Repository scaffold is documented; generated app output remains planned | Replace target app structure with verified generated app output after app creation exists | High | Low | Partial | Yes |
| `docs/public/reference/diagnostics.md` | App developers, contributors, agents | New | Public summary only until diagnostics exist | Replace planned examples with verified diagnostic output after CLI/checks land | High | Low | Partial | Yes |
| `docs/public/reference/adapters.md` | Deployers, app developers, adapter maintainers, agents | New | Public summary only until adapters exist | Replace planned output with verified adapter behavior after adapter fixtures land | High | Low | Partial | Yes |
| `docs/public/reference/routing.md` | App developers, agents | New | Public summary only until route discovery exists | Replace planned examples with verified fixture output after route discovery lands | High | Low | Partial | Yes |
| `docs/public/reference/api-routes.md` | App developers, agents | New | Public summary only until API routes exist | Replace planned examples with verified API route behavior after PR 9 lands | High | Low | Partial | Yes |
| `docs/public/reference/schema.md` | App developers, agents | New | Public summary only until schema package exists | Replace planned helpers with verified schema API after PR 10 lands | High | Low | Partial | Yes |
| `docs/public/reference/cache.md` | App developers, agents | New | Public summary only until cache system exists | Replace planned examples with verified cache behavior after cache metadata baseline lands | High | Low | Partial | Yes |
| `docs/public/reference/seo.md` | App developers, SEO reviewers, agents | New | Public summary only until SEO system exists | Replace planned examples with verified SEO behavior after SEO audit lands | High | Low | Partial | Yes |
| `docs/public/reference/accessibility.md` | App developers, docs builders, agents | New | Public summary only until accessibility tooling exists | Replace planned checks with verified diagnostics and browser evidence after docs UI and examples land | High | Low | Partial | Yes |
| `docs/public/reference/security.md` | App developers, security reviewers, maintainers, agents | New | Public summary only until security-sensitive tooling exists | Replace planned rules with verified threat models, diagnostics, and release evidence after implementation lands | High | Low | Partial | Yes |
| `docs/public/reference/performance.md` | App developers, performance reviewers, agents | New | Public summary only until performance tooling exists | Replace planned targets with verified reports and benchmark evidence after tooling lands | High | Low | Partial | Yes |
| `docs/public/reference/testing.md` | Contributors, app developers, agents | New | Public summary includes scaffold checks; feature test tooling remains planned | Replace target fixture, HTTP, and browser commands with verified scripts as they land | High | Low | Partial | Yes |
| `docs/website-content-map.md` | Website editors | Good planned | Needs detailed nav groups later | Expand during site build | Medium | Medium | Partial | Partial |
| `docs/comparisons.md` | Website visitors | Good planned | No comparison pages yet | Add source-cited comparisons after implementation | Medium | High | Partial | Partial |
| `docs/examples.md` | App developers | Good planned | No examples exist | Keep paired with `docs/examples-contract.md`; add example READMEs when examples are scaffolded | High | High | Partial | Partial |
| `docs/examples-contract.md` | App developers, contributors, agents | New | Planned until examples exist | Convert planned statuses and evidence rules into real fixture checks | High | Medium | Partial | Yes |
| `docs/public/reference/examples.md` | App developers, agents | New | Public summary only until examples exist | Link verified examples after create command and fixtures exist | High | Low | Partial | Yes |
| `docs/compatibility.md` | Deployers | Good planned | No compatibility evidence yet | Add evidence table as tests land | High | Medium | Partial | Partial |
| `docs/release.md` | Maintainers | Good planned | No release tooling yet | Add changelog and release workflow later | High | Medium | Partial | Partial |
| `docs/versioning-and-upgrades.md` | Maintainers, contributors, app developers, agents | New | Policy only until releases exist | Convert into real upgrade guides, deprecation policy, and docs versioning after public package releases exist | High | Medium | Partial | Yes |
| `docs/glossary.md` | All | Basic | Sparse | Expand with API terms as they land | Low | Low | Yes | Yes |
| `docs/documentation-standard.md` | Docs contributors, agents | Strong | Needs enforcement | Enforce through PR template | High | Low | No | Yes |
| `docs/docs-freshness-policy.md` | Maintainers, contributors, agents | Strong planned | Needs continued use in PRs | Keep update triggers current as project changes | High | Low | No | Yes |
| `docs/docs-maintenance-checklist.md` | Maintainers, agents | Strong | Needs PR integration | Added PR template; keep current | High | Low | No | Yes |
| `docs/docs-verification.md` | Maintainers, contributors, agents | New | Scaffold scripts exist; some checks remain manual review | Expand generated index, claim, and anchor checks as docs tooling grows | High | Medium | No | Yes |
| `docs/documentation-audit.md` | Maintainers | Strong | Large and strategic | Keep as periodic audit artifact | Medium | Medium | No | Yes |
| `docs/documentation-research.md` | Docs contributors | Strong | Needs periodic refresh | Revisit before public launch | Medium | Medium | No | Partial |
| `docs/documentation-matrix.md` | Maintainers, agents | New | Must stay updated as docs change | Update during docs audits | Medium | Medium | No | Yes |
| `docs/machine-readable-docs.md` | Agents, contributors | Strong planned | Generated outputs do not exist | Implement with the docs index or public docs pipeline | High | Medium | No | Yes |
| `docs/maintainer-guide.md` | Maintainers | Good planned | Roles are not active yet | Convert planned roles into real maintainership later | High | Medium | Partial | Partial |
| `docs/decisions/*` | Maintainers | Good | Limited ADR set | Add ADRs for new architecture decisions | Medium | Low | No | Yes |
| `docs/templates/*` | Contributors | Good | Needs usage through PR template | Link from contributing and PR template | Medium | Low | No | Yes |
| `docs/prompts/*` | AI agents | Good planned | Prompt set is small | Add prompts for security/release/map reviews later | Medium | Medium | No | Yes |
| `docs/skills/*` | AI agents | Good | Canonical docs-side playbooks only | Keep linked from README, AGENTS, and docs hub | Medium | Low | No | Yes |
| `docs/subagents/*` | AI agents | Good | Canonical docs-side role briefs only | Keep linked from README, AGENTS, and docs hub | Medium | Low | No | Yes |
