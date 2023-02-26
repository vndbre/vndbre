/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * Nullifies `undefined`.
 * @param data Data to nullify.
 *
 * This helper function is workaround for:
 * @see https://github.com/TanStack/query/issues/1458.
 */
export function nullify<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
