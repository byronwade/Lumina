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
  "docs/agent-enforcement.md",
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
  "docs/agent-enforcement.md",
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
  "docs/agent-enforcement.md",
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
  "docs/lumina-map.md",
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
  { path: "packages/create-lumina", name: "create-lumina" },
  { path: "packages/cli", name: "@lumina/cli" },
  { path: "packages/core", name: "@lumina/core" },
  { path: "packages/compiler", name: "@lumina/compiler" },
  { path: "packages/vite-plugin", name: "@lumina/vite-plugin" },
  { path: "packages/react", name: "@lumina/react" },
  { path: "packages/router", name: "@lumina/router" },
  { path: "packages/seo", name: "@lumina/seo" },
  { path: "packages/map", name: "@lumina/map" },
  { path: "packages/agent", name: "@lumina/agent" },
  { path: "packages/mcp", name: "@lumina/mcp" },
  { path: "packages/cache", name: "@lumina/cache" },
  { path: "packages/schema", name: "@lumina/schema" },
  { path: "packages/devtools", name: "@lumina/devtools" },
  { path: "packages/adapters/bun", name: "@lumina/adapter-bun" },
  { path: "packages/adapters/node", name: "@lumina/adapter-node" },
  { path: "packages/adapters/static", name: "@lumina/adapter-static" },
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
];

const plannedLuminaCommandDocs = [
  "README.md",
  "AGENTS.md",
  "docs/cli.md",
  "docs/api-reference.md",
  "docs/getting-started.md",
  "docs/package-map.md",
  "docs/public/reference/cli.md",
];

const plannedJsonCommandContracts = [
  "lumina build --json",
  "lumina routes --json",
  "lumina inspect --json",
  "lumina check --json",
  "lumina seo --json",
  "lumina map --json",
  "lumina agent context --json",
  "lumina edit --json",
  "lumina migrate --json",
  "lumina bench --json",
];

const plannedCommandVariants = [
  "lumina inspect why",
  "lumina map file",
  "lumina map route",
  "lumina map affected",
  "lumina map explain",
  "lumina agent init",
  "lumina agent context",
  "lumina agent task",
  "lumina agent plan",
  "lumina agent apply",
  "lumina agent log",
  "lumina edit undo",
  "lumina migrate from-next",
  "lumina seo --route",
  "lumina seo --sitemap",
  "lumina seo --strict",
];

const plannedCommandVariantDocs = [
  "docs/cli.md",
  "docs/public/reference/cli.md",
];

const plannedMapCommandSurfaces = [
  "lumina map",
  "lumina map --json",
  "lumina map file",
  "lumina map route",
  "lumina map affected",
  "lumina map explain",
];

const plannedMapCommandDocs = [
  "docs/lumina-map.md",
  "docs/public/guides/lumina-map.md",
];

const plannedMcpReadTools = [
  "list_routes",
  "get_route",
  "get_route_context",
  "get_related_files",
  "get_impact_map",
  "get_component_contract",
  "get_schema",
  "get_seo_report",
  "get_perf_report",
  "get_cache_report",
];

const plannedMcpReadToolDocs = [
  "docs/mcp-server.md",
  "docs/public/reference/mcp.md",
];

const plannedMcpWriteTools = [
  "create_page",
  "create_api_route",
  "edit_route_meta",
  "edit_component_contract",
  "add_component_to_route",
  "run_affected_checks",
  "apply_safe_patch",
  "read_agent_log",
  "get_mutation",
  "undo_mutation",
];

const plannedMcpWriteToolDocs = [
  "docs/mcp-server.md",
  "docs/public/reference/mcp.md",
];

const plannedMcpResources = [
  "lumina://routes",
  "lumina://route/%2Fpricing",
  "lumina://map/file/components%2FProductCard.tsx",
  "lumina://seo/report",
  "lumina://perf/report",
  "lumina://context/public",
];

const plannedMcpResourceDocs = [
  "docs/mcp-server.md",
  "docs/public/reference/mcp.md",
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
  ".lumina/routes.json",
  ".lumina/render-manifest.json",
  ".lumina/map.json",
  ".lumina/graph.json",
  ".lumina/seo.report.json",
  ".lumina/perf.report.json",
  ".lumina/context/*.ctx.json",
  ".lumina/context/agent-index.json",
  ".lumina/mutations.json",
  ".lumina/generated/*",
  "dist/routes.manifest.json",
  "dist/render.manifest.json",
  "dist/seo.report.json",
  "dist/adapter.manifest.json",
  "dist/*",
];

const plannedAgentContextArtifacts = [
  ".lumina/context/*.ctx.json",
  ".lumina/context/agent-index.json",
];

const plannedAgentContextArtifactDocs = [
  "docs/agent-kernel.md",
  "docs/machine-readable-docs.md",
  "docs/public/guides/agent-context.md",
];

const publicProjectStructureGeneratedTreeTerms = [
  "context/",
  "*.ctx.json",
  "agent-index.json",
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

const manifestSourceContractDocs = [
  "docs/manifest-contracts.md",
  "docs/public/reference/manifest-contracts.md",
];

const manifestSourceContractTerms = [
  "Routing Contract",
  "API Route Contract",
  "Schema Contract",
  "Cache Contract",
  "SEO Contract",
  "Performance Contract",
  "Diagnostics Contract",
];

const machineReadableDocsContractDocs = [
  {
    file: "docs/machine-readable-docs.md",
    terms: ["llms.txt", "llms-full.txt", "docs-index.json", "schemaversion", "generatedat", "deterministic", "production runtime bundles", "compiler source contract", "agent source contract", "deployment-shaped `dist/*` copies"],
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

const agentEnforcementContractDocs = [
  {
    file: "docs/agent-enforcement.md",
    terms: [
      "Agent Enforcement Matrix",
      "bun run docs:check",
      "bun run structure:check",
      "bun run performance:check",
      "bun run typecheck",
      "bun test",
      "bun run check",
      "planned, scaffolded, implemented, and verified",
      "Performance claims",
      "Root `skills/` and `subagents/` directories are forbidden",
      "AI skill playbooks live under `docs/skills/`",
      "AI subagent role briefs live under `docs/subagents/`",
    ],
  },
  {
    file: "README.md",
    terms: ["docs/agent-enforcement.md"],
  },
  {
    file: "AGENTS.md",
    terms: ["docs/agent-enforcement.md"],
  },
  {
    file: "docs/product-build-readiness.md",
    terms: ["Agent Enforcement Matrix"],
  },
  {
    file: "docs/docs-maintenance-checklist.md",
    terms: ["docs/agent-enforcement.md"],
  },
  {
    file: "docs/docs-verification.md",
    terms: ["Agent Enforcement Matrix Check"],
  },
];

const productIdentityDocs = [
  {
    file: "README.md",
    terms: ["app-graph-native, SEO-first React framework", "humans and AI agents", "semantic app graph", "Your app ships with a map", "Build like Next.js", "Type like TanStack Start"],
  },
  {
    file: "AGENTS.md",
    terms: ["app-graph-native, SEO-first React framework", "humans and AI agents"],
  },
  {
    file: "VISION.md",
    terms: ["app-graph-native, SEO-first React framework", "humans and AI agents", "semantic map", "Build like Next.js", "Type like TanStack Start"],
  },
  {
    file: "docs/product-strategy.md",
    terms: ["app-graph-native, SEO-first React framework", "humans and AI agents", "Semantic app graph"],
  },
  {
    file: "docs/public/index.md",
    terms: ["app-graph-native, SEO-first React framework", "humans and AI agents", "Your app ships with a map"],
  },
  {
    file: "docs/glossary.md",
    terms: ["App-Graph-Native", "semantic app graph", "first-class product primitive"],
  },
];

const publicScaffoldStatusDocs = [
  {
    file: "docs/getting-started.md",
    terms: ["Bun workspace", "package placeholders", "shared core types", "CI", "enforcement scripts", "does not yet contain CLI behavior"],
  },
  {
    file: "docs/public/index.md",
    terms: ["Bun workspace", "package placeholders", "shared core types", "CI", "enforcement scripts", "framework runtime behavior is still planned"],
  },
  {
    file: "docs/public/guides/create-app.md",
    terms: ["Bun workspace", "package placeholders", "shared core types", "CI", "enforcement scripts", "app creation behavior is not implemented yet"],
  },
  {
    file: "docs/public/roadmap.md",
    terms: ["Bun workspace", "package placeholders", "shared core types", "CI", "enforcement scripts", "Runtime implementation is still planned"],
  },
];

const publicAgentWorkflowLabelDocs = [
  {
    file: "docs/public/README.md",
    terms: ["Agent-Safe Workflows", "concepts/agent-native.md"],
  },
  {
    file: "docs/public/docs.md",
    terms: ["Agent-Safe Workflows", "concepts/agent-native.md"],
  },
  {
    file: "docs/public/index.md",
    terms: ["Agent-Safe Workflows", "concepts/agent-native.md"],
  },
  {
    file: "docs/public/concepts/agent-native.md",
    terms: ["# Agent-Safe Workflows", "app-graph-native framework core", "App-local `AGENTS.md` generation"],
  },
  {
    file: "docs/website-content-map.md",
    terms: ["Agent-safe workflows", "docs/public/concepts/agent-native.md"],
  },
  {
    file: "docs/docs-verification.md",
    terms: ["Agent-Safe Workflows", "older agent-native product wording"],
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

const documentationCompletionCoverageDocs = [
  {
    file: "docs/documentation-completion-audit.md",
    terms: [
      "documentation coverage only",
      "not describe implemented framework behavior",
      "Covered as documentation",
      "Covered as planned documentation",
      "Phase 1 scaffold",
      "Documentation Evidence Summary",
      "Documentation Coverage Judgment",
    ],
  },
];

const releaseVersionContractDocs = [
  {
    file: "README.md",
    terms: ["0.0.0", "private scaffold placeholder", "not release tags", "published package versions", "compatibility guarantees"],
  },
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
    terms: ["first public prototype", "first working slice", "adapter-aware server output", "documented Node/static paths", "Demonstrate Bun default with documented Node/static paths"],
  },
  {
    file: "docs/public/roadmap.md",
    terms: [
      "first public prototype",
      "first working slice",
      "first working slice is intended to prove create app, SEO-safe pages, `@lumina/adapter-bun` serving, a basic map, agent inspection, and safe metadata edit",
      "public prototype expands that slice into API routes, hot API, read-only MCP tools, adapter-aware server output, and documented Node/static paths",
      "Bun adapter output with documented Node/static paths",
    ],
  },
  {
    file: "docs/roadmap.md",
    terms: ["first public prototype", "first working slice", "planned acceptance criteria", "adapter-aware server output, and documented Node/static paths"],
  },
  {
    file: "docs/task-backlog.md",
    terms: ["planned acceptance criteria"],
  },
];

const currentImplementationStepDocs = [
  {
    file: "README.md",
    terms: ["The next implementation stage is Phase 1A: expand and stabilize the shared core data model, then begin route discovery."],
  },
  {
    file: "docs/status.md",
    terms: ["The next implementation step is Phase 1A: expand and stabilize the shared core data model, then begin route discovery."],
  },
  {
    file: "docs/roadmap.md",
    terms: ["The next implementation stage is Phase 1A: expand and stabilize the shared core data model, then begin route discovery."],
  },
  {
    file: "docs/public/roadmap.md",
    terms: ["The next implementation stage is Phase 1A: expand and stabilize the shared core data model, then begin route discovery."],
  },
  {
    file: "docs/product-build-readiness.md",
    terms: ["Phase 1A expands and stabilizes the shared core data model, then begins route discovery."],
  },
  {
    file: "docs/task-backlog.md",
    terms: ["Current implementation path: Phase 1A expands and stabilizes the shared core data model, then begins route discovery."],
  },
];

const featureSchedulingGateDocs = [
  {
    file: "docs/compiler-ir.md",
    terms: ["Does it improve Lumina Map or the Agent Kernel?", "minimal production runtime code", "planned acceptance criteria", "tests and an agent demo"],
  },
  {
    file: "docs/risk-mitigation.md",
    terms: ["Does it improve Lumina Map or the Agent Kernel?", "minimal production runtime code", "planned acceptance criteria", "tests and an agent demo"],
  },
];

const generatedAppScriptDocs = [
  {
    file: "docs/getting-started.md",
    terms: ["bun run dev", "bun run build", "bun run start", "lumina dev", "lumina build", "lumina start", "call"],
  },
  {
    file: "docs/public/guides/create-app.md",
    terms: ["bun run dev", "bun run build", "bun run start", "lumina dev", "lumina build", "lumina start", "call"],
  },
  {
    file: "docs/examples-contract.md",
    terms: ["generated app package scripts", "bun run dev", "bun run build", "bun run start", "lumina dev", "lumina build", "lumina start"],
  },
];

const publicGuideImplementationStatusDocs = [
  {
    file: "docs/public/guides/agent-context.md",
    terms: ["planned agent context workflow", "not implemented yet"],
  },
  {
    file: "docs/public/guides/api-route.md",
    terms: ["planned API route workflow", "not implemented yet"],
  },
  {
    file: "docs/public/guides/create-app.md",
    terms: ["target app creation flow", "not implemented yet"],
  },
  {
    file: "docs/public/guides/hot-api.md",
    terms: ["planned hot API route workflow", "not implemented yet"],
  },
  {
    file: "docs/public/guides/lumina-map.md",
    terms: ["planned workflow for inspecting the app graph", "not implemented yet"],
  },
  {
    file: "docs/public/guides/seo-metadata.md",
    terms: ["planned workflow for adding route metadata", "not implemented yet"],
  },
  {
    file: "docs/public/guides/static-page.md",
    terms: ["planned workflow for adding a static public page", "not implemented yet"],
  },
];

const safeEditContractDocs = [
  "AGENTS.md",
  "docs/safe-edit-transactions.md",
  "docs/agent-kernel.md",
  "docs/mcp-server.md",
  "docs/public/concepts/safe-edits.md",
];

const safeEditTransactionResultDocs = [
  "docs/safe-edit-transactions.md",
  "docs/mcp-server.md",
  "docs/public/concepts/safe-edits.md",
];

const safeEditTransactionResultTerms = [
  "mutation id",
  "risk tier",
  "affected files",
  "affected routes",
  "checks",
  "rollback availability",
];

const coreModelTypes = [
  "LuminaApp",
  "RouteNode",
  "GraphEdge",
  "LuminaDiagnostic",
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
    terms: ["@lumina/core", "CachePlan", "no-store", "public", "ttlSeconds", "staleWhileRevalidateSeconds"],
  },
  {
    file: "docs/public/reference/cache.md",
    terms: ["@lumina/core", "CachePlan", "no-store", "public", "ttlSeconds", "staleWhileRevalidateSeconds"],
  },
  {
    file: "docs/compiler-ir.md",
    terms: ["@lumina/core", "LuminaApp", "RouteNode", "RenderMode", "sourceFile", "client-only", "hot-api"],
  },
  {
    file: "docs/api-reference.md",
    terms: ["@lumina/core", "RenderMode", "\"static\"", "\"prerender\"", "\"ssr\"", "\"stream\"", "\"client-only\"", "\"api\"", "\"hot-api\""],
  },
  {
    file: "docs/public/reference/render-modes.md",
    terms: ["@lumina/core", "RenderMode", "\"static\"", "\"prerender\"", "\"ssr\"", "\"stream\"", "\"client-only\"", "\"api\"", "\"hot-api\""],
  },
  {
    file: "docs/diagnostics-contract.md",
    terms: ["@lumina/core", "LuminaDiagnostic", "severity", "info", "warning", "error", "docsUrl"],
  },
  {
    file: "docs/public/reference/diagnostics.md",
    terms: ["@lumina/core", "LuminaDiagnostic", "severity", "info", "warning", "error", "docsUrl"],
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

const runtimeImplementationStatusDocs = [
  {
    file: "docs/runtime-contract.md",
    terms: ["planned runtime contract", "Runtime behavior is not implemented yet"],
  },
];

const adapterBehaviorStatusDocs = [
  {
    file: "README.md",
    terms: ["runtime adapter behavior", "package placeholders"],
  },
  {
    file: "AGENTS.md",
    terms: ["runtime adapter behavior", "config/adapter contract terms"],
  },
  {
    file: "docs/status.md",
    terms: ["Package placeholders under `packages/` and `packages/adapters/`", "Runtime adapter behavior"],
  },
  {
    file: "docs/agent-enforcement.md",
    terms: ["runtime adapter behavior", "Package structure"],
  },
  {
    file: "docs/public/reference/testing.md",
    terms: ["runtime adapter behavior", "Phase 1 scaffold"],
  },
  {
    file: "docs/docs-verification.md",
    terms: ["scaffolded adapter packages", "unimplemented runtime adapter behavior"],
  },
];

const plannedOverviewImplementationStatusDocs = [
  {
    file: "docs/cache.md",
    terms: ["planned cache overview", "Cache behavior is not implemented yet"],
  },
  {
    file: "docs/lumina-map.md",
    terms: ["planned Lumina Map behavior", "Lumina Map generation is not implemented yet"],
  },
  {
    file: "docs/safe-edit-transactions.md",
    terms: ["planned safe edit transaction model", "Safe edit behavior is not implemented yet"],
  },
  {
    file: "docs/agent-kernel.md",
    terms: ["planned Agent Kernel behavior", "Agent Kernel behavior is not implemented yet"],
  },
  {
    file: "docs/mcp-server.md",
    terms: ["planned MCP server behavior", "MCP server behavior is not implemented yet"],
  },
  {
    file: "docs/public/reference/mcp.md",
    terms: ["MCP server behavior is not implemented yet"],
  },
];

const publicApiDraftImplementationStatusDocs = [
  {
    file: "README.md",
    terms: ["These examples are planned API design", "not implemented or verified behavior"],
  },
  {
    file: "docs/hot-api-path.md",
    terms: ["This API is planned and not implemented yet."],
  },
  {
    file: "docs/seo-engine.md",
    terms: ["This API is planned and not implemented yet."],
  },
  {
    file: "docs/cache-contract.md",
    terms: ["Cache APIs are not final"],
  },
];

const configEnvironmentContractDocs = [
  "docs/config-contract.md",
  "docs/config.md",
  "docs/public/reference/config.md",
];

const normalizedConfigContractTerms = [
  "schemaVersion",
  "root",
  "runtime",
  "adapter",
  "outDir",
  "luminaDir",
  "mode",
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
    terms: ["rendermode", ".lumina/render-manifest.json", "rendermanifest", "\"static\"", "\"prerender\"", "\"ssr\"", "\"stream\"", "\"client-only\"", "\"api\"", "\"hot-api\""],
  },
  {
    file: "docs/api-reference.md",
    terms: ["staticpage()", "prerender()", "ssr()", "stream()", "clientonly()", "apihot()", "rendermode: \"api\"", "rendermode: \"hot-api\""],
  },
  {
    file: "docs/runtime-contract.md",
    terms: ["render mode", ".lumina/render-manifest.json", "dist/render.manifest.json", "static asset", "prerendered html", "\"static\"", "\"prerender\"", "\"ssr\"", "\"stream\"", "\"client-only\"", "\"api\"", "\"hot-api\""],
  },
  {
    file: "docs/roadmap.md",
    terms: ["staticpage()", "prerender()", "ssr()", "stream()", "clientonly()", "apihot()", "rendermode"],
  },
  {
    file: "docs/public/reference/render-modes.md",
    terms: ["@lumina/core", "rendermode", ".lumina/render-manifest.json", "staticpage()", "prerender()", "ssr()", "stream()", "clientonly()", "apihot()", "\"static\"", "\"prerender\"", "\"ssr\"", "\"stream\"", "\"client-only\"", "\"api\"", "\"hot-api\""],
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

const statusMappingDocs = [
  "docs/status.md",
  "docs/documentation-standard.md",
  "docs/public-frontmatter-standard.md",
  "docs/public-docs-site-architecture.md",
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
    pattern: /Lumina keeps framework intelligence in the compiler and keeps production runtime adapters small\./i,
    message: "docs/public/concepts/compiler-runtime.md should describe the compiler/runtime split as planned until implementation exists.",
  },
  {
    file: "docs/status.md",
    pattern: /- Runtime adapters\./i,
    message: "docs/status.md should say runtime adapter behavior is missing, because adapter package placeholders exist.",
  },
  {
    file: "README.md",
    pattern: /runtime adapters, Lumina Map generation/i,
    message: "README.md should distinguish scaffolded adapter packages from unimplemented runtime adapter behavior.",
  },
  {
    file: "AGENTS.md",
    pattern: /CLI runtime behavior, adapters/i,
    message: "AGENTS.md should distinguish CLI behavior and runtime adapter behavior.",
  },
  {
    file: "docs/agent-enforcement.md",
    pattern: /CLI runtime behavior, adapters/i,
    message: "docs/agent-enforcement.md should distinguish CLI behavior and runtime adapter behavior.",
  },
  {
    file: "docs/public/reference/testing.md",
    pattern: /rendering, runtime adapters,/i,
    message: "docs/public/reference/testing.md should say runtime adapter behavior is not proved.",
  },
  {
    file: "docs/public/README.md",
    pattern: /Agent-Native Development/i,
    message: "docs/public/README.md should use the public concept label Agent-Safe Workflows.",
  },
  {
    file: "docs/public/docs.md",
    pattern: /Agent-Native Development/i,
    message: "docs/public/docs.md should use the public concept label Agent-Safe Workflows.",
  },
  {
    file: "docs/public/index.md",
    pattern: /Agent-Native Development/i,
    message: "docs/public/index.md should use the public concept label Agent-Safe Workflows.",
  },
  {
    file: "docs/public/concepts/agent-native.md",
    pattern: /# Agent-Native Development/i,
    message: "docs/public/concepts/agent-native.md should use the public concept title Agent-Safe Workflows.",
  },
  {
    file: "docs/website-content-map.md",
    pattern: /Agent-native development/i,
    message: "docs/website-content-map.md should use the public concept label Agent-safe workflows.",
  },
  {
    file: "README.md",
    pattern: /Agent-native development through stable contracts/i,
    message: "README.md should describe agent-safe workflows, not the older agent-native development wording.",
  },
  {
    file: "AGENTS.md",
    pattern: /Agent-native, human-auditable/i,
    message: "AGENTS.md should describe agent-safe, human-auditable architecture.",
  },
  {
    file: "VISION.md",
    pattern: /### Agent-Native/i,
    message: "VISION.md should use the Agent-Safe Workflows pillar heading.",
  },
  {
    file: "docs/decisions/0003-risk-mitigation-from-day-one.md",
    pattern: /agent-native workflows/i,
    message: "ADR 0003 should describe agent-safe workflows in current risk wording.",
  },
  {
    file: "docs/decisions/0004-vite-rolldown-before-custom-bundler.md",
    pattern: /agent-native wedge/i,
    message: "ADR 0004 should describe the agent-safe workflow wedge.",
  },
  {
    file: "docs/decisions/0007-agent-safe-edits.md",
    pattern: /Lumina is agent-native/i,
    message: "ADR 0007 should tie safe edits to app-graph-native and agent-safe workflow wording.",
  },
  {
    file: "docs/phase-1-build-plan.md",
    pattern: /Package-level placeholder tests where practical/i,
    message: "docs/phase-1-build-plan.md should describe the current root placeholder test coverage instead of implying package-level tests exist.",
  },
  {
    file: "CONTRIBUTING.md",
    pattern: /Bun server runtime details|Bun server details|Bun runtime package/i,
    message: "CONTRIBUTING.md should direct runtime help to @lumina/adapter-bun adapter work, not generic Bun server wording.",
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
    file: "docs/agent-enforcement.md",
    pattern: /Root `skills\/` directories are forbidden|Root `subagents\/` directories are forbidden/i,
    message: "docs/agent-enforcement.md should use the single combined root playbook placement rule.",
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
    file: "docs/public/reference/examples.md",
    pattern: /Fast API path/i,
    message: "docs/public/reference/examples.md should describe the planned hot-api example mechanics without unsupported speed wording.",
  },
  {
    file: "docs/risk-mitigation.md",
    pattern: /--template agent-demo|large-monorepo-fixture|blog-seo-with-map/i,
    message: "docs/risk-mitigation.md should use examples-catalog names and the planned --example create-command flag.",
  },
  {
    file: "docs/examples-contract.md",
    pattern: /```bash[\s\S]*bun run build[\s\S]*lumina build[\s\S]*```/i,
    message: "docs/examples-contract.md should not list bun run build and direct lumina build as separate required example build steps.",
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
    pattern: /\|\s*`\.lumina\/[^`]+`\s*\|\s*Generated app artifact\s*\|/i,
    message: "docs/agent-kernel.md should label .lumina outputs as planned generated app artifacts until implementation exists.",
  },
  {
    file: "docs/agent-kernel.md",
    pattern: /\|\s*`dist\/[^`]+`\s*\|\s*Deployment artifact\s*\|/i,
    message: "docs/agent-kernel.md should label dist outputs as planned deployment artifacts until implementation exists.",
  },
  {
    file: "docs/package-map.md",
    pattern: /\| `@lumina\/agent` \| AGENTS\.md generation/i,
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
    pattern: /Lumina is not yet implemented\./i,
    message: "SECURITY.md should distinguish the scaffold from unimplemented framework security behavior.",
  },
  {
    file: "docs/documentation-audit.md",
    pattern: /exact testing commands once packages exist|Generate docs where possible after packages exist/i,
    message: "docs/documentation-audit.md should distinguish scaffolded packages from implemented package behavior.",
  },
  {
    file: "docs/config-contract.md",
    pattern: /Final config defaults before packages exist|Final config defaults before package implementation/i,
    message: "docs/config-contract.md should tie config defaults to config-loading behavior, not package existence.",
  },
  {
    file: "docs/config.md",
    pattern: /Final config defaults before packages exist|Final config defaults before package implementation/i,
    message: "docs/config.md should tie config defaults to config-loading behavior, not package existence.",
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
    file: "README.md",
    pattern: /The first public prototype proves:|first working slice is smaller and proves/i,
    message: "README.md should use planned prototype wording until the prototype exists.",
  },
  {
    file: "README.md",
    pattern: /Type like TanStack\./i,
    message: "README.md should use the canonical short-form positioning: Type like TanStack Start.",
  },
  {
    file: "docs/prototype-acceptance.md",
    pattern: /The working slice proves/i,
    message: "docs/prototype-acceptance.md should describe the working slice as intended proof until implementation exists.",
  },
  {
    file: "docs/prototype-acceptance.md",
    pattern: /adapter-aware output|Node\/static documentation|Node\/static adapter path documented/i,
    message: "docs/prototype-acceptance.md should use adapter-aware server output and documented Node/static paths wording.",
  },
  {
    file: "docs/public/roadmap.md",
    pattern: /adapter-aware output|Node\/static compatibility path documented|Node\/static adapter path documented/i,
    message: "docs/public/roadmap.md should use adapter-aware server output and documented Node/static paths wording.",
  },
  {
    file: "docs/roadmap.md",
    pattern: /adapter-aware output|Node\/static documentation|Node\/static compatibility path documented|Node\/static adapter path documented/i,
    message: "docs/roadmap.md should use adapter-aware server output and documented Node/static paths wording.",
  },
  {
    file: "docs/roadmap.md",
    pattern: /agent-native and semantic graph wedge|first public prototype focuses on proving/i,
    message: "docs/roadmap.md should distinguish the first working slice from the broader first public prototype scope.",
  },
  {
    file: "docs/decisions/0003-risk-mitigation-from-day-one.md",
    pattern: /\bMVP scope\b|graph and agent wedge/i,
    message: "ADR 0003 should use first-working-slice terminology instead of MVP shorthand.",
  },
  {
    file: "docs/risk-mitigation.md",
    pattern: /Brutal MVP cut|First public prototype ships quickly/i,
    message: "docs/risk-mitigation.md should describe execution scope through the first working slice and map/safe-edit proof.",
  },
  {
    file: "docs/prototype-acceptance.md",
    pattern: /\bbun dev\b|\bbun build\b|\bbun start\b/i,
    message: "docs/prototype-acceptance.md should use generated app script commands with `bun run ...`.",
  },
  {
    file: "docs/getting-started.md",
    pattern: /\bbun dev\b|Add the Bun monorepo scaffold|Add package entrypoints and placeholder tests/i,
    message: "docs/getting-started.md should use current scaffold status and `lumina dev` target command language.",
  },
  {
    file: "docs/public/guides/create-app.md",
    pattern: /\bbun dev\b|remaining scaffold hardening/i,
    message: "docs/public/guides/create-app.md should use `lumina dev` target command language and current scaffold status.",
  },
  {
    file: "docs/getting-started.md",
    pattern: /- A React app starts locally\.|- The home page renders server HTML\.|- Public routes include SEO metadata\.|- `\.lumina\/routes\.json` and `\.lumina\/render-manifest\.json` are generated\.|- Lumina Map and agent context can be inspected\./i,
    message: "docs/getting-started.md should use planned `should` wording for target app results until implementation exists.",
  },
  {
    file: "docs/public/guides/create-app.md",
    pattern: /- A local development server starts\.|- A React page renders\.|- `\.lumina\/routes\.json` and `\.lumina\/render-manifest\.json` are generated\.|- SEO metadata is visible for public pages\.|- Lumina Map and agent context can be inspected\./i,
    message: "docs/public/guides/create-app.md should use planned `should` wording for target app results until implementation exists.",
  },
  {
    file: "README.md",
    pattern: /The framework emits a structured map|The framework generates `\.lumina\/routes\.json`|The framework exposes read-only MCP tools|An AI agent can inspect routes, edit metadata safely/i,
    message: "README.md prototype and differentiator language should use planned `should` wording until framework behavior exists.",
  },
  {
    file: "README.md",
    pattern: /^## Key Features$|^## Core Promise$|^## Differentiators$/m,
    message: "README.md should label planned feature, promise, and differentiator sections as planned until prototype behavior exists.",
  },
  {
    file: "README.md",
    pattern: /public routes ship with|every cacheable route, API, component, or function exposes|Safe edits are AST-based|Public routes ship with metadata|Every route compiles|Selected API routes bypass|Agents use scoped/i,
    message: "README.md public-facing capability language should use planned `should` wording until framework behavior exists.",
  },
  {
    file: "docs/roadmap.md",
    pattern: /- `lumina dev` starts Vite\.|- `virtual:needle\/routes` works\.|- Affected query works from changed file|- `lumina mcp` starts server\.|- `SafeEditTransaction` shape is implemented\./i,
    message: "docs/roadmap.md future acceptance criteria should use planned `should` wording until behavior exists.",
  },
  {
    file: "docs/task-backlog.md",
    pattern: /- Root route SSR works\.|- Static route emits HTML\.|- `list_routes` works\.|- Dry-run diff preview works\.|- Converts simple App Router pages\./i,
    message: "docs/task-backlog.md future acceptance criteria should use planned `should` wording until behavior exists.",
  },
  {
    file: "docs/mcp-server.md",
    pattern: /The Lumina MCP server exposes/i,
    message: "docs/mcp-server.md should describe MCP behavior as planned until MCP tooling exists.",
  },
  {
    file: "docs/mcp-server.md",
    pattern: /^## Definition of Done$/m,
    message: "docs/mcp-server.md should use planned acceptance criteria until MCP behavior exists.",
  },
  {
    file: "docs/hot-api-path.md",
    pattern: /^## Definition of Done$/m,
    message: "docs/hot-api-path.md should use planned acceptance criteria until hot API behavior exists.",
  },
  {
    file: "docs/performance.md",
    pattern: /^## Definition of Done$/m,
    message: "docs/performance.md should use planned acceptance criteria until performance tooling exists.",
  },
  {
    file: "docs/lumina-map.md",
    pattern: /^Definition of done:$/m,
    message: "docs/lumina-map.md should use planned acceptance criteria until Lumina Map behavior exists.",
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
    file: "docs/public/guides/lumina-map.md",
    pattern: /^This guide describes the planned workflow for inspecting the app graph\.$/m,
    message: "docs/public/guides/lumina-map.md should state Lumina Map commands are not implemented yet.",
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
    file: "docs/docs-verification.md",
    pattern: /implementation-sequence/i,
    message: "docs/docs-verification.md references a nonexistent implementation-sequence doc; use the Phase 1 build plan and task backlog.",
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
    file: "README.md",
    pattern: /package-publish stage/i,
    message: "README.md should use package publication stage wording.",
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
    message: "docs/runtime-contract.md uses stale generated artifact names; canonical compiler artifacts live under .lumina/*.",
  },
  {
    file: "docs/phase-1-build-plan.md",
    pattern: /remains a planned runtime package name/i,
    message: "docs/phase-1-build-plan.md should treat @lumina/server-bun as historical, not an active planned package.",
  },
  {
    file: "docs/risk-mitigation.md",
    pattern: /Create `@lumina\/adapters` early|framework runtime packages and adapters/i,
    message: "docs/risk-mitigation.md should use concrete runtime adapter package wording.",
  },
  {
    file: "AGENTS.md",
    pattern: /runtime packages and adapters|unless a later architecture decision reintroduces a separate `@lumina\/server-bun` package/i,
    message: "AGENTS.md should name active adapter packages and treat @lumina/server-bun as ADR-only.",
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
    file: "docs/performance.md",
    pattern: /\bn\/a\s+warn\b/i,
    message: "docs/performance.md should use budget status `warning`, not `warn`.",
  },
  {
    file: "docs/performance-contract.md",
    pattern: /`pass`, `warn`, or `fail`|`warn`, not `warning`/i,
    message: "docs/performance-contract.md should use budget status `warning`, not `warn`.",
  },
  {
    file: "docs/public/reference/performance.md",
    pattern: /`pass`, `warn`, or `fail`|`warn`, not `warning`/i,
    message: "docs/public/reference/performance.md should use budget status `warning`, not `warn`.",
  },
  {
    file: "docs/docs-verification.md",
    pattern: /`pass`, `warn`, or `fail`|`warn`, not `warning`/i,
    message: "docs/docs-verification.md should use budget status `warning`, not `warn`.",
  },
  {
    file: "docs/diagnostics-contract.md",
    pattern: /"level":|`level`|level: "info"|diagnostic code rules, levels/i,
    message: "docs/diagnostics-contract.md should use LuminaDiagnostic severity, not level.",
  },
  {
    file: "docs/cli-json-contract.md",
    pattern: /"level":|`level`|`code`, `level`/i,
    message: "docs/cli-json-contract.md should embed diagnostics with severity, not level.",
  },
  {
    file: "docs/cli-json-contract.md",
    pattern: /LUMINA_ROUTE_CONFLICT/i,
    message: "docs/cli-json-contract.md should use ROUTE_DUPLICATE_PATH for the route-conflict example.",
  },
  {
    file: "docs/cli.md",
    pattern: /Yes for diagnostics/i,
    message: "docs/cli.md should treat lumina build JSON output as a full planned automation contract.",
  },
  {
    file: "docs/cli.md",
    pattern: /\| Command \| Purpose \| JSON output required\? \|/i,
    message: "docs/cli.md should say JSON output is required once implemented while CLI behavior is unimplemented.",
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
    message: "README.md should name .lumina/routes.json and .lumina/render-manifest.json instead of generic route and render manifests.",
  },
  {
    file: "docs/getting-started.md",
    pattern: /route and render manifests/i,
    message: "docs/getting-started.md should name .lumina/routes.json and .lumina/render-manifest.json instead of generic route and render manifests.",
  },
  {
    file: "docs/public/guides/create-app.md",
    pattern: /route and render manifests/i,
    message: "docs/public/guides/create-app.md should name .lumina/routes.json and .lumina/render-manifest.json instead of generic route and render manifests.",
  },
  {
    file: "docs/schema-contract.md",
    pattern: /route and render manifests/i,
    message: "docs/schema-contract.md should name .lumina/routes.json and .lumina/render-manifest.json instead of generic route and render manifests.",
  },
  {
    file: "docs/api-route-contract.md",
    pattern: /render\/runtime manifests/i,
    message: "docs/api-route-contract.md should name exact route and render manifest artifacts.",
  },
  {
    file: "AGENTS.md",
    pattern: /Bun server|Serve through Bun|Adapter-aware Bun server|Bun for runtime paths/i,
    message: "AGENTS.md should describe first-slice Bun serving through @lumina/adapter-bun.",
  },
  {
    file: "README.md",
    pattern: /Bun serving(?! is implemented through `@lumina\/adapter-bun`)|Bun server|Serve through Bun|Adapter-aware Bun server/i,
    message: "README.md should describe prototype Bun serving through @lumina/adapter-bun.",
  },
  {
    file: "VISION.md",
    pattern: /low-level Bun server|Bun server|Serve with Bun|Serve through Bun|Adapter-aware Bun server|Use Bun for low-overhead runtime paths/i,
    message: "VISION.md should describe server execution through the Bun adapter path, not generic Bun server wording.",
  },
  {
    file: "ARCHITECTURE.md",
    pattern: /Bun handles runtime execution|Bun: runtime, package manager, test runner, and production server path|fast runtime path/i,
    message: "ARCHITECTURE.md should describe Bun-specific execution through @lumina/adapter-bun and the default adapter runtime.",
  },
  {
    file: "docs/product-strategy.md",
    pattern: /Bun-first runtime paths/i,
    message: "docs/product-strategy.md should describe Bun-first adapter paths, not generic runtime paths.",
  },
  {
    file: "docs/public/index.md",
    pattern: /Bun-first runtime paths/i,
    message: "docs/public/index.md should describe Bun-first adapter paths, not generic runtime paths.",
  },
  {
    file: "docs/compatibility.md",
    pattern: /Bun default runtime|Bun runtime/i,
    message: "docs/compatibility.md should describe Bun adapter runtime compatibility.",
  },
  {
    file: "docs/roadmap.md",
    pattern: /Bun remains the default runtime/i,
    message: "docs/roadmap.md should describe the Bun adapter as the default production path.",
  },
  {
    file: "docs/decisions/0001-runtime-and-build-split.md",
    pattern: /fast runtime path|default runtime and package\/test tool|Bun provides production request handling|Start with Node runtime instead of Bun/i,
    message: "ADR 0001 should describe Bun production behavior through the adapter model.",
  },
  {
    file: "docs/decisions/0003-risk-mitigation-from-day-one.md",
    pattern: /Bun-speed runtime paths|Bun remains the default, but Node compatibility moves earlier/i,
    message: "ADR 0003 should describe Bun speed through the default adapter path.",
  },
  {
    file: "docs/decisions/0005-bun-default-node-static-adapters.md",
    pattern: /fast default runtime path/i,
    message: "ADR 0005 should describe the fast default adapter path.",
  },
  {
    file: "docs/speed-decisions.md",
    pattern: /fast default runtime path/i,
    message: "docs/speed-decisions.md should describe the fast default adapter path.",
  },
  {
    file: "docs/prototype-acceptance.md",
    pattern: /Bun serving(?! is implemented through `@lumina\/adapter-bun`)|Serve static and SSR routes through Bun|Production Bun server|Bun server|Serve through Bun|Adapter-aware Bun server/i,
    message: "docs/prototype-acceptance.md should describe production serving through @lumina/adapter-bun.",
  },
  {
    file: "docs/public/roadmap.md",
    pattern: /Bun serving(?! is implemented through `@lumina\/adapter-bun`)|Bun server|Serve through Bun|Adapter-aware Bun server/i,
    message: "docs/public/roadmap.md should describe first-slice Bun serving through @lumina/adapter-bun.",
  },
  {
    file: "docs/roadmap.md",
    pattern: /Bun server|Bun Production Server|Bun production server|Adapter-aware Bun production server|Serve through Bun|Adapter-aware Bun server|runnable server bundle/i,
    message: "docs/roadmap.md should describe Bun serving through @lumina/adapter-bun.",
  },
  {
    file: "docs/task-backlog.md",
    pattern: /Bun server|Bun Adapter Server Output|Serve through Bun|Adapter-aware Bun server/i,
    message: "docs/task-backlog.md should describe Bun serving through @lumina/adapter-bun.",
  },
  {
    file: "docs/adapter-contract.md",
    pattern: /Default production server using|Compatibility server using/i,
    message: "docs/adapter-contract.md should describe Bun and Node as adapter paths, not standalone server packages.",
  },
  {
    file: "docs/deployment.md",
    pattern: /default production server path/i,
    message: "docs/deployment.md should describe @lumina/adapter-bun as the default production adapter path.",
  },
  {
    file: "docs/public/reference/adapters.md",
    pattern: /Default production server path|Compatibility server path/i,
    message: "docs/public/reference/adapters.md should describe Bun and Node as adapter paths.",
  },
  {
    file: "docs/risk-mitigation.md",
    pattern: /Bun server|Serve through Bun|Adapter-aware Bun server|Bun-first runtime paths/i,
    message: "docs/risk-mitigation.md should describe first-slice Bun serving through @lumina/adapter-bun.",
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
    file: "docs/assets/lumina-map-data-flow.svg",
    pattern: /map\.manifest\.json|cache\.manifest\.json/i,
    message: "docs/assets/lumina-map-data-flow.svg uses stale generated artifact names.",
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

for (const file of plannedLuminaCommandDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const command of plannedLuminaCommands) {
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

for (const file of plannedMapCommandDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const command of plannedMapCommandSurfaces) {
    if (!content.includes(command)) {
      failures.push(`${file} does not document planned Lumina Map command surface: ${command}.`);
    }
  }
}

for (const file of plannedMcpReadToolDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const tool of plannedMcpReadTools) {
    if (!content.includes(tool)) {
      failures.push(`${file} does not document planned MCP read tool: ${tool}.`);
    }
  }
}

for (const file of plannedMcpWriteToolDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const tool of plannedMcpWriteTools) {
    if (!content.includes(tool)) {
      failures.push(`${file} does not document planned MCP write tool: ${tool}.`);
    }
  }
}

for (const file of plannedMcpResourceDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const resource of plannedMcpResources) {
    if (!content.includes(resource)) {
      failures.push(`${file} does not document planned MCP resource: ${resource}.`);
    }
  }
}

for (const file of plannedAgentContextArtifactDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const artifact of plannedAgentContextArtifacts) {
    if (!content.includes(artifact)) {
      failures.push(`${file} does not document planned agent context artifact: ${artifact}.`);
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
    "@lumina/adapter-bun",
    "@lumina/adapter-node",
    "@lumina/adapter-static",
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
    "@lumina/adapter-bun",
    "@lumina/adapter-node",
    "@lumina/adapter-static",
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
    "adapter behavior is not implemented yet",
  ]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing adapter contract term: ${term}.`);
    }
  }
}

for (const { file, terms } of runtimeImplementationStatusDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing runtime implementation status term: ${term}.`);
    }
  }
}

for (const { file, terms } of adapterBehaviorStatusDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing adapter behavior status term: ${term}.`);
    }
  }
}

for (const { file, terms } of plannedOverviewImplementationStatusDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing planned overview implementation status term: ${term}.`);
    }
  }
}

for (const { file, terms } of publicApiDraftImplementationStatusDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing public API draft implementation status term: ${term}.`);
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

for (const file of configEnvironmentContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of normalizedConfigContractTerms) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing normalized config contract term: ${term}.`);
    }
  }
}

for (const file of diagnosticContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["severity", "info", "warning", "error", "deterministic", "stable ordering", "code", "message", "remediation", "docs", "why", "related", "children", "tags"]) {
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
  for (const term of ["definemeta", "generatemeta", "sitemap", "robots", "structured data", "canonical", ".lumina/seo.report.json", "severity", "meaningful initial html", "client-only"]) {
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
  for (const term of ["core web vitals", "lcp", "inp", "cls", ".lumina/perf.report.json", "perf_", "budget", "benchmark evidence", "delivery", "chunk count", "source-map", "rum", "field data", "resource hints", "early hints", "compression", "bfcache"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing performance contract term: ${term}.`);
    }
  }
}

for (const file of [...performanceContractDocs, "docs/docs-verification.md"]) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["pass", "warning", "fail"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing performance budget status term: ${term}.`);
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

for (const file of statusMappingDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of ["Internal status label", "Public frontmatter value"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing status mapping table heading: ${term}.`);
    }
  }
  for (const status of canonicalStatusLabels) {
    if (!content.includes(`\`${status.title}\``) || !content.includes(`\`${status.publicValue}\``)) {
      failures.push(`${file} is missing status mapping row for ${status.title} -> ${status.publicValue}.`);
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

if (existsSync(join(root, "docs/public/reference/project-structure.md"))) {
  const projectStructure = read("docs/public/reference/project-structure.md");
  for (const term of publicProjectStructureGeneratedTreeTerms) {
    if (!projectStructure.includes(term)) {
      failures.push(`docs/public/reference/project-structure.md generated-files tree is missing: ${term}.`);
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

for (const file of manifestSourceContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of manifestSourceContractTerms) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing manifest source contract link term: ${term}.`);
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

for (const { file, terms } of agentEnforcementContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of terms.map((term) => term.toLowerCase())) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing agent enforcement contract term: ${term}.`);
    }
  }
}

for (const { file, terms } of productIdentityDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of terms.map((term) => term.toLowerCase())) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing product identity term: ${term}.`);
    }
  }
}

for (const { file, terms } of publicScaffoldStatusDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of terms.map((term) => term.toLowerCase())) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing public scaffold status term: ${term}.`);
    }
  }
}

for (const { file, terms } of publicAgentWorkflowLabelDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of terms.map((term) => term.toLowerCase())) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing public agent workflow label term: ${term}.`);
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

for (const { file, terms } of documentationCompletionCoverageDocs) {
  if (!existsSync(join(root, file))) continue;
  const rawContent = read(file);
  const content = rawContent.toLowerCase();
  for (const term of terms) {
    if (!content.includes(term.toLowerCase())) {
      failures.push(`${file} is missing documentation-completion coverage term: ${term}.`);
    }
  }

  if (/\|\s*Status\s*\|/i.test(rawContent) || /\|\s*Satisfied(?: as planned docs)?\s*\|/i.test(rawContent)) {
    failures.push(`${file} must use documentation coverage labels instead of broad completion status labels.`);
  }

  if (/^## Evidence Summary$/m.test(rawContent) || /^## Completion Judgment$/m.test(rawContent)) {
    failures.push(`${file} must use documentation-scoped audit headings, not broad completion headings.`);
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

const canonicalFirstWorkingSlice =
  "first working slice scoped to create app, SEO-safe pages, `@lumina/adapter-bun` serving, a basic map, agent inspection, and safe metadata edit";

if (existsSync(join(root, "docs/roadmap.md"))) {
  const roadmap = read("docs/roadmap.md");
  if (!roadmap.includes(canonicalFirstWorkingSlice)) {
    failures.push(`docs/roadmap.md does not use the canonical first working slice scope: ${canonicalFirstWorkingSlice}.`);
  }
  if (/first working slice centered on compiler IR, route discovery, basic graph, SEO-safe rendering, and a low-risk safe edit/i.test(roadmap)) {
    failures.push("docs/roadmap.md still uses the older compiler-IR-centered first working slice wording.");
  }
}

for (const { file, terms } of currentImplementationStepDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} does not document the current Phase 1A implementation path with required term: ${term}.`);
    }
  }
}

for (const { file, terms } of featureSchedulingGateDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} does not document the feature scheduling gate with required term: ${term}.`);
    }
  }
  if (/clear definition of done with tests and an agent demo/i.test(content)) {
    failures.push(`${file} should describe scheduling gates as planned acceptance criteria, not ambiguous definition-of-done wording.`);
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

for (const { file, terms } of publicGuideImplementationStatusDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const term of terms) {
    if (!content.includes(term)) {
      failures.push(`${file} does not state planned public-guide behavior with required term: ${term}.`);
    }
  }
}

for (const file of safeEditContractDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of ["dry-run", "ast", "format", "affected checks", ".lumina/mutations.json", "undo", "human sign-off"]) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing safe-edit contract term: ${term}.`);
    }
  }
}

for (const file of safeEditTransactionResultDocs) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file).toLowerCase();
  for (const term of safeEditTransactionResultTerms) {
    if (!content.includes(term)) {
      failures.push(`${file} is missing safe-edit transaction result term: ${term}.`);
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

  if (fileRel === "docs/roadmap.md" || fileRel === "docs/task-backlog.md") {
    const lines = content.split(/\r?\n/);
    for (const [index, line] of lines.entries()) {
      if (index < 8) continue;
      if (/^Status:\s+/.test(line)) {
        const scopedLabel = fileRel === "docs/roadmap.md" ? "Phase status:" : "Task status:";
        failures.push(`${fileRel}:${index + 1} should use ${scopedLabel} for embedded planning status fields.`);
      }
    }
  }

  if (/(^|\s)bun needle\b/.test(content)) {
    failures.push(`${fileRel} uses stale command prefix "bun needle"; document planned CLI commands as "lumina ...".`);
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
