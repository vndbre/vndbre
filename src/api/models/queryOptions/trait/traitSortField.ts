export const TRAIT_SORT_FIELDS = ['id', 'name', 'char_count'] as const;

export type TraitSortFilter = typeof TRAIT_SORT_FIELDS[number];
