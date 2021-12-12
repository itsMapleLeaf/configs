import type { Feature } from "../feature.js"
import { isJsonObject } from "../json.js"

export const testWithAvaFeature: Feature = {
  name: "Test with AVA",
  ignoredPaths: ["coverage"],
  installDevDependencies: () => ["ava", "c8", "esbuild-node-loader", "esbuild"],
  addScripts: () => [{ name: "test", command: "c8 ava" }],
  updatePackageJson: () => [
    {
      description: "Added AVA config",
      update: (packageJson) => {
        if (!isJsonObject(packageJson.ava)) {
          packageJson.ava = {}
        }

        packageJson.ava.files =
          "{src,test,tests,integration}/**/*.test.{ts,tsx}"

        packageJson.ava.nodeArguments = [
          "--loader=esbuild-node-loader",
          "--experimental-specifier-resolution=node",
          "--no-warnings",
        ]

        packageJson.ava.extensions = {
          ts: "module",
          tsx: "module",
        }
      },
    },
  ],
}
