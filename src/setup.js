#! /usr/bin/env node
// @ts-check
import chalk from "chalk"
import cpy from "cpy"
import execa from "execa"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { basename, dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import ora from "ora"

/**
 * @typedef {import("./types").Action} Action
 */

const scriptDir = dirname(fileURLToPath(import.meta.url))

/** @param {Action[]} actions */
async function runActions(actions) {
  const spinner = ora()
  for (const action of actions) {
    try {
      spinner.start(action.description)
      await action.run()
      spinner.succeed()
    } catch (error) {
      spinner.fail()
      throw error
    }
  }
}

/**
 * @param {string[]} packages
 * @returns {Action}
 */
function installPackagesAction(packages) {
  return {
    description: `Installing packages with pnpm`,
    run: async () => {
      await execa("pnpm", ["add", "--save-dev", ...packages])
    },
  }
}

/**
 * @param {string} localFilePath
 * @returns {Action}
 */
function copyFileAction(localFilePath) {
  return {
    description: `Copying ${basename(localFilePath)} into project`,
    run: async () => {
      await cpy(join(scriptDir, localFilePath), process.cwd())
    },
  }
}
/**
 * @param {string} scriptName
 * @param {string} scriptString
 * @returns {Action}
 */
function addScriptAction(scriptName, scriptString) {
  return {
    description: `Adding ${scriptName} script`,
    run: async () => {
      const packageJsonPath = join(process.cwd(), "package.json")
      const pkg = JSON.parse(
        await readFile(packageJsonPath, { encoding: "utf-8" }),
      )

      pkg.scripts = pkg.scripts || {}
      pkg.scripts[scriptName] = scriptString

      await writeFile(packageJsonPath, JSON.stringify(pkg, null, 2))
    },
  }
}

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
