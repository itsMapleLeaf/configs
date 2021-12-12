import type { Feature } from "../feature.js"

export const compileWithTsupFeature: Feature = {
  name: "Compile with tsup",
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

    return [
      {
        name: "compile",
        command,
      },
    ]
  },
}
