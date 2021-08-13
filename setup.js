#! /usr/bin/env node
// @ts-check
import cpy from "cpy"
import execa from "execa"
import { readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const packages = [
  "@typescript-eslint/eslint-plugin",
  "@typescript-eslint/parser",
  "eslint",
  "eslint-config-prettier",
  "eslint-plugin-react",
  "eslint-plugin-react-hooks",
  "eslint-plugin-jsx-a11y",
]

try {
  console.info(`Installing packages...`)
  await execa("pnpm", ["add", "--save-dev", ...packages])

  console.info("Copying eslint config into cwd...")
  await cpy(join(__dirname, ".eslintrc.json"), process.cwd())

  console.info("Adding lint script...")

  const packageJsonPath = join(process.cwd(), "package.json")
  const pkg = JSON.parse(await readFile(packageJsonPath, { encoding: "utf-8" }))

  pkg.scripts = pkg.scripts || {}
  pkg.scripts.lint = "eslint --ext js,ts,tsx ."

  await writeFile(packageJsonPath, JSON.stringify(pkg, null, 2))

  console.info("Done!")
} catch (error) {
  console.error(error)
}
