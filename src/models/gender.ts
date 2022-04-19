/**
 * Represents gender.
 */
export enum Gender {
  Male = 'm',
  Female = 'f',
  Both = 'b',
}

export namespace Gender {

  const TO_READABLE_MAP: Readonly<Record<Gender, string>> = {
    [Gender.Male]: 'Male',
    [Gender.Female]: 'Female',
    [Gender.Both]: 'Both',
  };

  /**
   * Converts gender to a readable equivalent.
   * @param gender Gender.
   */
  export function toReadable(gender: Gender): string {
    return TO_READABLE_MAP[gender];
  }
}
