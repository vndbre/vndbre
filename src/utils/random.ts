/** Helper functions to generate random values. */
export namespace Random {

  /**
   * Generates a random number value between specified ranges using linear random generator.
   * @param maxLimit Max range limit.
   * @param minLimit Min range limit.
   */
  export function generateNumberInRange(minLimit: number, maxLimit: number): number {
    if (minLimit > maxLimit) {
      throw new Error('Min limit can not be greater than max limit!');
    }
    return Math.floor(Math.random() * (maxLimit - minLimit + 1) + minLimit);
  }

  /** Generates `true` or `false` randomly. */
  export function generateRandomBoolean(): boolean {
    const number = generateNumberInRange(0, 1);

    if (number === 0) {
      return false;
    }

    return true;
  }

  /**
   * Gets random element width in percent.
   * @param minLimit Minimum width.
   * @param maxLimit Maximum width.
   */
  export function generateWidthInRange(minLimit = 25, maxLimit = 100): string {
    return `${generateNumberInRange(minLimit, maxLimit)}%`;
  }
}
