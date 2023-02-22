export const CHARACTER_SORT_FIELDS = ['name'] as const;

export type CharacterSortField = typeof CHARACTER_SORT_FIELDS[number];
