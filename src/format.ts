import prettier from "prettier"
import prettierConfig from "../prettier/index.cjs"

export function formatWithPrettier(text: string) {
  return prettier.format(text, prettierConfig)
}
