import { Moon, Sun } from "lucide-react";
import { SiteFooter } from "../components/SiteFooter";
import { appStyles } from "../styles";

const themeBootstrap = String.raw`
(function () {
  try {
    var stored = window.localStorage.getItem("lumina-theme");
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

const themeToggleScript = String.raw`
(function () {
  function readTheme() {
    try {
      var stored = window.localStorage.getItem("lumina-theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch {}
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
  }

  function syncButton(button) {
    var isDark = document.documentElement.classList.contains("dark");
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    button.title = isDark ? "Switch to light mode" : "Switch to dark mode";
  }

  function syncAll() {
    applyTheme(readTheme());
    var button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    syncButton(button);
  }

  document.addEventListener("click", function (event) {
    var target = event.target && event.target.closest ? event.target.closest("[data-theme-toggle]") : null;
    if (!target) return;
    var next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    try {
      window.localStorage.setItem("lumina-theme", next);
    } catch {}
    syncButton(target);
  });

  function setup() {
    syncAll();
    window.setTimeout(syncAll, 0);
    window.setTimeout(syncAll, 100);
    window.setTimeout(syncAll, 300);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }
})();
`;

export default function RootLayout({ children }: { children: unknown }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Lumina</title>
        <meta
          name="description"
          content="Lumina is an app-graph-native, SEO-first React framework where your app ships with a map."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{ __html: appStyles }} />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header">
          <a className="brand" href="/">
            <span className="brand-mark">Lu</span>
            <span>Lumina</span>
          </a>
          <nav aria-label="Primary" className="primary-nav">
            <a href="/about">About</a>
            <a href="/docs">Docs</a>
            <a href="/benchmarks">Benchmarks</a>
            <a href="/examples">Examples</a>
            <a href="/roadmap">Roadmap</a>
          </nav>
          <button
            aria-label="Toggle theme"
            aria-pressed="false"
            className="theme-toggle"
            data-theme-toggle
            title="Toggle theme"
            type="button"
          >
            <Sun aria-hidden="true" className="theme-icon theme-icon-sun" size={16} />
            <Moon aria-hidden="true" className="theme-icon theme-icon-moon" size={16} />
          </button>
        </header>
        <div className="site-shell">{children}</div>
        <SiteFooter />
        <script dangerouslySetInnerHTML={{ __html: themeToggleScript }} />
      </body>
    </html>
  );
}
