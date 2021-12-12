import type { Feature } from "../feature.js"

export const typescriptFeature: Feature = {
  name: "TypeScript",
  installDevDependencies: () => ["typescript"],
  writeFiles: (context) => [
    {
      path: "tsconfig.json",
      content: JSON.stringify(
        {
          extends: `${context.selfPackageName}/tsconfig.base`,
          exclude: context.ignoredPaths,
        },
        undefined,
        2,
      ),
    },
  ],
  addScripts: () => [{ name: "typecheck", command: "tsc --noEmit" }],
}
