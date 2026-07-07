import {
  BookOpen,
  Boxes,
  Compass,
  FileCode2,
  GitBranch,
  Rocket,
  ShieldCheck,
  TerminalSquare,
  Users,
  Workflow,
} from "lucide-react";
import type { ComponentType } from "react";
import { getPublicDocsMarkdown } from "./public-docs-source";

export type DocsStatus = "Current" | "Implemented" | "Scaffolded" | "Planned";

export type DocsArticle = {
  slug: string;
  href: string;
  lane: string;
  title: string;
  description: string;
  status: DocsStatus;
  source: string;
  icon: ComponentType<{ "aria-hidden"?: boolean; size?: number; className?: string }>;
  sections: Array<{
    title: string;
    body: string;
  }>;
  markdown?: string;
  links: Array<{
    label: string;
    href: string;
  }>;
  related?: string[];
};

export type PublicDocsPage = {
  slug: string;
  href: string;
  lane: string;
  title: string;
  description: string;
  status: DocsStatus;
  source: string;
  related: string[];
};

const laneIcons: Record<string, DocsArticle["icon"]> = {
  Start: TerminalSquare,
  Product: Compass,
  Concepts: GitBranch,
  Guides: BookOpen,
  Reference: FileCode2,
  Deployment: ShieldCheck,
  Community: Users,
  Comparisons: Workflow,
};

export const docsArticles: DocsArticle[] = [
  {
    slug: "start",
    href: "/docs/start",
    lane: "Start",
    title: "Getting Started",
    description: "Use the current scaffold commands without confusing them for the future published create-app flow.",
    status: "Current",
    source: "docs/getting-started.md",
    icon: TerminalSquare,
    sections: [
      {
        title: "What works today",
        body: "The local checkout can install with Bun, discover routes, inspect route evidence, build static output, and start built HTML through the Bun adapter. Package publication and the public create command are still planned.",
      },
      {
        title: "Recommended first read",
        body: "Start with the repository status, then route discovery, render modes, and generated manifests. Those pages define the verified scaffold before broader framework behavior appears.",
      },
      {
        title: "Proof before claims",
        body: "Every command shown in public docs should either be backed by the current repository checks or clearly marked as target behavior until the implementation lands.",
      },
    ],
    links: [
      { label: "MVP Alpha scope", href: "/docs/guides/create-app" },
      { label: "Examples", href: "/examples" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    slug: "concepts",
    href: "/docs/concepts",
    lane: "Concepts",
    title: "Concepts",
    description: "Understand the product ideas behind app-graph-native routing, SEO-safe defaults, and agent-safe workflows.",
    status: "Scaffolded",
    source: "docs/public/concepts/*",
    icon: Compass,
    sections: [
      {
        title: "The app graph is the product",
        body: "Lumina treats routes, files, render modes, generated artifacts, and future semantic contracts as a graph that humans and agents can inspect.",
      },
      {
        title: "Static first, explicit later",
        body: "The current implementation proves static pages and early SSR boundaries. Future render modes stay planned until fixtures and generated manifests prove them.",
      },
      {
        title: "Agents read evidence",
        body: "Agent workflows should depend on compiler output and source contracts instead of broad repository guessing.",
      },
    ],
    links: [
      { label: "App graph", href: "/docs/concepts/app-graph" },
      { label: "Lumina Map", href: "/docs/reference/routing" },
      { label: "Agent-safe workflows", href: "/docs/community" },
    ],
  },
  {
    slug: "concepts/app-graph",
    href: "/docs/concepts/app-graph",
    lane: "Concepts",
    title: "App Graph",
    description: "The route and file relationship model that makes a Lumina app explain itself.",
    status: "Current",
    source: "docs/lumina-map.md",
    icon: GitBranch,
    sections: [
      {
        title: "Route evidence",
        body: "The implemented map connects discovered routes to source files and direct local imports with stable edge metadata.",
      },
      {
        title: "Semantic contracts",
        body: "Higher-confidence component, API, schema, cache, ownership, and risk edges remain planned. Docs should name them as planned until implementation and tests exist.",
      },
      {
        title: "Human and agent use",
        body: "The graph is meant to answer what changed, which routes are affected, and why a route renders the way it does.",
      },
    ],
    links: [
      { label: "Routing reference", href: "/docs/reference/routing" },
      { label: "CLI reference", href: "/docs/reference/cli" },
      { label: "Manifest contracts", href: "/docs/reference/manifest-contracts" },
    ],
  },
  {
    slug: "guides",
    href: "/docs/guides",
    lane: "Guides",
    title: "Guides",
    description: "Task-oriented public docs for creating apps, adding pages, reading the map, and staying honest about planned APIs.",
    status: "Planned",
    source: "docs/public/guides/*",
    icon: BookOpen,
    sections: [
      {
        title: "Guides should be task-shaped",
        body: "Each guide should teach one job, link to the exact reference contract, and avoid hiding incomplete behavior behind polished copy.",
      },
      {
        title: "Create app remains target UX",
        body: "The public create flow is planned. Current local setup uses repository commands until package publication and starter generation exist.",
      },
      {
        title: "Examples prove the path",
        body: "Guides should link to verified fixtures when they exist and use planned labels for examples that are still scaffold-only.",
      },
    ],
    links: [
      { label: "Create app", href: "/docs/guides/create-app" },
      { label: "Examples", href: "/examples" },
      { label: "Reference", href: "/docs/reference" },
    ],
  },
  {
    slug: "guides/create-app",
    href: "/docs/guides/create-app",
    lane: "Guides",
    title: "Create An App",
    description: "The public starter path Lumina is building toward, separated from the commands that work in this repo today.",
    status: "Planned",
    source: "docs/public/guides/create-app.md",
    icon: Rocket,
    sections: [
      {
        title: "Target developer flow",
        body: "The intended public flow is bun create lumina, then dev, build, and start scripts inside the generated app. That command is not published yet.",
      },
      {
        title: "Current local equivalent",
        body: "Use the repository commands to inspect apps/www and examples/basic while the create package remains planned.",
      },
      {
        title: "Readiness gate",
        body: "This guide should become current only after starter generation, package scripts, route discovery, build, start, and generated artifact evidence all pass.",
      },
    ],
    links: [
      { label: "Getting started", href: "/docs/start" },
      { label: "Examples", href: "/examples" },
      { label: "MVP scope", href: "/roadmap" },
    ],
  },
  {
    slug: "reference",
    href: "/docs/reference",
    lane: "Reference",
    title: "Reference",
    description: "Contract-first documentation for CLI output, routing, manifests, config, adapters, security, and performance.",
    status: "Scaffolded",
    source: "docs/*-contract.md",
    icon: FileCode2,
    sections: [
      {
        title: "Reference pages define exact contracts",
        body: "Reference docs should name fields, commands, manifests, generated files, status values, and diagnostics without marketing language.",
      },
      {
        title: "Implemented versus planned",
        body: "Current references include implemented route discovery, render manifests, map output, dev/build/start slices, and many planned contracts.",
      },
      {
        title: "Machine-readable later",
        body: "The future docs renderer should expose reference metadata to docs-index.json, llms.txt, and llms-full.txt after parser support exists.",
      },
    ],
    links: [
      { label: "CLI", href: "/docs/reference/cli" },
      { label: "Routing", href: "/docs/reference/routing" },
      { label: "Manifest contracts", href: "/docs/reference/manifest-contracts" },
    ],
  },
  {
    slug: "reference/cli",
    href: "/docs/reference/cli",
    lane: "Reference",
    title: "CLI Reference",
    description: "Implemented local commands and planned automation surfaces for route, inspect, map, build, start, and bench workflows.",
    status: "Current",
    source: "docs/cli.md",
    icon: TerminalSquare,
    sections: [
      {
        title: "Implemented command slice",
        body: "The repository verifies routes, inspect, inspect why, map affected, dev, build, start, and benchmark listing commands through Bun scripts and tests.",
      },
      {
        title: "JSON contract discipline",
        body: "Agent-facing CLI output should stay compact, deterministic, schema-versioned where applicable, and documented before automation depends on it.",
      },
      {
        title: "Planned command surface",
        body: "Broader check, test, seo, workspace, agent, mcp, edit, migrate, and benchmark execution commands remain target behavior.",
      },
    ],
    links: [
      { label: "Routing", href: "/docs/reference/routing" },
      { label: "Getting started", href: "/docs/start" },
      { label: "Benchmarks", href: "/benchmarks" },
    ],
  },
  {
    slug: "reference/routing",
    href: "/docs/reference/routing",
    lane: "Reference",
    title: "Routing",
    description: "File routes, route IDs, params, route groups, diagnostics, and current fixture coverage.",
    status: "Current",
    source: "docs/routing-contract.md",
    icon: Workflow,
    sections: [
      {
        title: "Route discovery",
        body: "Lumina currently discovers page routes from app/page.tsx files, supports nested static routes, dynamic segments, catch-all segments, route groups, and layouts.",
      },
      {
        title: "Generated contracts",
        body: "Route discovery writes .lumina/routes.json, render information writes .lumina/render-manifest.json, and the early map writes .lumina/map.json.",
      },
      {
        title: "Future routing work",
        body: "API routes, broader render modes, cache plans, SEO diagnostics, and richer map relationships stay planned until contract-specific tests land.",
      },
    ],
    links: [
      { label: "Manifest contracts", href: "/docs/reference/manifest-contracts" },
      { label: "App graph", href: "/docs/concepts/app-graph" },
      { label: "Guides", href: "/docs/guides" },
    ],
  },
  {
    slug: "reference/manifest-contracts",
    href: "/docs/reference/manifest-contracts",
    lane: "Reference",
    title: "Manifest Contracts",
    description: "Generated file names, source inputs, deployment copies, and planned schema-versioned artifacts.",
    status: "Current",
    source: "docs/manifest-contracts.md",
    icon: Boxes,
    sections: [
      {
        title: "Current generated artifacts",
        body: "The current app slice emits route, render, map, build trace, performance report, routes manifest, render manifest, and adapter manifest files.",
      },
      {
        title: "Production runtime boundary",
        body: "The Bun adapter serves built output from dist/public and generated server artifacts instead of rediscovering source route files on each request.",
      },
      {
        title: "Planned artifacts",
        body: "SEO reports, cache reports, graph expansions, context capsules, workspace graph, and safe-edit mutation logs remain planned unless implementation evidence exists.",
      },
    ],
    links: [
      { label: "CLI", href: "/docs/reference/cli" },
      { label: "Routing", href: "/docs/reference/routing" },
      { label: "Deployment", href: "/docs/deployment" },
    ],
  },
  {
    slug: "deployment",
    href: "/docs/deployment",
    lane: "Operations",
    title: "Deployment And Operations",
    description: "Adapter boundaries, build output, compatibility, benchmark honesty, and launch-readiness checks.",
    status: "Scaffolded",
    source: "docs/deployment.md",
    icon: ShieldCheck,
    sections: [
      {
        title: "Adapter-aware output",
        body: "The verified path builds static output and adapter manifests, then serves built files through @lumina/adapter-bun.",
      },
      {
        title: "Compatibility stays evidence-based",
        body: "Node, static, edge, worker, and API production behavior must stay planned until implementation and fixture coverage prove them.",
      },
      {
        title: "Operations need proof",
        body: "Release, security, benchmark, and compatibility pages should cite exact checks or raw evidence before public claims move beyond target behavior.",
      },
    ],
    links: [
      { label: "Benchmarks", href: "/benchmarks" },
      { label: "Reference", href: "/docs/reference" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    slug: "community",
    href: "/docs/community",
    lane: "Community",
    title: "Community",
    description: "Contribution, governance, review discipline, public launch readiness, and agent collaboration rules.",
    status: "Scaffolded",
    source: "docs/open-source-community.md",
    icon: Users,
    sections: [
      {
        title: "Contributors work from contracts",
        body: "Human and AI contributors use the same docs, checks, and review gates. Planned behavior should not be presented as implemented.",
      },
      {
        title: "Review is evidence-first",
        body: "Changes need clear scope, source-of-truth docs, appropriate tests, and explicit remaining follow-up when a feature is still planned.",
      },
      {
        title: "Public launch is not just polish",
        body: "The docs site needs navigation, accessibility review, maintainer contact paths, and verified user-facing behavior before launch readiness.",
      },
    ],
    links: [
      { label: "About", href: "/about" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Docs start", href: "/docs/start" },
    ],
  },
];

export const publicDocsPages: PublicDocsPage[] = [
  {
    slug: "concepts/agent-native",
    href: "/docs/concepts/agent-native",
    lane: "Concepts",
    title: "Agent-Safe Workflows",
    description: "How Lumina plans to give agents stable context, guarded edits, and explicit evidence instead of repository-wide guessing.",
    status: "Planned",
    source: "docs/public/concepts/agent-native.md",
    related: ["docs/agent-kernel.md", "docs/safe-edit-transactions.md"],
  },
  {
    slug: "concepts/app-graph",
    href: "/docs/concepts/app-graph",
    lane: "Concepts",
    title: "Your App Ships With A Map",
    description: "The public concept page for Lumina Map, route relationships, source evidence, and future semantic graph expansion.",
    status: "Planned",
    source: "docs/public/concepts/app-graph.md",
    related: ["docs/lumina-map.md", "docs/app-graph-visual.md"],
  },
  {
    slug: "concepts/compiler-runtime",
    href: "/docs/concepts/compiler-runtime",
    lane: "Concepts",
    title: "Compiler And Runtime Split",
    description: "Why Lumina keeps intelligence in the compiler and keeps production runtime paths small and adapter-aware.",
    status: "Planned",
    source: "docs/public/concepts/compiler-runtime.md",
    related: ["ARCHITECTURE.md", "docs/runtime-contract.md"],
  },
  {
    slug: "concepts/safe-edits",
    href: "/docs/concepts/safe-edits",
    lane: "Concepts",
    title: "Safe Edits",
    description: "The planned edit transaction model for previewable, logged, check-backed, and reversible AI-assisted changes.",
    status: "Planned",
    source: "docs/public/concepts/safe-edits.md",
    related: ["docs/safe-edit-transactions.md", "docs/threat-model.md"],
  },
  {
    slug: "concepts/seo-first",
    href: "/docs/concepts/seo-first",
    lane: "Concepts",
    title: "SEO-First Rendering",
    description: "The public explanation of static-first public HTML, metadata, audits, and future SEO report behavior.",
    status: "Planned",
    source: "docs/public/concepts/seo-first.md",
    related: ["docs/seo-contract.md", "docs/seo-engine.md"],
  },
  {
    slug: "concepts/speed",
    href: "/docs/concepts/speed",
    lane: "Concepts",
    title: "Whole-System Speed",
    description: "How Lumina frames speed across compiler output, route modes, payloads, adapters, and benchmark evidence.",
    status: "Planned",
    source: "docs/public/concepts/speed.md",
    related: ["docs/speed-strategy.md", "docs/performance-contract.md"],
  },
  {
    slug: "guides/agent-context",
    href: "/docs/guides/agent-context",
    lane: "Guides",
    title: "Use Agent Context",
    description: "A planned guide for reading route context capsules and agent-facing generated context safely.",
    status: "Planned",
    source: "docs/public/guides/agent-context.md",
    related: ["docs/agent-kernel.md", "docs/mcp-server.md"],
  },
  {
    slug: "guides/api-route",
    href: "/docs/guides/api-route",
    lane: "Guides",
    title: "Create An API Route",
    description: "A planned task guide for ordinary API route handlers, request behavior, diagnostics, and security boundaries.",
    status: "Planned",
    source: "docs/public/guides/api-route.md",
    related: ["docs/api-route-contract.md", "docs/api-routes.md"],
  },
  {
    slug: "guides/create-app",
    href: "/docs/guides/create-app",
    lane: "Guides",
    title: "Create An App",
    description: "The future public starter flow, separated from the local repository commands that work today.",
    status: "Planned",
    source: "docs/public/guides/create-app.md",
    related: ["docs/getting-started.md", "docs/mvp-alpha-scope.md"],
  },
  {
    slug: "guides/hot-api",
    href: "/docs/guides/hot-api",
    lane: "Guides",
    title: "Create A Hot API Route",
    description: "A planned guide for generated validation, serialization, micro-cache behavior, and hot API route boundaries.",
    status: "Planned",
    source: "docs/public/guides/hot-api.md",
    related: ["docs/hot-api-path.md", "docs/schema-contract.md"],
  },
  {
    slug: "guides/lumina-map",
    href: "/docs/guides/lumina-map",
    lane: "Guides",
    title: "Inspect Lumina Map",
    description: "How developers and agents should use map output, affected-route queries, and route relationship evidence.",
    status: "Planned",
    source: "docs/public/guides/lumina-map.md",
    related: ["docs/lumina-map.md", "docs/app-graph-visual.md"],
  },
  {
    slug: "guides/seo-metadata",
    href: "/docs/guides/seo-metadata",
    lane: "Guides",
    title: "Add SEO Metadata",
    description: "A planned guide for defining public metadata and keeping SEO behavior evidence-backed.",
    status: "Planned",
    source: "docs/public/guides/seo-metadata.md",
    related: ["docs/seo-contract.md", "docs/public/reference/seo.md"],
  },
  {
    slug: "guides/static-page",
    href: "/docs/guides/static-page",
    lane: "Guides",
    title: "Add A Static Page",
    description: "A task guide for the static-first path that the current scaffold is beginning to prove.",
    status: "Planned",
    source: "docs/public/guides/static-page.md",
    related: ["docs/routing-contract.md", "docs/file-conventions.md"],
  },
  {
    slug: "reference/accessibility",
    href: "/docs/reference/accessibility",
    lane: "Reference",
    title: "Accessibility",
    description: "Planned accessibility contract coverage for framework-owned HTML, public docs UI, keyboard behavior, and diagnostics.",
    status: "Planned",
    source: "docs/public/reference/accessibility.md",
    related: ["docs/accessibility-contract.md", "docs/accessibility.md"],
  },
  {
    slug: "reference/adapters",
    href: "/docs/reference/adapters",
    lane: "Reference",
    title: "Adapters",
    description: "Adapter package boundaries, current Bun adapter evidence, deployment manifests, and planned runtime compatibility.",
    status: "Implemented",
    source: "docs/public/reference/adapters.md",
    related: ["docs/adapter-contract.md", "docs/adapters.md"],
  },
  {
    slug: "reference/api-routes",
    href: "/docs/reference/api-routes",
    lane: "Reference",
    title: "API Routes",
    description: "Planned API route handler contracts, methods, diagnostics, schemas, and security expectations.",
    status: "Planned",
    source: "docs/public/reference/api-routes.md",
    related: ["docs/api-route-contract.md", "docs/api-routes.md"],
  },
  {
    slug: "reference/cache",
    href: "/docs/reference/cache",
    lane: "Reference",
    title: "Cache",
    description: "Planned cache modes, headers, tags, revalidation, micro-cache behavior, diagnostics, and security notes.",
    status: "Planned",
    source: "docs/public/reference/cache.md",
    related: ["docs/cache-contract.md", "docs/cache.md"],
  },
  {
    slug: "reference/cli",
    href: "/docs/reference/cli",
    lane: "Reference",
    title: "CLI Reference",
    description: "Implemented local commands and planned automation surfaces for route, inspect, map, build, start, and bench workflows.",
    status: "Scaffolded",
    source: "docs/public/reference/cli.md",
    related: ["docs/cli.md", "docs/cli-json-contract.md"],
  },
  {
    slug: "reference/config",
    href: "/docs/reference/config",
    lane: "Reference",
    title: "Configuration Reference",
    description: "Planned normalized config fields, environment behavior, validation diagnostics, and generated output rules.",
    status: "Planned",
    source: "docs/public/reference/config.md",
    related: ["docs/config-contract.md", "docs/config.md"],
  },
  {
    slug: "reference/diagnostics",
    href: "/docs/reference/diagnostics",
    lane: "Reference",
    title: "Diagnostics",
    description: "Planned diagnostic code, severity, location, remediation, and JSON-output contracts.",
    status: "Planned",
    source: "docs/public/reference/diagnostics.md",
    related: ["docs/diagnostics-contract.md", "docs/cli-json-contract.md"],
  },
  {
    slug: "reference/examples",
    href: "/docs/reference/examples",
    lane: "Reference",
    title: "Examples",
    description: "Example fixture inventory, current verification status, and planned starter/example catalog behavior.",
    status: "Planned",
    source: "docs/public/reference/examples.md",
    related: ["docs/examples-contract.md", "docs/examples-catalog.md"],
  },
  {
    slug: "reference/file-conventions",
    href: "/docs/reference/file-conventions",
    lane: "Reference",
    title: "File Conventions",
    description: "App file naming, route grammar, planned conventions, and generated artifact boundaries.",
    status: "Planned",
    source: "docs/public/reference/file-conventions.md",
    related: ["docs/file-conventions.md", "docs/routing-contract.md"],
  },
  {
    slug: "reference/manifest-contracts",
    href: "/docs/reference/manifest-contracts",
    lane: "Reference",
    title: "Manifest Contracts",
    description: "Generated route, render, map, build, performance, and adapter artifacts plus planned future reports.",
    status: "Planned",
    source: "docs/public/reference/manifest-contracts.md",
    related: ["docs/manifest-contracts.md", "docs/runtime-contract.md"],
  },
  {
    slug: "reference/mcp",
    href: "/docs/reference/mcp",
    lane: "Reference",
    title: "MCP Reference",
    description: "The planned Model Context Protocol read and write tool surface for Lumina agents.",
    status: "Planned",
    source: "docs/public/reference/mcp.md",
    related: ["docs/mcp-server.md", "docs/agent-kernel.md"],
  },
  {
    slug: "reference/performance",
    href: "/docs/reference/performance",
    lane: "Reference",
    title: "Performance",
    description: "Performance budgets, reports, benchmark evidence rules, Core Web Vitals targets, and public claim gates.",
    status: "Planned",
    source: "docs/public/reference/performance.md",
    related: ["docs/performance-contract.md", "docs/benchmark-methodology.md"],
  },
  {
    slug: "reference/project-structure",
    href: "/docs/reference/project-structure",
    lane: "Reference",
    title: "Project Structure",
    description: "The planned app, package, generated-file, and documentation structure for Lumina projects.",
    status: "Planned",
    source: "docs/public/reference/project-structure.md",
    related: ["docs/package-map.md", "docs/product-build-readiness.md"],
  },
  {
    slug: "reference/render-modes",
    href: "/docs/reference/render-modes",
    lane: "Reference",
    title: "Render Modes",
    description: "Current static and SSR helper evidence plus planned prerender, stream, client-only, API, and hot API modes.",
    status: "Implemented",
    source: "docs/public/reference/render-modes.md",
    related: ["docs/runtime-contract.md", "docs/api-reference.md"],
  },
  {
    slug: "reference/routing",
    href: "/docs/reference/routing",
    lane: "Reference",
    title: "Routing",
    description: "Route discovery, route IDs, params, layouts, diagnostics, fixture evidence, and planned route behavior.",
    status: "Planned",
    source: "docs/public/reference/routing.md",
    related: ["docs/routing-contract.md", "docs/routing.md"],
  },
  {
    slug: "reference/schema",
    href: "/docs/reference/schema",
    lane: "Reference",
    title: "Schema",
    description: "Planned schema helpers, validation results, query coercion, OpenAPI mapping, and diagnostics.",
    status: "Planned",
    source: "docs/public/reference/schema.md",
    related: ["docs/schema-contract.md", "docs/schema.md"],
  },
  {
    slug: "reference/security",
    href: "/docs/reference/security",
    lane: "Reference",
    title: "Security",
    description: "Security-sensitive surfaces, threat model gates, production error rules, agent-write controls, and evidence expectations.",
    status: "Planned",
    source: "docs/public/reference/security.md",
    related: ["docs/security-contract.md", "docs/threat-model.md"],
  },
  {
    slug: "reference/seo",
    href: "/docs/reference/seo",
    lane: "Reference",
    title: "SEO",
    description: "Planned metadata helpers, canonical URLs, sitemap and robots behavior, structured data, and SEO diagnostics.",
    status: "Planned",
    source: "docs/public/reference/seo.md",
    related: ["docs/seo-contract.md", "docs/seo-engine.md"],
  },
  {
    slug: "reference/testing",
    href: "/docs/reference/testing",
    lane: "Reference",
    title: "Testing",
    description: "Test layers, fixture layout, browser checks, snapshot policy, network rules, and evidence reporting.",
    status: "Planned",
    source: "docs/public/reference/testing.md",
    related: ["docs/testing-contract.md", "docs/testing.md"],
  },
  {
    slug: "deployment/benchmarks",
    href: "/docs/deployment/benchmarks",
    lane: "Deployment",
    title: "Benchmark Honesty",
    description: "How Lumina should publish benchmark evidence without synthetic or unsupported speed claims.",
    status: "Planned",
    source: "docs/public/deployment/benchmarks.md",
    related: ["docs/benchmark-methodology.md", "docs/benchmarks.md"],
  },
  {
    slug: "deployment/overview",
    href: "/docs/deployment/overview",
    lane: "Deployment",
    title: "Deployment Overview",
    description: "Planned deployment guidance across Bun, Node, static output, adapters, compatibility, and launch gates.",
    status: "Planned",
    source: "docs/public/deployment/overview.md",
    related: ["docs/deployment.md", "docs/compatibility.md"],
  },
  {
    slug: "community/contributing",
    href: "/docs/community/contributing",
    lane: "Community",
    title: "Contributing",
    description: "How contributors should work through documented contracts, checks, review expectations, and status honesty.",
    status: "Planned",
    source: "docs/public/community/contributing.md",
    related: ["CONTRIBUTING.md", "docs/first-contribution.md"],
  },
  {
    slug: "community/governance",
    href: "/docs/community/governance",
    lane: "Community",
    title: "Governance",
    description: "Public governance expectations, maintainer accountability, release discipline, and community rules.",
    status: "Planned",
    source: "docs/public/community/governance.md",
    related: ["GOVERNANCE.md", "CODE_OF_CONDUCT.md"],
  },
  {
    slug: "community/overview",
    href: "/docs/community/overview",
    lane: "Community",
    title: "Community",
    description: "The public community overview for contribution paths, governance, review, and launch readiness.",
    status: "Planned",
    source: "docs/public/community/overview.md",
    related: ["docs/open-source-community.md", "docs/operating-cadence.md"],
  },
  {
    slug: "comparisons/overview",
    href: "/docs/comparisons/overview",
    lane: "Comparisons",
    title: "Comparisons",
    description: "A planned comparison surface that explains Lumina fit and tradeoffs without unsupported competitor claims.",
    status: "Planned",
    source: "docs/public/comparisons/overview.md",
    related: ["docs/comparisons.md", "docs/documentation-research.md"],
  },
];

const navLinksByHref = new Map<string, DocsArticle | PublicDocsPage>();

for (const article of docsArticles) {
  navLinksByHref.set(article.href, article);
}

for (const page of publicDocsPages) {
  navLinksByHref.set(page.href, page);
}

function navLinksForLane(title: string): Array<DocsArticle | PublicDocsPage> {
  return [...navLinksByHref.values()].filter(
    (item) =>
      item.lane === title ||
      (title === "Start" && item.slug === "start") ||
      (title === "Deployment" && item.lane === "Operations"),
  );
}

export const docsNavGroups: Array<{ title: string; links: Array<DocsArticle | PublicDocsPage> }> = [
  {
    title: "Start",
    links: navLinksForLane("Start"),
  },
  {
    title: "Concepts",
    links: navLinksForLane("Concepts"),
  },
  {
    title: "Guides",
    links: navLinksForLane("Guides"),
  },
  {
    title: "Reference",
    links: navLinksForLane("Reference"),
  },
  {
    title: "Deployment",
    links: navLinksForLane("Deployment"),
  },
  {
    title: "Community",
    links: navLinksForLane("Community"),
  },
  {
    title: "Comparisons",
    links: navLinksForLane("Comparisons"),
  },
];

export function getAdjacentDocsLinks(href: string): {
  previous?: { label: string; href: string };
  next?: { label: string; href: string };
} {
  const seen = new Set<string>();
  const orderedLinks = docsNavGroups
    .flatMap((group) => group.links)
    .filter((link) => {
      if (seen.has(link.href)) return false;
      seen.add(link.href);
      return true;
    });
  const index = orderedLinks.findIndex((link) => link.href === href);
  if (index === -1) return {};

  const previous = orderedLinks[index - 1];
  const next = orderedLinks[index + 1];
  return {
    previous: previous ? { label: previous.title, href: previous.href } : undefined,
    next: next ? { label: next.title, href: next.href } : undefined,
  };
}

export function getDocsArticle(slug: string): DocsArticle {
  const article = docsArticles.find((candidate) => candidate.slug === slug);
  if (!article) {
    throw new Error(`Unknown docs article: ${slug}`);
  }
  return article;
}

export function findPublicDocsPage(slug: string): PublicDocsPage | undefined {
  return publicDocsPages.find((page) => page.slug === slug);
}

export function createPublicDocsArticle(page: PublicDocsPage): DocsArticle {
  const markdown = getPublicDocsMarkdown(page.slug)?.markdown;
  const siblingLinks = publicDocsPages
    .filter((candidate) => candidate.lane === page.lane && candidate.href !== page.href)
    .slice(0, 3)
    .map((candidate) => ({ label: candidate.title, href: candidate.href }));

  return {
    slug: page.slug,
    href: page.href,
    lane: page.lane,
    title: page.title,
    description: page.description,
    status: page.status,
    source: page.source,
    icon: laneIcons[page.lane] ?? FileCode2,
    markdown,
    sections: markdown
      ? []
      : [
          {
            title: "Public page role",
            body: page.description,
          },
          {
            title: "Current website behavior",
            body: "This route is rendered from the website's public-docs metadata inventory. A Markdown source snapshot is missing for this page, so only the route metadata is shown.",
          },
          {
            title: "Source-of-truth links",
            body: `Related source docs: ${page.related.join(", ")}.`,
          },
        ],
    links: siblingLinks.length
      ? siblingLinks
      : [
          { label: "Docs home", href: "/docs" },
          { label: "Reference", href: "/docs/reference" },
          { label: "Roadmap", href: "/roadmap" },
        ],
    related: page.related,
  };
}
