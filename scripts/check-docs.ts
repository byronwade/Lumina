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
  "dist/adapter.manifest.json",
  "dist/*",
];

const generatedArtifactDocs = [
  "AGENTS.md",
  "docs/api-reference.md",
  "docs/manifest-contracts.md",
  "docs/public/reference/manifest-contracts.md",
  "docs/public/reference/project-structure.md",
];

const generatedArtifactRuleDocs = [
  "docs/api-reference.md",
  "docs/manifest-contracts.md",
  "docs/public/reference/manifest-contracts.md",
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
    terms: ["first public prototype", "first working slice"],
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
    pattern: /because the repository (has|had) no package scaffold yet/i,
    message: "docs/documentation-audit.md still presents pre-scaffold status as current.",
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

if (existsSync(join(root, "docs/public-frontmatter-standard.md"))) {
  const publicFrontmatter = read("docs/public-frontmatter-standard.md");
  for (const status of canonicalStatusLabels) {
    if (!publicFrontmatter.includes(`\`${status.publicValue}\``)) {
      failures.push(`docs/public-frontmatter-standard.md is missing public status value: ${status.publicValue}.`);
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
