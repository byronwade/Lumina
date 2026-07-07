import { Braces, FileSearch, GitBranch, Route, ShieldCheck, TerminalSquare } from "lucide-react";
import { DocsCta, PageHeader } from "../../components/PageHeader";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const principles = [
  {
    title: "App graph first",
    description: "Routes, layouts, render modes, generated files, and source relationships are emitted as inspectable framework evidence.",
    icon: GitBranch,
  },
  {
    title: "SEO-safe by default",
    description: "The public direction favors static output first, then explicit SSR only where the route contract needs it.",
    icon: FileSearch,
  },
  {
    title: "Agent-auditable",
    description: "Agents should read contracts and generated artifacts instead of guessing how a React app is wired together.",
    icon: ShieldCheck,
  },
  {
    title: "Typed contracts",
    description: "Shared route, render, diagnostic, cache, and adapter models live in core packages instead of local copies.",
    icon: Braces,
  },
];

const proofLoop = [
  {
    label: "Discover",
    title: "Read the app shape",
    body: "Routes, layouts, render declarations, and direct local imports are discovered from source files.",
    source: "@lumina/compiler",
  },
  {
    label: "Generate",
    title: "Emit stable artifacts",
    body: "Route, render, map, build trace, performance, docs index, and adapter manifests are written as deterministic contracts.",
    source: ".lumina/* and dist/*",
  },
  {
    label: "Inspect",
    title: "Explain the work",
    body: "Humans and agents inspect why routes exist, what files relate, and which behavior is current versus planned.",
    source: "lumina inspect",
  },
];

const currentSurfaces = [
  { label: "Routes", value: "19", detail: "apps/www route evidence" },
  { label: "Docs artifacts", value: "4", detail: "index, navigation, llms, full llms" },
  { label: "Check gate", value: "Passing", detail: "docs, types, tests, browser smoke" },
];

export default function AboutPage() {
  return (
    <main className="page-shell" id="main-content">
      <PageHeader
        eyebrow="Project thesis"
        title="Why Lumina Exists"
        description="Lumina is being built for React applications that need route structure, render behavior, generated artifacts, and agent context to stay visible as the codebase grows."
        facts={[
          { label: "Route", value: "/about" },
          { label: "Source", value: "app/about/page.tsx" },
          { label: "Status", value: "Current thesis" },
        ]}
      >
        <DocsCta />
      </PageHeader>

      <section className="page-grid">
        {principles.map((principle) => {
          const Icon = principle.icon;
          return (
            <Card className="principle-card" key={principle.title}>
              <CardHeader>
                <div className="feature-icon">
                  <Icon aria-hidden="true" size={18} />
                </div>
                <CardTitle>{principle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{principle.description}</p>
                <Badge variant="success">MVP aligned</Badge>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="evidence-strip" aria-label="Current project evidence">
        {currentSurfaces.map((surface) => (
          <div key={surface.label}>
            <span>{surface.label}</span>
            <strong>{surface.value}</strong>
            <p>{surface.detail}</p>
          </div>
        ))}
      </section>

      <section className="proof-loop-section" aria-labelledby="proof-loop-title">
        <div className="section-heading">
          <Badge variant="outline">Evidence loop</Badge>
          <h2 id="proof-loop-title">The framework should explain the app before agents edit it.</h2>
          <p>
            Lumina is being shaped around contracts that are visible to people, CI, adapters, and future agent tools.
            The current scaffold proves the first slice of that loop before higher-risk edit workflows arrive.
          </p>
        </div>

        <div className="proof-loop-grid">
          {proofLoop.map((step, index) => (
            <article className="proof-loop-card" key={step.label}>
              <div className="proof-loop-index">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <Badge variant={index === 1 ? "success" : "secondary"}>{step.label}</Badge>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <code>{step.source}</code>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-panel" aria-label="Current and planned surfaces">
        <div>
          <Route aria-hidden="true" size={20} />
          <h2>Current proof stays small and legible.</h2>
          <p>
            The first real slice is route discovery, explicit render modes, local graph edges, static build output,
            adapter start behavior, docs inventory, and inspection commands.
          </p>
        </div>
        <div>
          <TerminalSquare aria-hidden="true" size={20} />
          <h2>Future surfaces stay marked as future.</h2>
          <p>
            MCP tools, safe edit transactions, broader semantic graph extraction, production API behavior, and
            measured benchmark claims remain planned until implementation and tests prove them.
          </p>
        </div>
      </section>

      <section className="callout-band">
        <div>
          <Badge variant="warning">Current focus</Badge>
          <h2>First prove the framework evidence loop.</h2>
        </div>
        <p>
          The current MVP work is focused on deterministic app discovery, compact manifests, static build output,
          and inspection commands before broader runtime behavior expands.
        </p>
      </section>
    </main>
  );
}
