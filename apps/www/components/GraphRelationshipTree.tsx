import {
  ArrowRight,
  Braces,
  CheckCircle2,
  CircleDot,
  FileCode2,
  FileJson,
  Folder,
  GitBranch,
  LayoutTemplate,
  Network,
  Route,
} from "lucide-react";
import { Badge } from "./ui/badge";

const sourceTree = [
  {
    label: "app",
    icon: Folder,
    rows: [
      { label: "layout.tsx", detail: "wraps route", icon: LayoutTemplate },
      { label: "page.tsx", detail: "defines /", icon: Route, active: true },
      { label: "docs/page.tsx", detail: "docs entry", icon: Route },
      { label: "docs/[...parts]", detail: "public docs inventory", icon: Route },
    ],
  },
  {
    label: "components",
    icon: Folder,
    rows: [
      { label: "Hero.tsx", detail: "imports visual", icon: FileCode2 },
      { label: "GraphRelationshipTree.tsx", detail: "relationship preview", icon: GitBranch, active: true },
    ],
  },
];

const outputs = [
  {
    label: ".lumina/routes.json",
    detail: "route id, path, params",
    icon: FileJson,
    status: "route manifest",
  },
  {
    label: ".lumina/render-manifest.json",
    detail: "static mode evidence",
    icon: Braces,
    status: "render proof",
  },
  {
    label: ".lumina/map.json",
    detail: "source, layout, and import edges",
    icon: GitBranch,
    status: "map evidence",
  },
];

const relationships = [
  { from: "app/page.tsx", relation: "route.source", to: "Route /", confidence: "high" },
  { from: "app/layout.tsx", relation: "route.layout", to: "Shared layout", confidence: "high" },
  { from: "Hero.tsx", relation: "file.imports", to: "GraphRelationshipTree", confidence: "direct" },
  { from: "staticPage()", relation: "route.renderMode", to: "Static HTML", confidence: "declared" },
  { from: "Route /", relation: "route.generates", to: ".lumina/* manifests", confidence: "build" },
];

const pathStages = [
  { label: "Source", value: "app/page.tsx" },
  { label: "Route", value: "/" },
  { label: "Layout", value: "app/layout.tsx" },
  { label: "Render", value: "static" },
  { label: "Artifacts", value: "routes + map" },
];

export function GraphRelationshipTree() {
  return (
    <div className="map-console" aria-label="Graph relationship preview">
      <div className="console-topbar">
        <div className="console-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="console-label">lumina inspect apps/www why /</span>
      </div>

      <div className="console-metrics" aria-label="Graph summary">
        <div>
          <Network aria-hidden="true" size={16} />
          <span>7 source nodes</span>
        </div>
        <div>
          <GitBranch aria-hidden="true" size={16} />
          <span>5 relationship edges</span>
        </div>
        <div>
          <CheckCircle2 aria-hidden="true" size={16} />
          <span>3 generated artifacts</span>
        </div>
      </div>

      <div className="relationship-board">
        <div className="tree-panel source-panel">
          <div className="panel-title">
            <span>Source tree</span>
            <Badge variant="success">current</Badge>
          </div>
          <div className="file-tree">
            {sourceTree.map((group) => {
              const GroupIcon = group.icon;
              return (
                <div className="tree-group" key={group.label}>
                  <div className="tree-row tree-folder">
                    <GroupIcon aria-hidden="true" size={16} />
                    <span>{group.label}</span>
                  </div>
                  {group.rows.map((row) => {
                    const RowIcon = row.icon;
                    return (
                      <div className={row.active ? "tree-row tree-file tree-row-active" : "tree-row tree-file"} key={row.label}>
                        <span className="tree-indent" aria-hidden="true" />
                        <RowIcon aria-hidden="true" size={15} />
                        <span>
                          <strong>{row.label}</strong>
                          <small>{row.detail}</small>
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="tree-panel inspector-panel">
          <div className="panel-title">
            <span>Relationship inspector</span>
            <Badge variant="outline">why /</Badge>
          </div>
          <div className="inspector-body">
            <div className="route-summary-card">
              <div className="route-summary-icon">
                <Route aria-hidden="true" size={18} />
              </div>
              <div>
                <span>Selected route</span>
                <strong>{"app/page.tsx -> /"}</strong>
                <small>Static page, wrapped by app/layout.tsx, hydrated by a generated client entry.</small>
              </div>
            </div>

            <div className="relationship-path" aria-label="Selected route relationship path">
              {pathStages.map((stage, index) => (
                <div className="relationship-stage" key={stage.label}>
                  <span className="stage-marker" aria-hidden="true">
                    <CircleDot size={14} />
                  </span>
                  <span>
                    <small>{stage.label}</small>
                    <strong>{stage.value}</strong>
                  </span>
                  {index < pathStages.length - 1 ? <ArrowRight aria-hidden="true" className="stage-arrow" size={14} /> : null}
                </div>
              ))}
            </div>

            <div className="relationship-list">
              {relationships.map((edge) => (
                <div className="relationship-edge" key={`${edge.from}-${edge.relation}-${edge.to}`}>
                  <span className="edge-node edge-node-source">{edge.from}</span>
                  <span className="edge-relation">
                    <strong>{edge.relation}</strong>
                    <ArrowRight aria-hidden="true" size={14} />
                    <small>{edge.confidence}</small>
                  </span>
                  <span className="edge-node edge-node-target">{edge.to}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="tree-panel output-panel">
          <div className="panel-title">
            <span>Generated outputs</span>
            <Badge variant="outline">evidence</Badge>
          </div>
          <div className="output-stack" aria-label="Generated graph evidence">
            {outputs.map((output) => {
              const OutputIcon = output.icon;
              return (
                <div className="output-card" key={output.label}>
                  <div className="output-icon">
                    <OutputIcon aria-hidden="true" size={16} />
                  </div>
                  <div>
                    <small>{output.status}</small>
                    <strong>{output.label}</strong>
                    <span>{output.detail}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relationship-footer">
        <span>Route /</span>
        <span>static render</span>
        <span>3 generated artifacts</span>
      </div>
    </div>
  );
}
