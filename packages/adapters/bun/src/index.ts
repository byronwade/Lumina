export const luminaAdapterBunStatus = {
  name: "@lumina/adapter-bun",
  phase: "implemented",
  implementsRuntimeBehavior: true,
} as const;

export type BuiltLuminaAppOptions = {
  appRoot: string;
  host?: string;
  port?: number;
};

export type BuiltLuminaAppServer = {
  url: string;
  close: () => Promise<void>;
};

type SsrRoute = {
  path: string;
  segments: Array<
    | { kind: "static"; value: string }
    | { kind: "dynamic"; name: string }
    | { kind: "catchAll"; name: string }
    | { kind: "group"; name: string }
  >;
  render: (context: { params: Record<string, string | string[]>; searchParams: Record<string, string | string[]> }) => string | Promise<string>;
};

export async function startBuiltLuminaApp(options: BuiltLuminaAppOptions): Promise<BuiltLuminaAppServer> {
  const host = options.host ?? "127.0.0.1";
  const port = options.port ?? 4173;
  const appRoot = options.appRoot.replaceAll("\\", "/");
  const publicRoot = `${appRoot}/dist/public`;
  const ssrRoutes = await loadSsrRoutes(`${appRoot}/dist/server/ssr-routes.js`);

  const server = Bun.serve({
    hostname: host,
    port,
    async fetch(request) {
      try {
        const url = new URL(request.url);
        const pathname = normalizePathname(url.pathname);
        const safePathname = safePublicPathname(pathname);
        if (!safePathname) return invalidRequestResponse();

        return await serveBuiltPath(publicRoot, safePathname, ssrRoutes, url.search);
      } catch {
        return serverErrorResponse();
      }
    },
  });

  return {
    url: `http://${host}:${server.port}`,
    close: async () => {
      server.stop(true);
    },
  };
}

async function serveBuiltPath(publicRoot: string, pathname: string, ssrRoutes: SsrRoute[], search: string): Promise<Response> {
  if (looksLikeStaticAsset(pathname)) {
    const assetPath = publicAssetPath(publicRoot, pathname);
    const asset = Bun.file(assetPath);
    if (asset.size > 0) {
      return new Response(asset, {
        status: 200,
        headers: {
          "Content-Type": contentTypeForPath(pathname),
          "Cache-Control": pathname.startsWith("/_lumina/client/") ? "public, max-age=31536000, immutable" : "no-store",
        },
      });
    }

    return assetNotFoundResponse();
  }

  const htmlPath = htmlFileForPath(publicRoot, pathname);
  const html = Bun.file(htmlPath);

  if (html.size > 0) {
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  const match = matchSsrRoute(ssrRoutes, pathname);
  if (match) {
    const html = await match.route.render({
      params: match.params,
      searchParams: readSearchParams(search),
    });
    return new Response(html, {
      status: 200,
      headers: noStoreHtmlHeaders(),
    });
  }

  return routeNotFoundResponse();
}

async function loadSsrRoutes(serverEntry: string): Promise<SsrRoute[]> {
  const entry = Bun.file(serverEntry);
  if (entry.size <= 0) return [];
  const module = await import(toFileUrl(serverEntry));
  return Array.isArray(module.ssrRoutes) ? module.ssrRoutes : [];
}

function toFileUrl(path: string): string {
  return encodeURI(`file:///${path.replaceAll("\\", "/")}`);
}

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function safePublicPathname(pathname: string): string | null {
  try {
    const decoded = decodeURIComponent(pathname);
    if (decoded.includes("..") || decoded.includes("\\") || decoded.includes("\0")) return null;
    return decoded;
  } catch {
    return null;
  }
}

function htmlFileForPath(publicRoot: string, pathname: string): string {
  if (pathname === "/") return `${publicRoot}/index.html`;
  return `${publicRoot}${pathname}/index.html`;
}

function looksLikeStaticAsset(pathname: string): boolean {
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

function matchSsrRoute(routes: SsrRoute[], pathname: string): { route: SsrRoute; params: Record<string, string | string[]> } | undefined {
  for (const route of routes) {
    const params = matchSegments(route.segments, pathname);
    if (params) return { route, params };
  }
  return undefined;
}

function matchSegments(segments: SsrRoute["segments"], pathname: string): Record<string, string | string[]> | undefined {
  const parts = pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  const params: Record<string, string | string[]> = {};
  let partIndex = 0;

  for (const segment of segments) {
    if (segment.kind === "group") continue;

    if (segment.kind === "static") {
      if (parts[partIndex] !== segment.value) return undefined;
      partIndex += 1;
      continue;
    }

    if (segment.kind === "dynamic") {
      const value = parts[partIndex];
      if (!value) return undefined;
      params[segment.name] = value;
      partIndex += 1;
      continue;
    }

    if (segment.kind === "catchAll") {
      const rest = parts.slice(partIndex);
      if (rest.length === 0) return undefined;
      params[segment.name] = rest;
      partIndex = parts.length;
    }
  }

  if (partIndex !== parts.length) return undefined;
  return params;
}

function readSearchParams(search: string): Record<string, string | string[]> {
  const values = new URLSearchParams(search);
  const searchParams: Record<string, string | string[]> = {};
  for (const [key, value] of values) {
    const existing = searchParams[key];
    if (Array.isArray(existing)) {
      existing.push(value);
    } else if (typeof existing === "string") {
      searchParams[key] = [existing, value];
    } else {
      searchParams[key] = value;
    }
  }
  return searchParams;
}

function publicAssetPath(publicRoot: string, pathname: string): string {
  return `${publicRoot}${pathname}`;
}

function contentTypeForPath(pathname: string): string {
  if (pathname.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (pathname.endsWith(".css")) return "text/css; charset=utf-8";
  if (pathname.endsWith(".svg")) return "image/svg+xml";
  if (pathname.endsWith(".json")) return "application/json; charset=utf-8";
  if (pathname.endsWith(".txt")) return "text/plain; charset=utf-8";
  return "application/octet-stream";
}

function invalidRequestResponse(): Response {
  return new Response("<!doctype html><h1>Lumina request invalid</h1>", {
    status: 400,
    headers: noStoreHtmlHeaders(),
  });
}

function serverErrorResponse(): Response {
  return new Response("<!doctype html><h1>Lumina server error</h1>", {
    status: 500,
    headers: noStoreHtmlHeaders(),
  });
}

function routeNotFoundResponse(): Response {
  return new Response("<!doctype html><h1>Lumina route not found</h1>", {
    status: 404,
    headers: noStoreHtmlHeaders(),
  });
}

function assetNotFoundResponse(): Response {
  return new Response("Lumina asset not found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function noStoreHtmlHeaders(): Record<string, string> {
  return {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  };
}
