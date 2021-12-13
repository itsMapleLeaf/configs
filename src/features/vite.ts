import type { Feature } from "../feature.js"
import type { ProjectContext } from "../project-context.js"
import { isTailwindEnabled } from "./tailwind.js"

export const viteFeature: Feature = {
  name: "Vite (Build)",
  ignoredPaths: ["dist"],
  initiallyChecked: (context) =>
    context.environment === "browser" && context.projectType === "application",
  installDevDependencies: () => ["vite"],
  addScripts: () => [
    { name: "dev", command: "vite" },
    { name: "build", command: "vite build" },
  ],
  copyFiles: () => [
    { source: "assets/vite/*", destination: "." },
    { source: "assets/vite/src/*", destination: "src" },
  ],
  writeFiles: (context) => [
    { path: "index.html", content: indexHtmlTemplate(context) },
  ],
}

const indexHtmlTemplate = (context: ProjectContext) => /* HTML */ `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      ${isTailwindEnabled(context)
        ? `<link rel="stylesheet" href="src/tailwind.css" />`
        : ""}
      <title>${context.projectName}</title>
    </head>
    <body>
      <script type="module" src="./src/main.tsx"></script>
    </body>
  </html>
`
