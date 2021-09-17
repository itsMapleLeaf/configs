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
 * Copies a local file to the project
 * @param {string} localFilePath
 * @returns {Action}
 */
export function copyFileToProjectAction(localFilePath) {
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

/**
 * An action to update the package.json file
 *
 * @param {string} description Generic description of the action
 * @param {(pkg: import("type-fest").JsonObject) => Promise<unknown> | void} fn
 */
export function updatePackageJsonAction(description, fn) {
  return {
    description,
    run: async () => {
      const packageJsonPath = join(process.cwd(), "package.json")

      /** @type {import("type-fest").JsonObject} */
      const pkg = JSON.parse(
        await readFile(packageJsonPath, { encoding: "utf-8" }),
      )

      await fn(pkg)
      await writeFile(packageJsonPath, JSON.stringify(pkg, null, 2))
    },
  }
}

/**
 * An action to set a property in the package.json file
 *
 * @param {string} property The property to set
 * @param {import("type-fest").JsonValue} value The value to add
 */
export function setPackageJsonPropertyAction(property, value) {
  return updatePackageJsonAction(
    `Setting ${property} to ${value} in package.json`,
    (pkg) => {
      pkg[property] = value
    },
  )
}
