import type { ReactNode } from "react";

type MarkdownBlock =
  | { type: "heading"; depth: 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; language: string; code: string }
  | { type: "quote"; text: string };

export type MarkdownHeading = {
  id: string;
  text: string;
  depth: 2 | 3 | 4;
};

export function MarkdownBody({ markdown, source }: { markdown: string; source: string }) {
  const blocks = parseMarkdownBlocks(cleanPublicDocsMarkdown(markdown));

  return (
    <div className="docs-markdown">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const id = headingId(block.text);
          if (block.depth === 2) {
            return (
              <h2 id={id} key={`${block.text}-${index}`}>
                {renderInlineMarkdown(block.text, source)}
              </h2>
            );
          }
          if (block.depth === 3) {
            return (
              <h3 id={id} key={`${block.text}-${index}`}>
                {renderInlineMarkdown(block.text, source)}
              </h3>
            );
          }
          return (
            <h4 id={id} key={`${block.text}-${index}`}>
              {renderInlineMarkdown(block.text, source)}
            </h4>
          );
        }

        if (block.type === "code") {
          return (
            <figure className="docs-code-block" key={`${block.language}-${index}`}>
              {block.language ? <figcaption>{block.language}</figcaption> : null}
              <pre>
                <code>{block.code}</code>
              </pre>
            </figure>
          );
        }

        if (block.type === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List key={`list-${index}`}>
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`}>{renderInlineMarkdown(item, source)}</li>
              ))}
            </List>
          );
        }

        if (block.type === "table") {
          return (
            <div className="docs-table-scroll" key={`table-${index}`}>
              <table>
                <thead>
                  <tr>
                    {block.headers.map((header, headerIndex) => (
                      <th key={`${header}-${headerIndex}`}>{renderInlineMarkdown(header, source)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                      {block.headers.map((_, cellIndex) => {
                        const cell = row[cellIndex] ?? "";
                        return <td key={`${cell}-${cellIndex}`}>{renderInlineMarkdown(cell, source)}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "quote") {
          return <blockquote key={`quote-${index}`}>{renderInlineMarkdown(block.text, source)}</blockquote>;
        }

        return <p key={`${block.text}-${index}`}>{renderInlineMarkdown(block.text, source)}</p>;
      })}
    </div>
  );
}

export function getMarkdownHeadings(markdown: string): MarkdownHeading[] {
  return parseMarkdownBlocks(cleanPublicDocsMarkdown(markdown))
    .filter((block): block is Extract<MarkdownBlock, { type: "heading" }> => block.type === "heading")
    .map((block) => ({
      id: headingId(block.text),
      text: block.text,
      depth: block.depth,
    }));
}

function cleanPublicDocsMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const cleanLines: string[] = [];
  let skippedTitle = false;

  for (const line of lines) {
    if (!skippedTitle && line.startsWith("# ")) {
      skippedTitle = true;
      continue;
    }
    if (/^(Status|Audience):\s/i.test(line)) continue;
    cleanLines.push(line);
  }

  return cleanLines.join("\n").trim();
}

function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const lines = markdown.split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const codeMatch = line.match(/^```(\w+)?\s*$/);
    if (codeMatch) {
      const language = codeMatch[1] ?? "";
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index] ?? "")) {
        codeLines.push(lines[index] ?? "");
        index += 1;
      }
      blocks.push({ type: "code", language, code: codeLines.join("\n") });
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{2,4})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        depth: headingMatch[1]!.length as 2 | 3 | 4,
        text: headingMatch[2]!.trim(),
      });
      index += 1;
      continue;
    }

    if (isTableRow(line) && isTableSeparator(lines[index + 1] ?? "")) {
      const headers = parseTableRow(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && isTableRow(lines[index] ?? "")) {
        rows.push(parseTableRow(lines[index] ?? ""));
        index += 1;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index] ?? "")) {
        items.push((lines[index] ?? "").replace(/^\s*[-*]\s+/, "").trim());
        index += 1;
      }
      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index] ?? "")) {
        items.push((lines[index] ?? "").replace(/^\s*\d+\.\s+/, "").trim());
        index += 1;
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    if (/^>\s+/.test(line)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s*/.test(lines[index] ?? "")) {
        quoteLines.push((lines[index] ?? "").replace(/^>\s*/, "").trim());
        index += 1;
      }
      blocks.push({ type: "quote", text: quoteLines.join(" ") });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length && lines[index]?.trim()) {
      const nextLine = lines[index] ?? "";
      if (
        /^```/.test(nextLine) ||
        /^#{2,4}\s+/.test(nextLine) ||
        (isTableRow(nextLine) && isTableSeparator(lines[index + 1] ?? "")) ||
        /^\s*[-*]\s+/.test(nextLine) ||
        /^\s*\d+\.\s+/.test(nextLine) ||
        /^>\s+/.test(nextLine)
      ) {
        break;
      }
      paragraphLines.push(nextLine.trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

function isTableRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.endsWith("|") && trimmed.slice(1, -1).includes("|");
}

function isTableSeparator(line: string): boolean {
  if (!isTableRow(line)) return false;
  return parseTableRow(line).every((cell) => /^:?-{3,}:?$/.test(cell.trim()));
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderInlineMarkdown(text: string, source = ""): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("`")) {
      nodes.push(<code key={`${token}-${match.index}`}>{token.slice(1, -1)}</code>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        nodes.push(
          <a href={toDocsHref(linkMatch[2]!, source)} key={`${token}-${match.index}`}>
            {linkMatch[1]}
          </a>,
        );
      }
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function toDocsHref(href: string, source: string): string {
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("/") || href.startsWith("#")) return href;
  if (href.endsWith(".md")) {
    const resolved = normalizeDocPath(source, href);
    if (resolved.startsWith("docs/public/")) return publicDocPathToHref(resolved);
    return `https://github.com/byronwade/Lumina/blob/main/${resolved}`;
  }
  return href;
}

function normalizeDocPath(source: string, href: string): string {
  const sourceParts = source.split("/");
  sourceParts.pop();
  for (const part of href.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") sourceParts.pop();
    else sourceParts.push(part);
  }
  return sourceParts.join("/");
}

function publicDocPathToHref(path: string): string {
  const slug = path.replace(/^docs\/public\//, "").replace(/\.md$/, "");
  if (slug === "index") return "/";
  if (slug === "docs") return "/docs";
  if (slug === "roadmap") return "/roadmap";
  if (slug.endsWith("/overview")) return `/docs/${slug.replace(/\/overview$/, "")}`;
  return `/docs/${slug}`;
}

function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
