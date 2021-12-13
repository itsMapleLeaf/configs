import type { Feature } from "./feature.js"

export type ProjectContext = {
  environment: "browser" | "node"
  projectType: "application" | "library"
  projectName: string
  ignoredPaths: string[]
  selfPackageName: string
  enabledFeatures: Feature[]
}
