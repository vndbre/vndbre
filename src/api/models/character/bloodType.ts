export const BLOOD_TYPES = ['a', 'b', 'ab', 'o'] as const;

export type BloodType = typeof BLOOD_TYPES[number];

export namespace BloodType {

  /**
   * Gets readable equivalent for blood type.
   * @param type Blood type.
   */
  export function toReadable(type: BloodType): string {
    return type.toUpperCase();
  }
}
