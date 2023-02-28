/**
 * Get random integer between two numbers including minimum and maximum number.
 * @param min Min number.
 * @param max Max number.
 */
export function randomBetween(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}
