import { ArrowLeft, Search } from "lucide-react";
import { docsIndexStats, docsNavigation } from "../lib/docs-index";
import type { MarkdownHeading } from "./MarkdownBody";

export function DocsSidebar({
  activeHref,
  headings = [],
  showBackLink = false,
}: {
  activeHref?: string;
  headings?: MarkdownHeading[];
  showBackLink?: boolean;
}) {
  return (
    <aside className="docs-sidebar docs-article-sidebar" aria-label="Documentation sections">
      {showBackLink ? (
        <a className="docs-back-link" href="/docs">
          <ArrowLeft aria-hidden="true" size={14} />
          Docs home
        </a>
      ) : null}

      <a
        aria-current={activeHref === "/docs/search" ? "page" : undefined}
        className="docs-search docs-search-link"
        href="/docs/search"
      >
        <Search aria-hidden="true" size={16} />
        <span>Search docs</span>
        <kbd>{docsIndexStats.pages}</kbd>
      </a>

      {headings.length ? (
        <nav className="docs-nav-group docs-toc-group" aria-label="On this page">
          <h2>On this page</h2>
          {headings.slice(0, 8).map((heading) => (
            <a className={heading.depth === 3 ? "docs-toc-child" : undefined} href={`#${heading.id}`} key={heading.id}>
              {heading.text}
            </a>
          ))}
        </nav>
      ) : null}

      {docsNavigation.sections.filter((section) => section.kind === "curated").map((group) => (
        <nav className="docs-nav-group" key={group.title} aria-label={group.title}>
          <h2>{group.title}</h2>
          {group.links.map((link) => (
            <a aria-current={link.href === activeHref ? "page" : undefined} href={link.href} key={link.href}>
              {link.title}
            </a>
          ))}
        </nav>
      ))}

      <div className="docs-sidebar-divider" />

      {docsNavigation.sections.filter((section) => section.kind === "inventory").map((group) => (
        <nav className="docs-nav-group docs-inventory-group" key={group.title} aria-label={`${group.title} public docs`}>
          <h2>{group.title}</h2>
          {group.links.map((entry) => (
            <a aria-current={entry.href === activeHref ? "page" : undefined} href={entry.href} key={entry.href}>
              <span>{entry.title}</span>
              <small>{entry.status}</small>
            </a>
          ))}
        </nav>
      ))}
    </aside>
  );
}
