import { ArrowRight, Braces, FileText, GitBranch, Search } from "lucide-react";
import { docsIndexStats, docsNavigation } from "../lib/docs-index";
import { Badge } from "./ui/badge";

const productLinks = [
  { label: "About", href: "/about" },
  { label: "Docs", href: "/docs" },
  { label: "Benchmarks", href: "/benchmarks" },
  { label: "Examples", href: "/examples" },
  { label: "Roadmap", href: "/roadmap" },
];

const artifactLinks = [
  { label: "docs-index.json", href: "/docs-index.json", description: "Search metadata", icon: Braces },
  { label: "docs-navigation.json", href: "/docs-navigation.json", description: "Lane structure", icon: GitBranch },
  { label: "llms.txt", href: "/llms.txt", description: "Compact AI map", icon: FileText },
  { label: "llms-full.txt", href: "/llms-full.txt", description: "Bundled docs text", icon: FileText },
];

const docsLanes = docsNavigation.sections
  .filter((section) => section.kind === "curated")
  .slice(0, 6)
  .map((section) => ({
    title: section.title,
    href: section.links[0]?.href ?? "/docs",
  }));

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer-inner">
        <section className="footer-brand-panel" aria-label="Lumina documentation status">
          <div className="footer-brand-lockup">
            <span className="brand-mark">Lu</span>
            <div>
              <strong>Lumina</strong>
              <span>Your app ships with a map.</span>
            </div>
          </div>
          <p>
            A public docs and product surface for the app-graph-native React framework. Current pages stay source-linked
            while planned framework behavior remains labeled until implementation evidence exists.
          </p>
          <div className="footer-status-row" aria-label="Docs inventory summary">
            <Badge variant="success">Unreleased</Badge>
            <span>{docsIndexStats.pages} pages</span>
            <span>{docsIndexStats.lanes} lanes</span>
            <span>{docsIndexStats.sources} sources</span>
          </div>
        </section>

        <nav className="footer-link-group" aria-label="Product pages">
          <h2>Product</h2>
          {productLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
              <ArrowRight aria-hidden="true" size={13} />
            </a>
          ))}
        </nav>

        <nav className="footer-link-group" aria-label="Documentation lanes">
          <h2>Docs lanes</h2>
          {docsLanes.map((section) => (
            <a href={section.href} key={section.href}>
              {section.title}
              <ArrowRight aria-hidden="true" size={13} />
            </a>
          ))}
          <a href="/docs/search">
            Search docs
            <Search aria-hidden="true" size={13} />
          </a>
        </nav>

        <nav className="footer-artifact-group" aria-label="Docs artifacts">
          <h2>Docs artifacts</h2>
          {artifactLinks.map((artifact) => {
            const Icon = artifact.icon;
            return (
              <a href={artifact.href} key={artifact.href}>
                <Icon aria-hidden="true" size={14} />
                <span>
                  <strong>{artifact.label}</strong>
                  <small>{artifact.description}</small>
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="site-footer-bottom">
        <span>Canonical source: docs/</span>
        <span>Website fixture: apps/www</span>
        <a href="https://github.com/byronwade/Lumina">GitHub source</a>
      </div>
    </footer>
  );
}
