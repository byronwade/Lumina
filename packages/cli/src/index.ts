import { resolve } from "node:path";
import { writeRoutesManifest } from "@lumina/compiler";

export const luminaCliStatus = {
  name: "@lumina/cli",
  phase: "implemented",
  implementsRuntimeBehavior: false,
} as const;

export type CliIo = {
  stdout?: (text: string) => void;
  stderr?: (text: string) => void;
};

export async function runCli(argv: string[], io: CliIo = {}): Promise<number> {
  const stdout = io.stdout ?? ((text: string) => console.log(text));
  const stderr = io.stderr ?? ((text: string) => console.error(text));
  const [command, appPath, ...flags] = argv;

  if (command === "routes" && appPath && flags.includes("--json")) {
    const result = writeRoutesManifest({ appRoot: resolve(appPath) });
    stdout(
      JSON.stringify({
        schemaVersion: "lumina.cli.v0",
        command: "lumina routes",
        status: "ok",
        data: {
          artifact: result.path,
          routes: result.manifest.routes,
        },
        diagnostics: result.manifest.diagnostics,
        meta: {
          cwd: ".",
        },
      }),
    );
    return 0;
  }

  stderr("Usage: lumina routes <appPath> --json");
  return 2;
}

if (import.meta.main) {
  const exitCode = await runCli(process.argv.slice(2));
  process.exit(exitCode);
}
