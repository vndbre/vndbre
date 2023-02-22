export const GENDERS = ['male', 'female', 'both'] as const;

export type Gender = typeof GENDERS[number];
