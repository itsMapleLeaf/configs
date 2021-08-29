// @ts-check
import chalk from "chalk"
import { readdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import {
  addScriptAction,
  copyFileAction,
  installPackagesAction,
  runActions,
} from "./actions"

export const scriptDir = dirname(fileURLToPath(import.meta.url))

try {
  const configFiles = await readdir(join(scriptDir, "../configs"))

  await runActions([
    installPackagesAction([
      "@typescript-eslint/eslint-plugin",
      "@typescript-eslint/parser",
      "eslint",
      "eslint-config-prettier",
      "eslint-plugin-react",
      "eslint-plugin-react-hooks",
      "eslint-plugin-jsx-a11y",
    ]),

    ...configFiles.map((basename) => copyFileAction(`../configs/${basename}`)),

    addScriptAction("lint", "eslint --ext js,ts,tsx ."),
    addScriptAction("format", "prettier --write ."),
  ])

  console.info(chalk.green`✔`, `Done`)
} catch (error) {
  console.error(error)
}
