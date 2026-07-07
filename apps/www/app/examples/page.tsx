import { Boxes, CheckCircle2, CircleDashed, FileCode2, Layers3 } from "lucide-react";
import { ExampleCard } from "../../components/ExampleCard";
import { PageHeader } from "../../components/PageHeader";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const exampleStats = [
  { label: "Verified starter", value: "1", detail: "dev, build, start evidence" },
  { label: "Runnable content", value: "1", detail: "blog SEO fixture scope" },
  { label: "Large-route fixtures", value: "2", detail: "100 and 1000 route artifacts" },
];

const plannedExamples = [
  {
    title: "API Route",
    path: "examples/api-route",
    status: "Planned",
    description: "Future API handler and diagnostics fixture after API production behavior exists.",
    icon: FileCode2,
  },
  {
    title: "Hot API",
    path: "examples/hot-api",
    status: "Planned",
    description: "Future generated validator and serializer path for high-volume endpoints.",
    icon: Layers3,
  },
  {
    title: "Agent Demo",
    path: "examples/agent-demo",
    status: "Planned",
    description: "Future read-only context and safe-edit workflow demonstration once agent surfaces exist.",
    icon: CircleDashed,
  },
];

export default function ExamplesPage() {
  return (
    <main className="page-shell" id="main-content">
      <PageHeader
        eyebrow="Examples"
        title="Examples"
        description="Starter and fixture apps show what the current compiler can prove. Labels stay conservative until each example has build and inspection evidence."
      />

      <section className="examples-layout">
        <div className="examples-intro">
          <Badge variant="success">Current inventory</Badge>
          <h2>Example apps should double as verification fixtures.</h2>
          <p>
            The public examples surface mirrors the repository catalog without claiming unimplemented framework behavior.
          </p>
          <div className="examples-proof-list" aria-label="Current examples proof">
            <span>
              <CheckCircle2 aria-hidden="true" size={16} />
              `examples/basic` is verified.
            </span>
            <span>
              <Boxes aria-hidden="true" size={16} />
              Large fixtures prove deterministic artifacts, not app runtime behavior.
            </span>
          </div>
        </div>
        <div className="examples-grid">
          <ExampleCard name="Basic" status="Verified" path="examples/basic" />
          <ExampleCard name="Blog SEO" status="Runnable" path="examples/blog-seo" />
        </div>
      </section>

      <section className="evidence-strip" aria-label="Example inventory summary">
        {exampleStats.map((stat) => (
          <div key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <p>{stat.detail}</p>
          </div>
        ))}
      </section>

      <section className="planned-example-section" aria-labelledby="planned-examples-title">
        <div className="section-heading">
          <Badge variant="warning">Future fixtures</Badge>
          <h2 id="planned-examples-title">Planned examples stay visible without pretending they ship.</h2>
          <p>
            The public site should teach the intended shape of the framework, but every unreleased example keeps its
            planned label until source files, commands, generated artifacts, and tests exist.
          </p>
        </div>
        <div className="artifact-card-grid">
          {plannedExamples.map((example) => {
            const Icon = example.icon;
            return (
              <Card className="artifact-card" key={example.path}>
                <CardHeader>
                  <div className="feature-icon">
                    <Icon aria-hidden="true" size={18} />
                  </div>
                  <CardTitle>{example.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{example.description}</p>
                  <code>{example.path}</code>
                  <Badge variant="warning">{example.status}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
