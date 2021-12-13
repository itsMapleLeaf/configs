import type { Feature } from "../feature.js"
import type { ProjectContext } from "../project-context.js"

export const tailwindFeature: Feature = {
  name: "Tailwind CSS",
  initiallyChecked: (context) =>
    context.environment === "browser" && context.projectType === "application",
  installDevDependencies: () => ["tailwindcss", "postcss"],
  copyFiles: () => [
    { source: "assets/tailwindcss/*", destination: "." },
    { source: "assets/tailwindcss/src/*", destination: "src" },
  ],
}

export function isTailwindEnabled(context: ProjectContext) {
  return context.enabledFeatures.includes(tailwindFeature)
}
