import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const failures: string[] = [];

function read(path: string): string {
  return readFileSync(join(root, path), "utf8");
}

const requiredDocs = [
  "docs/performance-contract.md",
  "docs/speed-strategy.md",
  "docs/speed-decisions.md",
  "docs/speed-capability-audit.md",
  "docs/benchmark-methodology.md",
  "docs/benchmark-fixtures.md",
  "docs/checklists/performance-evidence.md",
];

for (const doc of requiredDocs) {
  if (!existsSync(join(root, doc))) failures.push(`Missing performance doc: ${doc}`);
}

const benchmarkFixtures = read("docs/benchmark-fixtures.md");
for (const fixture of [
  "basic-static",
  "basic-ssr",
  "hot-api",
  "large-route-graph",
  "docs-site",
  "agent-context",
  "safe-edit",
]) {
  if (!benchmarkFixtures.includes(`\`${fixture}\``)) {
    failures.push(`docs/benchmark-fixtures.md is missing fixture: ${fixture}`);
  }
}

const readme = read("README.md");
for (const link of [
  "docs/performance-contract.md",
  "docs/benchmark-fixtures.md",
  "docs/speed-decisions.md",
  "docs/speed-capability-audit.md",
]) {
  if (!readme.includes(link)) failures.push(`README.md does not link ${link}`);
}

const forbiddenPublicClaims = [
  /fastest\s+react\s+framework/i,
  /production-ready\s+performance/i,
  /verified\s+benchmark/i,
  /SEO-perfect/i,
  /Bun-fast/i,
  /answer\s+instantly/i,
  /extremely\s+fast/i,
];

for (const file of [
  "README.md",
  "VISION.md",
  "ARCHITECTURE.md",
  "docs/product-strategy.md",
  "docs/risk-mitigation.md",
  "docs/public/index.md",
  "docs/public/docs.md",
  "docs/public/concepts/speed.md",
  "docs/public/reference/performance.md",
]) {
  if (!existsSync(join(root, file))) continue;
  const content = read(file);
  for (const pattern of forbiddenPublicClaims) {
    if (pattern.test(content)) {
      failures.push(`${file} contains unsupported performance claim: ${pattern}`);
    }
  }
}

if (existsSync(join(root, "benchmarks/results"))) {
  failures.push("benchmarks/results exists before benchmark implementation; document raw evidence rules first.");
}

if (failures.length) {
  console.error("Performance documentation checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Performance documentation checks passed.");
