import { docsNavGroups, publicDocsPages, type DocsStatus } from "./docs-content";
import { getPublicDocsMarkdown } from "./public-docs-source";

export type DocsIndexEntry = {
  slug: string;
  href: string;
  lane: string;
  title: string;
  description: string;
  status: DocsStatus;
  source: string;
  related: string[];
  headings: string[];
  keywords: string[];
  searchText: string;
};

export type DocsNavigationLink = {
  title: string;
  href: string;
  status: DocsStatus;
  source: string;
  lane: string;
  description: string;
};

export type DocsNavigationSection = {
  title: string;
  kind: "curated" | "inventory";
  links: DocsNavigationLink[];
};

export type DocsNavigation = {
  schemaVersion: "lumina.docs-navigation.v0";
  docsVersion: "unreleased";
  sections: DocsNavigationSection[];
};

export const docsIndex: DocsIndexEntry[] = publicDocsPages.map((page) => {
  const markdown = getPublicDocsMarkdown(page.slug)?.markdown ?? "";
  const headings = extractHeadings(markdown);
  const keywords = Array.from(new Set([
    ...page.slug.split(/[/-]/),
    ...page.lane.toLowerCase().split(/\s+/),
    ...page.related.flatMap((path) => path.toLowerCase().replace(/\.md$/, "").split(/[/-]/)),
  ].filter(Boolean))).sort();

  return {
    ...page,
    headings,
    keywords,
    searchText: [
      page.title,
      page.description,
      page.lane,
      page.status,
      page.source,
      page.related.join(" "),
      headings.join(" "),
      stripMarkdown(markdown),
    ].join(" ").toLowerCase(),
  };
}).sort((a, b) => a.href.localeCompare(b.href));

export const docsIndexStats = {
  pages: docsIndex.length,
  lanes: new Set(docsIndex.map((entry) => entry.lane)).size,
  sources: new Set(docsIndex.map((entry) => entry.source)).size,
};

export const docsNavigation: DocsNavigation = {
  schemaVersion: "lumina.docs-navigation.v0",
  docsVersion: "unreleased",
  sections: [
    ...docsNavGroups.map((group) => ({
      title: group.title,
      kind: "curated" as const,
      links: group.links.map((link) => ({
        title: link.title,
        href: link.href,
        status: link.status,
        source: link.source,
        lane: link.lane,
        description: link.description,
      })),
    })),
    ...docsIndexByLane().map((group) => ({
      title: group.lane,
      kind: "inventory" as const,
      links: group.entries.map((entry) => ({
        title: entry.title,
        href: entry.href,
        status: entry.status,
        source: entry.source,
        lane: entry.lane,
        description: entry.description,
      })),
    })),
  ],
};

export function searchDocsIndex(query: string, limit = 12): DocsIndexEntry[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);

  if (!terms.length) return docsIndex.slice(0, limit);

  return docsIndex
    .map((entry) => ({
      entry,
      score: scoreEntry(entry, terms),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.href.localeCompare(b.entry.href))
    .slice(0, limit)
    .map((result) => result.entry);
}

export function docsIndexByLane(): Array<{ lane: string; entries: DocsIndexEntry[] }> {
  const lanes = new Map<string, DocsIndexEntry[]>();
  for (const entry of docsIndex) {
    const laneEntries = lanes.get(entry.lane) ?? [];
    laneEntries.push(entry);
    lanes.set(entry.lane, laneEntries);
  }

  return Array.from(lanes.entries())
    .map(([lane, entries]) => ({ lane, entries }))
    .sort((a, b) => a.lane.localeCompare(b.lane));
}

function scoreEntry(entry: DocsIndexEntry, terms: string[]): number {
  let score = 0;
  const title = entry.title.toLowerCase();
  const lane = entry.lane.toLowerCase();
  const source = entry.source.toLowerCase();

  for (const term of terms) {
    if (title.includes(term)) score += 12;
    if (lane.includes(term)) score += 5;
    if (source.includes(term)) score += 4;
    if (entry.keywords.some((keyword) => keyword.includes(term))) score += 4;
    if (entry.headings.some((heading) => heading.toLowerCase().includes(term))) score += 3;
    if (entry.description.toLowerCase().includes(term)) score += 3;
    if (entry.searchText.includes(term)) score += 1;
  }

  return score;
}

function extractHeadings(markdown: string): string[] {
  return markdown
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.match(/^#{2,3}\s+(.+)$/)?.[1]?.trim())
    .filter((heading): heading is string => Boolean(heading))
    .slice(0, 8);
}

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_\-|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
