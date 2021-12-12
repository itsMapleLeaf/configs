export type ProjectContext = {
  environment: "browser" | "node"
  projectType: "application" | "library"
  ignoredPaths: string[]
  selfPackageName: string
}
