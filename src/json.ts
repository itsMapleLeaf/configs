import type { JsonObject, JsonValue } from "type-fest"

/**
 * Returns true if the given JsonValue is a JSON object.
 */
export function isJsonObject(value: JsonValue): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
