import chalk from "chalk"
import { promptFeatures } from "./feature.js"
import {
  applyEnabledFeatures,
  getInitialProjectContext,
} from "./project-context.js"

console.info(
  `${chalk.cyan`i`} Current working directory:`,
  chalk.bold.cyan(process.cwd()),
)

const context = await getInitialProjectContext()
context.enabledFeatures = await promptFeatures(context)
await applyEnabledFeatures(context)
