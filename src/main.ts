/* eslint-disable no-console */
import { existsSync } from "node:fs"
import { join, posix } from "node:path"
import pkg from "../package.json"
import {
  addScriptAction,
  copyFileToProjectAction,
  installPackagesAction,
  runActions,
  setPackageJsonPropertyAction,
  updatePackageJsonAction,
} from "./actions.js"
import { packageRoot } from "./constants.js"
import { isJsonObject } from "./json.js"

const isLocal = existsSync(join(packageRoot, ".islocal"))

const getPackageName = () => {
  return typeof pkg.name === "string" ? pkg.name : packageRoot
}

const thisPackage = isLocal ? packageRoot : getPackageName()

try {
  await runActions([
    installPackagesAction([
      thisPackage,
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
    ]),

    setPackageJsonPropertyAction(
      "prettier",
      posix.join(getPackageName(), "prettier"),
    ),

    updatePackageJsonAction("Add extends to eslint config", (pkg) => {
      if (pkg.eslintConfig == null || !isJsonObject(pkg.eslintConfig)) {
        pkg.eslintConfig = {}
      }

      const currentExtends = Array.isArray(pkg.eslintConfig.extends)
        ? pkg.eslintConfig.extends
        : []

      // eslint needs an explicit path, and posix.join removes the ./
      const thisConfig =
        "./" + posix.join("node_modules", getPackageName(), "eslint")

      if (!currentExtends.includes(thisConfig)) {
        pkg.eslintConfig.extends = [...currentExtends, thisConfig]
      }
    }),

    addScriptAction("lint", "eslint --ext js,ts,tsx ."),
    addScriptAction("lint-fix", "npm run lint -- --fix"),
    addScriptAction("format", "prettier --write ."),

    copyFileToProjectAction("assets/.prettierignore"),
  ])
} catch (error) {
  console.error(error)
}
