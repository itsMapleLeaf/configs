import type { Feature } from "../feature.js"

export const runWithEsmoFeature: Feature = {
  name: "Run with esmo",
  initiallyChecked: (context) =>
    context.environment === "node" && context.projectType === "application",
  addScripts: () => [
    { name: "start", command: "esmo --no-warnings src/main.ts" },
    {
      name: "dev",
      command: "nodemon --exec esmo --no-warnings --inspect src/main.ts",
    },
  ],
  installDependencies: () => ["esno", "esbuild"],
  installDevDependencies: () => ["nodemon"],
}
