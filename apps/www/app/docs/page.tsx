import { BookOpen, FileCode2, ShieldCheck } from "lucide-react";
import { DocsSidebar } from "../../components/DocsSidebar";
import { PageHeader } from "../../components/PageHeader";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { docsIndexStats, docsNavigation } from "../../lib/docs-index";
import { docsArticles, publicDocsPages } from "../../lib/docs-content";

const featuredDocs = docsArticles.filter((article) =>
  ["start", "concepts/app-graph", "reference/cli", "reference/routing"].includes(article.slug),
);

const referenceLanes = publicDocsPages.filter((article) => article.lane === "Reference");
const curatedNavigationSections = docsNavigation.sections.filter((section) => section.kind === "curated");
const inventoryNavigationSections = docsNavigation.sections.filter((section) => section.kind === "inventory");

export default function DocsPage() {
  return (
    <main className="docs-page" id="main-content">
      <PageHeader
        eyebrow="Public documentation"
        title="Documentation"
        description="A Next.js-style docs surface for the whole Lumina project: quick start, concepts, guides, contracts, operations, and implementation status in one readable system."
      />

      <section className="docs-browser">
        <DocsSidebar activeHref="/docs" />

        <div className="docs-content" id="docs-content">
          <div className="docs-intro">
            <Badge variant="success">Canonical source: docs/</Badge>
            <h2>Read from overview to contract without losing the project map.</h2>
            <p>
              The source Markdown files remain canonical today. This public layer now has static docs routes for the
              main lanes, an SSR Markdown viewer for mapped public docs, and a search page backed by the bundled docs
              inventory. Generated static docs routes, generated search artifacts, and frontmatter parsing remain planned.
            </p>
          </div>

          <div className="docs-index-strip" aria-label="Bundled docs index">
            <div>
              <strong>{docsIndexStats.pages}</strong>
              <span>indexed pages</span>
            </div>
            <div>
              <strong>{docsIndexStats.lanes}</strong>
              <span>content lanes</span>
            </div>
            <div>
              <strong>{docsIndexStats.sources}</strong>
              <span>source files</span>
            </div>
          </div>

          <div className="docs-feature-grid">
            {featuredDocs.map((doc) => {
              const Icon = doc.icon;
              return (
                <a className="doc-card-link" href={doc.href} key={doc.title}>
                  <Card className="doc-card">
                    <CardHeader>
                      <div className="feature-icon">
                        <Icon aria-hidden="true" size={18} />
                      </div>
                      <CardTitle>{doc.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{doc.description}</p>
                      <code>{doc.source}</code>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>

          <section className="reference-section">
            <div>
              <BookOpen aria-hidden="true" size={20} />
              <h2>Reference lanes</h2>
              <p>
                Contract pages define stable behavior before the public site renders every Markdown document as an
                individual generated route.
              </p>
            </div>
            <div className="reference-pills">
              {referenceLanes.map((lane) => (
                <a href={lane.href} key={lane.href}>
                  {lane.title}
                </a>
              ))}
            </div>
          </section>

          <section className="docs-lane-grid" aria-label="Documentation lanes">
            {curatedNavigationSections.map((group) => (
              <Card className="docs-lane-card" key={group.title}>
                <CardHeader>
                  <div className="feature-icon">
                    <FileCode2 aria-hidden="true" size={18} />
                  </div>
                  <CardTitle>{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {group.links.map((link) => (
                    <a href={link.href} key={link.href}>
                      <span>{link.title}</span>
                      <Badge
                        variant={
                          link.status === "Current" || link.status === "Implemented"
                            ? "success"
                            : link.status === "Planned"
                              ? "warning"
                              : "secondary"
                        }
                      >
                        {link.status}
                      </Badge>
                    </a>
                  ))}
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="docs-full-index" aria-labelledby="docs-full-index-title">
            <div className="docs-full-index-heading">
              <div>
                <Badge variant="secondary">Bundled inventory</Badge>
                <h2 id="docs-full-index-title">All public docs pages</h2>
              </div>
              <p>
                These links come from the current `docs/public/` metadata inventory and resolve through the SSR
                Markdown viewer until generated static docs routes land.
              </p>
            </div>
            <div className="docs-full-index-grid">
              {inventoryNavigationSections.map((group) => (
                <Card className="docs-index-card" key={group.title}>
                  <CardHeader>
                    <CardTitle>{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {group.links.map((entry) => (
                      <a href={entry.href} key={entry.href}>
                        <span>{entry.title}</span>
                        <Badge variant={entry.status === "Implemented" ? "success" : entry.status === "Planned" ? "warning" : "secondary"}>
                          {entry.status}
                        </Badge>
                      </a>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="docs-status-panel">
            <ShieldCheck aria-hidden="true" size={20} />
            <div>
              <h2>Docs status stays explicit.</h2>
              <p>
                Implemented, scaffolded, planned, and verified states stay visible so the public docs can look polished
                without blurring what the framework can prove today.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
