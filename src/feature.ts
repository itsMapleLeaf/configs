import { promptCheckboxList } from "prompt-fns"
import type { JsonObject } from "type-fest"
import { eslintFeature } from "./features/eslint.js"
import { esmoFeature } from "./features/esmo.js"
import { prettierFeature } from "./features/prettier.js"
import { tailwindFeature } from "./features/tailwind.js"
import { tsupFeature } from "./features/tsup.js"
import { typescriptFeature } from "./features/typescript.js"
import { vitestFeature } from "./features/vitest.js"
import type { ProjectContext } from "./project-context"

export type Feature = {
  name: string
  ignoredPaths?: string[]
  gitIgnoredPaths?: string[]
  lintIgnoredPaths?: string[]
  typecheckIgnoredPaths?: string[]
  formatIgnoredPaths?: string[]
  initiallyChecked?: (context: ProjectContext) => boolean
  installDependencies?: (context: ProjectContext) => string[]
  installDevDependencies?: (context: ProjectContext) => string[]
  copyFiles?: (
    context: ProjectContext,
  ) => Array<{ source: string; destination: string }>
  writeFiles?: (
    context: ProjectContext,
  ) => Array<{ path: string; content: string | Iterable<string> }>
  addScripts?: (
    context: ProjectContext,
  ) => Array<{ name: string; command: string }>
  updatePackageJson?: (context: ProjectContext) => Array<{
    description: string
    update: (packageJson: JsonObject) => void
  }>
}

export const allFeatures: Feature[] = [
  tsupFeature,
  eslintFeature,
  prettierFeature,
  esmoFeature,
  tailwindFeature,
  vitestFeature,
  typescriptFeature,
]

export function promptFeatures(
  context: ProjectContext,
): Feature[] | PromiseLike<Feature[]> {
  return promptCheckboxList({
    message: "Choose your features:",
    choices: allFeatures.map((feature) => ({
      name: feature.name,
      value: feature,
    })),
    fallback: allFeatures.filter(
      (feature) => feature.initiallyChecked?.(context) ?? true,
    ),
  })
}
