import type { Feature } from "../feature"

export const eslintFeature: Feature = {
  name: "ESLint (Linting)",
  installDevDependencies: () => [
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint-config-prettier",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-react-hooks",
    "eslint-plugin-react",
    "eslint-plugin-unicorn",
    "eslint",
    "prettier",
  ],
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

    const eslintFile = [
      `module.exports = {`,
      `  extends: [require.resolve(${JSON.stringify(moduleString)})],`,
      `  ignorePatterns: ${JSON.stringify(ignorePatterns)},`,
      `}`,
    ]

    return [{ path: ".eslintrc.cjs", content: eslintFile }]
  },
}
