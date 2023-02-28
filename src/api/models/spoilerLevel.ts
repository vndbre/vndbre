export const SPOILER_LEVEL = {
  none: 0,
  minor: 1,
  major: 2,
} as const;

export type SpoilerLevel = keyof typeof SPOILER_LEVEL;

const SPOILER_LEVEL_TO_READABLE_MAP: Readonly<Record<SpoilerLevel, string>> = {
  none: 'None',
  minor: 'Minor',
  major: 'Major',
};

export namespace SpoilerLevel {

  /**
   * Gets spoiler level value.
   * @param spoilerLevel Spoiler level.
   */
  export function getValue<T extends keyof typeof SPOILER_LEVEL>(
    spoilerLevel: T,
  ): typeof SPOILER_LEVEL[T] {
    return SPOILER_LEVEL[spoilerLevel];
  }

  /**
   * Converts spoiler level to a readable equivalent.
   * @param value Spoiler level.
   */
  export function toReadable(value: SpoilerLevel): string {
    return SPOILER_LEVEL_TO_READABLE_MAP[value];
  }
}
