import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

type PackageSpec = {
  path: string;
  name: string;
  runtime?: boolean;
};

const root = resolve(import.meta.dir, "..");
const failures: string[] = [];
const sharedCoreTypes = [
  "NeedleApp",
  "RouteNode",
  "GraphEdge",
  "NeedleDiagnostic",
  "RenderMode",
  "CachePlan",
  "AdapterManifest",
];

const packages: PackageSpec[] = [
  { path: "packages/create-needle", name: "create-needle" },
  { path: "packages/cli", name: "@needle/cli" },
  { path: "packages/core", name: "@needle/core" },
  { path: "packages/compiler", name: "@needle/compiler" },
  { path: "packages/vite-plugin", name: "@needle/vite-plugin" },
  { path: "packages/react", name: "@needle/react" },
  { path: "packages/router", name: "@needle/router", runtime: true },
  { path: "packages/seo", name: "@needle/seo" },
  { path: "packages/map", name: "@needle/map" },
  { path: "packages/agent", name: "@needle/agent" },
  { path: "packages/mcp", name: "@needle/mcp" },
  { path: "packages/cache", name: "@needle/cache", runtime: true },
  { path: "packages/schema", name: "@needle/schema", runtime: true },
  { path: "packages/devtools", name: "@needle/devtools" },
  { path: "packages/adapters/bun", name: "@needle/adapter-bun", runtime: true },
  { path: "packages/adapters/node", name: "@needle/adapter-node", runtime: true },
  { path: "packages/adapters/static", name: "@needle/adapter-static", runtime: true },
];

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(join(root, path), "utf8")) as T;
}

function walkTsFiles(dir: string): string[] {
  const found: string[] = [];

  for (const entry of readdirSync(join(root, dir))) {
    const path = join(dir, entry);
    const absolute = join(root, path);
    const stats = statSync(absolute);
    if (stats.isDirectory()) {
      found.push(...walkTsFiles(path));
    } else if (entry.endsWith(".ts") || entry.endsWith(".tsx")) {
      found.push(path);
    }
  }

  return found;
}

const rootPackage = readJson<{
  workspaces?: string[];
  scripts?: Record<string, string>;
}>("package.json");

const expectedRootScripts: Record<string, string> = {
  check: "bun run docs:check && bun run structure:check && bun run performance:check && bun run typecheck && bun test",
  "docs:check": "bun scripts/check-docs.ts",
  "performance:check": "bun scripts/check-performance-docs.ts",
  "structure:check": "bun scripts/check-structure.ts",
  test: "bun test tests/**/*.test.ts",
  typecheck: "tsc -p tsconfig.json --noEmit",
};

for (const workspace of ["packages/*", "packages/adapters/*"]) {
  if (!rootPackage.workspaces?.includes(workspace)) {
    failures.push(`Root package.json is missing workspace: ${workspace}`);
  }
}

for (const [script, command] of Object.entries(expectedRootScripts)) {
  if (!rootPackage.scripts?.[script]) {
    failures.push(`Root package.json is missing script: ${script}`);
  } else if (rootPackage.scripts[script] !== command) {
    failures.push(`Root package.json script ${script} must be ${command}`);
  }
}

for (const spec of packages) {
  const packageJsonPath = join(spec.path, "package.json");
  const indexPath = join(spec.path, "src/index.ts");

  if (!existsSync(join(root, packageJsonPath))) {
    failures.push(`Missing ${packageJsonPath}`);
    continue;
  }

  if (!existsSync(join(root, indexPath))) {
    failures.push(`Missing ${indexPath}`);
  }

  const packageJson = readJson<{
    name?: string;
    version?: string;
    type?: string;
    exports?: unknown;
    types?: string;
    dependencies?: Record<string, string>;
  }>(packageJsonPath);

  if (packageJson.name !== spec.name) {
    failures.push(`${packageJsonPath} has name ${packageJson.name ?? "<missing>"}; expected ${spec.name}`);
  }
  if (!packageJson.version) failures.push(`${packageJsonPath} is missing version`);
  if (packageJson.type !== "module") failures.push(`${packageJsonPath} must set type=module`);
  if (!packageJson.exports) failures.push(`${packageJsonPath} is missing exports`);
  if (packageJson.types !== "./src/index.ts") failures.push(`${packageJsonPath} must set types to ./src/index.ts`);

  if (spec.runtime) {
    for (const forbidden of ["@needle/agent", "@needle/mcp", "@needle/devtools"]) {
      if (packageJson.dependencies?.[forbidden]) {
        failures.push(`${spec.name} must not depend on agent-only package ${forbidden}`);
      }
    }
  }
}

for (const required of [
  "tsconfig.base.json",
  "tsconfig.json",
  "tests/scaffold.test.ts",
  ".github/workflows/ci.yml",
]) {
  if (!existsSync(join(root, required))) failures.push(`Missing ${required}`);
}

for (const file of walkTsFiles("packages")) {
  if (file.replaceAll("\\", "/").startsWith("packages/core/")) continue;
  const content = readFileSync(join(root, file), "utf8");

  for (const typeName of sharedCoreTypes) {
    const localTypePattern = new RegExp(`\\b(?:export\\s+)?(?:type|interface)\\s+${typeName}\\b`);
    if (localTypePattern.test(content)) {
      failures.push(`${file} defines ${typeName}; shared core types must come from @needle/core.`);
    }
  }
}

if (failures.length) {
  console.error("Structure checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Structure checks passed.");
