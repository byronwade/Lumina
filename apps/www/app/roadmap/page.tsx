import { CheckCircle2, CircleDashed, FileJson, GitBranch, Rocket, ShieldCheck } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const roadmap = [
  {
    title: "Route, render, map, and inspect artifacts",
    status: "Implemented",
    icon: CheckCircle2,
  },
  {
    title: "First marketing app and example fixtures",
    status: "Implemented",
    icon: CheckCircle2,
  },
  {
    title: "Vite dev integration",
    status: "Implemented",
    icon: FileJson,
  },
  {
    title: "Static build and Bun adapter start path",
    status: "Implemented",
    icon: Rocket,
  },
  {
    title: "Expanded docs routing and searchable public docs",
    status: "Planned",
    icon: CircleDashed,
  },
];

const roadmapStats = [
  { label: "Implemented proof", value: "4", detail: "route, dev, build, start slices" },
  { label: "Preview docs artifacts", value: "4", detail: "index, navigation, llms files" },
  { label: "Remaining high-risk surfaces", value: "5", detail: "API, MCP, safe edits, benchmarks, broader HMR" },
];

const roadmapLanes = [
  {
    title: "Now",
    description: "Harden component-level HMR, production output behavior, and docs polish around current evidence.",
    status: "Current path",
    icon: GitBranch,
  },
  {
    title: "Next",
    description: "Add metadata and SEO audit behavior, cache metadata, API route contracts, and broader map queries.",
    status: "Planned",
    icon: FileJson,
  },
  {
    title: "Later",
    description: "Layer in MCP read tools, safe edit transactions, Node/static adapters, migration help, and benchmark evidence.",
    status: "Planned",
    icon: ShieldCheck,
  },
];

export default function RoadmapPage() {
  return (
    <main className="page-shell" id="main-content">
      <PageHeader
        eyebrow="Alpha path"
        title="Roadmap"
        description="The public roadmap separates implemented proof from planned framework expansion so the site stays useful without overclaiming the current scaffold."
        facts={[
          { label: "Route", value: "/roadmap" },
          { label: "Source", value: "app/roadmap/page.tsx" },
          { label: "Status", value: "Alpha path" },
        ]}
      />

      <section className="evidence-strip" aria-label="Roadmap proof summary">
        {roadmapStats.map((stat) => (
          <div key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <p>{stat.detail}</p>
          </div>
        ))}
      </section>

      <section className="roadmap-lane-grid" aria-label="Roadmap lanes">
        {roadmapLanes.map((lane) => {
          const Icon = lane.icon;
          return (
            <Card className="roadmap-lane-card" key={lane.title}>
              <CardHeader>
                <div className="feature-icon">
                  <Icon aria-hidden="true" size={18} />
                </div>
                <CardTitle>{lane.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{lane.description}</p>
                <Badge variant={lane.status === "Current path" ? "success" : "warning"}>{lane.status}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="roadmap-panel">
        <div className="roadmap-rail" aria-hidden="true" />
        {roadmap.map((item) => {
          const Icon = item.icon;
          return (
            <article className="roadmap-item" key={item.title}>
              <div className="roadmap-icon">
                <Icon aria-hidden="true" size={18} />
              </div>
              <div>
                <h2>{item.title}</h2>
                <Badge variant={item.status === "Implemented" ? "success" : "secondary"}>{item.status}</Badge>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
