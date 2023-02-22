export const TAG_SORT_FIELDS = ['id', 'name'] as const;

export type TagSortField = typeof TAG_SORT_FIELDS[number];
