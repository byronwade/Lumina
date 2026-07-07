export type PackageStatus = {
  name: string;
  phase: "scaffold" | "implemented";
  implementsRuntimeBehavior: false;
};

export const luminaCoreStatus = {
  name: "@lumina/core",
  phase: "implemented",
  implementsRuntimeBehavior: false,
} as const satisfies PackageStatus;

export type GeneratedBy = {
  package: string;
  version: string;
};

export type SourceReference = {
  file: string;
  owner?: "compiler" | "runtime" | "adapter" | "cli" | "agent" | "mcp" | "devtools" | string;
};

export type DiagnosticSource = SourceReference;

export type SourceLocation = {
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
};

export type DiagnosticLocation = SourceLocation;

export type RenderMode =
  | "static"
  | "prerender"
  | "ssr"
  | "stream"
  | "client-only"
  | "api"
  | "hot-api";

export type RenderModeDefinition = {
  kind: "lumina.render-mode";
  mode: RenderMode;
};

export type GraphEdgeConfidence = "high" | "medium" | "low";

export type GraphEdgeSource =
  | "file"
  | "contract"
  | "convention"
  | "static-analysis"
  | "manual";

export type GraphEdge = {
  id: string;
  from: string;
  to: string;
  kind: string;
  source: GraphEdgeSource;
  confidence: GraphEdgeConfidence;
  why: string;
  fields?: string[];
  risk?: "low" | "medium" | "high";
};

export type GraphNode = {
  id: string;
  kind: string;
  label: string;
  sourceFile?: string;
};

export type DiagnosticSeverity = "info" | "warning" | "error";

export type DiagnosticCategory =
  | "config"
  | "routing"
  | "rendering"
  | "api"
  | "schema"
  | "cache"
  | "seo"
  | "manifest"
  | "agent"
  | "security"
  | "performance"
  | "runtime";

export type DiagnosticRelatedLocation = {
  file: string;
  line?: number;
  column?: number;
  message?: string;
};

export type DiagnosticTag =
  | "routing"
  | "rendering"
  | "api"
  | "schema"
  | "cache"
  | "seo"
  | "manifest"
  | "agent"
  | "security"
  | "performance"
  | "runtime"
  | "conflict"
  | "unsupported"
  | "strict";

export type LuminaDiagnosticChild = {
  code?: string;
  message: string;
  source?: SourceReference;
  location?: SourceLocation;
};

export type LuminaDiagnostic = {
  code: string;
  severity: DiagnosticSeverity;
  category: DiagnosticCategory;
  message: string;
  docsUrl?: string;
  docs?: string;
  source?: SourceReference;
  location?: SourceLocation;
  routeId?: string;
  routePath?: string;
  why?: string;
  remediation?: string;
  children?: LuminaDiagnosticChild[];
  related?: DiagnosticRelatedLocation[];
  tags?: DiagnosticTag[];
};

export type CacheMode = "no-store" | "immutable" | "ttl" | "stale-while-revalidate";

export type CacheScope = "browser" | "shared" | "server" | "micro";

export type CachePlan = {
  mode: CacheMode;
  scope: CacheScope;
  ttlSeconds?: number;
  staleSeconds?: number;
  tags?: string[];
  headers?: Record<string, string>;
  reason: string;
};

export type RouteKind = "page" | "layout" | "api" | "notFound" | "error";

export type RouteSegment =
  | {
      kind: "static" | "group";
      value: string;
    }
  | {
      kind: "dynamic";
      name: string;
    }
  | {
      kind: "catchAll";
      name: string;
    };

export type RouteParam = {
  name: string;
  type: "string" | "string[]";
  required: boolean;
};

export type RouteNode = {
  id: string;
  kind: RouteKind;
  path: string;
  sourceFile: string;
  renderMode: RenderMode;
  segments: RouteSegment[];
  params: RouteParam[];
  layouts: string[];
  routeGroups: string[];
  cache?: CachePlan;
  diagnostics: LuminaDiagnostic[];
  metadata?: Record<string, unknown>;
};

export type LuminaApp = {
  schemaVersion: "lumina.app.v0" | string;
  name: string;
  root: string;
  routeRoot: string;
  generatedBy: GeneratedBy;
  routes: RouteNode[];
  diagnostics: LuminaDiagnostic[];
};

export type GeneratedArtifact = {
  path: string;
  kind: string;
  schemaVersion: string;
  sourceInputs: string[];
};

export type RenderManifestRoute = {
  id: string;
  path: string;
  mode: RenderMode;
  sourceFile: string;
  cache?: CachePlan;
  generatedFiles: string[];
};

export type RenderManifest = {
  schemaVersion: "lumina.render-manifest.v0" | string;
  generatedBy: GeneratedBy;
  source: {
    routesManifest: string;
  };
  routes: RenderManifestRoute[];
  diagnostics: LuminaDiagnostic[];
};

export type LuminaMap = {
  schemaVersion: "lumina.map.v0" | string;
  generatedBy: GeneratedBy;
  source: {
    routesManifest: string;
    renderManifest: string;
  };
  nodes: GraphNode[];
  edges: GraphEdge[];
  diagnostics: LuminaDiagnostic[];
};

export type BuildReport = {
  schemaVersion: "lumina.build-report.v0" | string;
  generatedBy: GeneratedBy;
  artifacts: GeneratedArtifact[];
  diagnostics: LuminaDiagnostic[];
};

export type AdapterManifest = {
  schemaVersion: string;
  adapter: "bun" | "node" | "static" | string;
  package: string;
  generatedBy: GeneratedBy;
  source?: {
    routesManifest?: string;
    renderManifest?: string;
    seoReport?: string;
  };
  runtime: {
    name: "bun" | "node" | "static" | string;
    versionRange?: string;
  };
  entry?: string;
  publicDir?: string;
  capabilities: Record<string, boolean | string | number>;
  unsupported: Array<{
    feature: string;
    reason: string;
  }>;
  diagnostics?: LuminaDiagnostic[];
};

export function createGraphEdge(edge: GraphEdge): GraphEdge {
  if (!edge.kind || !edge.source || !edge.confidence || !edge.why) {
    throw new Error("GraphEdge requires kind, source, confidence, and why.");
  }

  return edge;
}
