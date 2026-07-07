import type { RenderModeDefinition } from "@lumina/core";

export const luminaReactStatus = {
  name: "@lumina/react",
  phase: "implemented",
  implementsRuntimeBehavior: false,
} as const;

export function staticPage(): RenderModeDefinition {
  return {
    kind: "lumina.render-mode",
    mode: "static",
  };
}

export function ssr(): RenderModeDefinition {
  return {
    kind: "lumina.render-mode",
    mode: "ssr",
  };
}
