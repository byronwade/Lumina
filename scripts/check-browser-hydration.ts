import { createServer } from "node:net";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { fileURLToPath } from "node:url";
import { chromium, type Browser } from "playwright";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const appRoot = fileURLToPath(new URL("../apps/www/", import.meta.url));

const watchdog = setTimeout(() => {
  console.error("Browser hydration check timed out.");
  process.exit(1);
}, 60_000);

console.log("Building production app...");
const build = spawn("bun", ["packages/cli/src/index.ts", "build", appRoot, "--json"], {
  cwd: repoRoot,
  env: { ...process.env, NO_COLOR: "1" },
});
const buildOutput = await waitForExit(build);
if (buildOutput.exitCode !== 0) {
  throw new Error(`Lumina build failed with code ${buildOutput.exitCode}.\n${buildOutput.output.join("")}`);
}

const port = await getFreePort();
const devUrl = `http://127.0.0.1:${port}`;
const dev = spawn("bun", ["packages/cli/src/index.ts", "dev", appRoot, "--port", String(port)], {
  cwd: repoRoot,
  env: { ...process.env, NO_COLOR: "1" },
});
const devOutput: string[] = [];
dev.stdout.on("data", (chunk) => devOutput.push(String(chunk)));
dev.stderr.on("data", (chunk) => devOutput.push(String(chunk)));
console.log("Starting Lumina dev server...");
await waitForServer(devUrl, dev, devOutput);

let browser: Browser | undefined;
let production: ChildProcessWithoutNullStreams | undefined;

try {
  const productionPort = await getFreePort();
  const productionUrl = `http://127.0.0.1:${productionPort}`;
  production = spawn("bun", ["packages/cli/src/index.ts", "start", appRoot, "--port", String(productionPort)], {
    cwd: repoRoot,
    env: { ...process.env, NO_COLOR: "1" },
  });
  const productionOutput: string[] = [];
  production.stdout.on("data", (chunk) => productionOutput.push(String(chunk)));
  production.stderr.on("data", (chunk) => productionOutput.push(String(chunk)));
  console.log("Starting production Lumina server...");
  await waitForServer(productionUrl, production, productionOutput);

  console.log("Launching Chromium...");
  browser = await chromium.launch();
  const page = await browser.newPage();
  page.setDefaultTimeout(5_000);
  console.log(`Opening ${devUrl}...`);
  await assertCounterHydrates(page, devUrl);

  console.log(`Opening ${productionUrl}...`);
  await assertCounterHydrates(page, productionUrl);

  console.log("Browser hydration check passed.");
} finally {
  clearTimeout(watchdog);
  await browser?.close();
  await stopProcess(dev);
  if (production) await stopProcess(production);
}

async function getFreePort(): Promise<number> {
  return await new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (typeof address === "object" && address) {
        const selectedPort = address.port;
        server.close(() => resolve(selectedPort));
      } else {
        server.close(() => reject(new Error("Unable to allocate a localhost port.")));
      }
    });
  });
}

async function waitForServer(url: string, process: ChildProcessWithoutNullStreams, output: string[]): Promise<void> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 10_000) {
    if (process.exitCode !== null) {
      throw new Error(`Lumina dev server exited early with code ${process.exitCode}.\n${output.join("")}`);
    }

    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(500) });
      if (response.status < 500) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  throw new Error(`Timed out waiting for Lumina dev server at ${url}.\n${output.join("")}`);
}

async function waitForExit(process: ChildProcessWithoutNullStreams): Promise<{ exitCode: number | null; output: string[] }> {
  const output: string[] = [];
  process.stdout.on("data", (chunk) => output.push(String(chunk)));
  process.stderr.on("data", (chunk) => output.push(String(chunk)));
  const exitCode = await new Promise<number | null>((resolve) => process.once("exit", (code) => resolve(code)));
  return { exitCode, output };
}

async function stopProcess(process: ChildProcessWithoutNullStreams): Promise<void> {
  if (process.exitCode !== null) return;
  await new Promise<void>((resolve) => {
    process.once("exit", () => resolve());
    process.kill();
    setTimeout(resolve, 2_000).unref();
  });
}

async function assertCounterHydrates(page: import("playwright").Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  console.log("Checking hydrated counter...");
  const counter = page.getByRole("button", { name: "Hydrated clicks: 0" });
  await counter.waitFor({ state: "visible" });
  await counter.click();
  await page.getByRole("button", { name: "Hydrated clicks: 1" }).waitFor({ state: "visible" });
}
