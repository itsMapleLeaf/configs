import chalk from "chalk"
import cpy from "cpy"
import { execa } from "execa"
import { difference, flow, uniq } from "lodash-es"
import { readFile, writeFile } from "node:fs/promises"
import { basename, join } from "node:path"
import { oraPromise } from "ora"
import { promptCheckboxList, promptList } from "prompt-fns"
import type { JsonObject } from "type-fest"
import packageJson from "../package.json"
import { packageRoot } from "./constants.js"
import type { Feature } from "./feature.js"
import { compileWithTsupFeature } from "./features/compile-with-tsup.js"
import { eslintFeature } from "./features/eslint.js"
import { prettierFeature } from "./features/prettier.js"
import { runWithEsmoFeature } from "./features/run-with-esmo.js"
import { tailwindFeature } from "./features/tailwind.js"
import { testWithAvaFeature } from "./features/test-with-ava.js"
import { typescriptFeature } from "./features/typescript.js"
import { viteFeature } from "./features/vite.js"
import { acceptString, isJsonObject } from "./json.js"
import type { ProjectContext } from "./project-context.js"

const allFeatures: Feature[] = [
  compileWithTsupFeature,
  eslintFeature,
  prettierFeature,
  runWithEsmoFeature,
  tailwindFeature,
  testWithAvaFeature,
  typescriptFeature,
  viteFeature,
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
  ignoredPaths: ["node_modules", ".vscode"],
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

for (const feature of allFeatures) {
  context.ignoredPaths.push(...(feature.ignoredPaths ?? []))
}

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
    execa("pnpm", ["add", ...dependencies]),
    `Installing dependencies: ${chalk.bold.cyan(dependencies.join(", "))}`,
  )
}

if (devDependencies.length > 0) {
  await oraPromise(
    execa("pnpm", ["add", "--save-dev", ...devDependencies]),
    `Installing dev dependencies: ${chalk.bold.cyan(
      devDependencies.join(", "),
    )}`,
  )
}

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
    writeFile(join(process.cwd(), path), content),
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

await writeFile(
  join(process.cwd(), "package.json"),
  JSON.stringify(projectPackageJson, undefined, 2),
)
