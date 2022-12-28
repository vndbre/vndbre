/**
 * Normalizes nullable value, excludes `undefined` and `""` in favor of `null`.
 * @param value Value.
 */
export function nullable<Value = unknown>(
  value: Value,
): NonNullable<Value> | null {
  if (value == null || value === '') {
    return null;
  }
  return value;
}

export type Nullable<Value = unknown> = NonNullable<Value> | null;
