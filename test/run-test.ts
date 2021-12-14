import { execa } from "execa"
import { mkdir, rm, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, "..")
const testProjectPath = join(__dirname, "test-project")

await rm(testProjectPath, { force: true, recursive: true })
await mkdir(testProjectPath, { recursive: true })
await writeFile(
  join(testProjectPath, "package.json"),
  JSON.stringify({ name: "test-project", version: "0.0.0" }),
)

await execa("pnpm", ["build"], {
  stdio: "inherit",
})

await execa("pnpm", ["add", projectRoot], {
  cwd: testProjectPath,
  stdio: "inherit",
})

await execa("node", [join(__dirname, "../dist/main.js")], {
  cwd: testProjectPath,
  stdio: "inherit",
})
