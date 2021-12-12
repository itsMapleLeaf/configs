import type { Feature } from "../feature"

export const prettierFeature: Feature = {
  name: "Prettier",
  installDevDependencies: (context) => ["prettier"],
  writeFiles: (context) => [
    { path: ".prettierignore", content: context.ignoredPaths.join("\n") },
  ],
  addScripts: () => [{ name: "format", command: "prettier --write ." }],
  updatePackageJson: (context) => [
    {
      description: "Added Prettier config",
      update: (packageJson) => {
        packageJson.prettier = `${context.selfPackageName}/prettier`
      },
    },
  ],
}
