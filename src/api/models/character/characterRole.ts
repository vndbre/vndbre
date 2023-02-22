export const CHARACTER_ROLES = ['protagonist', 'main', 'side', 'appears'] as const;

export type CharacterRole = typeof CHARACTER_ROLES[number];
