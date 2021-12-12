import type { Feature } from "../feature.js"

export const viteFeature: Feature = {
  name: "Vite",
  ignoredPaths: ["dist"],
  initiallyChecked: (context) =>
    context.environment === "browser" && context.projectType === "application",
  installDevDependencies: () => ["vite"],
  addScripts: () => [
    { name: "dev", command: "vite" },
    { name: "build", command: "vite build" },
  ],
  copyFiles: () => [
    { source: "assets/vite/*", destination: "." },
    { source: "assets/vite/src/*", destination: "src" },
  ],
}
