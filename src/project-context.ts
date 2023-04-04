import chalk from "chalk"
import cpy from "cpy"
import { execa } from "execa"
import { difference, flow, uniq } from "lodash-es"
import { readFile } from "node:fs/promises"
import { basename, join } from "node:path"
import { oraPromise } from "ora"
import type { JsonObject } from "type-fest"
import packageJson from "../package.json"
import { packageRoot } from "./constants.js"
import type { Feature } from "./feature.js"
import { addAllToSet } from "./helpers/add-all-to-set.js"
import { readFileOrUndefined } from "./helpers/read-file-or-undefined.js"
import { writeFileWithNewLine } from "./helpers/write-file-with-new-line.js"
import { acceptString, isJsonObject } from "./json.js"
import type { ProjectEnvironment } from "./project-environment.js"
import { promptEnvironment } from "./project-environment.js"

export type ProjectContext = {
  environment: ProjectEnvironment
  projectName: string
  packageJson: JsonObject
  ignoredPaths: Set<string>
  gitIgnoredPaths: Set<string>
  lintIgnoredPaths: Set<string>
  typecheckIgnoredPaths: Set<string>
  formatIgnoredPaths: Set<string>
  selfPackageName: string
  enabledFeatures: Feature[]
}

export async function getInitialProjectContext(): Promise<ProjectContext> {
  const projectPackageJson = JSON.parse(
    await readFile(join(process.cwd(), "package.json"), "utf8"),
  ) as JsonObject

  return {
    environment: await promptEnvironment(),
    ignoredPaths: new Set(["node_modules", "build", "dist", ".cache"]),
    gitIgnoredPaths: new Set([".vscode"]),
    lintIgnoredPaths: new Set(["public"]),
    typecheckIgnoredPaths: new Set([]),
    formatIgnoredPaths: new Set(["pnpm-lock.yaml"]),
    selfPackageName: packageJson.name,
    projectName:
      acceptString(projectPackageJson.name) ?? basename(process.cwd()),
    packageJson: projectPackageJson,
    enabledFeatures: [],
  }
}

export async function applyEnabledFeatures(context: ProjectContext) {
  for (const feature of context.enabledFeatures) {
    addAllToSet(context.ignoredPaths, feature.ignoredPaths)
    addAllToSet(context.gitIgnoredPaths, feature.gitIgnoredPaths)
    addAllToSet(context.lintIgnoredPaths, feature.lintIgnoredPaths)
    addAllToSet(context.typecheckIgnoredPaths, feature.typecheckIgnoredPaths)
    addAllToSet(context.formatIgnoredPaths, feature.formatIgnoredPaths)
  }

  const currentGitIgnore = await readFileOrUndefined(".gitignore")
  await writeFileWithNewLine(
    ".gitignore",
    uniq([
      ...(currentGitIgnore?.split(/\r?\n/) ?? []),
      ...context.ignoredPaths,
      ...context.gitIgnoredPaths,
    ]),
  )

  const copyFiles = context.enabledFeatures.flatMap(
    (feature) => feature.copyFiles?.(context) ?? [],
  )

  for (const { source, destination } of copyFiles) {
    await oraPromise(
      cpy(join(packageRoot, source), join(process.cwd(), destination)),
      `Copying ${chalk.bold.cyan(source)} to ${chalk.bold.cyan(destination)}`,
    )
  }

  const writeFiles = context.enabledFeatures.flatMap(
    (feature) => feature.writeFiles?.(context) ?? [],
  )

  for (const { path, content } of writeFiles) {
    await oraPromise(
      writeFileWithNewLine(join(process.cwd(), path), content),
      `Writing ${chalk.bold.cyan(path)}`,
    )
  }

  const addScripts = context.enabledFeatures.flatMap(
    (feature) => feature.addScripts?.(context) ?? [],
  )

  if (!isJsonObject(context.packageJson.scripts)) {
    context.packageJson.scripts = {}
  }

  for (const { name, command } of addScripts) {
    context.packageJson.scripts[name] = command
    console.info(`Added ${chalk.bold.cyan(name)} script`)
  }

  for (const { updatePackageJson } of context.enabledFeatures) {
    const updates = updatePackageJson?.(context) ?? []
    for (const { description, update } of updates) {
      update(context.packageJson)
      console.info(description)
    }
  }

  await writeFileWithNewLine(
    join(process.cwd(), "package.json"),
    JSON.stringify(context.packageJson, undefined, 2),
  )

  const dependencies = uniq(
    context.enabledFeatures.flatMap(
      (feature) => feature.installDependencies?.(context) ?? [],
    ),
  )

  const devDependencies = flow(
    (features: Feature[]) =>
      features.flatMap(
        (feature) => feature.installDevDependencies?.(context) ?? [],
      ),
    (features) => uniq(features),
    (features) => difference(features, dependencies),
  )(context.enabledFeatures)

  if (dependencies.length > 0) {
    await oraPromise(
      execa("pnpm", ["install", ...dependencies]),
      `Installing dependencies: ${chalk.bold.cyan(dependencies.join(" "))}`,
    )
  }

  if (devDependencies.length > 0) {
    await oraPromise(
      execa("pnpm", ["install", "--save-dev", ...devDependencies]),
      `Installing dev dependencies: ${chalk.bold.cyan(
        devDependencies.join(" "),
      )}`,
    )
  }
}
