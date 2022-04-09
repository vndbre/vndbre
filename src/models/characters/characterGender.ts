/**
 * Represents character gender.
 */
export enum CharacterGender {
  Male = 'm',
  Female = 'f',
  Both = 'b',
}

export namespace CharacterGender {

  const TO_READABLE_MAP: Readonly<Record<CharacterGender, string>> = {
    [CharacterGender.Male]: 'Male',
    [CharacterGender.Female]: 'Female',
    [CharacterGender.Both]: 'Both',
  };

  /**
   * Converts character gender to a readable equivalent.
   * @param gender Characters gender.
   */
  export function toReadable(gender: CharacterGender): string {
    return TO_READABLE_MAP[gender];
  }
}
