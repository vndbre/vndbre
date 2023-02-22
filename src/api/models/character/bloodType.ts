export const BLOOD_TYPES = ['a', 'b', 'c', 'ab', 'o'] as const;

export type BloodType = typeof BLOOD_TYPES[number];
