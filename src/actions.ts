import cpy from "cpy"
import { execa } from "execa"
import { readFile, writeFile } from "node:fs/promises"
import { basename, join } from "node:path"
import ora from "ora"
import type { JsonObject, JsonValue } from "type-fest"
import { packageRoot } from "./constants.js"

type Action = {
  description: string
  run: () => Promise<unknown> | void
}

export async function runActions(actions: Action[]) {
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

export function installPackagesAction(packages: string[]): Action {
  return {
    description: `Installing packages with pnpm`,
    run: async () => {
      await execa("pnpm", ["add", "--save-dev", ...packages])
    },
  }
}

export function copyFileToProjectAction(localFilePath: string): Action {
  return {
    description: `Copying ${basename(localFilePath)} into project`,
    run: async () => {
      await cpy(join(packageRoot, localFilePath), process.cwd())
    },
  }
}

export function addScriptAction(
  scriptName: string,
  scriptString: string,
): Action {
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

export function updatePackageJsonAction(
  description: string,
  fn: (pkg: JsonObject) => Promise<unknown> | void,
) {
  return {
    description,
    run: async () => {
      const packageJsonPath = join(process.cwd(), "package.json")

      const pkg: JsonObject = JSON.parse(
        await readFile(packageJsonPath, { encoding: "utf-8" }),
      )

      await fn(pkg)
      await writeFile(packageJsonPath, JSON.stringify(pkg, null, 2))
    },
  }
}

export function setPackageJsonPropertyAction(
  property: string,
  value: JsonValue,
) {
  return updatePackageJsonAction(
    `Setting ${property} to ${value} in package.json`,
    (pkg) => {
      pkg[property] = value
    },
  )
}
