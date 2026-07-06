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
    file: "docs/speed-capability-audit.md",
    pattern: /Before Phase 1 package scaffold/i,
    message: "docs/speed-capability-audit.md still uses pre-scaffold language.",
  },
  {
    file: "docs/documentation-audit.md",
    pattern: /because the repository has no package scaffold yet/i,
    message: "docs/documentation-audit.md still presents pre-scaffold status as current.",
  },
  {
    file: "README.md",
    pattern: /Planned command once the package exists/i,
    message: "README.md still ties quick start to package existence instead of implemented app creation behavior.",
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
    pattern: /Strong for Phase 0|Replace planned flow with verified tutorial after scaffold|Planned packages only|Update after scaffold|Phase 0 governance/i,
    message: "docs/documentation-audit.md still contains stale pre-scaffold audit wording.",
  },
  {
    file: "docs/documentation-matrix.md",
    pattern: /when scaffold exists|after scaffold lands|until package scripts exist/i,
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

for (const staleTreeEntry of ["    adapter-bun/", "    adapter-node/", "    adapter-static/"]) {
  if (readme.includes(staleTreeEntry)) {
    failures.push(`README.md still documents stale flat adapter path: ${staleTreeEntry.trim()}`);
  }
}

for (const file of ["README.md", "docs/status.md", "docs/phase-1-build-plan.md", "docs/task-backlog.md"]) {
  if (existsSync(join(root, file)) && /`bun\.lock`/.test(read(file))) {
    failures.push(`${file} documents bun.lock, but this scaffold uses bun.lockb.`);
  }
}

const publicReadme = read("docs/public/README.md");
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
}

const docsHub = read("docs/README.md");
for (const internalDoc of allDurableInternalDocs()) {
  if (internalDoc === "docs/README.md") continue;
  const hubTarget = internalDoc.slice("docs/".length);
  if (!docsHub.includes(hubTarget)) {
    failures.push(`docs/README.md does not list durable internal doc: ${hubTarget}`);
  }

  const topMatter = read(internalDoc).split(/\r?\n/).slice(0, 8).join("\n");
  if (/^Status:/m.test(topMatter) && !/^Audience:/m.test(topMatter)) {
    failures.push(`${internalDoc} has top-level status but no top-level audience.`);
  }
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

  for (const match of matches) {
    const target = match[1]?.trim();
    if (!target || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(target)) continue;
    const pathOnly = target.split("#")[0];
    if (!pathOnly) continue;
    const resolved = resolve(fileDir, pathOnly);
    if (!existsSync(resolved)) {
      failures.push(`${rel(file)} has broken local link: ${target}`);
    }
  }
}

const docsVerification = read("docs/docs-verification.md");
for (const term of [
  "Root Playbook Placement Check",
  "Navigation Coverage Check",
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
