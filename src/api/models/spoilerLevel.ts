export type SpoilerLevel = 'none' | 'minor' | 'major';

const TO_COMPARABLE_MAP: Readonly<Record<SpoilerLevel, number>> = {
  none: 0,
  minor: 1,
  major: 2,
};

export namespace SpoilerLevel {

  /**
   * Converts spoiler level to a comparable equivalent.
   * @param value Spoiler level.
   */
  export function toComparable(value: SpoilerLevel): number {
    return TO_COMPARABLE_MAP[value];
  }
}
