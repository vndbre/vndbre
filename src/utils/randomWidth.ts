/**
 * Gets random width in percent.
 * @param min Minimum random value.
 * @param max Maximum random number.
 */
export function getRandomWidth(min = 25, max = 100): string {
  return `${Math.round((Math.random() * (max - min)) + min)}%`;
}
