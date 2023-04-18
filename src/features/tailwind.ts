import type { Feature } from "../feature.js"

export const tailwindFeature: Feature = {
  name: "Tailwind CSS (Styling)",
  initiallyChecked: (context) =>
    context.environment.isBrowser && context.environment.isApplication,
  installDevDependencies: () => ["tailwindcss"],
  copyFiles: () => [{ source: "assets/tailwindcss/*", destination: "." }],
}
