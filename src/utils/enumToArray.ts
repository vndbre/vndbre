// eslint-disable-next-line @typescript-eslint/ban-types
type NonFunctional<T> = T extends Function ? never : T;

/**
 * Helper to produce an array of enum values.
 * @param enumeration Enumeration object.
 */
export function enumToArray<T>(enumeration: T): NonFunctional<T[keyof T]>[] {
  return Object.keys(enumeration)
    .filter(key => Number.isNaN(Number(key)))

    // Cast is valid since we've got a subset of enum keys here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(key => (<any>enumeration)[key])
    .filter(val => typeof val === 'number' || typeof val === 'string');
}
