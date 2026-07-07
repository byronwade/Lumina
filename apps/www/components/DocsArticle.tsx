import { ArrowLeft, ArrowRight, BookOpen, FileText, GitBranch, Route } from "lucide-react";
import type { DocsArticle } from "../lib/docs-content";
import { getAdjacentDocsLinks } from "../lib/docs-content";
import { getMarkdownHeadings, MarkdownBody } from "./MarkdownBody";
import { DocsSidebar } from "./DocsSidebar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function statusVariant(status: DocsArticle["status"]) {
  if (status === "Current" || status === "Implemented") return "success";
  if (status === "Scaffolded") return "secondary";
  return "warning";
}

export function DocsArticlePage({ article }: { article: DocsArticle }) {
  const Icon = article.icon;
  const headings = article.markdown ? getMarkdownHeadings(article.markdown).filter((heading) => heading.depth === 2 || heading.depth === 3) : [];
  const adjacent = getAdjacentDocsLinks(article.href);
  const relatedSources = article.related ?? [];
  const sectionCount = article.markdown ? headings.filter((heading) => heading.depth === 2).length : article.sections.length;

  return (
    <main className="docs-page docs-article-page" id="main-content">
      <DocsSidebar activeHref={article.href} headings={headings} showBackLink />

      <article className="docs-article">
        <header className="docs-article-header">
          <div className="docs-article-icon">
            <Icon aria-hidden="true" size={22} />
          </div>
          <div className="docs-article-heading">
            <div className="docs-article-kicker">
              <Badge variant={statusVariant(article.status)}>{article.status}</Badge>
              <span>{article.lane}</span>
            </div>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
          </div>
        </header>

        <section className="docs-source-panel" aria-label="Source document">
          <FileText aria-hidden="true" size={18} />
          <div>
            <span>Canonical source</span>
            <code>{article.source}</code>
          </div>
        </section>

        <section className="docs-article-map" aria-label="Documentation page map">
          <div>
            <Route aria-hidden="true" size={17} />
            <span>Route</span>
            <code>{article.href}</code>
          </div>
          <div>
            <GitBranch aria-hidden="true" size={17} />
            <span>Lane</span>
            <strong>{article.lane}</strong>
          </div>
          <div>
            <BookOpen aria-hidden="true" size={17} />
            <span>Sections</span>
            <strong>{sectionCount}</strong>
          </div>
        </section>

        {article.markdown ? (
          <MarkdownBody markdown={article.markdown} source={article.source} />
        ) : (
          <div className="docs-article-sections">
            {article.sections.map((section) => (
              <section className="docs-prose-section" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        )}

        <footer className="docs-article-footer">
          <div className="docs-prev-next" aria-label="Previous and next docs pages">
            {adjacent.previous ? (
              <a className="docs-pagination-link" href={adjacent.previous.href}>
                <ArrowLeft aria-hidden="true" size={15} />
                <span>
                  <small>Previous</small>
                  {adjacent.previous.label}
                </span>
              </a>
            ) : (
              <span className="docs-pagination-link docs-pagination-empty">
                <ArrowLeft aria-hidden="true" size={15} />
                <span>
                  <small>Previous</small>
                  Docs home
                </span>
              </span>
            )}
            {adjacent.next ? (
              <a className="docs-pagination-link docs-pagination-next" href={adjacent.next.href}>
                <span>
                  <small>Next</small>
                  {adjacent.next.label}
                </span>
                <ArrowRight aria-hidden="true" size={15} />
              </a>
            ) : (
              <a className="docs-pagination-link docs-pagination-next" href="/docs">
                <span>
                  <small>Next</small>
                  Docs home
                </span>
                <ArrowRight aria-hidden="true" size={15} />
              </a>
            )}
          </div>

          <div className="docs-article-footer-grid">
            <Card className="docs-next-card">
              <CardHeader>
                <CardTitle>Keep reading</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="docs-next-links">
                  {article.links.map((link) => (
                    <a href={link.href} key={link.label}>
                      {link.label}
                      <ArrowRight aria-hidden="true" size={14} />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="docs-related-card">
              <CardHeader>
                <CardTitle>Related source docs</CardTitle>
              </CardHeader>
              <CardContent>
                {relatedSources.length ? (
                  relatedSources.map((source) => (
                    <a href={sourceHref(source)} key={source}>
                      <FileText aria-hidden="true" size={14} />
                      <code>{source}</code>
                    </a>
                  ))
                ) : (
                  <p>This page is currently backed by its canonical source document.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </footer>
      </article>
    </main>
  );
}

function sourceHref(source: string): string {
  if (source.startsWith("docs/public/")) {
    const slug = source.replace(/^docs\/public\//, "").replace(/\.md$/, "");
    if (slug === "index") return "/";
    if (slug === "docs") return "/docs";
    if (slug === "roadmap") return "/roadmap";
    if (slug.endsWith("/overview")) return `/docs/${slug.replace(/\/overview$/, "")}`;
    return `/docs/${slug}`;
  }
  return `https://github.com/byronwade/Lumina/blob/main/${source}`;
}
