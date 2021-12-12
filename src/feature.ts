import type { JsonObject } from "type-fest"
import type { ProjectContext } from "./project-context"

export type Feature = {
  name: string
  ignoredPaths?: string[]
  installDependencies?: (context: ProjectContext) => string[]
  installDevDependencies?: (context: ProjectContext) => string[]
  copyFiles?: (
    context: ProjectContext,
  ) => Array<{ source: string; destination: string }>
  writeFiles?: (
    context: ProjectContext,
  ) => Array<{ path: string; content: string }>
  addScripts?: (
    context: ProjectContext,
  ) => Array<{ name: string; command: string }>
  updatePackageJson?: (context: ProjectContext) => Array<{
    description: string
    update: (packageJson: JsonObject) => void
  }>
}
