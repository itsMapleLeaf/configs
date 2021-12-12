import type { Feature } from "../feature.js"

export const tailwindFeature: Feature = {
  name: "Tailwind CSS",
  initiallyChecked: (context) =>
    context.environment === "browser" && context.projectType === "application",
  installDevDependencies: () => ["tailwindcss", "postcss"],
  copyFiles: () => [{ source: "assets/tailwindcss", destination: "." }],
}
