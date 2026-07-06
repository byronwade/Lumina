import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const failures: string[] = [];

const requiredDocs = [
  "README.md",
  "AGENTS.md",
  "docs/README.md",
  "docs/status.md",
  "docs/phase-1-build-plan.md",
  "docs/package-map.md",
  "docs/docs-verification.md",
  "docs/review-checklist.md",
  "docs/threat-model.md",
  "docs/benchmark-fixtures.md",
  "docs/examples-catalog.md",
  "docs/docs-site-build-plan.md",
  "docs/checklists/README.md",
  "docs/decisions/README.md",
];

const requiredEntryLinks = [
  "docs/phase-1-build-plan.md",
  "docs/package-map.md",
  "docs/docs-verification.md",
  "docs/review-checklist.md",
  "docs/threat-model.md",
  "docs/benchmark-fixtures.md",
  "docs/examples-catalog.md",
  "docs/docs-site-build-plan.md",
];

const rootDocsWithMetadata = [
  "ARCHITECTURE.md",
  "CODE_OF_CONDUCT.md",
  "CONTRIBUTING.md",
  "GOVERNANCE.md",
  "SECURITY.md",
  "VISION.md",
];

const agentRequiredSyncDocs = [
  "README.md",
  "AGENTS.md",
  "CONTRIBUTING.md",
  "GOVERNANCE.md",
  "SECURITY.md",
  "CODE_OF_CONDUCT.md",
  "VISION.md",
  "ARCHITECTURE.md",
  "docs/README.md",
  "docs/status.md",
  "docs/roadmap.md",
  "docs/risk-mitigation.md",
  "docs/engineering-standards.md",
  "docs/package-map.md",
  "docs/documentation-standard.md",
  "docs/docs-freshness-policy.md",
  "docs/docs-maintenance-checklist.md",
  "docs/docs-verification.md",
  "docs/first-contribution.md",
  "docs/review-checklist.md",
  "docs/public-frontmatter-standard.md",
  "docs/getting-started.md",
  "docs/guides.md",
  "docs/api-reference.md",
  "docs/manifest-contracts.md",
  "docs/file-conventions.md",
  "docs/cli.md",
  "docs/testing-contract.md",
  "docs/testing.md",
  "docs/cli-json-contract.md",
  "docs/diagnostics-contract.md",
  "docs/config-contract.md",
  "docs/config.md",
  "docs/adapter-contract.md",
  "docs/adapters.md",
  "docs/examples-contract.md",
  "docs/examples-catalog.md",
  "docs/examples.md",
  "docs/routing-contract.md",
  "docs/routing.md",
  "docs/api-route-contract.md",
  "docs/api-routes.md",
  "docs/schema-contract.md",
  "docs/schema.md",
  "docs/cache-contract.md",
  "docs/cache.md",
  "docs/seo-contract.md",
  "docs/seo-engine.md",
  "docs/accessibility-contract.md",
  "docs/accessibility.md",
  "docs/security-contract.md",
  "docs/security.md",
  "docs/threat-model.md",
  "docs/performance-contract.md",
  "docs/performance.md",
  "docs/benchmark-fixtures.md",
  "docs/benchmark-methodology.md",
  "docs/benchmarks.md",
  "docs/runtime-contract.md",
  "docs/compiler-ir.md",
  "docs/agent-kernel.md",
  "docs/mcp-server.md",
  "docs/safe-edit-transactions.md",
  "docs/needle-map.md",
  "docs/hot-api-path.md",
  "docs/migration.md",
  "docs/deployment.md",
  "docs/compatibility.md",
  "docs/prototype-acceptance.md",
  "docs/app-graph-visual.md",
  "docs/product-strategy.md",
  "docs/open-source-community.md",
  "docs/operating-cadence.md",
  "docs/maintainer-guide.md",
  "docs/public-docs.md",
  "docs/public/README.md",
  "docs/public/docs.md",
  "docs/public/index.md",
  "docs/public/roadmap.md",
  "docs/website-content-map.md",
  "docs/machine-readable-docs.md",
  "docs/release.md",
  "docs/speed-decisions.md",
  "docs/speed-capability-audit.md",
  "docs/speed-strategy.md",
  "docs/public-docs-site-architecture.md",
  "docs/docs-site-build-plan.md",
  "docs/phase-1-build-plan.md",
  "docs/product-build-readiness.md",
  "docs/versioning-and-upgrades.md",
  "docs/decisions/README.md",
  "docs/checklists/README.md",
  "docs/checklists/phase-1-scaffold.md",
  "docs/checklists/adapter-implementation.md",
  "docs/checklists/performance-evidence.md",
  "docs/glossary.md",
  "docs/task-backlog.md",
  "docs/skills/README.md",
  "docs/subagents/README.md",
];

const packageSpecs = [
  { path: "packages/create-needle", name: "create-needle" },
  { path: "packages/cli", name: "@needle/cli" },
  { path: "packages/core", name: "@needle/core" },
  { path: "packages/compiler", name: "@needle/compiler" },
  { path: "packages/vite-plugin", name: "@needle/vite-plugin" },
  { path: "packages/react", name: "@needle/react" },
  { path: "packages/router", name: "@needle/router" },
  { path: "packages/seo", name: "@needle/seo" },
  { path: "packages/map", name: "@needle/map" },
  { path: "packages/agent", name: "@needle/agent" },
  { path: "packages/mcp", name: "@needle/mcp" },
  { path: "packages/cache", name: "@needle/cache" },
  { path: "packages/schema", name: "@needle/schema" },
  { path: "packages/devtools", name: "@needle/devtools" },
  { path: "packages/adapters/bun", name: "@needle/adapter-bun" },
  { path: "packages/adapters/node", name: "@needle/adapter-node" },
  { path: "packages/adapters/static", name: "@needle/adapter-static" },
];

const canonicalStatusLabels = [
  { title: "Draft.", definition: "Draft:", publicValue: "draft" },
  { title: "Proposed.", definition: "Proposed:", publicValue: "proposed" },
  { title: "Planned.", definition: "Planned:", publicValue: "planned" },
  { title: "Scaffolded.", definition: "Scaffolded:", publicValue: "scaffolded" },
  { title: "Implemented.", definition: "Implemented:", publicValue: "implemented" },
  { title: "Verified.", definition: "Verified:", publicValue: "verified" },
  { title: "Deprecated.", definition: "Deprecated:", publicValue: "deprecated" },
];

const allowedTopLevelStatuses = canonicalStatusLabels.map((status) => status.title);

const plannedNeedleCommands = [
  "needle dev",
  "needle build",
  "needle start",
  "needle routes",
  "needle inspect",
  "needle check",
  "needle seo",
  "needle map",
  "needle agent",
  "needle mcp",
  "needle edit",
  "needle migrate",
  "needle bench",
];

const plannedNeedleCommandDocs = [
  "README.md",
  "AGENTS.md",
  "docs/cli.md",
  "docs/api-reference.md",
  "docs/getting-started.md",
  "docs/package-map.md",
  "docs/public/reference/cli.md",
];

const plannedJsonCommandContracts = [
  "needle build --json",
  "needle routes --json",
  "needle inspect --json",
  "needle check --json",
  "needle seo --json",
  "needle map --json",
  "needle agent context --json",
  "needle edit --json",
  "needle migrate --json",
  "needle bench --json",
];

const plannedCommandVariants = [
  "needle inspect why",
  "needle map affected",
  "needle map explain",
  "needle agent context",
  "needle agent plan",
  "needle edit undo",
  "needle migrate from-next",
  "needle seo --route",
  "needle seo --sitemap",
  "needle seo --strict",
];

const plannedCommandVariantDocs = [
  "docs/cli.md",
  "docs/public/reference/cli.md",
];

const scaffoldVerificationCommands = [
  "bun test",
  "bun run typecheck",
  "bun run docs:check",
  "bun run structure:check",
  "bun run performance:check",
  "bun run check",
];

const scaffoldVerificationDocs = [
  "README.md",
  "AGENTS.md",
  "docs/phase-1-build-plan.md",
  "docs/roadmap.md",
  "docs/public/roadmap.md",
  "docs/checklists/phase-1-scaffold.md",
  "docs/task-backlog.md",
  "docs/testing.md",
  "docs/testing-contract.md",
  "docs/public/reference/testing.md",
  "docs/templates/task-template.md",
];

const canonicalGeneratedArtifacts = [
  ".needle/routes.json",
  ".needle/render-manifest.json",
  ".needle/map.json",
  ".needle/graph.json",
  ".needle/seo.report.json",
  ".needle/perf.report.json",
  ".needle/context/*.ctx.json",
  ".needle/context/agent-index.json",
  ".needle/mutations.json",
  ".needle/generated/*",
  "dist/routes.manifest.json",
  "dist/render.manifest.json",
  "dist/seo.report.json",
  "dist/adapter.manifest.json",
  "dist/*",
];

const generatedArtifactDocs = [
  "AGENTS.md",
  "docs/agent-kernel.md",
  "docs/api-reference.md",
  "docs/config-contract.md",
  "docs/examples-contract.md",
  "docs/getting-started.md",
  "docs/machine-readable-docs.md",
  "docs/manifest-contracts.md",
  "docs/runtime-contract.md",
  "docs/public/reference/config.md",
  "docs/public/reference/manifest-contracts.md",
  "docs/public/reference/project-structure.md",
];

const generatedArtifactRuleDocs = [
  "docs/api-reference.md",
  "docs/manifest-contracts.md",
  "docs/public/reference/manifest-contracts.md",
];

const machineReadableDocsContractDocs = [
  {
    file: "docs/machine-readable-docs.md",
    terms: ["llms.txt", "llms-full.txt", "docs-index.json", "schemaversion", "generatedat", "deterministic", "production runtime bundles"],
  },
  {
    file: "docs/agent-kernel.md",
    terms: ["llms.txt", "llms-full.txt", "docs-index.json", "schemaversion", "generatedat", "deterministic", "production runtime bundles"],
  },
  {
    file: "docs/mcp-server.md",
    terms: ["llms.txt", "llms-full.txt", "docs-index.json", "schemaversion", "generatedat", "deterministic", "production runtime bundles"],
  },
  {
    file: "docs/public-docs.md",
    terms: ["llms.txt", "llms-full.txt", "docs-index.json", "schemaversion", "generatedat", "deterministic", "production runtime bundles"],
  },
];

const publicDocsSiteContractDocs = [
  {
    file: "docs/public-docs-site-architecture.md",
    terms: ["frontmatter", "canonical", "docs-index.json", "llms.txt", "route mapping", "renderer", "public-frontmatter-standard", "docs-site-build-plan", "source links", "representative planned route mapping", "complete planned public navigation inventory"],
  },
  {
    file: "docs/public-frontmatter-standard.md",
    terms: ["frontmatter", "canonical", "docs-index.json", "llms.txt", "route rules", "source", "renderer", "metadata", "validation rules"],
  },
  {
    file: "docs/docs-site-build-plan.md",
    terms: ["frontmatter", "canonical", "docs-index.json", "llms.txt", "route mapping", "renderer", "source links", "deterministic"],
  },
  {
    file: "docs/public-docs.md",
    terms: ["frontmatter", "canonical", "docs-index.json", "llms.txt", "route mapping", "renderer", "source-of-truth", "website-content-map"],
  },
  {
    file: "docs/website-content-map.md",
    terms: ["frontmatter", "canonical", "docs-index.json", "llms.txt", "route mapping", "renderer", "source mapping", "public-frontmatter-standard"],
  },
  {
    file: "docs/machine-readable-docs.md",
    terms: ["frontmatter", "canonical", "docs-index.json", "llms.txt", "route mapping", "renderer", "source doc", "public docs site architecture"],
  },
];

const contributorDocsContractDocs = [
  {
    file: "docs/first-contribution.md",
    terms: ["task backlog", "documentation verification", "AGENTS", "planned", "implemented", "docs hub", "checks could not run"],
  },
  {
    file: "docs/decisions/README.md",
    terms: ["architecture decision records", "tradeoffs", "rejected alternatives", "proposed", "verified", "deprecated", "implementation evidence"],
  },
  {
    file: "docs/checklists/README.md",
    terms: ["implementation checklists", "verifiable", "source contracts", "planned and implemented", "evidence complete", "high review risk"],
  },
  {
    file: "docs/glossary.md",
    terms: ["adr", "benchmark fixture", "public frontmatter", "review checklist", "threat note", "vite/rolldown"],
  },
];

const reviewEvidenceContractDocs = [
  {
    file: "docs/review-checklist.md",
    terms: ["review checklist", "threat model", "public frontmatter standard", "performance evidence checklist", "raw benchmark data", "pr template"],
  },
  {
    file: "docs/threat-model.md",
    terms: ["threat note", "trusted inputs", "untrusted inputs", "human sign-off", "docs indexes", "public claim drift"],
  },
  {
    file: "docs/benchmark-fixtures.md",
    terms: ["benchmark fixtures", "stable name", "raw result output path", "equivalent behavior", "docs-site", "field data"],
  },
  {
    file: "docs/examples-catalog.md",
    terms: ["examples catalog", "planned", "scaffolded", "runnable", "verified", "public guide mapping"],
  },
  {
    file: "docs/docs-site-build-plan.md",
    terms: ["docs site build plan", "renderer decision", "frontmatter validation", "machine-readable outputs", "quality gates", "docs:check"],
  },
  {
    file: ".github/PULL_REQUEST_TEMPLATE.md",
    terms: ["docs/review-checklist.md", "docs/threat-model.md", "docs/benchmark-fixtures.md", "docs/examples-catalog.md", "docs/docs-site-build-plan.md", "Threat note", "Benchmark claims", "Commands run"],
  },
];

const documentationMatrixStatusDocs = [
  {
    file: "docs/documentation-audit.md",
    terms: ["current quality", "editorial assessment", "canonical page status", "top-level `Status:` line"],
  },
  {
    file: "docs/documentation-matrix.md",
    terms: ["current quality", "editorial assessment", "canonical page status", "top-level `Status:` line"],
  },
];

const releaseVersionContractDocs = [
  {
    file: "docs/status.md",
    terms: ["0.0.0", "private scaffold placeholder", "not published release versions"],
  },
  {
    file: "docs/release.md",
    terms: ["0.0.0", "private scaffold placeholder", "not release tags", "published package versions"],
  },
  {
    file: "docs/versioning-and-upgrades.md",
    terms: ["0.0.0", "private scaffold placeholder", "workspace metadata", "compatibility guarantees"],
  },
];

const historicalAuditDocs = [
  "docs/documentation-audit.md",
  "docs/documentation-completion-audit.md",
  "docs/final-pr-summary.md",
];

const prototypeScopeTerms = [
  {
    file: "AGENTS.md",
    terms: ["first working slice", "first public prototype acceptance scope"],
  },
  {
    file: "README.md",
    terms: ["first working slice", "first public prototype"],
  },
  {
    file: "docs/risk-mitigation.md",
    terms: ["first working slice", "broader first public prototype acceptance scope"],
  },
  {
    file: "docs/prototype-acceptance.md",
    terms: ["first public prototype", "first working slice"],
  },
  {
    file: "docs/public/roadmap.md",
    terms: ["first public prototype", "first working slice"],
  },
  {
    file: "docs/roadmap.md",
    terms: ["first public prototype", "first working slice", "planned acceptance criteria"],
  },
  {
    file: "docs/task-backlog.md",
    terms: ["planned acceptance criteria"],
  },
];

const generatedAppScriptDocs = [
  {
    file: "docs/getting-started.md",
    terms: ["bun run dev", "bun run build", "bun run start", "needle dev", "needle build", "needle start", "call"],
  },
  {
    file: "docs/public/guides/create-app.md",
    terms: ["bun run dev", "bun run build", "bun run start", "needle dev", "needle build", "needle start", "call"],
  },
  {
    file: "docs/examples-contract.md",
    terms: ["generated app package scripts", "bun run dev", "bun run build", "bun run start", "needle dev", "needle build", "needle start"],
  },
];

const safeEditContractDocs = [
  "AGENTS.md",
  "docs/safe-edit-transactions.md",
  "docs/agent-kernel.md",
  "docs/mcp-server.md",
  "docs/public/concepts/safe-edits.md",
];

const coreModelTypes = [
  "NeedleApp",
  "RouteNode",
  "GraphEdge",
  "NeedleDiagnostic",
  "RenderMode",
  "CachePlan",
  "AdapterManifest",
];

const coreModelDocs = [
  "docs/phase-1-build-plan.md",
  "docs/roadmap.md",
  "docs/task-backlog.md",
  "docs/risk-mitigation.md",
];

const sharedCoreScaffoldTerms = [
  {
    file: "docs/cache-contract.md",
    terms: ["@needle/core", "CachePlan", "no-store", "public", "ttlSeconds", "staleWhileRevalidateSeconds"],
  },
  {
    file: "docs/public/reference/cache.md",
    terms: ["@needle/core", "CachePlan", "no-store", "public", "ttlSeconds", "staleWhileRevalidateSeconds"],
  },
  {
    file: "docs/compiler-ir.md",
    terms: ["@needle/core", "NeedleApp", "RouteNode", "RenderMode", "sourceFile", "client-only", "hot-api"],
  },
  {
    file: "docs/api-reference.md",
    terms: ["@needle/core", "RenderMode", "\"static\"", "\"prerender\"", "\"ssr\"", "\"stream\"", "\"client-only\"", "\"api\"", "\"hot-api\""],
  },
  {
    file: "docs/public/reference/render-modes.md",
    terms: ["@needle/core", "RenderMode", "\"static\"", "\"prerender\"", "\"ssr\"", "\"stream\"", "\"client-only\"", "\"api\"", "\"hot-api\""],
  },
  {
    file: "docs/diagnostics-contract.md",
    terms: ["@needle/core", "NeedleDiagnostic", "severity", "info", "warning", "error", "docsUrl"],
  },
  {
    file: "docs/public/reference/diagnostics.md",
    terms: ["@needle/core", "NeedleDiagnostic", "severity", "info", "warning", "error", "docsUrl"],
  },
];

const plannedExamplePaths = [
  "examples/basic/",
  "examples/blog-seo/",
  "examples/api-route/",
  "examples/hot-api/",
  "examples/static-export/",
  "examples/adapter-node/",
  "examples/dashboard-client/",
  "examples/ecommerce/",
  "examples/agent-demo/",
  "examples/docs-site/",
  "playgrounds/large-app-fixture/",
];

const plannedExampleInventoryDocs = [
  "README.md",
  "docs/examples-contract.md",
  "docs/examples-catalog.md",
  "docs/examples.md",
  "docs/public/reference/examples.md",
];

const configAdapterContractDocs = [
  "docs/config-contract.md",
  "docs/config.md",
  "docs/public/reference/config.md",
];

const adapterContractDocs = [
  "docs/adapter-contract.md",
  "docs/adapters.md",
  "docs/public/reference/adapters.md",
];

const configEnvironmentContractDocs = [
  "docs/config-contract.md",
  "docs/config.md",
  "docs/public/reference/config.md",
];

const diagnosticContractDocs = [
  "docs/diagnostics-contract.md",
  "docs/public/reference/diagnostics.md",
];

const cacheContractDocs = [
  "docs/cache-contract.md",
  "docs/cache.md",
  "docs/public/reference/cache.md",
];

const seoContractDocs = [
  "docs/seo-contract.md",
  "docs/seo-engine.md",
  "docs/public/reference/seo.md",
  "docs/public/guides/seo-metadata.md",
];

const accessibilityContractDocs = [
  "docs/accessibility-contract.md",
  "docs/accessibility.md",
  "docs/public/reference/accessibility.md",
];

const securityContractDocs = [
  "SECURITY.md",
  "docs/security-contract.md",
  "docs/security.md",
  "docs/public/reference/security.md",
];

const performanceContractDocs = [
  "docs/performance-contract.md",
  "docs/performance.md",
  "docs/public/reference/performance.md",
];

const speedDecisionContractDocs = [
  {
    file: "docs/speed-decisions.md",
    terms: ["vite/rolldown", "vite 8", "bundled dev", "custom bundler", "bun.serve({ routes })", "route code splitting", "css delivery", "source maps", "rum", "field data", "react compiler", "react streaming", "103 early hints", "resource hints", "fetchpriority", "speculation", "bfcache", "compression", "images", "fonts", "waterfalls", "hot api", "payload budgets", "compiler scaling", "rejected until proven"],
  },
  {
    file: "docs/speed-capability-audit.md",
    terms: ["vite/rolldown", "vite 8", "bundled dev", "custom bundler", "bun native dispatch", "route code splitting", "css delivery", "source maps", "rum", "field data", "react compiler", "react streaming", "103 early hints", "resource hints", "fetchpriority", "speculation", "bfcache", "compression", "images", "fonts", "async waterfalls", "hot api", "client payload", "compiler scaling"],
  },
  {
    file: "docs/speed-strategy.md",
    terms: ["speed decisions", "vite bundled dev", "custom bundler", "route code splitting", "css delivery", "source maps", "rum", "react compiler", "resource hints", "speculation", "bfcache", "compression", "images", "fonts", "async waterfall", "hot api", "payload discipline", "large-app readiness"],
  },
  {
    file: "docs/performance-contract.md",
    terms: ["speed decisions", "vite/rolldown", "react compiler", "103 early hints", "resource hints", "fetchpriority", "bfcache", "compression", "images", "fonts", "hot api", "field data", "rum", "source-map", "budget"],
  },
  {
    file: "docs/benchmark-methodology.md",
    terms: ["speed decisions", "vite/rolldown", "bundled dev mode", "bun native", "hot api", "images", "fonts", "compression", "resource hints", "speculation", "bfcache", "raw results", "variance"],
  },
  {
    file: "docs/product-build-readiness.md",
    terms: ["speed decisions", "vite/rolldown", "route code splitting", "css delivery", "production source maps", "react compiler", "react streaming", "resource hints", "speculation rules", "bfcache", "compression", "optional rum", "hot apis", "payload budgets", "compiler scaling", "rejected defaults"],
  },
  {
    file: "docs/task-backlog.md",
    terms: ["speed decisions", "vite/rolldown", "route code splitting", "css delivery", "production source maps", "react compiler", "react streaming", "resource hints", "103 early hints", "speculation rules", "bfcache", "compression", "optional rum", "hot apis", "compiler scaling", "rejected defaults"],
  },
];

const apiRouteContractDocs = [
  "docs/api-route-contract.md",
  "docs/api-routes.md",
  "docs/public/reference/api-routes.md",
];

const schemaContractDocs = [
  "docs/schema-contract.md",
  "docs/schema.md",
  "docs/public/reference/schema.md",
];

const renderModeContractDocs = [
  {
    file: "packages/core/src/index.ts",
    terms: ["rendermode", "\"static\"", "\"prerender\"", "\"ssr\"", "\"stream\"", "\"client-only\"", "\"api\"", "\"hot-api\"", "rendermode: rendermode"],
  },
  {
    file: "docs/compiler-ir.md",
    terms: ["rendermode", ".needle/render-manifest.json", "rendermanifest", "\"static\"", "\"prerender\"", "\"ssr\"", "\"stream\"", "\"client-only\"", "\"api\"", "\"hot-api\""],
  },
  {
    file: "docs/api-reference.md",
    terms: ["staticpage()", "prerender()", "ssr()", "stream()", "clientonly()", "apihot()", "rendermode: \"api\"", "rendermode: \"hot-api\""],
  },
  {
    file: "docs/runtime-contract.md",
    terms: ["render mode", ".needle/render-manifest.json", "dist/render.manifest.json", "static asset", "prerendered html", "ssr", "streaming", "client-only", "api", "hot api"],
  },
  {
    file: "docs/public/reference/render-modes.md",
    terms: ["@needle/core", "rendermode", ".needle/render-manifest.json", "staticpage()", "prerender()", "ssr()", "stream()", "clientonly()", "apihot()", "\"static\"", "\"prerender\"", "\"ssr\"", "\"stream\"", "\"client-only\"", "\"api\"", "\"hot-api\""],
  },
  {
    file: "docs/public/reference/api-routes.md",
    terms: ["app/api", "rendermode: \"api\"", "rendermode: \"hot-api\"", "apihot()", "hot api"],
  },
];

const routingContractDocs = [
  "docs/routing-contract.md",
  "docs/routing.md",
  "docs/file-conventions.md",
  "docs/public/reference/routing.md",
  "docs/public/reference/file-conventions.md",
];

const statusDefinitionDocs = [
  "docs/status.md",
  "docs/documentation-standard.md",
  "docs/public-frontmatter-standard.md",
];

function rel(path: string): string {
  return relative(root, path).replaceAll("\\", "/");
}

function read(path: string): string {
  return readFileSync(join(root, path), "utf8");
}

function agentRequiredDocumentationSyncEntries(): string[] {
  const agentsGuide = read("AGENTS.md");
  const match = agentsGuide.match(
    /Every agent change must evaluate whether these files need updates:\s*([\s\S]*?)\nUpdate `README\.md` when:/,
  );

  if (!match) {
    failures.push("AGENTS.md required documentation sync section could not be parsed.");
    return [];
  }

  return [...match[1].matchAll(/^- `([^`]+)`$/gm)]
    .map((entry) => entry[1])
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
}

function walkMarkdown(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stats = statSync(path);
    if (stats.isDirectory()) {
      if (entry === "node_modules" || entry === ".git") continue;
      found.push(...walkMarkdown(path));
    } else if (entry.endsWith(".md")) {
      found.push(path);
    }
  }
  return found;
}

function allPublicDocs(): string[] {
  return walkMarkdown(join(root, "docs/public"))
    .map((path) => rel(path))
    .sort();
}

function allDurableInternalDocs(): string[] {
  return walkMarkdown(join(root, "docs"))
    .map((path) => rel(path))
    .filter((path) => {
      if (path.startsWith("docs/public/")) return false;
      if (path.startsWith("docs/templates/")) return false;
      if (path.startsWith("docs/prompts/")) return path === "docs/prompts/README.md";
      if (path.startsWith("docs/skills/")) return path === "docs/skills/README.md";
      if (path.startsWith("docs/subagents/")) return path === "docs/subagents/README.md";
      if (path.startsWith("docs/decisions/")) return path === "docs/decisions/README.md";
      if (path.startsWith("docs/checklists/")) return path === "docs/checklists/README.md";
      return true;
    })
    .sort();
}

function requireDirectoryIndexCoverage(dir: string): void {
  const dirPath = join(root, dir);
  const indexPath = `${dir}/README.md`;

  if (!existsSync(dirPath)) return;
  if (!existsSync(join(root, indexPath))) {
    failures.push(`${dir} is missing README.md index coverage.`);
    return;
  }

  const index = read(indexPath);
  for (const entry of readdirSync(dirPath)) {
    const entryPath = join(dirPath, entry);
    if (!statSync(entryPath).isFile()) continue;
    if (!entry.endsWith(".md") || entry === "README.md") continue;
    if (!index.includes(entry)) {
      failures.push(`${indexPath} does not list ${dir}/${entry}.`);
    }
  }
}

for (const doc of requiredDocs) {
  if (!existsSync(join(root, doc))) {
    failures.push(`Missing required doc: ${doc}`);
  }
}

if (existsSync(join(root, "skills"))) {
  failures.push("Root skills/ must not exist; use docs/skills/.");
}

if (existsSync(join(root, "subagents"))) {
  failures.push("Root subagents/ must not exist; use docs/subagents/.");
}

for (const dir of ["docs/skills", "docs/subagents"]) {
  if (!existsSync(join(root, dir))) {
    failures.push(`Missing docs-level agent playbook directory: ${dir}`);
  }
}

const agentListedSyncDocs = agentRequiredDocumentationSyncEntries();

for (const doc of agentListedSyncDocs) {
  if (!existsSync(join(root, doc))) {
    failures.push(`AGENTS.md required documentation sync list references missing file: ${doc}.`);
  }
}

const agentPlaybookDocs = ["docs/skills", "docs/subagents"]
  .flatMap((dir) => walkMarkdown(join(root, dir)).map((path) => rel(path)))
  .sort();

for (const doc of agentPlaybookDocs) {
  if (!agentListedSyncDocs.includes(doc)) {
    failures.push(`AGENTS.md required documentation sync list does not include agent playbook file: ${doc}.`);
  }
}

for (const doc of agentRequiredSyncDocs) {
  if (!existsSync(join(root, doc))) {
    failures.push(`AGENTS.md required documentation sync file is missing: ${doc}.`);
  }
  if (!agentListedSyncDocs.includes(doc)) {
    failures.push(`AGENTS.md required documentation sync list does not include ${doc}.`);
  }
}

const staleStatusPatterns = [
  {
    file: "docs/public/index.md",
    pattern: /No runtime implementation, CLI, package scaffold/i,
    message: "docs/public/index.md still says the package scaffold is missing.",
  },
  {
    file: "docs/public/roadmap.md",
    pattern: /No package scaffold/i,
    message: "docs/public/roadmap.md still says the package scaffold is missing.",
  },
  {
    file: "docs/public/guides/create-app.md",
    pattern: /no package scaffold yet/i,
    message: "docs/public/guides/create-app.md still says the package scaffold is missing.",
  },
  {
    file: "docs/public-docs.md",
    pattern: /- Phase 1 scaffold exists\./i,
    message: "docs/public-docs.md still lists the existing Phase 1 scaffold as a future public-launch blocker.",
  },
  {
    file: "docs/public/reference/testing.md",
    pattern: /Test tooling is not implemented yet/i,
    message: "docs/public/reference/testing.md ignores scaffold test tooling.",
  },
  {
    file: "docs/public/reference/project-structure.md",
    pattern: /scaffolded as a Bun workspace with .*examples under `examples\/`|scaffolded as a Bun workspace with .*playgrounds under `playgrounds\/`/i,
    message: "docs/public/reference/project-structure.md claims planned example directories are scaffolded.",
  },
  {
    file: "docs/public/concepts/compiler-runtime.md",
    pattern: /NeedleStart keeps framework intelligence in the compiler and keeps production runtime adapters small\./i,
    message: "docs/public/concepts/compiler-runtime.md should describe the compiler/runtime split as planned until implementation exists.",
  },
  {
    file: "docs/phase-1-build-plan.md",
    pattern: /Package-level placeholder tests where practical/i,
    message: "docs/phase-1-build-plan.md should describe the current root placeholder test coverage instead of implying package-level tests exist.",
  },
  {
    file: "CONTRIBUTING.md",
    pattern: /Bun server runtime details|Bun server details|Bun runtime package/i,
    message: "CONTRIBUTING.md should direct runtime help to @needle/adapter-bun adapter work, not generic Bun server wording.",
  },
  {
    file: "docs/documentation-audit.md",
    pattern: /Many public-framework docs homes were missing before this pass|Add missing governance\/security\/release\/testing docs|Add machine-readable docs index and llms output plan|Add public website content map|Lacks governance\/security\/release links|Add PR template later|Add PR templates and generated docs index|not yet specified in one place|The next step is to define `docs-index\.json`, `llms\.txt`, `llms-full\.txt`/i,
    message: "docs/documentation-audit.md should reflect current docs homes and machine-readable docs contracts instead of pre-expansion gaps.",
  },
  {
    file: "docs/documentation-matrix.md",
    pattern: /Needs enforcement through PR template|Make status update part of PR template|Enforce through PR template|Needs PR integration|Needs usage through PR template|Lacks governance\/security\/release links/i,
    message: "docs/documentation-matrix.md should reflect current PR-template enforcement and governance/security links.",
  },
  {
    file: ".github/PULL_REQUEST_TEMPLATE.md",
    pattern: /severity levels/i,
    message: ".github/PULL_REQUEST_TEMPLATE.md should reference diagnostic severity values, not severity levels.",
  },
  {
    file: "docs/public/reference/cli.md",
    pattern: /\| Command \| Purpose \|/i,
    message: "docs/public/reference/cli.md should label its command table as planned while CLI behavior is unimplemented.",
  },
  {
    file: "docs/public/reference/adapters.md",
    pattern: /\| Adapter \| Package \| Purpose \|/i,
    message: "docs/public/reference/adapters.md should label its adapter table as planned while adapter behavior is unimplemented.",
  },
  {
    file: "docs/public/reference/api-routes.md",
    pattern: /\| File \| Route \|/i,
    message: "docs/public/reference/api-routes.md should label API route examples as planned while API routes are unimplemented.",
  },
  {
    file: "docs/api-routes.md",
    pattern: /- Common HTTP methods work\.|- Dynamic API params work\.|- Plain objects become JSON responses\.|- Response objects pass through\./i,
    message: "docs/api-routes.md should use planned `should` wording for API behavior until implementation exists.",
  },
  {
    file: "docs/roadmap.md",
    pattern: /- GET, POST, PUT, PATCH, DELETE, OPTIONS, and HEAD work\.|- Dynamic API params work\.|- Plain objects become JSON responses\.|- Response objects pass through untouched\.|- Errors are formatted in dev and hidden in production\./i,
    message: "docs/roadmap.md should use planned `should` wording for API route acceptance criteria until implementation exists.",
  },
  {
    file: "docs/task-backlog.md",
    pattern: /- Common HTTP methods work\.|- Dynamic API params work\.|- Plain objects become JSON\.|- Response objects pass through\.|- Missing or unsupported methods emit diagnostics\.|- Production error responses hide stack traces\./i,
    message: "docs/task-backlog.md should use planned `should` wording for API route acceptance criteria until implementation exists.",
  },
  {
    file: "docs/api-route-contract.md",
    pattern: /`ctx\.request` exposes the raw Web `Request`\.|Handlers can call `request\.json\(\)`, `request\.text\(\)`, `request\.formData\(\)`, or `request\.arrayBuffer\(\)`\.|\| `Response` \| Pass through unchanged\. \||\| Plain object \| JSON response with/i,
    message: "docs/api-route-contract.md should use planned `should` wording for request and response behavior until implementation exists.",
  },
  {
    file: "docs/runtime-contract.md",
    pattern: /The compiler generates an adapter-aware server entry\./i,
    message: "docs/runtime-contract.md should mark adapter-aware server entry generation as planned until implementation exists.",
  },
  {
    file: "docs/public/guides/api-route.md",
    pattern: /- Common HTTP methods work\.|- Plain objects become JSON responses\.|- Response objects pass through\.|- Errors are readable in development and hidden in production\./i,
    message: "docs/public/guides/api-route.md should use planned `should` wording for API behavior until implementation exists.",
  },
  {
    file: "docs/public/reference/api-routes.md",
    pattern: /- `Response` values pass through\.|- Plain objects and arrays become JSON responses\.|- Strings become text responses/i,
    message: "docs/public/reference/api-routes.md should use planned `should` wording for API return behavior until implementation exists.",
  },
  {
    file: "docs/public/reference/file-conventions.md",
    pattern: /\| File \| URL \|/i,
    message: "docs/public/reference/file-conventions.md should label file convention examples as planned while route discovery is unimplemented.",
  },
  {
    file: "docs/public/reference/routing.md",
    pattern: /\| File \| Route \| Type \|/i,
    message: "docs/public/reference/routing.md should label routing examples as planned while route discovery is unimplemented.",
  },
  {
    file: "README.md",
    pattern: /examples\/[\s\S]*dashboard\/(?!client)/i,
    message: "README.md should use the planned dashboard-client example path.",
  },
  {
    file: "docs/examples-contract.md",
    pattern: /agent-demo\/\r?\n\s+large-app-fixture\//i,
    message: "docs/examples-contract.md should keep large-app-fixture under playgrounds/, not examples/.",
  },
  {
    file: "docs/examples.md",
    pattern: /- `dashboard`$|- `large-app-fixture`$/m,
    message: "docs/examples.md should list planned example paths from docs/examples-catalog.md.",
  },
  {
    file: "docs/examples-contract.md",
    pattern: /```bash[\s\S]*bun run build[\s\S]*needle build[\s\S]*```/i,
    message: "docs/examples-contract.md should not list bun run build and direct needle build as separate required example build steps.",
  },
  {
    file: "README.md",
    pattern: /Agent Kernel: AGENTS\.md generation/i,
    message: "README.md must distinguish app-local AGENTS.md generation from the hand-maintained repository root AGENTS.md.",
  },
  {
    file: "docs/agent-kernel.md",
    pattern: /Planned generated files:\s*```txt\s*AGENTS\.md/i,
    message: "docs/agent-kernel.md must distinguish app-local AGENTS.md generation from the repository root AGENTS.md.",
  },
  {
    file: "docs/agent-kernel.md",
    pattern: /\|\s*`\.needle\/[^`]+`\s*\|\s*Generated app artifact\s*\|/i,
    message: "docs/agent-kernel.md should label .needle outputs as planned generated app artifacts until implementation exists.",
  },
  {
    file: "docs/agent-kernel.md",
    pattern: /\|\s*`dist\/[^`]+`\s*\|\s*Deployment artifact\s*\|/i,
    message: "docs/agent-kernel.md should label dist outputs as planned deployment artifacts until implementation exists.",
  },
  {
    file: "docs/package-map.md",
    pattern: /\| `@needle\/agent` \| AGENTS\.md generation/i,
    message: "docs/package-map.md must describe app-local AGENTS.md generation.",
  },
  {
    file: "docs/roadmap.md",
    pattern: /- `AGENTS\.md` generated with project commands and rules/i,
    message: "docs/roadmap.md must describe app-local AGENTS.md generation.",
  },
  {
    file: "docs/public/concepts/agent-native.md",
    pattern: /- `AGENTS\.md` generation\./i,
    message: "docs/public/concepts/agent-native.md must describe app-local AGENTS.md generation.",
  },
  {
    file: "docs/speed-capability-audit.md",
    pattern: /Before Phase 1 package scaffold/i,
    message: "docs/speed-capability-audit.md still uses pre-scaffold language.",
  },
  {
    file: "docs/documentation-audit.md",
    pattern: /because the repository (has|had) no package scaffold yet|Checks not run at the time of this audit|Treat this audit section as historical context/i,
    message: "docs/documentation-audit.md still presents pre-scaffold status as current.",
  },
  {
    file: "docs/documentation-completion-audit.md",
    pattern: /Checks intentionally not run|repository had no Bun workspace|Treat this section as historical context/i,
    message: "docs/documentation-completion-audit.md should report current Phase 1 scaffold verification evidence directly.",
  },
  {
    file: "docs/final-pr-summary.md",
    pattern: /Checks Not Run|Historical reason: the repository had no Bun workspace|Current note: Phase 1 scaffold work has since added/i,
    message: "docs/final-pr-summary.md should report current Phase 1 scaffold verification evidence directly.",
  },
  {
    file: "SECURITY.md",
    pattern: /NeedleStart is not yet implemented\./i,
    message: "SECURITY.md should distinguish the scaffold from unimplemented framework security behavior.",
  },
  {
    file: "docs/documentation-audit.md",
    pattern: /exact testing commands once packages exist|Generate docs where possible after packages exist/i,
    message: "docs/documentation-audit.md should distinguish scaffolded packages from implemented package behavior.",
  },
  {
    file: "docs/config-contract.md",
    pattern: /Final config defaults before packages exist/i,
    message: "docs/config-contract.md should tie config defaults to config-loading behavior, not package existence.",
  },
  {
    file: "docs/task-backlog.md",
    pattern: /Expand `docs\/machine-readable-docs\.md` into generated schemas when packages exist/i,
    message: "docs/task-backlog.md should tie generated schema docs to owning package behavior, not package existence.",
  },
  {
    file: "docs/documentation-matrix.md",
    pattern: /docs versioning after packages exist/i,
    message: "docs/documentation-matrix.md should distinguish scaffolded packages from public package releases.",
  },
  {
    file: "docs/product-build-readiness.md",
    pattern: /upgrade-guide procedures once packages exist/i,
    message: "docs/product-build-readiness.md should distinguish scaffolded packages from public package releases.",
  },
  {
    file: "docs/product-build-readiness.md",
    pattern: /This state is mostly present/i,
    message: "docs/product-build-readiness.md should tie Phase 1 readiness to explicit scaffold evidence instead of vague mostly-present wording.",
  },
  {
    file: "README.md",
    pattern: /Planned command once the package exists/i,
    message: "README.md still ties quick start to package existence instead of implemented app creation behavior.",
  },
  {
    file: "docs/prototype-acceptance.md",
    pattern: /\bbun dev\b|\bbun build\b|\bbun start\b/i,
    message: "docs/prototype-acceptance.md should use generated app script commands with `bun run ...`.",
  },
  {
    file: "docs/getting-started.md",
    pattern: /\bbun dev\b|Add the Bun monorepo scaffold|Add package entrypoints and placeholder tests/i,
    message: "docs/getting-started.md should use current scaffold status and `needle dev` target command language.",
  },
  {
    file: "docs/public/guides/create-app.md",
    pattern: /\bbun dev\b|remaining scaffold hardening/i,
    message: "docs/public/guides/create-app.md should use `needle dev` target command language and current scaffold status.",
  },
  {
    file: "docs/public/guides/api-route.md",
    pattern: /^This guide describes the planned API route workflow\.$/m,
    message: "docs/public/guides/api-route.md should state API route behavior is not implemented yet.",
  },
  {
    file: "docs/public/guides/agent-context.md",
    pattern: /^This guide describes the planned agent context workflow\.$/m,
    message: "docs/public/guides/agent-context.md should state agent context commands are not implemented yet.",
  },
  {
    file: "docs/public/guides/needle-map.md",
    pattern: /^This guide describes the planned workflow for inspecting the app graph\.$/m,
    message: "docs/public/guides/needle-map.md should state Needle Map commands are not implemented yet.",
  },
  {
    file: "docs/public/guides/seo-metadata.md",
    pattern: /^This guide describes the planned workflow for adding route metadata\.$/m,
    message: "docs/public/guides/seo-metadata.md should state metadata APIs and SEO checks are not implemented yet.",
  },
  {
    file: "docs/public/guides/static-page.md",
    pattern: /^This guide describes the planned workflow for adding a static public page\.$/m,
    message: "docs/public/guides/static-page.md should state static routing and rendering are not implemented yet.",
  },
  {
    file: "docs/README.md",
    pattern: /until package scripts exist|first safe contribution path for Phase 0/i,
    message: "docs/README.md still uses pre-scaffold navigation language.",
  },
  {
    file: "docs/docs-verification.md",
    pattern: /once the Bun workspace exists/i,
    message: "docs/docs-verification.md still treats the Bun workspace as future work.",
  },
  {
    file: "docs/review-checklist.md",
    pattern: /Out Of Scope For Phase 0|before package scaffolding exists/i,
    message: "docs/review-checklist.md still uses Phase 0 or pre-scaffold review language.",
  },
  {
    file: "docs/machine-readable-docs.md",
    pattern: /generated once package scaffolding exists/i,
    message: "docs/machine-readable-docs.md still ties generated docs to package scaffold existence.",
  },
  {
    file: "docs/examples-contract.md",
    pattern: /honest about Phase 0|until the package scaffold and CLI exist|Out Of Scope For Phase 0/i,
    message: "docs/examples-contract.md still uses Phase 0 or pre-scaffold example language.",
  },
  {
    file: "docs/product-build-readiness.md",
    pattern: /before package work begins|Before adding the monorepo scaffold|Build work may add the Bun workspace|first package scaffold task/i,
    message: "docs/product-build-readiness.md still frames scaffold work as future.",
  },
  {
    file: "docs/checklists/phase-1-scaffold.md",
    pattern: /Status: Planned|It is not evidence that scaffolding exists|documented placeholder reason/i,
    message: "docs/checklists/phase-1-scaffold.md still treats scaffold evidence as unavailable.",
  },
  {
    file: "docs/phase-1-build-plan.md",
    pattern: /The first implementation PR should prove only this|The Phase 1 scaffold should add or update|When Phase 1 lands/i,
    message: "docs/phase-1-build-plan.md still frames the existing scaffold as future work.",
  },
  {
    file: "docs/skills/README.md",
    pattern: /while the repository has no package scaffolding/i,
    message: "docs/skills/README.md still says package scaffolding is missing.",
  },
  {
    file: "docs/decisions/0008-docs-level-ai-playbooks.md",
    pattern: /should not exist in Phase 0/i,
    message: "ADR 0008 still uses Phase 0 placement language for current playbooks.",
  },
  {
    file: "docs/versioning-and-upgrades.md",
    pattern: /before the first package scaffold/i,
    message: "docs/versioning-and-upgrades.md still frames package scaffold as future.",
  },
  {
    file: "docs/first-contribution.md",
    pattern: /Adding package scaffolding|Until package scripts exist/i,
    message: "docs/first-contribution.md still uses pre-scaffold contribution guidance.",
  },
  {
    file: "docs/decisions/README.md",
    pattern: /Phase 0 ADRs/i,
    message: "docs/decisions/README.md still uses Phase 0 ADR status language.",
  },
  {
    file: "docs/decisions/0004-vite-rolldown-before-custom-bundler.md",
    pattern: /when package scaffolding begins/i,
    message: "ADR 0004 still frames package scaffolding as future.",
  },
  {
    file: "docs/speed-decisions.md",
    pattern: /before package scaffolding pins/i,
    message: "docs/speed-decisions.md still frames package scaffolding as future dependency work.",
  },
  {
    file: "docs/documentation-audit.md",
    pattern: /Strong for Phase 0|Replace planned flow with verified tutorial after scaffold|Planned packages only|Update after scaffold|Phase 0 governance|once scaffold exists|once the scaffold exists/i,
    message: "docs/documentation-audit.md still contains stale pre-scaffold audit wording.",
  },
  {
    file: "docs/documentation-matrix.md",
    pattern: /when scaffold exists|after scaffold lands|until package scripts exist|until scaffold exists|generated app structure after Phase 1/i,
    message: "docs/documentation-matrix.md still contains stale scaffold timing language.",
  },
  {
    file: "docs/speed-strategy.md",
    pattern: /after scaffold exists/i,
    message: "docs/speed-strategy.md still ties speed evidence to scaffold existence.",
  },
  {
    file: "docs/versioning-and-upgrades.md",
    pattern: /when scaffold exists/i,
    message: "docs/versioning-and-upgrades.md still ties example docs to scaffold existence.",
  },
  {
    file: "CONTRIBUTING.md",
    pattern: /planning and constitution mode|once the monorepo is scaffolded|until package scaffolding exists/i,
    message: "CONTRIBUTING.md still uses pre-scaffold contribution guidance.",
  },
  {
    file: "docs/public/community/contributing.md",
    pattern: /planning and constitution mode/i,
    message: "docs/public/community/contributing.md still uses pre-scaffold contribution guidance.",
  },
  {
    file: "docs/subagents/verification.md",
    pattern: /while scaffolding is absent/i,
    message: "docs/subagents/verification.md still frames scaffold checks as absent.",
  },
  {
    file: "docs/skills/strategic-app-builder.md",
    pattern: /if scaffolding is absent/i,
    message: "docs/skills/strategic-app-builder.md still frames scaffold checks as absent.",
  },
  {
    file: "GOVERNANCE.md",
    pattern: /Phase 0|until the project has package scaffolding/i,
    message: "GOVERNANCE.md still uses pre-scaffold governance language.",
  },
  {
    file: "docs/runtime-contract.md",
    pattern: /needle\.manifest\.json|map\.manifest\.json|cache\.manifest\.json/i,
    message: "docs/runtime-contract.md uses stale generated artifact names; canonical compiler artifacts live under .needle/*.",
  },
  {
    file: "docs/phase-1-build-plan.md",
    pattern: /remains a planned runtime package name/i,
    message: "docs/phase-1-build-plan.md should treat @needle/server-bun as historical, not an active planned package.",
  },
  {
    file: "docs/risk-mitigation.md",
    pattern: /Create `@needle\/adapters` early|framework runtime packages and adapters/i,
    message: "docs/risk-mitigation.md should use concrete runtime adapter package wording.",
  },
  {
    file: "AGENTS.md",
    pattern: /runtime packages and adapters|unless a later architecture decision reintroduces a separate `@needle\/server-bun` package/i,
    message: "AGENTS.md should name active adapter packages and treat @needle/server-bun as ADR-only.",
  },
  {
    file: "docs/runtime-contract.md",
    pattern: /"runtime": "bun"/i,
    message: "docs/runtime-contract.md should show adapter manifest runtime.name, not a bare runtime string.",
  },
  {
    file: "docs/adapters.md",
    pattern: /"runtime": "bun"/i,
    message: "docs/adapters.md should show adapter manifest runtime.name, not a bare runtime string.",
  },
  {
    file: "docs/compiler-ir.md",
    pattern: /\bfile: string\b|"file":|"renderMode": "auto"|api-hot/i,
    message: "docs/compiler-ir.md should use sourceFile and supported RenderMode values that match the shared core model.",
  },
  {
    file: "docs/performance.md",
    pattern: /hello-static|hello-ssr|json-api-normal|json-api-hot|ecommerce-10000-products|large-app-2000-routes|api-hot|large-build/i,
    message: "docs/performance.md should use canonical benchmark fixture names and hot-api render mode.",
  },
  {
    file: "docs/diagnostics-contract.md",
    pattern: /"level":|`level`|level: "info"|diagnostic code rules, levels/i,
    message: "docs/diagnostics-contract.md should use NeedleDiagnostic severity, not level.",
  },
  {
    file: "docs/cli-json-contract.md",
    pattern: /"level":|`level`|`code`, `level`/i,
    message: "docs/cli-json-contract.md should embed diagnostics with severity, not level.",
  },
  {
    file: "docs/cli-json-contract.md",
    pattern: /NEEDLE_ROUTE_CONFLICT/i,
    message: "docs/cli-json-contract.md should use ROUTE_DUPLICATE_PATH for the route-conflict example.",
  },
  {
    file: "docs/cli.md",
    pattern: /Yes for diagnostics/i,
    message: "docs/cli.md should treat needle build JSON output as a full planned automation contract.",
  },
  {
    file: "docs/config-contract.md",
    pattern: /"level":/i,
    message: "docs/config-contract.md should show diagnostic severity, not level.",
  },
  {
    file: "docs/public/reference/diagnostics.md",
    pattern: /"level":|`level`/i,
    message: "docs/public/reference/diagnostics.md should show diagnostic severity, not level.",
  },
  {
    file: "docs/manifest-contracts.md",
    pattern: /stable codes, levels/i,
    message: "docs/manifest-contracts.md should reference diagnostic severity, not levels.",
  },
  {
    file: "docs/README.md",
    pattern: /diagnostic codes, levels/i,
    message: "docs/README.md should reference diagnostic severity values, not levels.",
  },
  {
    file: "docs/product-build-readiness.md",
    pattern: /diagnostic contract for codes, levels/i,
    message: "docs/product-build-readiness.md should reference diagnostic severity values, not levels.",
  },
  {
    file: "docs/documentation-completion-audit.md",
    pattern: /diagnostic codes, levels/i,
    message: "docs/documentation-completion-audit.md should reference diagnostic severity values, not levels.",
  },
  {
    file: "AGENTS.md",
    pattern: /severity levels/i,
    message: "AGENTS.md should reference diagnostic severity values, not severity levels.",
  },
  {
    file: "docs/docs-maintenance-checklist.md",
    pattern: /severity levels/i,
    message: "docs/docs-maintenance-checklist.md should reference diagnostic severity values, not severity levels.",
  },
  {
    file: "docs/documentation-completion-audit.md",
    pattern: /diagnostic levels/i,
    message: "docs/documentation-completion-audit.md should reference diagnostic severity values, not diagnostic levels.",
  },
  {
    file: "README.md",
    pattern: /route and render manifests/i,
    message: "README.md should name .needle/routes.json and .needle/render-manifest.json instead of generic route and render manifests.",
  },
  {
    file: "docs/getting-started.md",
    pattern: /route and render manifests/i,
    message: "docs/getting-started.md should name .needle/routes.json and .needle/render-manifest.json instead of generic route and render manifests.",
  },
  {
    file: "docs/public/guides/create-app.md",
    pattern: /route and render manifests/i,
    message: "docs/public/guides/create-app.md should name .needle/routes.json and .needle/render-manifest.json instead of generic route and render manifests.",
  },
  {
    file: "docs/schema-contract.md",
    pattern: /route and render manifests/i,
    message: "docs/schema-contract.md should name .needle/routes.json and .needle/render-manifest.json instead of generic route and render manifests.",
  },
  {
    file: "AGENTS.md",
    pattern: /Bun server|Serve through Bun|Adapter-aware Bun server/i,
    message: "AGENTS.md should describe first-slice Bun serving through @needle/adapter-bun.",
  },
  {
    file: "README.md",
    pattern: /Bun serving(?! is implemented through `@needle\/adapter-bun`)|Bun server|Serve through Bun|Adapter-aware Bun server/i,
    message: "README.md should describe prototype Bun serving through @needle/adapter-bun.",
  },
  {
    file: "docs/prototype-acceptance.md",
    pattern: /Bun serving(?! is implemented through `@needle\/adapter-bun`)|Serve static and SSR routes through Bun|Production Bun server|Bun server|Serve through Bun|Adapter-aware Bun server/i,
    message: "docs/prototype-acceptance.md should describe production serving through @needle/adapter-bun.",
  },
  {
    file: "docs/public/roadmap.md",
    pattern: /Bun serving(?! is implemented through `@needle\/adapter-bun`)|Bun server|Serve through Bun|Adapter-aware Bun server/i,
    message: "docs/public/roadmap.md should describe first-slice Bun serving through @needle/adapter-bun.",
  },
  {
    file: "docs/roadmap.md",
    pattern: /Bun server|Bun Production Server|Bun production server|Adapter-aware Bun production server|Serve through Bun|Adapter-aware Bun server|runnable server bundle/i,
    message: "docs/roadmap.md should describe Bun serving through @needle/adapter-bun.",
  },
  {
    file: "docs/task-backlog.md",
    pattern: /Bun server|Bun Adapter Server Output|Serve through Bun|Adapter-aware Bun server/i,
    message: "docs/task-backlog.md should describe Bun serving through @needle/adapter-bun.",
  },
  {
    file: "docs/adapter-contract.md",
    pattern: /Default production server using|Compatibility server using/i,
    message: "docs/adapter-contract.md should describe Bun and Node as adapter paths, not standalone server packages.",
  },
  {
    file: "docs/deployment.md",
    pattern: /default production server path/i,
    message: "docs/deployment.md should describe @needle/adapter-bun as the default production adapter path.",
  },
  {
    file: "docs/public/reference/adapters.md",
    pattern: /Default production server path|Compatibility server path/i,
    message: "docs/public/reference/adapters.md should describe Bun and Node as adapter paths.",
  },
  {
    file: "docs/risk-mitigation.md",
    pattern: /Bun server|Serve through Bun|Adapter-aware Bun server/i,
    message: "docs/risk-mitigation.md should describe first-slice Bun serving through @needle/adapter-bun.",
  },
  {
    file: "docs/cache.md",
    pattern: /Cache manifest fields/i,
    message: "docs/cache.md should reference cache metadata, not a required cache manifest.",
  },
  {
    file: "docs/documentation-matrix.md",
    pattern: /cache manifest baseline/i,
    message: "docs/documentation-matrix.md should reference cache metadata baseline, not cache manifest baseline.",
  },
  {
    file: "docs/speed-capability-audit.md",
    pattern: /Cache manifest snapshots/i,
    message: "docs/speed-capability-audit.md should reference cache metadata snapshots, not cache manifest snapshots.",
  },
  {
    file: "docs/speed-decisions.md",
    pattern: /Cache manifest snapshots/i,
    message: "docs/speed-decisions.md should reference cache metadata snapshots, not cache manifest snapshots.",
  },
  {
    file: "docs/api-route-contract.md",
    pattern: /\| `API_[^`]+` \| `warn`/i,
    message: "docs/api-route-contract.md should use diagnostic severity `warning`, not `warn`.",
  },
  {
    file: "docs/cache-contract.md",
    pattern: /\| `CACHE_[^`]+` \| `warn`/i,
    message: "docs/cache-contract.md should use diagnostic severity `warning`, not `warn`.",
  },
  {
    file: "docs/routing-contract.md",
    pattern: /\| `ROUTE_[^`]+` \| `warn(?:`| or)/i,
    message: "docs/routing-contract.md should use diagnostic severity `warning`, not `warn`.",
  },
  {
    file: "docs/seo-contract.md",
    pattern: /\| `SEO_[^`]+` \| `warn`/i,
    message: "docs/seo-contract.md should use diagnostic severity `warning`, not `warn`.",
  },
  {
    file: "docs/seo-contract.md",
    pattern: /\| Code \| Level \| Meaning \|/i,
    message: "docs/seo-contract.md should use diagnostic severity, not level.",
  },
  {
    file: "docs/schema-contract.md",
    pattern: /\| `SCHEMA_[^`]+` \| `warn(?:`| or)/i,
    message: "docs/schema-contract.md should use diagnostic severity `warning`, not `warn`.",
  },
  {
    file: "docs/adapters.md",
    pattern: /unsupported runtime features in `adapter\.manifest\.json`/i,
    message: "docs/adapters.md should reference dist/adapter.manifest.json for adapter output.",
  },
  {
    file: "docs/guides.md",
    pattern: /Read `adapter\.manifest\.json`/i,
    message: "docs/guides.md should reference dist/adapter.manifest.json.",
  },
  {
    file: "docs/package-map.md",
    pattern: /belongs in `adapter\.manifest\.json`/i,
    message: "docs/package-map.md should reference dist/adapter.manifest.json.",
  },
  {
    file: "docs/roadmap.md",
    pattern: /documented in `adapter\.manifest\.json`/i,
    message: "docs/roadmap.md should reference dist/adapter.manifest.json.",
  },
  {
    file: "docs/task-backlog.md",
    pattern: /`adapter\.manifest\.json` is emitted/i,
    message: "docs/task-backlog.md should reference dist/adapter.manifest.json.",
  },
  {
    file: "docs/public/reference/adapters.md",
    pattern: /`adapter\.manifest\.json` should describe:/i,
    message: "docs/public/reference/adapters.md should reference dist/adapter.manifest.json.",
  },
  {
    file: "docs/assets/needle-map-data-flow.svg",
    pattern: /map\.manifest\.json|cache\.manifest\.json/i,
    message: "docs/assets/needle-map-data-flow.svg uses stale generated artifact names.",
  },
  {
    file: "docs/assets/safe-edit-transaction.svg",
    pattern: /map\.manifest\.json/i,
    message: "docs/assets/safe-edit-transaction.svg uses stale generated artifact names.",
  },
];

for (const file of [
  "docs/accessibility-contract.md",
  "docs/benchmark-fixtures.md",
  "docs/docs-site-build-plan.md",
  "docs/examples-catalog.md",
  "docs/performance-contract.md",
  "docs/security-contract.md",
  "docs/threat-model.md",
]) {
  if (existsSync(join(root, file)) && /Out Of Scope For Phase 0/i.test(read(file))) {
    failures.push(`${file} still uses Phase 0 out-of-scope language.`);
  }
}

for (const { file, pattern, message } of staleStatusPatterns) {
  if (existsSync(join(root, file)) && pattern.test(read(file))) {
    failures.push(message);
  }
}

const readme = read("README.md");
const readmeFirstScreen = readme.split(/\r?\n/).slice(0, 40).join("\n");
if (!/This checkout is in Phase 1: monorepo scaffold\./.test(readmeFirstScreen)) {
  failures.push("README.md must state Phase 1 scaffold status near the top before broad product claims can be read as current behavior.");
}

if (!/target framework behavior/.test(readmeFirstScreen)) {
  failures.push("README.md must state near the top that product language describes target framework behavior unless marked current.");
}

for (const requiredPath of [
  "packages/adapters/bun",
  "packages/adapters/node",
  "packages/adapters/static",
]) {
  if (!readme.includes(requiredPath)) {
    failures.push(`README.md does not document ${requiredPath}`);
  }
}

for (const staleTreeEntry of ["    adapter-bun/", "    adapter-static/"]) {
  if (readme.includes(staleTreeEntry)) {
    failures.push(`README.md still documents stale flat adapter path: ${staleTreeEntry.trim()}`);
  }
}

for (const file of ["README.md", "docs/status.md", "docs/phase-1-build-plan.md", "docs/task-backlog.md"]) {
  if (existsSync(join(root, file)) && /`bun\.lock`/.test(read(file))) {
    failures.push(`${file} documents bun.lock, but this scaffold uses bun.lockb.`);
  }
}

for (const file of plannedNeedleCommandDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const command of plannedNeedleCommands) {
    if (!content.includes(command)) {
      failures.push(`${file} does not document planned CLI command: ${command}.`);
    }
  }
}

for (const file of plannedCommandVariantDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const command of plannedCommandVariants) {
    if (!content.includes(command)) {
      failures.push(`${file} does not document planned command variant: ${command}.`);
    }
  }
}

for (const file of scaffoldVerificationDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const command of scaffoldVerificationCommands) {
    if (!content.includes(command)) {
      failures.push(`${file} does not document scaffold verification command: ${command}.`);
    }
  }
}

for (const file of plannedExampleInventoryDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const examplePath of plannedExamplePaths) {
    if (!content.includes(examplePath)) {
      failures.push(`${file} does not document planned example path: ${examplePath}.`);
    }
  }
}

for (const file of configAdapterContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of [
    "runtime",
    "adapter",
    "@needle/adapter-bun",
    "@needle/adapter-node",
    "@needle/adapter-static",
    "dist/adapter.manifest.json",
    "runtime.name",
  ]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing config/adapter contract term: ${term}.`);
    }
  }
}

for (const file of adapterContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of [
    "@needle/adapter-bun",
    "@needle/adapter-node",
    "@needle/adapter-static",
    "dist/routes.manifest.json",
    "dist/render.manifest.json",
    "dist/seo.report.json",
    "dist/adapter.manifest.json",
    "runtime.name",
    "capabilities",
    "nativeroutedispatch",
    "bun.serve",
    "health endpoint",
    "static export",
    "adapter_",
    "compression",
    "early hints",
    "resourcehints",
    "bfcache",
  ]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing adapter contract term: ${term}.`);
    }
  }
}

for (const file of configEnvironmentContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["server-only", "public prefix", ".env*", "secret", "generated artifacts", "diagnostics"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing config environment contract term: ${term}.`);
    }
  }
}

for (const file of diagnosticContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["severity", "info", "warning", "error", "deterministic", "stable ordering", "code", "message", "remediation", "docs"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing diagnostics contract term: ${term}.`);
    }
  }
}

for (const file of cacheContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["cache-control", "cache tags", "revalidatetag", "micro-cache", "no-store", "diagnostics", "generated manifests", "secrets"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing cache contract term: ${term}.`);
    }
  }
}

for (const file of seoContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["definemeta", "generatemeta", "sitemap", "robots", "structured data", "canonical", ".needle/seo.report.json", "severity", "meaningful initial html", "client-only"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing SEO contract term: ${term}.`);
    }
  }
}

for (const file of accessibilityContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["wcag 2.2 aa", "semantic html", "keyboard", "visible focus", "route focus", "form errors", "a11y_", "diagnostics", "testing evidence", "conformance claim"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing accessibility contract term: ${term}.`);
    }
  }
}

for (const file of securityContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["high-risk", "threat model", "secret", "production error", "security headers", "vulnerability", "advisory", "provenance", "supply chain", "human sign-off", "testing evidence"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing security contract term: ${term}.`);
    }
  }
}

for (const file of performanceContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["core web vitals", "lcp", "inp", "cls", ".needle/perf.report.json", "perf_", "budget", "benchmark evidence", "delivery", "chunk count", "source-map", "rum", "field data", "resource hints", "early hints", "compression", "bfcache"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing performance contract term: ${term}.`);
    }
  }
}

for (const { file, terms } of speedDecisionContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing speed decision contract term: ${term}.`);
    }
  }
}

for (const file of apiRouteContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["apiroutecontext", "request", "response", "validation_failed", "methods", "api_method", "hot api", "bodylimit", "no-store", "generated manifests", "security", "diagnostics"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing API route contract term: ${term}.`);
    }
  }
}

for (const file of schemaContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["schemaresult", "schemaissue", "inferinput", "inferoutput", "schema_", "openapi", "query coercion", "serializer", "diagnostics", "manifest references"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing schema contract term: ${term}.`);
    }
  }
}

for (const { file, terms } of renderModeContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing render mode contract term: ${term}.`);
    }
  }
}

for (const file of routingContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["app/api/users/[id].ts", "optional catch-all", "unsupported-convention", "route ids", "stable across operating systems"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing routing contract term: ${term}.`);
    }
  }
}

for (const file of statusDefinitionDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of ["current local evidence", "full required checks"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing canonical status definition wording: ${term}.`);
    }
  }
}

for (const file of ["docs/status.md", "docs/documentation-standard.md"]) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const status of canonicalStatusLabels) {
    if (!content.includes(status.definition)) {
      failures.push(`${file} is missing canonical status label definition: ${status.definition}`);
    }
  }
}

for (const file of ["docs/public-frontmatter-standard.md", "docs/public-docs-site-architecture.md"]) {
  if (!existsSync(join(root, file))) continue;
  const publicFrontmatter = read(file);
  for (const status of canonicalStatusLabels) {
    if (!publicFrontmatter.includes(`\`${status.publicValue}\``)) {
      failures.push(`${file} is missing public status value: ${status.publicValue}.`);
    }
  }
}

for (const file of ["docs/cli-json-contract.md", "docs/public/reference/cli.md"]) {
  if (!existsSync(join(root, file))) continue;
  const cliJsonContract = read(file);
  for (const command of plannedJsonCommandContracts) {
    if (!cliJsonContract.includes(command)) {
      failures.push(`${file} does not document planned JSON command contract: ${command}.`);
    }
  }
}

for (const file of generatedArtifactDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const artifact of canonicalGeneratedArtifacts) {
    if (!content.includes(artifact)) {
      failures.push(`${file} does not document canonical generated artifact: ${artifact}.`);
    }
  }
}

for (const file of generatedArtifactRuleDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of ["schema version", "normalized paths", "stable ordering", "source inputs", "absolute local paths"]) {
    if (!content.toLowerCase().includes(term)) {
      failures.push(`${file} is missing generated artifact contract rule: ${term}.`);
    }
  }
}

for (const { file, terms } of machineReadableDocsContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing machine-readable docs contract term: ${term}.`);
    }
  }
}

for (const { file, terms } of publicDocsSiteContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing public docs site contract term: ${term}.`);
    }
  }
}

for (const { file, terms } of contributorDocsContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of terms.map((term) => term.toLowerCase())) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing contributor docs contract term: ${term}.`);
    }
  }
}

for (const { file, terms } of reviewEvidenceContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of terms.map((term) => term.toLowerCase())) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing review evidence contract term: ${term}.`);
    }
  }
}

for (const { file, terms } of documentationMatrixStatusDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of terms.map((term) => term.toLowerCase())) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing documentation matrix status-distinction term: ${term}.`);
    }
  }
}

for (const { file, terms } of releaseVersionContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of terms.map((term) => term.toLowerCase())) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing release-version contract term: ${term}.`);
    }
  }
}

for (const file of historicalAuditDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  const containsPreScaffoldHistory =
    content.includes("had no bun workspace") ||
    content.includes("had no package scaffold") ||
    content.includes("had not scaffolded package scripts");
  if (containsPreScaffoldHistory) {
    failures.push(`${file} includes pre-scaffold verification history; report the current scaffold gates instead.`);
  }
}

for (const { file, terms } of prototypeScopeTerms) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} does not distinguish prototype scope with required term: ${term}.`);
    }
  }
}

for (const { file, terms } of generatedAppScriptDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} does not align generated app package scripts with framework command term: ${term}.`);
    }
  }
}

for (const file of safeEditContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["dry-run", "ast", "format", "affected checks", ".needle/mutations.json", "undo", "human sign-off"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing safe-edit contract term: ${term}.`);
    }
  }
}

for (const file of ["docs/package-map.md", "docs/phase-1-build-plan.md"]) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const spec of packageSpecs) {
    if (!content.includes(spec.path)) {
      failures.push(`${file} does not document package path ${spec.path}.`);
    }
    if (!content.includes(spec.name)) {
      failures.push(`${file} does not document package name ${spec.name}.`);
    }
  }
}

if (existsSync(join(root, "docs/task-backlog.md"))) {
  const backlog = read("docs/task-backlog.md");
  for (const spec of packageSpecs) {
    if (!backlog.includes(spec.name)) {
      failures.push(`docs/task-backlog.md does not include package name ${spec.name}.`);
    }
  }
}

for (const file of coreModelDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const typeName of coreModelTypes) {
    if (!content.includes(typeName)) {
      failures.push(`${file} does not document shared core type ${typeName}.`);
    }
  }
}

for (const { file, terms } of sharedCoreScaffoldTerms) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const requiredTerm of terms) {
    if (!content.includes(requiredTerm)) {
      failures.push(`${file} does not document the current shared-core scaffold term: ${requiredTerm}.`);
    }
  }
}

const publicReadme = read("docs/public/README.md");
const publicDocsLanding = read("docs/public/docs.md");
const websiteContentMap = read("docs/website-content-map.md");
for (const publicDoc of allPublicDocs()) {
  if (publicDoc === "docs/public/README.md") continue;
  const publicRelative = publicDoc.slice("docs/public/".length);
  if (!publicReadme.includes(publicRelative)) {
    failures.push(`docs/public/README.md does not list public page: ${publicRelative}`);
  }
  if (!websiteContentMap.includes(publicDoc)) {
    failures.push(`docs/website-content-map.md does not map public page: ${publicDoc}`);
  }
  if (!["docs.md", "index.md"].includes(publicRelative) && !publicDocsLanding.includes(publicRelative)) {
    failures.push(`docs/public/docs.md does not link public docs page: ${publicRelative}`);
  }
}

for (const publicDoc of allPublicDocs()) {
  const content = read(publicDoc);
  if (!/^## Source(?: Of Truth)?\s*$/m.test(content)) {
    failures.push(`${publicDoc} must include a public source section named ## Source or ## Source Of Truth.`);
  }
}

for (const publicDoc of allPublicDocs()) {
  const content = read(publicDoc);
  const fileDir = dirname(join(root, publicDoc));
  const matches = content.matchAll(/\[[^\]]+\]\(([^)#][^)]*)\)/g);

  for (const match of matches) {
    const target = match[1].trim();
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(target)) continue;

    const pathOnly = target.split("#")[0];
    if (!pathOnly || !pathOnly.endsWith(".md")) continue;

    const resolved = resolve(fileDir, pathOnly);
    const targetRel = rel(resolved);
    if (targetRel.startsWith("docs/public/")) continue;

    if (!websiteContentMap.includes(targetRel)) {
      failures.push(`docs/website-content-map.md does not list public source link: ${targetRel}`);
    }
  }
}

const docsHub = read("docs/README.md");
for (const rootDoc of rootDocsWithMetadata) {
  const topMatter = read(rootDoc).split(/\r?\n/).slice(0, 8).join("\n");
  if (!/^Status:/m.test(topMatter)) {
    failures.push(`${rootDoc} has no top-level status.`);
  }
  if (!/^Audience:/m.test(topMatter)) {
    failures.push(`${rootDoc} has no top-level audience.`);
  }
}

for (const doc of walkMarkdown(join(root, "docs")).map((path) => rel(path))) {
  const topMatter = read(doc).split(/\r?\n/).slice(0, 8).join("\n");
  if (!/^Status:/m.test(topMatter)) {
    failures.push(`${doc} has no top-level status.`);
  }
  if (!/^Audience:/m.test(topMatter)) {
    failures.push(`${doc} has no top-level audience.`);
  }
}

for (const internalDoc of allDurableInternalDocs()) {
  if (internalDoc === "docs/README.md") continue;
  const hubTarget = internalDoc.slice("docs/".length);
  if (!docsHub.includes(hubTarget)) {
    failures.push(`docs/README.md does not list durable internal doc: ${hubTarget}`);
  }
}

for (const dir of ["docs/prompts", "docs/skills", "docs/subagents", "docs/checklists", "docs/decisions"]) {
  requireDirectoryIndexCoverage(dir);
}

for (const doc of requiredEntryLinks) {
  const plain = doc.replaceAll("\\", "/");
  const markdownTarget = plain.startsWith("docs/") ? plain.slice("docs/".length) : plain;
  const readmeHasLink = read("README.md").includes(plain);
  const docsHubHasLink = read("docs/README.md").includes(markdownTarget);
  const agentsHasRule = read("AGENTS.md").includes(plain);

  if (!readmeHasLink) failures.push(`README.md does not link ${plain}`);
  if (!docsHubHasLink) failures.push(`docs/README.md does not link ${markdownTarget}`);
  if (!agentsHasRule) failures.push(`AGENTS.md does not mention ${plain}`);
}

for (const file of walkMarkdown(root)) {
  const content = readFileSync(file, "utf8");
  const fileDir = dirname(file);
  const matches = content.matchAll(/\[[^\]]+\]\(([^)#][^)]*)\)/g);
  const fileRel = rel(file);

  for (const statusMatch of content.matchAll(/^Status:\s+(.+)$/gm)) {
    const status = statusMatch[1].trim();
    if (allowedTopLevelStatuses.includes(status)) continue;
    failures.push(
      `${fileRel} has non-standard status "${status}"; use one of ${allowedTopLevelStatuses.join(", ")}`,
    );
  }

  if (/(^|\s)bun needle\b/.test(content)) {
    failures.push(`${fileRel} uses stale command prefix "bun needle"; document planned CLI commands as "needle ...".`);
  }

  for (const match of matches) {
    const target = match[1]?.trim();
    if (!target || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(target)) continue;
    const pathOnly = target.split("#")[0];
    if (!pathOnly) continue;
    const resolved = resolve(fileDir, pathOnly);
    if (!existsSync(resolved)) {
      failures.push(`${fileRel} has broken local link: ${target}`);
    }
  }
}

const docsVerification = read("docs/docs-verification.md");
for (const term of [
  "Root Playbook Placement Check",
  "Navigation Coverage Check",
  "Status Language Check",
  "Package And Prototype Scope Check",
  "Review, Threat, Fixture, Example, And Docs-Site Check",
]) {
  if (!docsVerification.includes(term)) {
    failures.push(`docs/docs-verification.md is missing check section: ${term}`);
  }
}

if (failures.length) {
  console.error("Documentation checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Documentation checks passed.");
