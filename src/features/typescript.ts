import { isString } from "lodash-es"
import type { Feature } from "../feature.js"

export const typescriptFeature: Feature = {
  name: "TypeScript (Type checking)",
  installDevDependencies: (context) =>
    ["typescript", context.environment === "node" && "@types/node"].filter(
      isString,
    ),
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
