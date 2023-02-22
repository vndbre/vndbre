export const GENDERS = ['male', 'female', 'both'] as const;

export type Gender = typeof GENDERS[number];

const GENDER_READABLE_MAP: Readonly<Record<Gender, string>> = {
  male: 'Male',
  female: 'Female',
  both: 'Both',
};

export namespace Gender {

  /**
   * Gets readable equivalent for gender.
   * @param gender Gender.
   */
  export function toReadable(gender: Gender): string {
    return GENDER_READABLE_MAP[gender];
  }
}
