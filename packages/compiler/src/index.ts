import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import * as ts from "typescript";
import { createGraphEdge } from "@lumina/core";
import type {
  GraphNode,
  LuminaDiagnostic,
  LuminaMap,
  RenderMode,
  RenderManifest,
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

export type RoutesManifestWriteOptions = RouteDiscoveryOptions & {
  outputDir?: ".lumina" | string;
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

export type RoutesManifestWriteResult = {
  path: string;
  manifest: RoutesManifest;
};

export type RenderManifestWriteResult = {
  path: string;
  manifest: RenderManifest;
};

export type LuminaMapWriteResult = {
  path: string;
  map: LuminaMap;
};

type ParsedSegments = {
  segments: RouteSegment[];
  params: RouteParam[];
  routeGroups: string[];
  pathParts: string[];
};

type RenderModeExtraction = {
  mode: RenderMode;
  diagnostics: LuminaDiagnostic[];
};

const routeFileNames = new Set(["page.tsx"]);
const supportedRenderHelpers = new Map<string, RenderMode>([
  ["staticPage", "static"],
  ["ssr", "ssr"],
]);
const unsupportedRenderHelpers = new Map<string, RenderMode>([
  ["prerender", "prerender"],
  ["stream", "stream"],
  ["clientOnly", "client-only"],
  ["apiHot", "hot-api"],
]);

export function createRoutesManifest(options: RouteDiscoveryOptions): RoutesManifest {
  const routeRoot = options.routeRoot ?? "app";
  const routes = discoverRoutes({ ...options, routeRoot });
  const diagnostics = sortDiagnostics([
    ...routes.flatMap((route) => route.diagnostics),
    ...createDuplicatePathDiagnostics(routes),
  ]);

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

export function writeRoutesManifest(options: RoutesManifestWriteOptions): RoutesManifestWriteResult {
  const outputDir = options.outputDir ?? ".lumina";
  const manifest = createRoutesManifest(options);
  const outputPath = toPosix(join(outputDir, "routes.json"));

  writeJsonArtifact(options.appRoot, outputPath, manifest);

  return {
    path: outputPath,
    manifest,
  };
}

export function createRenderManifest(options: RouteDiscoveryOptions): RenderManifest {
  const routesManifest = createRoutesManifest(options);

  return {
    schemaVersion: "lumina.render-manifest.v0",
    generatedBy: {
      package: "@lumina/compiler",
      version: "0.0.0",
    },
    source: {
      routesManifest: ".lumina/routes.json",
    },
    routes: routesManifest.routes.map((route) => ({
      id: route.id,
      path: route.path,
      mode: route.renderMode,
      sourceFile: route.sourceFile,
      ...(route.cache ? { cache: route.cache } : {}),
      generatedFiles: [
        ".lumina/routes.json",
        ".lumina/render-manifest.json",
      ],
    })),
    diagnostics: routesManifest.diagnostics,
  };
}

export function writeRenderManifest(options: RoutesManifestWriteOptions): RenderManifestWriteResult {
  const outputDir = options.outputDir ?? ".lumina";
  const outputPath = toPosix(join(outputDir, "render-manifest.json"));
  const manifest = createRenderManifest(options);

  writeJsonArtifact(options.appRoot, outputPath, manifest);

  return {
    path: outputPath,
    manifest,
  };
}

export function createLuminaMap(options: RouteDiscoveryOptions): LuminaMap {
  const routesManifest = createRoutesManifest(options);
  const renderManifest = createRenderManifest(options);
  const nodes = new Map<string, GraphNode>();

  for (const artifactPath of [".lumina/routes.json", ".lumina/render-manifest.json", ".lumina/map.json"]) {
    nodes.set(`artifact:${artifactPath}`, {
      id: `artifact:${artifactPath}`,
      kind: "manifest",
      label: artifactPath,
    });
  }

  const edges = routesManifest.routes.flatMap((route) => {
    const routeNodeId = `route:${route.path}`;
    const sourceNodeId = `file:${route.sourceFile}`;
    nodes.set(routeNodeId, {
      id: routeNodeId,
      kind: "route",
      label: route.path,
    });
    nodes.set(sourceNodeId, {
      id: sourceNodeId,
      kind: route.kind === "api" ? "api" : "page",
      label: route.sourceFile,
    });

    const routeEdges = [
      createGraphEdge({
        id: `edge:route:${route.id}:source`,
        from: routeNodeId,
        to: sourceNodeId,
        kind: "route.source",
        source: "file",
        confidence: "high",
        why: `${route.sourceFile} defines the ${route.path} route.`,
      }),
      createGraphEdge({
        id: `edge:route:${route.id}:render`,
        from: routeNodeId,
        to: "artifact:.lumina/render-manifest.json",
        kind: "route.renderMode",
        source: "convention",
        confidence: "medium",
        why: `The render manifest records ${route.renderMode} mode for ${route.path}.`,
      }),
      ...[".lumina/routes.json", ".lumina/map.json"].map((artifactPath) =>
        createGraphEdge({
          id: `edge:route:${route.id}:generates:${artifactName(artifactPath)}`,
          from: routeNodeId,
          to: `artifact:${artifactPath}`,
          kind: "route.generates",
          source: "convention",
          confidence: "medium",
          why: `${artifactPath} includes generated evidence for ${route.path}.`,
        }),
      ),
    ];

    for (const layout of route.layouts) {
      const layoutNodeId = `file:${layout}`;
      nodes.set(layoutNodeId, {
        id: layoutNodeId,
        kind: "layout",
        label: layout,
      });
      routeEdges.push(
        createGraphEdge({
          id: `edge:route:${route.id}:layout:${createFileId(layout)}`,
          from: routeNodeId,
          to: layoutNodeId,
          kind: "route.layout",
          source: "file",
          confidence: "high",
          why: `${layout} wraps the ${route.path} route.`,
        }),
      );
    }

    return routeEdges;
  });

  return {
    schemaVersion: "lumina.map.v0",
    generatedBy: {
      package: "@lumina/compiler",
      version: "0.0.0",
    },
    source: {
      routesManifest: ".lumina/routes.json",
      renderManifest: ".lumina/render-manifest.json",
    },
    nodes: [...nodes.values()].sort((left, right) => compareStrings(left.id, right.id)),
    edges: edges.sort((left, right) => compareStrings(left.id, right.id)),
    diagnostics: [...routesManifest.diagnostics, ...renderManifest.diagnostics],
  };
}

export function writeLuminaMap(options: RoutesManifestWriteOptions): LuminaMapWriteResult {
  const outputDir = options.outputDir ?? ".lumina";
  const outputPath = toPosix(join(outputDir, "map.json"));
  const map = createLuminaMap(options);

  writeJsonArtifact(options.appRoot, outputPath, map);

  return {
    path: outputPath,
    map,
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
  const path = createRoutePath(parsed.pathParts);
  const renderMode = extractRenderMode({ appRoot, sourceFile, kind, path });

  return {
    id: createRouteId(sourceFile, kind),
    kind,
    path,
    sourceFile,
    renderMode: renderMode.mode,
    segments: parsed.segments,
    params: parsed.params,
    layouts: kind === "page" ? collectLayouts(appRoot, routeRoot, sourceFile) : [],
    routeGroups: parsed.routeGroups,
    diagnostics: renderMode.diagnostics,
  };
}

function extractRenderMode(options: {
  appRoot: string;
  sourceFile: string;
  kind: "page" | "api";
  path: string;
}): RenderModeExtraction {
  if (options.kind === "api") {
    return {
      mode: "api",
      diagnostics: [],
    };
  }

  const absolutePath = join(options.appRoot, ...options.sourceFile.split("/"));
  if (!existsSync(absolutePath)) {
    return {
      mode: "static",
      diagnostics: [],
    };
  }

  const sourceText = readFileSync(absolutePath, "utf8");
  const source = ts.createSourceFile(options.sourceFile, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const renderDeclaration = findExportedRenderDeclaration(source);

  if (!renderDeclaration) {
    return {
      mode: "static",
      diagnostics: [],
    };
  }

  const helperName = renderDeclaration.initializer && renderHelperName(renderDeclaration.initializer);
  if (helperName && supportedRenderHelpers.has(helperName)) {
    return {
      mode: supportedRenderHelpers.get(helperName)!,
      diagnostics: [],
    };
  }

  if (helperName && unsupportedRenderHelpers.has(helperName)) {
    const mode = unsupportedRenderHelpers.get(helperName)!;
    return {
      mode,
      diagnostics: [
        renderDiagnostic({
          code: "RENDER_MODE_UNSUPPORTED",
          message: `${helperName}() is not implemented in the MVP render pipeline.`,
          source,
          node: renderDeclaration,
          sourceFile: options.sourceFile,
          routePath: options.path,
          why: "The route declares a render helper that is reserved for a later implementation phase.",
          remediation: "Use staticPage() or ssr() for MVP Alpha routes, or keep this route out of the build/start proof.",
          tags: ["rendering", "unsupported"],
        }),
      ],
    };
  }

  return {
    mode: "static",
    diagnostics: [
      renderDiagnostic({
        code: "RENDER_MODE_INVALID_EXPORT",
        message: "Route render export must call staticPage() or ssr() in MVP Alpha.",
        source,
        node: renderDeclaration,
        sourceFile: options.sourceFile,
        routePath: options.path,
        why: "The compiler could not map the render export to a supported MVP render mode.",
        remediation: "Change the export to `export const render = staticPage()` or `export const render = ssr()`.",
        tags: ["rendering"],
      }),
    ],
  };
}

function findExportedRenderDeclaration(source: ts.SourceFile): ts.VariableDeclaration | undefined {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    if (!statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;

    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === "render") {
        return declaration;
      }
    }
  }
}

function renderHelperName(expression: ts.Expression): string | undefined {
  if (!ts.isCallExpression(expression)) return undefined;
  if (!ts.isIdentifier(expression.expression)) return undefined;
  return expression.expression.text;
}

function renderDiagnostic(options: {
  code: "RENDER_MODE_INVALID_EXPORT" | "RENDER_MODE_UNSUPPORTED";
  message: string;
  source: ts.SourceFile;
  node: ts.Node;
  sourceFile: string;
  routePath: string;
  why: string;
  remediation: string;
  tags: Array<"rendering" | "unsupported">;
}): LuminaDiagnostic {
  const position = options.source.getLineAndCharacterOfPosition(options.node.getStart(options.source));
  return {
    code: options.code,
    severity: "error",
    category: "rendering",
    message: options.message,
    source: {
      file: options.sourceFile,
      owner: "compiler",
    },
    location: {
      line: position.line + 1,
      column: position.character + 1,
    },
    routePath: options.routePath,
    docs: "docs/file-conventions.md#render-mode-exports",
    why: options.why,
    remediation: options.remediation,
    tags: options.tags,
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

function writeJsonArtifact(appRoot: string, outputPath: string, value: unknown): void {
  mkdirSync(join(appRoot, ...outputPath.split("/").slice(0, -1)), { recursive: true });
  writeFileSync(join(appRoot, ...outputPath.split("/")), JSON.stringify(value), "utf8");
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

function sortDiagnostics(diagnostics: LuminaDiagnostic[]): LuminaDiagnostic[] {
  return diagnostics.sort((left, right) => {
    return (
      compareStrings(left.source?.file ?? "", right.source?.file ?? "") ||
      compareStrings(left.routePath ?? "", right.routePath ?? "") ||
      compareStrings(left.code, right.code) ||
      compareStrings(left.message, right.message)
    );
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

function createFileId(sourceFile: string): string {
  return stripExtension(sourceFile)
    .split("/")
    .map((part) => {
      const group = /^\(([^()[\]/]+)\)$/.exec(part);
      if (group) return `$group_${group[1]}`;
      return part.replace(/^\[\.\.\.([A-Za-z_][A-Za-z0-9_-]*)\]$/, "$1.splat").replace(/^\[([A-Za-z_][A-Za-z0-9_-]*)\]$/, "$1");
    })
    .join(".");
}

function artifactName(path: string): string {
  return stripExtension(path.split("/").at(-1) ?? path);
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
