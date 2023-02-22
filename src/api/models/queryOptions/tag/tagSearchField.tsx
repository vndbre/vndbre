export const TAG_SEARCH_FIELDS = ['id', 'search', 'category'] as const;

export type TagSearchField = typeof TAG_SEARCH_FIELDS[number];
