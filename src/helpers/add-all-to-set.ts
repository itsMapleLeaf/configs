/**
 * Adds all the items of a collection to a set
 *
 * For convenience, accepts undefined and treats it as an empty collection
 */
export function addAllToSet<T>(set: Set<T>, values: Iterable<T> | undefined) {
  for (const value of values ?? []) set.add(value)
}
