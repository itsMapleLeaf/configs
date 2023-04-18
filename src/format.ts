import prettier from "prettier"
import prettierConfig from "../.prettierrc.cjs"

export function formatWithPrettier(text: string, filename: string) {
  return prettier.format(text, { ...prettierConfig, filepath: filename })
}
