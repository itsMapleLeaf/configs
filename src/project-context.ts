import type { Feature } from "./feature.js"

export type ProjectContext = {
  environment: "browser" | "node"
  projectType: "application" | "library"
  projectName: string
  ignoredPaths: Set<string>
  gitIgnoredPaths: Set<string>
  lintIgnoredPaths: Set<string>
  typecheckIgnoredPaths: Set<string>
  formatIgnoredPaths: Set<string>
  selfPackageName: string
  enabledFeatures: Feature[]
}
