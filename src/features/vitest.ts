import type { Feature } from "../feature.js"

export const vitestFeature: Feature = {
  name: "Vitest (Testing)",
  ignoredPaths: ["coverage"],
  installDevDependencies: () => ["vitest", "c8"],
  addScripts: () => [
    { name: "test", command: "vitest" },
    { name: "coverage", command: "vitest --run --coverage" },
  ],
}
