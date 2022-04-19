/**
 * Gets random width in percent.
 * @param min Minimum random value.
 * @param max Maximum random number.
 */
export const getRandomWidth = (min = 25, max = 100): string => `${Math.round((Math.random() * (max - min)) + min)}%`;
