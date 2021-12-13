import type { Feature } from "../feature.js"

export const tsupFeature: Feature = {
  name: "tsup (Build)",
  initiallyChecked: (context) =>
    context.environment === "node" && context.projectType === "library",
  ignoredPaths: ["dist"],
  installDevDependencies: () => ["tsup", "esbuild"],
  addScripts: (context) => {
    const command = [
      context.environment === "node" ? "tsup-node" : "tsup",
      "src/main.ts",
      "--clean",
      "--target node16",
      `--format`,
      context.projectType === "library" ? "cjs,esm" : "esm",
      context.projectType === "library" ? "--dts" : "",
    ].join(" ")

    return [{ name: "build", command }]
  },
}