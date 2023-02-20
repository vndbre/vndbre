export const VN_LENGTHS = ['veryshort', 'short', 'medium', 'long', 'verylong'] as const;

export type VnLength = typeof VN_LENGTHS[number];

const LENGTH_READABLE_MAP: Readonly<Record<VnLength, string>> = {
  veryshort: 'Very short',
  short: 'Short',
  medium: 'Medium',
  long: 'Long',
  verylong: 'Very Long',
};

export namespace VnLength {

  /**
   * Converts length to a readable equivalent.
   * @param value Vn length.
   */
  export function toReadable(value: VnLength | null): string {
    const UNKNOWN_LENGTH = 'Unknown';
    return value !== null ? LENGTH_READABLE_MAP[value] ?? UNKNOWN_LENGTH : UNKNOWN_LENGTH;
  }
}
