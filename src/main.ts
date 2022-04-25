import chalk from "chalk"
import cpy from "cpy"
import { execa } from "execa"
import { difference, flow, uniq } from "lodash-es"
import { readFile } from "node:fs/promises"
import { basename, join } from "node:path"
import { oraPromise } from "ora"
import { promptCheckboxList, promptList } from "prompt-fns"
import type { JsonObject } from "type-fest"
import packageJson from "../package.json"
import { packageRoot } from "./constants.js"
import type { Feature } from "./feature.js"
import { avaFeature } from "./features/ava.js"
import { eslintFeature } from "./features/eslint.js"
import { esmoFeature } from "./features/esmo.js"
import { prettierFeature } from "./features/prettier.js"
import { tailwindFeature } from "./features/tailwind.js"
import { tsupFeature } from "./features/tsup.js"
import { typescriptFeature } from "./features/typescript.js"
import { addAllToSet } from "./helpers/add-all-to-set.js"
import { readFileOrUndefined } from "./helpers/read-file-or-undefined.js"
import { writeFileWithNewLine } from "./helpers/write-file-with-new-line.js"
import { acceptString, isJsonObject } from "./json.js"
import type { ProjectContext } from "./project-context.js"

const allFeatures: Feature[] = [
  tsupFeature,
  eslintFeature,
  prettierFeature,
  esmoFeature,
  tailwindFeature,
  avaFeature,
  typescriptFeature,
]

console.info(
  `${chalk.cyan`i`} Current working directory:`,
  chalk.bold.cyan(process.cwd()),
)

const projectPackageJson: JsonObject = JSON.parse(
  await readFile(join(process.cwd(), "package.json"), "utf8"),
)

const context: ProjectContext = {
  projectType: await promptList({
    message: "What type of project is this?",
    choices: ["application", "library"],
  }),
  environment: await promptList({
    message: "Where is the code running?",
    choices: ["node", "browser"],
  }),
  ignoredPaths: new Set(["node_modules"]),
  gitIgnoredPaths: new Set([".vscode"]),
  lintIgnoredPaths: new Set([".vscode"]),
  typecheckIgnoredPaths: new Set([]),
  formatIgnoredPaths: new Set(["pnpm-lock.yaml"]),
  selfPackageName: packageJson.name,
  projectName: acceptString(projectPackageJson.name) ?? basename(process.cwd()),
  enabledFeatures: [],
}

const features = (context.enabledFeatures = await promptCheckboxList({
  message: "Choose your features:",
  choices: allFeatures.map((feature) => ({
    name: feature.name,
    value: feature,
  })),
  fallback: allFeatures.filter(
    (feature) => feature.initiallyChecked?.(context) ?? true,
  ),
}))

for (const feature of features) {
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

const copyFiles = features.flatMap(
  (feature) => feature.copyFiles?.(context) ?? [],
)

for (const { source, destination } of copyFiles) {
  await oraPromise(
    cpy(join(packageRoot, source), join(process.cwd(), destination)),
    `Copying ${chalk.bold.cyan(source)} to ${chalk.bold.cyan(destination)}`,
  )
}

const writeFiles = features.flatMap(
  (feature) => feature.writeFiles?.(context) ?? [],
)

for (const { path, content } of writeFiles) {
  await oraPromise(
    writeFileWithNewLine(join(process.cwd(), path), content),
    `Writing ${chalk.bold.cyan(path)}`,
  )
}

const addScripts = features.flatMap(
  (feature) => feature.addScripts?.(context) ?? [],
)

if (!isJsonObject(projectPackageJson.scripts)) {
  projectPackageJson.scripts = {}
}

for (const { name, command } of addScripts) {
  projectPackageJson.scripts[name] = command
  console.info(`Added ${chalk.bold.cyan(name)} script`)
}

for (const { updatePackageJson } of features) {
  const updates = updatePackageJson?.(context) ?? []
  for (const { description, update } of updates) {
    update(projectPackageJson)
    console.info(description)
  }
}

await writeFileWithNewLine(
  join(process.cwd(), "package.json"),
  JSON.stringify(projectPackageJson, undefined, 2),
)

const dependencies = uniq(
  features.flatMap((feature) => feature.installDependencies?.(context) ?? []),
)

const devDependencies = flow(
  (features: Feature[]) =>
    features.flatMap(
      (feature) => feature.installDevDependencies?.(context) ?? [],
    ),
  (features) => uniq(features),
  (features) => difference(features, dependencies),
)(features)

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
