import type { Feature } from "../feature"
import { formatWithPrettier } from "../format.js"

export const eslintFeature: Feature = {
  name: "ESLint (Linting)",
  installDevDependencies: () => ["eslint", "@types/eslint", "prettier"],
  addScripts: () => [
    { name: "lint", command: "eslint --ext js,ts,tsx ." },
    { name: "lint-fix", command: "pnpm lint -- --fix" },
  ],
  writeFiles: (context) => {
    const ignorePatterns = [
      ...context.ignoredPaths,
      ...context.lintIgnoredPaths,
    ].map((path) => `**/${path}/**`)

    const moduleString = `${context.selfPackageName}/eslint`

    const eslintConfigLines = [
      `/** @type {import('eslint').Linter.Config} */`,
      `module.exports = {`,
      `  extends: [require.resolve(${JSON.stringify(moduleString)})],`,
      `  ignorePatterns: ${JSON.stringify(ignorePatterns)},`,
      `  parserOptions: {`,
      `    project: require.resolve("./tsconfig.json"),`,
      `  },`,
      `}`,
    ]

    return [
      {
        path: ".eslintrc.cjs",
        content: formatWithPrettier(
          eslintConfigLines.join("\n"),
          ".eslintrc.cjs",
        ),
      },
    ]
  },
}
