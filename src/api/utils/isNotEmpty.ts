/**
 * Check if values is not empty.
 * @param value Value.
 */
export function isNotEmpty<T>(value: T): value is NonNullable<T> {
  if (value == null) {
    return false;
  }

  if (value === '') {
    return false;
  }

  if (Array.isArray(value) && value.length === 0) {
    return false;
  }

  return true;
}
