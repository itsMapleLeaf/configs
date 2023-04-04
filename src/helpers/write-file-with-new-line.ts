import { writeFile } from "node:fs/promises"

/**
 * Write to a file, ensuring a new line at the end.
 * Accepts either a content string, or a collection of lines
 */
export function writeFileWithNewLine(
  filePath: string,
  content: string | Iterable<string>,
) {
  const contentString =
    typeof content === "string" ? content : [...content].join("\n")
  return writeFile(filePath, `${contentString}\n`)
}
