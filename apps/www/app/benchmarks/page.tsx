import { Activity, BarChart3, FileJson, Gauge, ShieldAlert, TimerReset } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const lanes = [
  {
    title: "Route discovery",
    status: "Skeleton",
    description: "Benchmark fixtures exist as status surfaces; measured results are not claimed yet.",
    icon: Activity,
  },
  {
    title: "Manifest size",
    status: "Skeleton",
    description: "Generated artifact sizes are planned benchmark inputs after fixture coverage expands.",
    icon: Gauge,
  },
  {
    title: "Adapter dispatch",
    status: "Planned",
    description: "Static output is verified today; production SSR/API dispatch benchmarks remain future scope.",
    icon: TimerReset,
  },
];

const evidenceRules = [
  "Raw results before public comparisons",
  "Fixture name and command recorded",
  "Environment and run count included",
  "Variance called out instead of hidden",
];

const benchmarkArtifacts = [
  {
    title: "Benchmark catalog",
    path: "bun run lumina -- bench --list --json",
    status: "Implemented",
    icon: FileJson,
  },
  {
    title: "Benchmark status",
    path: "bun run lumina -- bench route-discovery --json",
    status: "Implemented",
    icon: Activity,
  },
  {
    title: "Methodology contract",
    path: "docs/benchmark-methodology.md",
    status: "Planned",
    icon: ShieldAlert,
  },
  {
    title: "Performance report",
    path: ".lumina/perf.report.json",
    status: "Scaffolded",
    icon: BarChart3,
  },
];

export default function BenchmarksPage() {
  return (
    <main className="page-shell" id="main-content">
      <PageHeader
        eyebrow="Evidence only"
        title="Benchmarks"
        description="Lumina has benchmark skeletons for route discovery, manifest size, graph queries, and adapter dispatch. They currently report not implemented until measured fixtures exist."
      />

      <section className="benchmark-grid">
        {lanes.map((lane) => {
          const Icon = lane.icon;
          return (
            <Card className="benchmark-card" key={lane.title}>
              <CardHeader>
                <div className="feature-icon">
                  <Icon aria-hidden="true" size={18} />
                </div>
                <CardTitle>{lane.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{lane.description}</p>
                <Badge variant={lane.status === "Planned" ? "secondary" : "warning"}>{lane.status}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="benchmark-evidence-panel">
        <div className="section-heading">
          <Badge variant="outline">Evidence requirements</Badge>
          <h2>Benchmark pages should be useful before they are flattering.</h2>
          <p>
            The site can show benchmark surfaces today, but it cannot claim speed wins until the repository contains
            repeatable commands, raw result files, and methodology notes reviewers can inspect. The current status
            command reports skeleton metadata and does not execute benchmark code.
          </p>
        </div>
        <div className="evidence-checklist" aria-label="Benchmark evidence requirements">
          {evidenceRules.map((rule) => (
            <div key={rule}>
              <span aria-hidden="true" />
              <p>{rule}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="artifact-card-grid" aria-label="Benchmark artifacts">
        {benchmarkArtifacts.map((artifact) => {
          const Icon = artifact.icon;
          return (
            <Card className="artifact-card" key={artifact.title}>
              <CardHeader>
                <div className="feature-icon">
                  <Icon aria-hidden="true" size={18} />
                </div>
                <CardTitle>{artifact.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <code>{artifact.path}</code>
                <Badge
                  variant={
                    artifact.status === "Implemented"
                      ? "success"
                      : artifact.status === "Planned"
                        ? "warning"
                        : "secondary"
                  }
                >
                  {artifact.status}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="callout-band compact-callout">
        <div>
          <Badge variant="outline">No comparisons</Badge>
          <h2>Status surface, not a speed claim.</h2>
        </div>
        <p>
          This page intentionally avoids framework comparisons until benchmark fixtures, raw results, methodology,
          and repeatable commands exist in the repository.
        </p>
      </section>
    </main>
  );
}
