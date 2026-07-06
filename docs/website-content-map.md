# Website Content Map

This document maps NeedleStart repository docs to a future public website structure.

The website does not exist yet. This map keeps public docs, source-of-truth docs, community pages, and future navigation aligned before implementation begins.

## Goals

- Plan the public docs information architecture.
- Identify which repo docs should become website pages.
- Keep public pages status-aware.
- Avoid publishing raw internal process as primary user documentation.
- Make open source contribution and governance paths visible.
- Prepare the docs site to dogfood NeedleStart later.
- Prepare public docs, previews, demos, and benchmark reports for Vercel hosting where appropriate.

## Proposed Website Structure

```txt
/
  Home
/docs
  Start Here
  Framework
  SEO
  Agent-Native
  Reference
  Guides
  Contributing
/benchmarks
  Overview
  Methodology
  Results
  Raw Data
  Reproduce
/comparisons
  Overview
  Next.js
  Astro
  TanStack Start
/community
  Open Source
  Contributing
  Code of Conduct
  Governance
  Security
/security
  Policy
  Threat Model
```

## Top-Level Pages

| Website page | Source | Status | Notes |
| --- | --- | --- | --- |
| `/` | `README.md`, `VISION.md` | planned | Product landing page. |
| `/docs` | `docs/README.md` | drafted | Docs index. |
| `/docs/status` | `docs/status.md` | drafted | Public status page, possibly simplified. |
| `/community` | `docs/open-source-community.md`, `CONTRIBUTING.md` | drafted | Open source community landing page. |
| `/security` | `SECURITY.md`, `docs/security.md` | drafted | Security policy plus threat model summary. |
| `/benchmarks` | `docs/benchmarks.md` | drafted | Benchmark overview and current availability. |
| `/comparisons` | `docs/comparisons.md` | drafted | Honest comparison index. |

## Docs Navigation

### Start Here

| Label | Source | Website slug | Public role |
| --- | --- | --- | --- |
| Introduction | `README.md`, `VISION.md` | `/docs/introduction` | Explain product and category. |
| Quick Start | `README.md`, future create app docs | `/docs/quick-start` | First app path once verified. |
| Project Status | `docs/status.md` | `/docs/status` | Show planned vs implemented truth. |
| Philosophy | `VISION.md` | `/docs/philosophy` | Explain why graph and agents are core. |
| Open Source | `docs/open-source-community.md` | `/community/open-source` | Explain open source posture, hosting intent, and community growth. |

### Framework

| Label | Source | Website slug | Public role |
| --- | --- | --- | --- |
| Routing | `docs/routing.md` | `/docs/routing` | App routes, layouts, params, route groups. |
| Render Modes | `docs/runtime-contract.md`, `docs/compiler-ir.md` | `/docs/render-modes` | Static, prerender, SSR, stream, client-only, API, hot API. |
| Configuration | `docs/config.md` | `/docs/config` | `needle.config.ts`. |
| API Routes | `docs/api-routes.md` | `/docs/api-routes` | API handlers and response behavior. |
| Schema DSL | `docs/schema.md` | `/docs/schema` | Validation and serialization. |
| Cache | `docs/cache.md` | `/docs/cache` | Cache plans, tags, headers. |
| Deployment | `docs/deployment.md` | `/docs/deployment` | Bun, Node, static output, and later adapter paths. |
| Compatibility | `docs/compatibility.md` | `/docs/compatibility` | Runtime and contract compatibility. |

### SEO

| Label | Source | Website slug | Public role |
| --- | --- | --- | --- |
| SEO Engine | `docs/seo-engine.md` | `/docs/seo` | Metadata, sitemap, robots, audits. |
| Accessibility | `docs/accessibility.md` | `/docs/accessibility` | Semantic HTML and diagnostics. |
| Performance | `docs/performance.md` | `/docs/performance` | Budgets and reports. |

### Agent-Native

| Label | Source | Website slug | Public role |
| --- | --- | --- | --- |
| Needle Map | `docs/needle-map.md` | `/docs/needle-map` | Graph model and affected queries. |
| Agent Kernel | `docs/agent-kernel.md` | `/docs/agent-kernel` | Context capsules and agent workflow. |
| MCP Server | `docs/mcp-server.md` | `/docs/mcp` | MCP tools and resources. |
| Safe Edits | `docs/safe-edit-transactions.md` | `/docs/safe-edits` | Transaction safety and rollback. |
| Frontier Skills Prompt | `docs/prompts/frontier-skills-subagents-prompt.md` | `/docs/agent-skills-prompt` | Portable skills/subagents builder prompt. |

### Reference

| Label | Source | Website slug | Public role |
| --- | --- | --- | --- |
| CLI | `docs/cli.md` | `/docs/cli` | Commands, flags, JSON, exit codes. |
| Manifest Contracts | `docs/manifest-contracts.md` | `/docs/manifests` | Generated JSON contracts. |
| Runtime Contract | `docs/runtime-contract.md` | `/docs/runtime` | Runtime inputs and behavior. |
| Adapter Architecture | `docs/adapters.md` | `/docs/adapters` | Adapter boundaries. |
| Package Map | `docs/package-map.md` | `/docs/packages` | Contributor-oriented package boundaries. |
| Diagnostics | `docs/cli.md`, `docs/manifest-contracts.md` | `/docs/diagnostics` | Diagnostic code reference later. |

### Guides

| Label | Source | Website slug | Public role |
| --- | --- | --- | --- |
| Examples | `docs/examples.md` | `/docs/examples` | Example app strategy and future examples. |
| Migration | `docs/migration.md` | `/docs/migration` | Migration from Next.js. |
| Prototype Demo | `docs/prototype-acceptance.md` | `/docs/prototype-demo` | Wedge demo path. |
| Benchmarks | `docs/benchmarks.md`, `docs/benchmark-methodology.md` | `/benchmarks` | Methodology and results. |

### Contributing

| Label | Source | Website slug | Public role |
| --- | --- | --- | --- |
| Open Source Community | `docs/open-source-community.md` | `/community/open-source` | Community posture, Vercel readiness, and impact metrics. |
| Contributing | `CONTRIBUTING.md` | `/community/contributing` | Contribution flow. |
| Code of Conduct | `CODE_OF_CONDUCT.md` | `/community/code-of-conduct` | Community standards. |
| Governance | `GOVERNANCE.md` | `/community/governance` | Maintainer and decision process. |
| Testing | `docs/testing.md` | `/docs/testing` | Test strategy. |
| Release Policy | `docs/release.md` | `/docs/release` | Versioning and verification. |
| Security | `SECURITY.md`, `docs/security.md` | `/security` | Vulnerability reporting and threat model. |

## Benchmarks Section

Proposed benchmark pages:

| Page | Source | Purpose |
| --- | --- | --- |
| `/benchmarks` | `docs/benchmarks.md` | Overview and current benchmark status. |
| `/benchmarks/methodology` | `docs/benchmark-methodology.md` | Fairness rules and reproducibility. |
| `/benchmarks/results` | future generated reports | Human-readable benchmark results. |
| `/benchmarks/raw-data` | future `benchmarks/results/raw/*` | Raw JSON/CSV data links. |
| `/benchmarks/reproduce` | `docs/benchmark-methodology.md` | Commands to rerun benchmarks. |

Every public benchmark result must include:

- Date.
- Commit SHA.
- Environment.
- Framework versions.
- Fixture source links.
- Commands run.
- Raw data link.
- Known limitations.
- "What this benchmark does not prove" section.

## Community Section

Proposed community pages:

| Page | Source | Purpose |
| --- | --- | --- |
| `/community` | `docs/open-source-community.md` | Open source landing page. |
| `/community/open-source` | `docs/open-source-community.md` | Open source posture and Vercel readiness. |
| `/community/contributing` | `CONTRIBUTING.md` | Contribution flow. |
| `/community/code-of-conduct` | `CODE_OF_CONDUCT.md` | Community standards. |
| `/community/governance` | `GOVERNANCE.md` | Maintainer and decision process. |
| `/community/roadmap` | `docs/roadmap.md`, `docs/status.md` | Public roadmap and status. |

The community section should make it easy for reviewers, contributors, and users to see that NeedleStart is open source, governed in public, and serious about community standards.

## Comparison Pages

Proposed comparison pages:

| Page | Source | Purpose |
| --- | --- | --- |
| `/comparisons` | `docs/comparisons.md` | Comparison overview and rules. |
| `/comparisons/nextjs` | `docs/comparisons.md`, future page | Compare to Next.js. |
| `/comparisons/astro` | `docs/comparisons.md`, future page | Compare to Astro. |
| `/comparisons/tanstack-start` | `docs/comparisons.md`, future page | Compare to TanStack Start. |

Each comparison page must include:

- What NeedleStart aims to do better.
- What the other framework does better.
- When to choose the other framework.
- Current implementation status.
- Benchmark links only when raw data exists.

## Website Dogfood Requirements

Once NeedleStart can build the website, the docs site should demonstrate:

- Static route generation.
- SEO metadata.
- Sitemap and robots.
- Structured data.
- Accessibility diagnostics.
- Public search index.
- `llms.txt` and `llms-full.txt`.
- Generated route manifest.
- Needle Map for docs pages.
- Community pages.
- Benchmark pages from raw data.
- Vercel preview deployments for docs and examples where appropriate.

## Website Build Outputs

Future website builds should emit:

```txt
dist/
  public/
    sitemap.xml
    robots.txt
    llms.txt
    llms-full.txt
  docs-index.json
  docs-search.json
  benchmark-results.json
  community-index.json
```

Exact paths should be decided when the website app exists.

## Vercel Hosting Plan

The public website should be suitable for Vercel hosting:

- production docs site
- pull request previews
- example and demo previews
- benchmark report pages

This plan supports open source collaboration and review. It must not become a claim that NeedleStart apps can only deploy to Vercel.

## Documentation Rule

Update this map when:

- A new public doc is added.
- Website nav changes.
- A doc becomes internal-only.
- Community pages are added.
- Benchmark pages are added.
- Comparison pages are split into dedicated docs.
- The website app is scaffolded.
- Vercel hosting or preview strategy changes.
