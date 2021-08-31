import cpy from "cpy"
import execa from "execa"
import { readFile, writeFile } from "node:fs/promises"
import { basename, join } from "node:path"
import ora from "ora"
import { packageRoot } from "./constants.js"

/** @param {Action[]} actions */
export async function runActions(actions) {
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
export function installPackagesAction(packages) {
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
export function copyFileAction(localFilePath) {
  return {
    description: `Copying ${basename(localFilePath)} into project`,
    run: async () => {
      await cpy(join(packageRoot, localFilePath), process.cwd())
    },
  }
}
/**
 * @param {string} scriptName
 * @param {string} scriptString
 * @returns {Action}
 */
export function addScriptAction(scriptName, scriptString) {
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
