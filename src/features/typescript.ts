import { isString, uniq } from "lodash-es"
import type { Feature } from "../feature.js"

export const typescriptFeature: Feature = {
  name: "TypeScript (Type checking)",
  installDevDependencies: (context) =>
    ["typescript", context.environment.isNode && "@types/node"].filter(
      isString,
    ),
  writeFiles: (context) => [
    {
      path: "tsconfig.json",
      content: JSON.stringify(
        {
          extends: `${context.selfPackageName}/tsconfig.base`,
          include: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.cjs",
            "**/*.mjs",
            ".eslintrc.cjs",
          ],
          exclude: uniq([
            ...context.ignoredPaths,
            ...context.typecheckIgnoredPaths,
          ]).map((path) => `**/${path}/**`),
        },
        undefined,
        2,
      ),
    },
  ],
  addScripts: () => [{ name: "typecheck", command: "tsc --noEmit" }],
}
