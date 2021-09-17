/**
 * Returns true if the given JsonValue is a JSON object.
 * @param {import("type-fest").JsonValue} value
 * @returns {value is import("type-fest").JsonObject}
 */
export function isJsonObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
