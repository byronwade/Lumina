import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import type {
  LuminaDiagnostic,
  RouteNode,
  RouteParam,
  RouteSegment,
} from "@lumina/core";

export const luminaCompilerStatus = {
  name: "@lumina/compiler",
  phase: "implemented",
  implementsRuntimeBehavior: false,
} as const;

export type RouteDiscoveryOptions = {
  appRoot: string;
  routeRoot?: "app";
};

export type RoutesManifest = {
  schemaVersion: "lumina.routes.v0";
  generatedBy: {
    package: "@lumina/compiler";
    version: "0.0.0";
  };
  source: {
    routeRoot: "app";
  };
  routes: RouteNode[];
  diagnostics: LuminaDiagnostic[];
};

type ParsedSegments = {
  segments: RouteSegment[];
  params: RouteParam[];
  routeGroups: string[];
  pathParts: string[];
};

const routeFileNames = new Set(["page.tsx"]);

export function createRoutesManifest(options: RouteDiscoveryOptions): RoutesManifest {
  const routeRoot = options.routeRoot ?? "app";
  const routes = discoverRoutes({ ...options, routeRoot });
  const diagnostics = createDuplicatePathDiagnostics(routes);

  return {
    schemaVersion: "lumina.routes.v0",
    generatedBy: {
      package: "@lumina/compiler",
      version: "0.0.0",
    },
    source: {
      routeRoot,
    },
    routes,
    diagnostics,
  };
}

export function discoverRoutes(options: RouteDiscoveryOptions): RouteNode[] {
  const routeRoot = options.routeRoot ?? "app";
  const absoluteRouteRoot = join(options.appRoot, routeRoot);

  if (!existsSync(absoluteRouteRoot)) return [];

  const sourceFiles = walkFiles(absoluteRouteRoot)
    .map((absoluteFile) => toPosix(relative(options.appRoot, absoluteFile)))
    .filter(isSupportedRouteFile)
    .sort(compareStrings);

  return sourceFiles.map((sourceFile) => createRouteNode(options.appRoot, routeRoot, sourceFile)).sort(compareRoutes);
}

function createRouteNode(appRoot: string, routeRoot: "app", sourceFile: string): RouteNode {
  const kind = isApiRoute(sourceFile) ? "api" : "page";
  const routeSegments = segmentsForSourceFile(routeRoot, sourceFile, kind);
  const parsed = parseSegments(routeSegments);

  return {
    id: createRouteId(sourceFile, kind),
    kind,
    path: createRoutePath(parsed.pathParts),
    sourceFile,
    renderMode: kind === "api" ? "api" : "static",
    segments: parsed.segments,
    params: parsed.params,
    layouts: kind === "page" ? collectLayouts(appRoot, routeRoot, sourceFile) : [],
    routeGroups: parsed.routeGroups,
    diagnostics: [],
  };
}

function walkFiles(directory: string): string[] {
  const found: string[] = [];

  for (const entry of readdirSync(directory).sort(compareStrings)) {
    const absolutePath = join(directory, entry);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      found.push(...walkFiles(absolutePath));
    } else {
      found.push(absolutePath);
    }
  }

  return found;
}

function isSupportedRouteFile(sourceFile: string): boolean {
  if (routeFileNames.has(lastPathPart(sourceFile))) return true;
  if (isApiRoute(sourceFile) && sourceFile.endsWith(".ts") && !sourceFile.endsWith(".d.ts")) return true;
  return false;
}

function isApiRoute(sourceFile: string): boolean {
  return sourceFile.startsWith("app/api/");
}

function segmentsForSourceFile(routeRoot: "app", sourceFile: string, kind: "page" | "api"): string[] {
  const parts = sourceFile.split("/");
  const withoutRoot = parts.slice(1);

  if (kind === "api") {
    const last = withoutRoot.at(-1);
    if (!last) return [];
    return [...withoutRoot.slice(0, -1), stripExtension(last)];
  }

  return withoutRoot.slice(0, -1).filter((part) => part !== routeRoot);
}

function parseSegments(sourceSegments: string[]): ParsedSegments {
  const segments: RouteSegment[] = [];
  const params: RouteParam[] = [];
  const routeGroups: string[] = [];
  const pathParts: string[] = [];

  for (const sourceSegment of sourceSegments) {
    const group = /^\(([^()[\]/]+)\)$/.exec(sourceSegment);
    if (group) {
      const value = group[1]!;
      segments.push({ kind: "group", value });
      routeGroups.push(value);
      continue;
    }

    const catchAll = /^\[\.\.\.([A-Za-z_][A-Za-z0-9_-]*)\]$/.exec(sourceSegment);
    if (catchAll) {
      const name = catchAll[1]!;
      segments.push({ kind: "catchAll", name });
      params.push({ name, type: "string[]", required: true });
      pathParts.push("*");
      continue;
    }

    const dynamic = /^\[([A-Za-z_][A-Za-z0-9_-]*)\]$/.exec(sourceSegment);
    if (dynamic) {
      const name = dynamic[1]!;
      segments.push({ kind: "dynamic", name });
      params.push({ name, type: "string", required: true });
      pathParts.push(`:${name}`);
      continue;
    }

    segments.push({ kind: "static", value: sourceSegment });
    pathParts.push(sourceSegment);
  }

  return { segments, params, routeGroups, pathParts };
}

function createRoutePath(pathParts: string[]): string {
  if (pathParts.length === 0) return "/";
  return `/${pathParts.join("/")}`;
}

function createRouteId(sourceFile: string, kind: "page" | "api"): string {
  const withoutExtension = stripExtension(sourceFile);
  const id = withoutExtension
    .split("/")
    .map((part) => {
      const group = /^\(([^()[\]/]+)\)$/.exec(part);
      if (group) return `$group_${group[1]}`;

      const catchAll = /^\[\.\.\.([A-Za-z_][A-Za-z0-9_-]*)\]$/.exec(part);
      if (catchAll) return `$${catchAll[1]}.splat`;

      const dynamic = /^\[([A-Za-z_][A-Za-z0-9_-]*)\]$/.exec(part);
      if (dynamic) return `$${dynamic[1]}`;

      return part;
    })
    .join(".");

  if (kind === "api" && !id.endsWith(".api")) return `${id}.api`;
  return id;
}

function collectLayouts(appRoot: string, routeRoot: "app", sourceFile: string): string[] {
  const sourceParts = sourceFile.split("/");
  const routeDirectoryParts = sourceParts.slice(0, -1);
  const layouts: string[] = [];

  for (let index = 1; index <= routeDirectoryParts.length; index += 1) {
    const candidate = [...routeDirectoryParts.slice(0, index), "layout.tsx"].join("/");
    if (!candidate.startsWith(`${routeRoot}/`)) continue;
    if (existsSync(join(appRoot, ...candidate.split("/")))) layouts.push(candidate);
  }

  return layouts;
}

function createDuplicatePathDiagnostics(routes: RouteNode[]): LuminaDiagnostic[] {
  const byKindAndPath = new Map<string, RouteNode[]>();

  for (const route of routes) {
    const key = `${route.kind}:${route.path}`;
    byKindAndPath.set(key, [...(byKindAndPath.get(key) ?? []), route]);
  }

  const diagnostics: LuminaDiagnostic[] = [];

  for (const duplicateRoutes of byKindAndPath.values()) {
    if (duplicateRoutes.length < 2) continue;

    const sortedRoutes = [...duplicateRoutes].sort((left, right) => compareStrings(left.sourceFile, right.sourceFile));
    const [primary, ...related] = sortedRoutes;
    if (!primary) continue;

    diagnostics.push({
      code: "ROUTE_DUPLICATE_PATH",
      severity: "error",
      category: "routing",
      message: `Multiple route files resolve to ${primary.path}.`,
      source: {
        file: primary.sourceFile,
        owner: "compiler",
      },
      routePath: primary.path,
      docs: "docs/routing-contract.md#diagnostics",
      why: "Route groups do not contribute URL segments, so these files produce the same public path.",
      remediation: "Move one route to a different public segment or remove the duplicate page.",
      related: related.map((route) => ({
        file: route.sourceFile,
        message: `This file also resolves to ${primary.path}.`,
      })),
      tags: ["routing", "conflict"],
    });
  }

  return diagnostics.sort((left, right) => {
    const pathOrder = compareStrings(left.routePath ?? "", right.routePath ?? "");
    if (pathOrder !== 0) return pathOrder;
    return compareStrings(left.source?.file ?? "", right.source?.file ?? "");
  });
}

function compareRoutes(left: RouteNode, right: RouteNode): number {
  const kindOrder = compareNumbers(routeKindRank(left.kind), routeKindRank(right.kind));
  if (kindOrder !== 0) return kindOrder;

  const leftCounts = segmentCounts(left);
  const rightCounts = segmentCounts(right);

  return (
    compareNumbers(rightCounts.static, leftCounts.static) ||
    compareNumbers(leftCounts.dynamic, rightCounts.dynamic) ||
    compareNumbers(leftCounts.catchAll, rightCounts.catchAll) ||
    compareStrings(left.path, right.path) ||
    compareStrings(left.sourceFile, right.sourceFile)
  );
}

function routeKindRank(kind: RouteNode["kind"]): number {
  if (kind === "page") return 0;
  if (kind === "api") return 1;
  return 2;
}

function segmentCounts(route: RouteNode): { static: number; dynamic: number; catchAll: number } {
  return route.segments.reduce(
    (counts, segment) => {
      if (segment.kind === "static") counts.static += 1;
      if (segment.kind === "dynamic") counts.dynamic += 1;
      if (segment.kind === "catchAll") counts.catchAll += 1;
      return counts;
    },
    { static: 0, dynamic: 0, catchAll: 0 },
  );
}

function lastPathPart(path: string): string {
  return path.split("/").at(-1) ?? "";
}

function stripExtension(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, "");
}

function toPosix(path: string): string {
  return path.replaceAll("\\", "/");
}

function compareStrings(left: string, right: string): number {
  return left.localeCompare(right, "en");
}

function compareNumbers(left: number, right: number): number {
  return left - right;
}
