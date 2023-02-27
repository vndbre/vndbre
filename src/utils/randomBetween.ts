/**
 * Get random number between two numbers.
 * @param min Min number.
 * @param max Max number.
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
