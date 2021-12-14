import { readFile } from "node:fs/promises"

/**
 * Tries to read a file, and returns undefined if there's an error
 */
export async function readFileOrUndefined(
  path: string,
): Promise<string | undefined> {
  try {
    return await readFile(path, "utf8")
  } catch {
    return undefined
  }
}
