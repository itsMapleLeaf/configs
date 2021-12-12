import { posix } from "node:path"
import type { Feature } from "../feature"
import { isJsonObject } from "../json.js"

export const eslintFeature: Feature = {
  name: "ESLint",
  installDevDependencies: () => [
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint-config-prettier",
    "eslint-import-resolver-typescript",
    "eslint-plugin-import",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-react-hooks",
    "eslint-plugin-react",
    "eslint",
    "prettier",
  ],
  addScripts: () => [
    { name: "lint", command: "eslint --ext js,ts,tsx ." },
    { name: "lint-fix", command: "pnpm lint -- --fix" },
  ],
  updatePackageJson: (context) => [
    {
      description: "Added ESLint config",
      update: (packageJson) => {
        if (!isJsonObject(packageJson.eslintConfig)) {
          packageJson.eslintConfig = {}
        }

        const currentExtends = Array.isArray(packageJson.eslintConfig.extends)
          ? packageJson.eslintConfig.extends
          : []

        // eslint needs an explicit path, and posix.join removes the ./
        const thisConfig =
          "./" + posix.join("node_modules", context.selfPackageName, "eslint")

        if (!currentExtends.includes(thisConfig)) {
          packageJson.eslintConfig.extends = [...currentExtends, thisConfig]
        }
      },
    },
  ],
}
