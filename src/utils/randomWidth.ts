/**
 * Get random number.
 * @param min Minimum random value.
 * @param max Maximum random number.
 */
export const randomWidth = (min = 25, max = 100): string => `${Math.round((Math.random() * (max - min)) + min)}%`;
