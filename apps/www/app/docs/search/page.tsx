import { ArrowRight, FileSearch, Search } from "lucide-react";
import { ssr } from "@lumina/react";
import { PageHeader } from "../../../components/PageHeader";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { docsIndexStats, searchDocsIndex } from "../../../lib/docs-index";

export const render = ssr();

type SearchParams = Record<string, string | string[] | undefined>;

const suggestedQueries = ["routing", "adapter", "security", "map", "SEO", "benchmarks"];

export default function DocsSearchPage({ searchParams = {} }: { searchParams?: SearchParams }) {
  const rawQuery = searchParams.q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] ?? "" : rawQuery ?? "";
  const cleanQuery = query.trim();
  const results = searchDocsIndex(cleanQuery, cleanQuery ? 14 : 8);

  return (
    <main className="docs-page docs-search-page" id="main-content">
      <PageHeader
        eyebrow="Docs search"
        title="Search Lumina docs"
        description="Find public docs pages across concepts, guides, references, deployment, and community notes from the current bundled Markdown inventory."
        facts={[
          { label: "Route", value: "/docs/search" },
          { label: "Source", value: "app/docs/search/page.tsx" },
          { label: "Status", value: "SSR search" },
        ]}
      />

      <section className="docs-search-layout" aria-label="Search documentation">
        <form action="/docs/search" className="docs-search-form" method="get" role="search">
          <Search aria-hidden="true" size={18} />
          <Input
            aria-label="Search docs"
            autoComplete="off"
            defaultValue={cleanQuery}
            name="q"
            placeholder="Search routes, adapters, security, map, CLI..."
          />
          <Button size="lg" type="submit">
            Search
          </Button>
        </form>

        <div className="docs-search-chips" aria-label="Suggested docs searches">
          {suggestedQueries.map((suggestion) => (
            <a aria-current={suggestion.toLowerCase() === cleanQuery.toLowerCase() ? "true" : undefined} href={`/docs/search?q=${suggestion}`} key={suggestion}>
              {suggestion}
            </a>
          ))}
        </div>

        <div className="docs-index-summary" aria-label="Docs index summary">
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

        <section className="docs-search-proof" aria-label="Search data sources">
          <Card>
            <CardContent>
              <Badge variant="secondary">Source aligned</Badge>
              <h2>Search uses the same bundled docs index that ships as JSON.</h2>
              <p>
                Result cards expose page status, lane, description, and canonical source path so the public site does
                not hide whether a topic is implemented, scaffolded, or planned.
              </p>
              <a href="/docs-index.json">Open docs-index.json</a>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Badge variant="outline">AI-readable</Badge>
              <h2>Machine-readable docs outputs stay adjacent to human docs.</h2>
              <p>
                The same build emits navigation and LLM text previews while the full generated docs pipeline remains a
                planned larger implementation.
              </p>
              <a href="/llms-full.txt">Open llms-full.txt</a>
            </CardContent>
          </Card>
        </section>

        <div className="docs-search-results-heading">
          <div>
            <FileSearch aria-hidden="true" size={18} />
            <h2>{cleanQuery ? `Results for "${cleanQuery}"` : "Popular docs"}</h2>
          </div>
          <Badge variant={cleanQuery ? "success" : "secondary"}>{results.length} shown</Badge>
        </div>

        <div className="docs-search-results">
          {results.length ? (
            results.map((result) => (
              <a className="docs-search-result-link" href={result.href} key={result.href}>
                <Card className="docs-search-result-card">
                  <CardContent>
                    <div className="docs-search-result-main">
                      <div className="docs-search-result-kicker">
                        <Badge variant={result.status === "Implemented" ? "success" : result.status === "Planned" ? "warning" : "secondary"}>
                          {result.status}
                        </Badge>
                        <span>{result.lane}</span>
                      </div>
                      <h3>{result.title}</h3>
                      <p>{result.description}</p>
                      <code>{result.source}</code>
                    </div>
                    <ArrowRight aria-hidden="true" size={16} />
                  </CardContent>
                </Card>
              </a>
            ))
          ) : (
            <Card className="docs-search-empty">
              <CardContent>
                <h2>No matching docs yet</h2>
                <p>Try a broader term like routing, adapter, security, CLI, map, SEO, or performance.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}
