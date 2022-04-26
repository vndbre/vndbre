/**
 * Checks whether the array is non nullish and has items.
 * @param array Array.
 */
export function checkIfArrayIsNonEmpty<T>(array: readonly T[] | undefined | null): boolean {
  return array != null && array.length > 0;
}
