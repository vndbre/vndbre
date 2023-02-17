/** List of search fields for vn. */
export const VN_SEARCH_FIELDS = ['search', 'lang', 'olang', 'platform', 'tag', 'devstatus'] as const;

/** Available search field for vn. */
export type VnSearchField = typeof VN_SEARCH_FIELDS[number];
