export const appStyles = String.raw`
:root {
  color-scheme: light;
  --background: #f7f8f5;
  --foreground: #17211b;
  --card: #ffffff;
  --card-foreground: #17211b;
  --muted: #e8ece4;
  --muted-foreground: #5b665d;
  --primary: #245a41;
  --primary-foreground: #ffffff;
  --secondary: #dfe7dd;
  --secondary-foreground: #17211b;
  --accent: #b96826;
  --accent-foreground: #ffffff;
  --border: #d5dbd2;
  --input: #d5dbd2;
  --ring: #245a41;
  --radius: 10px;
  --shadow: 0 24px 70px rgba(38, 66, 48, 0.16);
  --grid-line: rgba(23, 33, 27, 0.04);
  --header-bg: rgba(247, 248, 245, 0.88);
  --header-border: rgba(23, 33, 27, 0.08);
  --surface: rgba(255, 255, 255, 0.78);
  --surface-soft: rgba(255, 255, 255, 0.62);
  --surface-strong: rgba(255, 255, 255, 0.92);
  --surface-row: rgba(255, 255, 255, 0.68);
  --code-bg: rgba(255, 255, 255, 0.62);
  --card-shadow: 0 14px 34px rgba(38, 66, 48, 0.08);
  --focus-contrast: #ffffff;
  --console-bg: #f3f6f0;
  --console-fg: #17211b;
  --console-muted: rgba(23, 33, 27, 0.68);
  --console-soft: rgba(36, 90, 65, 0.07);
  --console-strong: rgba(255, 255, 255, 0.88);
  --console-border: rgba(23, 33, 27, 0.12);
  --console-divider: rgba(23, 33, 27, 0.08);
  --console-accent: #245a41;
  --console-accent-soft: rgba(36, 90, 65, 0.12);
  --console-warm: #b96826;
  --console-warm-soft: rgba(185, 104, 38, 0.1);
  --console-grid: rgba(23, 33, 27, 0.055);
  --console-active: #245a41;
  --console-active-fg: #ffffff;
  --console-shadow: 0 18px 42px rgba(38, 66, 48, 0.11);
}

html.dark {
  color-scheme: dark;
  --background: #0c100e;
  --foreground: #edf6ef;
  --card: #121a16;
  --card-foreground: #edf6ef;
  --muted: #1b241f;
  --muted-foreground: #a9b7ae;
  --primary: #8bd3a9;
  --primary-foreground: #082014;
  --secondary: #1f2b24;
  --secondary-foreground: #edf6ef;
  --accent: #d69b62;
  --accent-foreground: #1f1207;
  --border: #2d3a33;
  --input: #334239;
  --ring: #8bd3a9;
  --shadow: 0 24px 70px rgba(0, 0, 0, 0.34);
  --grid-line: rgba(237, 246, 239, 0.045);
  --header-bg: rgba(12, 16, 14, 0.86);
  --header-border: rgba(237, 246, 239, 0.08);
  --surface: rgba(18, 26, 22, 0.78);
  --surface-soft: rgba(31, 43, 36, 0.72);
  --surface-strong: rgba(18, 26, 22, 0.94);
  --surface-row: rgba(18, 26, 22, 0.68);
  --code-bg: rgba(12, 16, 14, 0.62);
  --card-shadow: 0 14px 34px rgba(0, 0, 0, 0.24);
  --focus-contrast: #082014;
  --console-bg: #102018;
  --console-fg: #edf6ee;
  --console-muted: rgba(237, 246, 238, 0.72);
  --console-soft: rgba(247, 248, 245, 0.06);
  --console-strong: rgba(16, 32, 24, 0.84);
  --console-border: rgba(237, 246, 238, 0.13);
  --console-divider: rgba(237, 246, 238, 0.12);
  --console-accent: #8bd3a9;
  --console-accent-soft: rgba(139, 211, 169, 0.16);
  --console-warm: #f0c497;
  --console-warm-soft: rgba(214, 155, 98, 0.11);
  --console-grid: rgba(237, 246, 238, 0.055);
  --console-active: #dcefe2;
  --console-active-fg: #f4fff6;
  --console-shadow: 0 18px 42px rgba(0, 0, 0, 0.22);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background: var(--background);
}

body {
  margin: 0;
  min-width: 320px;
  background:
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
    linear-gradient(180deg, var(--grid-line) 1px, transparent 1px),
    var(--background);
  background-size: 42px 42px;
  color: var(--foreground);
  font-family: "Geist", "Aptos", "Segoe UI", system-ui, sans-serif;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}

.skip-link {
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 20;
  transform: translateY(-150%);
  border-radius: 8px;
  background: var(--foreground);
  color: var(--background);
  padding: 0.7rem 1rem;
  transition: transform 180ms ease;
}

.skip-link:focus {
  transform: translateY(0);
}

.site-shell {
  min-height: 100dvh;
}

.site-footer {
  border-top: 1px solid var(--border);
  background:
    linear-gradient(180deg, transparent, color-mix(in srgb, var(--primary) 5%, transparent)),
    var(--surface-soft);
  padding: clamp(2rem, 5vw, 3.25rem) clamp(1rem, 4vw, 3rem) 1.35rem;
}

.site-footer-inner {
  display: grid;
  max-width: 1180px;
  grid-template-columns: minmax(260px, 1.1fr) minmax(150px, 0.48fr) minmax(170px, 0.54fr) minmax(250px, 0.86fr);
  gap: clamp(1rem, 3vw, 2rem);
  margin-inline: auto;
}

.footer-brand-panel {
  display: grid;
  gap: 0.95rem;
  align-content: start;
}

.footer-brand-lockup {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
}

.footer-brand-lockup > div {
  display: grid;
  gap: 0.1rem;
}

.footer-brand-lockup strong {
  font-size: 1rem;
}

.footer-brand-lockup span:last-child {
  color: var(--muted-foreground);
  font-size: 0.86rem;
}

.footer-brand-panel p {
  margin: 0;
  max-width: 58ch;
  color: var(--muted-foreground);
  font-size: 0.92rem;
}

.footer-status-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
}

.footer-status-row > span {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--muted-foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.72rem;
  padding: 0.22rem 0.48rem;
}

.footer-link-group,
.footer-artifact-group {
  display: grid;
  gap: 0.46rem;
  align-content: start;
}

.footer-link-group h2,
.footer-artifact-group h2 {
  margin: 0 0 0.3rem;
  color: var(--muted-foreground);
  font-size: 0.72rem;
  font-weight: 780;
  text-transform: uppercase;
}

.footer-link-group a,
.footer-artifact-group a {
  color: var(--foreground);
  border-radius: 8px;
}

.footer-link-group a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;
  min-width: 0;
  color: var(--muted-foreground);
  font-size: 0.88rem;
  font-weight: 640;
  padding: 0.34rem 0.42rem;
}

.footer-link-group a:hover,
.footer-link-group a:focus-visible {
  background: var(--surface);
  color: var(--foreground);
  outline: none;
}

.footer-artifact-group a {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.55rem;
  align-items: center;
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 0.52rem 0.6rem;
}

.footer-artifact-group a:hover,
.footer-artifact-group a:focus-visible {
  border-color: var(--ring);
  outline: none;
}

.footer-artifact-group a > span {
  display: grid;
  min-width: 0;
  gap: 0.05rem;
}

.footer-artifact-group strong,
.footer-artifact-group small {
  min-width: 0;
  overflow-wrap: anywhere;
}

.footer-artifact-group strong {
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
}

.footer-artifact-group small {
  color: var(--muted-foreground);
  font-size: 0.72rem;
}

.site-footer-bottom {
  display: flex;
  max-width: 1180px;
  flex-wrap: wrap;
  gap: 0.55rem 1rem;
  justify-content: space-between;
  border-top: 1px solid var(--border);
  margin: clamp(1.5rem, 4vw, 2.4rem) auto 0;
  padding-top: 1rem;
  color: var(--muted-foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.72rem;
}

.site-footer-bottom a {
  color: var(--foreground);
}

.site-footer-bottom a:hover,
.site-footer-bottom a:focus-visible {
  color: var(--primary);
  outline: none;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--header-border);
  background: var(--header-bg);
  padding: 0.9rem clamp(1rem, 4vw, 3rem);
  backdrop-filter: blur(18px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 700;
}

.brand-mark {
  display: grid;
  width: 2.15rem;
  height: 2.15rem;
  place-items: center;
  border-radius: 8px;
  background: var(--foreground);
  color: var(--background);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.9rem;
  font-weight: 700;
}

.primary-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.15rem;
}

.theme-toggle {
  display: inline-grid;
  width: 2.35rem;
  height: 2.35rem;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-soft);
  color: var(--foreground);
  cursor: pointer;
  transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.theme-toggle:hover {
  background: var(--secondary);
  transform: translateY(-1px);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 3px;
}

.theme-icon {
  grid-area: 1 / 1;
  transition: opacity 160ms ease, transform 160ms ease;
}

.theme-icon-moon {
  opacity: 0;
  transform: rotate(-20deg) scale(0.72);
}

html.dark .theme-icon-sun {
  opacity: 0;
  transform: rotate(20deg) scale(0.72);
}

html.dark .theme-icon-moon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

.primary-nav a {
  border-radius: 8px;
  color: var(--muted-foreground);
  font-size: 0.94rem;
  font-weight: 560;
  padding: 0.55rem 0.72rem;
  transition: background 180ms ease, color 180ms ease;
}

.primary-nav a:hover,
.primary-nav a:focus-visible {
  background: var(--secondary);
  color: var(--foreground);
  outline: none;
}

.home-page {
  overflow: hidden;
}

.section-shell {
  margin-inline: auto;
  max-width: 1180px;
  padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
}

.hero-section {
  display: grid;
  min-height: 72dvh;
  align-items: center;
  max-width: 1320px;
  grid-template-columns: minmax(320px, 0.58fr) minmax(760px, 1.42fr);
  gap: clamp(2rem, 4vw, 4rem);
  padding-top: clamp(2.5rem, 7vw, 5rem);
}

.hero-copy {
  display: grid;
  gap: 1.2rem;
  max-width: 680px;
}

.eyebrow {
  color: var(--primary);
  font-size: 0.92rem;
  font-weight: 700;
}

.hero-copy h1 {
  margin: 0;
  max-width: 10ch;
  font-size: clamp(4rem, 9.5vw, 8.4rem);
  line-height: 0.88;
  text-wrap: balance;
}

.hero-copy p {
  margin: 0;
  max-width: 62ch;
  color: var(--muted-foreground);
  font-size: clamp(1.02rem, 2vw, 1.22rem);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
  padding-top: 0.4rem;
}

.hero-proof {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  padding-top: 0.4rem;
}

.hero-visual {
  position: relative;
  min-height: 560px;
}

.map-console {
  position: relative;
  min-height: 560px;
  overflow: hidden;
  border: 1px solid var(--console-border);
  border-radius: 10px;
  background: var(--console-bg);
  box-shadow: var(--shadow);
  color: var(--console-fg);
}

.console-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--console-divider);
  padding: 0.85rem 1rem;
}

.console-dots {
  display: flex;
  gap: 0.35rem;
}

.console-dots span {
  display: block;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  background: var(--console-accent);
  opacity: 0.72;
}

.console-label {
  color: var(--console-muted);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
}

.console-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  border-bottom: 1px solid var(--console-divider);
  background: var(--console-divider);
}

.console-metrics div {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.52rem;
  background: var(--console-strong);
  color: var(--console-muted);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.68rem;
  padding: 0.78rem 0.9rem;
}

.console-metrics svg {
  flex: 0 0 auto;
  color: var(--console-accent);
}

.route-map {
  position: relative;
  min-height: 360px;
  margin: 1.25rem;
  border-radius: 8px;
  background:
    linear-gradient(90deg, var(--console-grid) 1px, transparent 1px),
    linear-gradient(180deg, var(--console-grid) 1px, transparent 1px);
  background-size: 34px 34px;
}

.map-line {
  position: absolute;
  height: 2px;
  transform-origin: left center;
  background: var(--console-accent);
  opacity: 0.55;
}

.map-line-one {
  left: 27%;
  top: 33%;
  width: 35%;
  transform: rotate(19deg);
}

.map-line-two {
  left: 28%;
  top: 59%;
  width: 34%;
  transform: rotate(-16deg);
}

.map-line-three {
  left: 57%;
  top: 45%;
  width: 24%;
  transform: rotate(49deg);
}

.map-node {
  position: absolute;
  display: grid;
  gap: 0.25rem;
  min-width: 9.4rem;
  border: 1px solid var(--console-border);
  border-radius: 8px;
  background: var(--console-soft);
  padding: 0.8rem;
}

.map-node strong,
.map-node span {
  display: block;
}

.map-node strong {
  font-size: 0.88rem;
}

.map-node span {
  color: var(--console-muted);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.72rem;
}

.node-route {
  left: 7%;
  top: 27%;
}

.node-render {
  right: 9%;
  top: 39%;
}

.node-map {
  left: 15%;
  bottom: 15%;
}

.node-agent {
  right: 8%;
  bottom: 10%;
}

.console-log {
  display: grid;
  gap: 0.55rem;
  border-top: 1px solid var(--console-divider);
  padding: 1rem 1.25rem 1.25rem;
  color: var(--console-muted);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.76rem;
}

.relationship-board {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.62fr) minmax(0, 0.82fr);
  gap: 1rem;
  padding: 1.05rem;
}

.tree-panel {
  min-width: 0;
  border: 1px solid var(--console-border);
  border-radius: 9px;
  background: var(--console-soft);
  box-shadow: var(--console-shadow);
}

.source-panel {
  background:
    linear-gradient(180deg, var(--console-soft), transparent),
    var(--console-strong);
}

.inspector-panel {
  background: var(--console-strong);
}

.output-panel {
  background:
    linear-gradient(180deg, var(--console-warm-soft), transparent),
    var(--console-strong);
}

.panel-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  border-bottom: 1px solid var(--console-divider);
  min-height: 3.5rem;
  padding: 0.85rem 0.95rem;
  color: var(--console-fg);
  font-size: 0.82rem;
  font-weight: 700;
}

.file-tree,
.output-stack {
  display: grid;
  gap: 0.72rem;
  padding: 0.95rem;
}

.tree-group {
  display: grid;
  gap: 0.34rem;
}

.tree-row {
  min-width: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.58rem;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--console-muted);
  font-size: 0.82rem;
  min-height: 2.55rem;
  padding: 0.5rem 0.62rem;
}

.tree-folder {
  color: var(--console-fg);
  font-weight: 700;
}

.tree-file {
  grid-template-columns: auto auto 1fr;
  margin-left: 0.15rem;
}

.tree-row-active {
  border-color: var(--console-accent);
  background:
    linear-gradient(90deg, var(--console-accent-soft), transparent),
    var(--console-soft);
  color: var(--console-active-fg);
  box-shadow: inset 3px 0 0 var(--console-accent);
}

.tree-row strong,
.tree-row small,
.output-card strong,
.output-card small {
  display: block;
  min-width: 0;
  overflow-wrap: anywhere;
}

.tree-row small,
.output-card small {
  color: var(--console-muted);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.68rem;
  font-weight: 500;
}

.tree-indent {
  width: 0.8rem;
  height: 1.35rem;
  border-bottom: 1px solid var(--console-border);
  border-left: 1px solid var(--console-border);
  border-bottom-left-radius: 6px;
}

.relationship-spine {
  position: relative;
  display: grid;
  align-content: center;
  gap: 2.2rem;
}

.relationship-spine::before {
  position: absolute;
  inset: 2rem 50% 2rem auto;
  width: 1px;
  background: var(--console-divider);
  content: "";
}

.relation-pill {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
  border: 1px solid var(--console-border);
  border-radius: 8px;
  background: var(--console-strong);
  color: var(--console-fg);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.68rem;
  padding: 0.52rem 0.58rem;
  box-shadow: var(--console-shadow);
}

.output-stack {
  gap: 0.82rem;
}

.output-card {
  min-width: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.72rem;
  align-items: start;
  border: 1px solid var(--console-border);
  border-radius: 8px;
  background: var(--console-soft);
  color: var(--console-fg);
  padding: 0.82rem;
}

.output-card span {
  display: block;
  color: var(--console-muted);
  font-size: 0.72rem;
}

.output-icon {
  display: grid;
  width: 2.15rem;
  height: 2.15rem;
  place-items: center;
  border: 1px solid var(--console-border);
  border-radius: 8px;
  background: var(--console-warm-soft);
  color: var(--console-warm);
}

.output-card span,
.tree-row span {
  min-width: 0;
}

.inspector-body {
  display: grid;
  gap: 0.9rem;
  padding: 1rem;
}

.route-summary-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.86rem;
  align-items: start;
  border: 1px solid var(--console-border);
  border-radius: 8px;
  background: var(--console-accent-soft);
  padding: 0.95rem;
}

.route-summary-icon {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  border-radius: 8px;
  background: var(--console-strong);
  color: var(--console-accent);
}

.route-summary-card span,
.route-summary-card strong,
.route-summary-card small {
  display: block;
  min-width: 0;
  overflow-wrap: anywhere;
}

.route-summary-card span {
  color: var(--console-muted);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
}

.route-summary-card strong {
  color: var(--console-fg);
  font-size: 0.95rem;
}

.route-summary-card small {
  color: var(--console-muted);
  font-size: 0.76rem;
}

.relationship-path {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.45rem;
  border: 1px solid var(--console-border);
  border-radius: 9px;
  background:
    linear-gradient(90deg, var(--console-accent-soft), transparent 58%),
    var(--console-soft);
  padding: 0.65rem;
}

.relationship-stage {
  position: relative;
  display: grid;
  min-width: 0;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 0.45rem;
  align-items: center;
  border: 1px solid var(--console-border);
  border-radius: 8px;
  background: var(--console-strong);
  padding: 0.5rem 0.58rem;
}

.stage-marker {
  display: grid;
  width: 1.35rem;
  height: 1.35rem;
  place-items: center;
  color: var(--console-accent);
}

.relationship-stage span:last-of-type {
  display: grid;
  min-width: 0;
  gap: 0.08rem;
}

.relationship-stage small,
.relationship-stage strong {
  min-width: 0;
  overflow-wrap: anywhere;
}

.relationship-stage small {
  color: var(--console-muted);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.58rem;
  font-weight: 720;
  text-transform: uppercase;
}

.relationship-stage strong {
  color: var(--console-fg);
  font-size: 0.74rem;
  line-height: 1.2;
}

.stage-arrow {
  color: var(--console-muted);
}

.relationship-list {
  display: grid;
  gap: 0.62rem;
}

.relationship-edge {
  display: grid;
  min-width: 0;
  grid-template-columns: minmax(0, 0.86fr) minmax(0, 0.74fr) minmax(0, 0.9fr);
  gap: 0.55rem;
  align-items: center;
  border: 1px solid var(--console-border);
  border-radius: 8px;
  background: var(--console-soft);
  padding: 0.78rem;
}

.edge-node,
.edge-relation,
.edge-relation strong,
.edge-relation small {
  min-width: 0;
  overflow-wrap: anywhere;
}

.edge-node {
  color: var(--console-muted);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.72rem;
}

.edge-node-target {
  color: var(--console-fg);
  font-family: "Geist", "Aptos", "Segoe UI", system-ui, sans-serif;
  font-size: 0.82rem;
  font-weight: 720;
}

.edge-relation {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: 1px solid var(--console-border);
  border-radius: 999px;
  background: var(--console-strong);
  color: var(--console-fg);
  font-size: 0.64rem;
  justify-self: stretch;
  padding: 0.36rem 0.5rem;
  white-space: nowrap;
}

.edge-relation small {
  color: var(--console-muted);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.6rem;
}

.evidence-strip {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.evidence-card {
  display: grid;
  min-width: 0;
  grid-template-columns: auto 1fr;
  gap: 0.48rem;
  align-items: start;
  border: 1px solid var(--console-border);
  border-radius: 8px;
  background: var(--console-soft);
  color: var(--console-fg);
  padding: 0.65rem;
}

.evidence-card span,
.evidence-card strong,
.evidence-card small {
  display: block;
  min-width: 0;
  overflow-wrap: anywhere;
}

.evidence-card strong {
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.68rem;
}

.evidence-card small {
  color: var(--console-muted);
  font-size: 0.66rem;
}

.artifact-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.artifact-chip {
  display: inline-flex;
  max-width: 100%;
  align-items: center;
  gap: 0.34rem;
  border: 1px solid var(--console-border);
  border-radius: 999px;
  background: var(--console-soft);
  color: var(--console-muted);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.66rem;
  padding: 0.36rem 0.5rem;
  overflow-wrap: anywhere;
}

.relationship-footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  border-top: 1px solid var(--console-divider);
  background: var(--console-divider);
  color: var(--console-muted);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.72rem;
}

.relationship-footer span {
  background: var(--console-strong);
  padding: 0.8rem 1rem;
}

.section-heading {
  display: grid;
  gap: 0.65rem;
  max-width: 720px;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 4.1rem);
  line-height: 0.98;
  text-wrap: balance;
}

.section-heading p {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 1.06rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  padding-top: 2rem;
}

.feature-card {
  min-height: 240px;
}

.feature-icon,
.speed-icon {
  display: grid;
  width: 2.35rem;
  height: 2.35rem;
  place-items: center;
  border-radius: 8px;
  background: var(--secondary);
  color: var(--primary);
}

.speed-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(320px, 1.14fr);
  gap: 1rem;
}

.speed-list {
  display: grid;
  gap: 0.8rem;
}

.speed-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.85rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-row);
  padding: 0.9rem;
}

.speed-row strong,
.speed-row span {
  display: block;
}

.speed-row span {
  color: var(--muted-foreground);
  font-size: 0.92rem;
}

.map-preview-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
  gap: 1rem;
  align-items: stretch;
}

.map-artifact-list {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
}

.map-artifact-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--border);
  list-style: none;
  padding: 0.78rem 0;
}

.map-artifact-list li:last-child {
  border-bottom: 0;
}

.code-path {
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.86rem;
}

.flow-board {
  display: grid;
  gap: 0.8rem;
}

.flow-step {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  align-items: start;
}

.flow-index {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: 8px;
  background: var(--foreground);
  color: var(--background);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.8rem;
}

.counter-shell {
  padding-top: 0;
}

.counter-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.counter-card p {
  margin: 0;
  color: var(--muted-foreground);
}

.page-shell,
.docs-page {
  margin-inline: auto;
  max-width: 1180px;
  padding: clamp(2.5rem, 7vw, 5rem) clamp(1rem, 4vw, 3rem) clamp(4rem, 9vw, 7rem);
}

.page-hero {
  display: grid;
  gap: 1.1rem;
  padding-bottom: clamp(2rem, 5vw, 3.5rem);
}

.page-hero-copy {
  display: grid;
  gap: 0.85rem;
  max-width: 820px;
}

.page-hero h1 {
  margin: 0;
  font-size: clamp(3rem, 7vw, 6.4rem);
  line-height: 0.92;
  text-wrap: balance;
}

.page-hero p {
  margin: 0;
  max-width: 70ch;
  color: var(--muted-foreground);
  font-size: clamp(1rem, 2vw, 1.18rem);
}

.page-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.page-proof-rail {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--border);
  box-shadow: var(--shadow-sm);
}

.page-proof-rail > div,
.page-proof-rail > a {
  display: grid;
  min-width: 0;
  gap: 0.22rem;
  background: var(--surface);
  color: var(--foreground);
  padding: 0.74rem 0.85rem;
}

.page-proof-rail > a:hover,
.page-proof-rail > a:focus-visible {
  background: var(--surface-strong);
  outline: none;
}

.page-proof-rail span {
  color: var(--muted-foreground);
  font-size: 0.68rem;
  font-weight: 780;
  text-transform: uppercase;
}

.page-proof-rail strong {
  min-width: 0;
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.82rem;
  font-weight: 680;
  overflow-wrap: anywhere;
}

.page-grid,
.benchmark-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.principle-card,
.benchmark-card,
.example-card,
.doc-card {
  min-width: 0;
}

.principle-card .ui-card-content,
.benchmark-card .ui-card-content,
.doc-card .ui-card-content,
.example-card .ui-card-content {
  display: grid;
  gap: 0.8rem;
}

.principle-card p,
.benchmark-card p,
.doc-card p,
.example-card p {
  margin: 0;
  color: var(--muted-foreground);
}

.callout-band {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 1.5rem;
  align-items: end;
  border-top: 1px solid var(--border);
  margin-top: clamp(2.5rem, 6vw, 4rem);
  padding-top: clamp(2rem, 5vw, 3rem);
}

.callout-band h2,
.examples-intro h2,
.docs-intro h2,
.reference-section h2,
.docs-status-panel h2 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1;
  text-wrap: balance;
}

.callout-band p,
.examples-intro p,
.docs-intro p,
.reference-section p,
.docs-status-panel p {
  margin: 0;
  color: var(--muted-foreground);
}

.callout-band > div,
.examples-intro,
.docs-intro {
  display: grid;
  gap: 0.75rem;
}

.section-heading {
  display: grid;
  gap: 0.75rem;
  max-width: 760px;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(1.9rem, 4vw, 3.4rem);
  line-height: 1;
  text-wrap: balance;
}

.section-heading p {
  margin: 0;
  color: var(--muted-foreground);
}

.evidence-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--border);
  margin-top: clamp(1.5rem, 4vw, 2.5rem);
}

.evidence-strip div {
  display: grid;
  gap: 0.35rem;
  background: var(--surface);
  padding: 1rem;
}

.evidence-strip span {
  color: var(--muted-foreground);
  font-size: 0.76rem;
  font-weight: 750;
  text-transform: uppercase;
}

.evidence-strip strong {
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: clamp(1.6rem, 4vw, 2.55rem);
  line-height: 0.95;
}

.evidence-strip p {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.88rem;
}

.proof-loop-section,
.benchmark-evidence-panel,
.planned-example-section {
  display: grid;
  gap: 1rem;
  margin-top: clamp(2.5rem, 6vw, 4rem);
}

.proof-loop-grid,
.artifact-card-grid,
.roadmap-lane-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.proof-loop-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.85rem;
  min-width: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--card-shadow);
  padding: 1rem;
}

.proof-loop-index {
  display: grid;
  width: 2.2rem;
  height: 2.2rem;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--foreground);
  color: var(--background);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
}

.proof-loop-card > div:last-child,
.artifact-card .ui-card-content,
.roadmap-lane-card .ui-card-content {
  display: grid;
  gap: 0.75rem;
}

.proof-loop-card h3 {
  margin: 0;
  font-size: 1.08rem;
}

.proof-loop-card p,
.artifact-card p,
.roadmap-lane-card p {
  margin: 0;
  color: var(--muted-foreground);
}

.proof-loop-card code,
.artifact-card code {
  width: fit-content;
  max-width: 100%;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--code-bg);
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
  padding: 0.36rem 0.48rem;
  overflow-wrap: anywhere;
}

.surface-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: clamp(2.5rem, 6vw, 4rem);
}

.surface-panel > div {
  display: grid;
  gap: 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 1.15rem;
}

.surface-panel h2 {
  margin: 0;
  font-size: clamp(1.35rem, 3vw, 2.1rem);
  line-height: 1.05;
}

.surface-panel p {
  margin: 0;
  color: var(--muted-foreground);
}

.compact-callout {
  align-items: start;
}

.examples-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 1rem;
  align-items: start;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.examples-proof-list {
  display: grid;
  gap: 0.5rem;
}

.examples-proof-list span {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted-foreground);
  font-size: 0.92rem;
}

.examples-proof-list svg {
  flex: 0 0 auto;
  color: var(--primary);
}

.evidence-checklist {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
}

.evidence-checklist div {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.55rem;
  align-items: start;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 0.9rem;
}

.evidence-checklist span {
  width: 0.58rem;
  height: 0.58rem;
  border-radius: 999px;
  background: var(--primary);
  margin-top: 0.42rem;
}

.evidence-checklist p {
  margin: 0;
  color: var(--foreground);
  font-weight: 650;
}

.card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.example-card code,
.doc-card code {
  width: fit-content;
  max-width: 100%;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--code-bg);
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
  padding: 0.38rem 0.5rem;
  overflow-wrap: anywhere;
}

.roadmap-panel {
  position: relative;
  display: grid;
  gap: 0.85rem;
  max-width: 840px;
  margin-top: clamp(2rem, 5vw, 3rem);
}

.roadmap-rail {
  position: absolute;
  bottom: 1.4rem;
  left: 1rem;
  top: 1.4rem;
  width: 1px;
  background: var(--border);
}

.roadmap-item {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: start;
}

.roadmap-icon {
  z-index: 1;
  display: grid;
  width: 2.1rem;
  height: 2.1rem;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--primary);
}

.roadmap-item > div:last-child {
  display: flex;
  min-height: 3.25rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 0.9rem 1rem;
}

.roadmap-item h2 {
  margin: 0;
  font-size: 1rem;
}

.docs-browser {
  display: grid;
  grid-template-columns: minmax(220px, 0.34fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}

.docs-sidebar {
  position: sticky;
  top: 5rem;
  display: grid;
  gap: 1rem;
  max-height: calc(100dvh - 6rem);
  overflow: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 0.85rem;
}

.docs-search {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.55rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--muted-foreground);
  padding: 0.58rem 0.65rem;
}

.docs-search-link {
  transition: border-color 180ms ease, background 180ms ease, color 180ms ease;
}

.docs-search-link:hover,
.docs-search-link:focus-visible {
  border-color: var(--ring);
  background: var(--surface-strong);
  color: var(--foreground);
  outline: none;
}

.docs-search-link[aria-current="page"] {
  border-color: var(--ring);
  background: var(--foreground);
  color: var(--background);
}

.docs-search kbd {
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface-strong);
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.68rem;
  padding: 0.16rem 0.32rem;
}

.docs-sidebar-status {
  display: grid;
  gap: 0.62rem;
  border: 1px solid var(--border);
  border-radius: 9px;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--primary) 8%, transparent), transparent 64%),
    var(--surface-soft);
  padding: 0.72rem;
}

.docs-sidebar-status div:first-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.docs-sidebar-status span {
  color: var(--muted-foreground);
  font-size: 0.68rem;
  font-weight: 760;
  text-transform: uppercase;
}

.docs-sidebar-status strong {
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
}

.docs-sidebar-status p {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.8rem;
  line-height: 1.45;
}

.docs-sidebar-artifacts {
  display: grid;
  gap: 0.42rem;
}

.docs-sidebar-artifacts a {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.45rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.72rem;
  font-weight: 650;
  padding: 0.42rem 0.5rem;
}

.docs-sidebar-artifacts a:hover,
.docs-sidebar-artifacts a:focus-visible {
  border-color: var(--ring);
  outline: none;
}

.docs-nav-group {
  display: grid;
  gap: 0.35rem;
}

.docs-nav-group h2 {
  margin: 0;
  color: var(--foreground);
  font-size: 0.78rem;
  text-transform: uppercase;
}

.docs-nav-group a {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.55rem;
  border-radius: 7px;
  color: var(--muted-foreground);
  font-size: 0.9rem;
  padding: 0.42rem 0.5rem;
}

.docs-nav-group a:hover,
.docs-nav-group a:focus-visible {
  background: var(--secondary);
  color: var(--foreground);
  outline: none;
}

.docs-sidebar-divider {
  height: 1px;
  background: var(--border);
}

.docs-inventory-group a span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.docs-inventory-group a small {
  flex: 0 0 auto;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--muted-foreground);
  font-size: 0.62rem;
  padding: 0.08rem 0.32rem;
}

.docs-content {
  display: grid;
  gap: 1rem;
}

.docs-command-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(260px, 0.85fr);
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--border);
  box-shadow: var(--card-shadow);
}

.docs-command-copy,
.docs-artifact-panel {
  display: grid;
  gap: 0.95rem;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--primary) 7%, transparent), transparent 42%),
    var(--surface);
  padding: 1.15rem;
}

.docs-command-copy h2,
.docs-artifact-heading p {
  margin: 0;
}

.docs-command-copy h2 {
  max-width: 16ch;
  font-size: clamp(1.7rem, 4vw, 3.2rem);
  line-height: 0.96;
}

.docs-command-copy p,
.docs-artifact-heading p {
  color: var(--muted-foreground);
}

.docs-command-search {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 0.65rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--background);
  padding: 0.65rem;
}

.docs-query-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.docs-query-row a,
.docs-search-chips a {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--background);
  color: var(--muted-foreground);
  font-size: 0.82rem;
  padding: 0.42rem 0.62rem;
  transition: border-color 180ms ease, color 180ms ease, background 180ms ease;
}

.docs-query-row a:hover,
.docs-query-row a:focus-visible,
.docs-search-chips a:hover,
.docs-search-chips a:focus-visible,
.docs-search-chips a[aria-current="true"] {
  border-color: var(--ring);
  background: var(--surface-strong);
  color: var(--foreground);
  outline: none;
}

.docs-artifact-panel {
  align-content: start;
  background: var(--surface-strong);
}

.docs-artifact-heading {
  display: grid;
  gap: 0.55rem;
}

.docs-artifact-panel a {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 0.65rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--background);
  color: var(--foreground);
  padding: 0.7rem;
}

.docs-artifact-panel a:hover,
.docs-artifact-panel a:focus-visible {
  border-color: var(--ring);
  outline: none;
}

.docs-artifact-panel a span {
  display: grid;
  min-width: 0;
  gap: 0.14rem;
}

.docs-artifact-panel strong,
.docs-artifact-panel small {
  overflow-wrap: anywhere;
}

.docs-artifact-panel small {
  color: var(--muted-foreground);
  font-size: 0.75rem;
}

.docs-index-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--border);
}

.docs-index-strip div {
  display: grid;
  gap: 0.16rem;
  background: var(--surface);
  padding: 0.9rem 1rem;
}

.docs-index-strip strong {
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 1.35rem;
  line-height: 1;
}

.docs-index-strip span {
  color: var(--muted-foreground);
  font-size: 0.78rem;
}

.doc-card-link {
  display: block;
  min-width: 0;
}

.doc-card-link .ui-card {
  height: 100%;
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.doc-card-link:hover .ui-card,
.doc-card-link:focus-visible .ui-card {
  border-color: var(--ring);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.doc-card-link:focus-visible {
  border-radius: var(--radius);
  outline: 2px solid var(--ring);
  outline-offset: 4px;
}

.docs-feature-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.reference-section,
.docs-status-panel {
  display: grid;
  gap: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 1.1rem;
}

.docs-status-panel {
  align-items: start;
  grid-template-columns: auto 1fr;
}

.reference-section > div:first-child {
  display: grid;
  gap: 0.75rem;
}

.reference-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.reference-pills a {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--background);
  color: var(--muted-foreground);
  font-size: 0.84rem;
  padding: 0.45rem 0.65rem;
}

.reference-pills a:hover,
.reference-pills a:focus-visible {
  border-color: var(--ring);
  color: var(--foreground);
  outline: none;
}

.docs-lane-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.docs-lane-card .ui-card-content {
  display: grid;
  gap: 0.45rem;
}

.docs-lane-card .ui-card-content a {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-soft);
  color: var(--foreground);
  padding: 0.58rem 0.65rem;
}

.docs-lane-card .ui-card-content a:hover,
.docs-lane-card .ui-card-content a:focus-visible {
  border-color: var(--ring);
  outline: none;
}

.docs-lane-card .ui-card-content a span:first-child {
  min-width: 0;
  overflow-wrap: anywhere;
}

.docs-full-index {
  display: grid;
  gap: 1rem;
}

.docs-full-index-heading {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 1rem;
  align-items: end;
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
}

.docs-full-index-heading > div {
  display: grid;
  gap: 0.65rem;
}

.docs-full-index-heading h2 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1;
}

.docs-full-index-heading p {
  margin: 0;
  color: var(--muted-foreground);
}

.docs-full-index-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.docs-index-card .ui-card-content {
  display: grid;
  gap: 0.45rem;
}

.docs-index-card .ui-card-content a {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-soft);
  color: var(--foreground);
  padding: 0.58rem 0.65rem;
}

.docs-index-card .ui-card-content a:hover,
.docs-index-card .ui-card-content a:focus-visible {
  border-color: var(--ring);
  outline: none;
}

.docs-index-card .ui-card-content a span:first-child {
  min-width: 0;
  overflow-wrap: anywhere;
}

.docs-search-page {
  display: grid;
  gap: 1.25rem;
}

.docs-search-layout {
  display: grid;
  gap: 1rem;
  margin-inline: auto;
  max-width: 1020px;
  width: 100%;
}

.docs-search-form {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 0.75rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-strong);
  box-shadow: var(--card-shadow);
  padding: 0.82rem;
}

.docs-search-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ui-input {
  min-width: 0;
  width: 100%;
  border: 1px solid var(--input);
  border-radius: 8px;
  background: var(--background);
  color: var(--foreground);
  font: inherit;
  font-size: 0.96rem;
  padding: 0.72rem 0.82rem;
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.ui-input::placeholder {
  color: var(--muted-foreground);
}

.ui-input:focus-visible {
  border-color: var(--ring);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 18%, transparent);
  outline: none;
}

.docs-index-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--border);
}

.docs-index-summary div {
  display: grid;
  gap: 0.16rem;
  background: var(--surface);
  padding: 0.95rem 1rem;
}

.docs-index-summary strong {
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 1.4rem;
  line-height: 1;
}

.docs-index-summary span {
  color: var(--muted-foreground);
  font-size: 0.8rem;
}

.docs-search-proof {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.docs-search-proof .ui-card-content {
  display: grid;
  gap: 0.65rem;
}

.docs-search-proof h2,
.docs-search-proof p {
  margin: 0;
}

.docs-search-proof h2 {
  font-size: 1.1rem;
  line-height: 1.25;
}

.docs-search-proof p {
  color: var(--muted-foreground);
}

.docs-search-proof a {
  width: fit-content;
  max-width: 100%;
  border-bottom: 1px solid var(--border);
  color: var(--foreground);
  font-size: 0.88rem;
  overflow-wrap: anywhere;
}

.docs-search-proof a:hover,
.docs-search-proof a:focus-visible {
  border-bottom-color: var(--ring);
  color: var(--primary);
  outline: none;
}

.docs-search-results-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.5rem;
}

.docs-search-results-heading > div {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 0.55rem;
}

.docs-search-results-heading h2 {
  margin: 0;
  font-size: clamp(1.35rem, 3vw, 2rem);
  overflow-wrap: anywhere;
}

.docs-search-results {
  display: grid;
  gap: 0.72rem;
}

.docs-search-result-link {
  display: block;
  min-width: 0;
}

.docs-search-result-card {
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.docs-search-result-link:hover .docs-search-result-card,
.docs-search-result-link:focus-visible .docs-search-result-card {
  border-color: var(--ring);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.docs-search-result-link:focus-visible {
  border-radius: var(--radius);
  outline: 2px solid var(--ring);
  outline-offset: 4px;
}

.docs-search-result-card .ui-card-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
}

.docs-search-result-main {
  display: grid;
  min-width: 0;
  gap: 0.45rem;
}

.docs-search-result-kicker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  color: var(--muted-foreground);
  font-size: 0.78rem;
}

.docs-search-result-main h3 {
  margin: 0;
  font-size: 1.15rem;
}

.docs-search-result-main p {
  margin: 0;
  color: var(--muted-foreground);
}

.docs-search-result-main code {
  width: fit-content;
  max-width: 100%;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--code-bg);
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.74rem;
  padding: 0.32rem 0.45rem;
  overflow-wrap: anywhere;
}

.docs-search-empty .ui-card-content {
  display: grid;
  gap: 0.45rem;
}

.docs-search-empty h2,
.docs-search-empty p {
  margin: 0;
}

.docs-search-empty p {
  color: var(--muted-foreground);
}

.docs-nav-group a[aria-current="page"] {
  background: var(--foreground);
  color: var(--background);
}

.docs-toc-group {
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.85rem;
}

.docs-toc-group a {
  font-size: 0.86rem;
}

.docs-toc-group .docs-toc-child {
  padding-left: 1.1rem;
}

.docs-article-page {
  display: grid;
  grid-template-columns: minmax(220px, 0.28fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}

.docs-article-sidebar {
  top: 5rem;
}

.docs-back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border-radius: 8px;
  color: var(--muted-foreground);
  font-size: 0.9rem;
  font-weight: 650;
  padding: 0.48rem 0.5rem;
}

.docs-back-link:hover,
.docs-back-link:focus-visible {
  background: var(--secondary);
  color: var(--foreground);
  outline: none;
}

.docs-article {
  display: grid;
  gap: 1rem;
  min-width: 0;
}

.docs-breadcrumb {
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.36rem;
  color: var(--muted-foreground);
  font-size: 0.86rem;
}

.docs-breadcrumb a,
.docs-breadcrumb span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.docs-breadcrumb a {
  border-radius: 7px;
  color: var(--muted-foreground);
  font-weight: 650;
  padding: 0.22rem 0.34rem;
}

.docs-breadcrumb a:hover,
.docs-breadcrumb a:focus-visible {
  background: var(--secondary);
  color: var(--foreground);
  outline: none;
}

.docs-breadcrumb svg {
  flex: 0 0 auto;
}

.docs-breadcrumb [aria-current="page"] {
  color: var(--foreground);
  font-weight: 720;
}

.docs-article-header {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--card-shadow);
  padding: clamp(1.1rem, 3vw, 1.6rem);
}

.docs-article-icon {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border-radius: 8px;
  background: var(--foreground);
  color: var(--background);
}

.docs-article-heading {
  display: grid;
  gap: 0.7rem;
  min-width: 0;
}

.docs-article-kicker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
}

.docs-article-kicker > span:last-child {
  color: var(--muted-foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.docs-article h1 {
  margin: 0;
  font-size: clamp(2.6rem, 6vw, 5.2rem);
  line-height: 0.95;
  text-wrap: balance;
}

.docs-article-heading p {
  margin: 0;
  max-width: 72ch;
  color: var(--muted-foreground);
  font-size: 1.05rem;
}

.docs-source-panel {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-soft);
  padding: 0.9rem 1rem;
}

.docs-source-panel span,
.docs-source-panel code {
  display: block;
  min-width: 0;
}

.docs-source-panel span {
  color: var(--muted-foreground);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.docs-source-panel code {
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.86rem;
  overflow-wrap: anywhere;
}

.docs-article-map {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--border);
}

.docs-article-map > div {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem 0.58rem;
  align-items: center;
  min-width: 0;
  background: var(--surface);
  padding: 0.85rem 0.95rem;
}

.docs-article-map svg {
  color: var(--primary);
}

.docs-article-map span {
  color: var(--muted-foreground);
  font-size: 0.72rem;
  font-weight: 760;
  text-transform: uppercase;
}

.docs-article-map strong,
.docs-article-map code {
  grid-column: 2;
  min-width: 0;
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.86rem;
  overflow-wrap: anywhere;
}

.docs-reader-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(220px, 0.85fr) minmax(180px, 0.62fr);
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--border);
  box-shadow: var(--card-shadow);
}

.docs-reader-column,
.docs-reader-actions {
  background: var(--surface);
  padding: 0.95rem;
}

.docs-reader-column {
  display: grid;
  gap: 0.8rem;
  align-content: start;
}

.docs-reader-heading {
  display: inline-flex;
  align-items: center;
  gap: 0.48rem;
  color: var(--muted-foreground);
  font-size: 0.76rem;
  font-weight: 780;
  text-transform: uppercase;
}

.docs-reader-heading svg {
  color: var(--primary);
}

.docs-reader-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.docs-reader-links a,
.docs-reader-links span {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--background);
  color: var(--muted-foreground);
  font-size: 0.8rem;
  padding: 0.38rem 0.56rem;
}

.docs-reader-links a:hover,
.docs-reader-links a:focus-visible {
  border-color: var(--ring);
  color: var(--foreground);
  outline: none;
}

.docs-reader-source dl {
  display: grid;
  gap: 0.45rem;
  margin: 0;
}

.docs-reader-source dl div {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-soft);
  padding: 0.5rem 0.6rem;
}

.docs-reader-source dt,
.docs-reader-source dd {
  margin: 0;
  min-width: 0;
}

.docs-reader-source dt {
  color: var(--muted-foreground);
  font-size: 0.78rem;
}

.docs-reader-source dd {
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
  overflow-wrap: anywhere;
  text-align: right;
}

.docs-reader-actions {
  display: grid;
  gap: 0.5rem;
  align-content: center;
}

.docs-reader-actions a {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.55rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--foreground);
  font-size: 0.84rem;
  font-weight: 680;
  padding: 0.55rem 0.65rem;
}

.docs-reader-actions a:hover,
.docs-reader-actions a:focus-visible {
  border-color: var(--ring);
  outline: none;
}

.docs-article-sections {
  display: grid;
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--border);
}

.docs-prose-section {
  display: grid;
  gap: 0.65rem;
  background: var(--surface-strong);
  padding: clamp(1rem, 3vw, 1.35rem);
}

.docs-prose-section h2 {
  margin: 0;
  font-size: clamp(1.35rem, 3vw, 2.1rem);
  line-height: 1.05;
}

.docs-prose-section p {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 1rem;
}

.docs-markdown {
  display: grid;
  gap: 1rem;
  max-width: 82ch;
  color: var(--foreground);
}

.docs-markdown h2,
.docs-markdown h3,
.docs-markdown h4 {
  margin: 1.35rem 0 0;
  letter-spacing: 0;
  scroll-margin-top: 7rem;
}

.docs-markdown h2 {
  border-top: 1px solid var(--border);
  padding-top: 1.35rem;
  font-size: clamp(1.55rem, 3vw, 2.25rem);
  line-height: 1.08;
}

.docs-markdown h2:first-child {
  margin-top: 0;
  border-top: 0;
  padding-top: 0;
}

.docs-markdown h3 {
  font-size: clamp(1.2rem, 2vw, 1.45rem);
  line-height: 1.18;
}

.docs-markdown h4 {
  font-size: 1rem;
  line-height: 1.25;
}

.docs-markdown p,
.docs-markdown li,
.docs-markdown blockquote {
  color: var(--muted-foreground);
  font-size: 1rem;
  line-height: 1.72;
}

.docs-markdown p {
  margin: 0;
}

.docs-markdown ul,
.docs-markdown ol {
  display: grid;
  gap: 0.42rem;
  margin: 0;
  padding-left: 1.25rem;
}

.docs-markdown li::marker {
  color: var(--primary);
  font-weight: 700;
}

.docs-markdown a {
  color: var(--foreground);
  font-weight: 650;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--primary), transparent 45%);
  text-underline-offset: 0.2em;
}

.docs-markdown a:hover,
.docs-markdown a:focus-visible {
  color: var(--primary);
}

.docs-markdown :not(pre) > code {
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--code-bg);
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.88em;
  padding: 0.12rem 0.32rem;
}

.docs-table-scroll {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}

.docs-table-scroll table {
  width: 100%;
  min-width: 42rem;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.docs-table-scroll th,
.docs-table-scroll td {
  border-bottom: 1px solid var(--border);
  padding: 0.78rem 0.9rem;
  text-align: left;
  vertical-align: top;
}

.docs-table-scroll th {
  background: var(--surface-strong);
  color: var(--foreground);
  font-size: 0.78rem;
  font-weight: 760;
  letter-spacing: 0;
  text-transform: uppercase;
}

.docs-table-scroll td {
  color: var(--muted-foreground);
  line-height: 1.55;
}

.docs-table-scroll tr:last-child td {
  border-bottom: 0;
}

.docs-code-block {
  overflow: hidden;
  margin: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--code-bg);
}

.docs-code-block figcaption {
  border-bottom: 1px solid var(--border);
  color: var(--muted-foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.62rem 0.85rem;
  text-transform: uppercase;
}

.docs-code-block pre {
  margin: 0;
  overflow-x: auto;
  padding: 0.9rem;
}

.docs-code-block code {
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.9rem;
  line-height: 1.65;
  white-space: pre;
}

.docs-markdown blockquote {
  margin: 0;
  border-left: 3px solid var(--primary);
  background: var(--surface-soft);
  padding: 0.8rem 1rem;
}

.docs-article-footer {
  display: grid;
  gap: 1rem;
}

.docs-article-utility {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.65rem;
  border-top: 1px solid var(--border);
  padding-top: 0.9rem;
}

.docs-article-utility a {
  display: inline-flex;
  min-height: 2.45rem;
  align-items: center;
  gap: 0.52rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-soft);
  color: var(--foreground);
  font-size: 0.86rem;
  font-weight: 700;
  padding: 0.58rem 0.75rem;
}

.docs-article-utility a:hover,
.docs-article-utility a:focus-visible {
  border-color: var(--ring);
  background: var(--surface);
  outline: none;
}

.docs-prev-next {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.docs-pagination-link {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: center;
  min-width: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--foreground);
  padding: 0.9rem 1rem;
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.docs-pagination-link:hover,
.docs-pagination-link:focus-visible {
  border-color: var(--ring);
  box-shadow: var(--card-shadow);
  outline: none;
  transform: translateY(-1px);
}

.docs-pagination-link span {
  display: grid;
  min-width: 0;
  gap: 0.15rem;
  font-weight: 720;
  overflow-wrap: anywhere;
}

.docs-pagination-link small {
  color: var(--muted-foreground);
  font-size: 0.72rem;
  font-weight: 760;
  text-transform: uppercase;
}

.docs-pagination-next {
  grid-template-columns: 1fr auto;
  text-align: right;
}

.docs-pagination-empty {
  color: var(--muted-foreground);
}

.docs-article-footer-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(280px, 0.92fr);
  gap: 1rem;
}

.docs-next-card .ui-card-content,
.docs-related-card .ui-card-content {
  padding-top: 0.9rem;
}

.docs-next-links {
  display: grid;
  gap: 0.65rem;
}

.docs-next-links a,
.docs-related-card a {
  display: flex;
  min-height: 3.1rem;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--foreground);
  font-weight: 650;
  padding: 0.65rem 0.75rem;
  overflow-wrap: anywhere;
}

.docs-next-links a:hover,
.docs-next-links a:focus-visible,
.docs-related-card a:hover,
.docs-related-card a:focus-visible {
  border-color: var(--ring);
  outline: none;
}

.docs-related-card .ui-card-content {
  display: grid;
  gap: 0.65rem;
}

.docs-related-card a {
  justify-content: flex-start;
}

.docs-related-card code {
  min-width: 0;
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
  overflow-wrap: anywhere;
}

.docs-related-card p {
  margin: 0;
  color: var(--muted-foreground);
}

.ui-button {
  display: inline-flex;
  min-height: 2.65rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font: inherit;
  font-size: 0.94rem;
  font-weight: 650;
  transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
  white-space: nowrap;
}

.ui-button:hover {
  transform: translateY(-1px);
}

.ui-button:active {
  transform: translateY(1px) scale(0.99);
}

.ui-button:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 3px;
}

.ui-button-default {
  background: var(--primary);
  color: var(--primary-foreground);
}

.ui-button-default:hover {
  background: #1c4935;
}

.ui-button-secondary {
  background: var(--secondary);
  color: var(--secondary-foreground);
}

.ui-button-outline {
  border-color: var(--border);
  background: var(--surface-soft);
  color: var(--foreground);
}

.ui-button-ghost {
  background: transparent;
  color: var(--foreground);
}

.ui-button-size-default {
  padding: 0.65rem 0.95rem;
}

.ui-button-size-sm {
  min-height: 2.25rem;
  padding: 0.48rem 0.7rem;
}

.ui-button-size-lg {
  min-height: 3rem;
  padding: 0.78rem 1.12rem;
}

.ui-button-size-icon {
  width: 2.65rem;
  padding: 0;
}

.ui-card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--card-foreground);
  box-shadow: var(--card-shadow);
}

.ui-card-header {
  display: grid;
  gap: 0.55rem;
  padding: 1.1rem 1.1rem 0;
}

.ui-card-title {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.2;
}

.ui-card-description {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.94rem;
}

.ui-card-content {
  padding: 1.1rem;
}

.ui-card-footer {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0 1.1rem 1.1rem;
}

.ui-badge {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1;
  padding: 0.35rem 0.5rem;
  white-space: nowrap;
}

.ui-badge-default {
  background: var(--foreground);
  color: var(--background);
}

.ui-badge-secondary {
  background: var(--secondary);
  color: var(--secondary-foreground);
}

.ui-badge-outline {
  border-color: var(--border);
  background: var(--surface-soft);
  color: var(--muted-foreground);
}

.ui-badge-success {
  background: #dcefe2;
  color: #22523b;
}

.ui-badge-warning {
  background: #f3e4cf;
  color: #764617;
}

html.dark .ui-badge-success {
  background: rgba(139, 211, 169, 0.16);
  color: #b9e9cc;
}

html.dark .ui-badge-warning {
  background: rgba(214, 155, 98, 0.16);
  color: #f0c497;
}

.ui-separator {
  height: 1px;
  width: 100%;
  background: var(--border);
}

.ui-separator-vertical {
  width: 1px;
  height: auto;
}

@media (max-width: 1240px) {
  .site-footer-inner {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.8fr);
  }

  .footer-brand-panel,
  .footer-artifact-group {
    grid-column: span 2;
  }

  .hero-section {
    grid-template-columns: 1fr;
  }

  .hero-copy {
    max-width: 760px;
  }

  .hero-visual {
    width: 100%;
    max-width: 980px;
  }

  .relationship-board {
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  }

  .output-panel {
    grid-column: 1 / -1;
  }

  .output-stack {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .site-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    row-gap: 0.65rem;
  }

  .primary-nav {
    grid-column: 1 / -1;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-width: 100%;
    overflow: visible;
  }

  .primary-nav a {
    flex: 0 1 auto;
  }

  .theme-toggle {
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
  }

  .site-footer-inner {
    grid-template-columns: 1fr;
  }

  .footer-brand-panel,
  .footer-artifact-group {
    grid-column: auto;
  }

  .speed-layout,
  .map-preview-grid,
  .page-grid,
  .benchmark-grid,
  .proof-loop-grid,
  .artifact-card-grid,
  .roadmap-lane-grid,
  .surface-panel,
  .evidence-checklist,
  .callout-band,
  .examples-layout,
  .docs-browser,
  .docs-article-page {
    grid-template-columns: 1fr;
  }

  .hero-visual,
  .map-console {
    min-height: auto;
  }

  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .relationship-board {
    grid-template-columns: 1fr;
  }

  .output-stack {
    grid-template-columns: 1fr;
  }

  .console-metrics {
    grid-template-columns: 1fr;
  }

  .tree-panel {
    min-height: auto;
  }

  .docs-sidebar {
    position: static;
    max-height: 22rem;
  }

  .docs-feature-grid {
    grid-template-columns: 1fr;
  }

  .docs-index-strip,
  .evidence-strip,
  .docs-article-map,
  .docs-index-summary,
  .docs-command-panel,
  .docs-search-proof,
  .docs-reader-panel {
    grid-template-columns: 1fr;
  }

  .docs-lane-grid,
  .docs-full-index-grid,
  .docs-prev-next,
  .docs-article-footer-grid,
  .docs-next-links {
    grid-template-columns: 1fr;
  }

  .relationship-spine {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .relationship-spine::before {
    display: none;
  }
}

@media (max-width: 620px) {
  .primary-nav a {
    padding-inline: 0.5rem;
  }

  .hero-copy h1 {
    font-size: clamp(3.2rem, 18vw, 4.9rem);
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .examples-grid {
    grid-template-columns: 1fr;
  }

  .speed-row,
  .counter-card {
    align-items: flex-start;
    grid-template-columns: 1fr;
  }

  .counter-card {
    flex-direction: column;
  }

  .map-node {
    min-width: 7.8rem;
  }

  .relationship-edge {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .relationship-path {
    grid-template-columns: 1fr;
  }

  .relationship-stage:last-child {
    grid-column: auto;
  }

  .stage-arrow {
    display: none;
  }

  .edge-relation {
    white-space: normal;
  }

  .relationship-footer {
    grid-template-columns: 1fr;
  }

  .roadmap-item > div:last-child,
  .docs-article-header,
  .docs-source-panel,
  .docs-status-panel,
  .docs-full-index-heading,
  .docs-command-search,
  .page-proof-rail,
  .docs-search-form,
  .docs-search-result-card .ui-card-content {
    grid-template-columns: 1fr;
  }

  .docs-command-search > svg,
  .docs-search-form > svg {
    display: none;
  }

  .docs-reader-source dl div {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.2rem;
  }

  .docs-reader-source dd {
    text-align: left;
  }

  .docs-command-copy,
  .docs-artifact-panel {
    padding: 1rem;
  }

  .docs-command-copy h2 {
    max-width: none;
  }

  .docs-command-search .ui-button {
    width: 100%;
  }

  .docs-search-form .ui-button {
    width: 100%;
  }

  .docs-search-results-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
`;
