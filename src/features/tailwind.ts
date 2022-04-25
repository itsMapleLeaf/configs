import type { Feature } from "../feature.js"
import type { ProjectContext } from "../project-context.js"

export const tailwindFeature: Feature = {
  name: "Tailwind CSS (Styling)",
  initiallyChecked: (context) =>
    context.environment.isBrowser && context.environment.isApplication,
  installDevDependencies: () => ["tailwindcss", "postcss"],
  copyFiles: () => [
    { source: "assets/tailwindcss/*", destination: "." },
    { source: "assets/tailwindcss/src/*", destination: "src" },
  ],
}

export function isTailwindEnabled(context: ProjectContext) {
  return context.enabledFeatures.includes(tailwindFeature)
}
