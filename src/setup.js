// @ts-check
import chalk from "chalk"
import { readdir } from "node:fs/promises"
import { join } from "node:path"
import {
  addScriptAction,
  copyFileAction,
  installPackagesAction,
  runActions,
} from "./actions.js"
import { packageRoot } from "./constants.js"

try {
  const configFiles = await readdir(join(packageRoot, "./configs"))

  await runActions([
    installPackagesAction([
      "@typescript-eslint/eslint-plugin",
      "@typescript-eslint/parser",
      "eslint",
      "eslint-config-prettier",
      "eslint-plugin-react",
      "eslint-plugin-react-hooks",
      "eslint-plugin-jsx-a11y",
      "prettier",
    ]),

    ...configFiles.map((basename) => copyFileAction(`./configs/${basename}`)),

    addScriptAction("lint", "eslint --ext js,ts,tsx ."),
    addScriptAction("format", "prettier --write ."),
  ])

  console.info(chalk.green`✔`, `Done`)
} catch (error) {
  console.error(error)
}
