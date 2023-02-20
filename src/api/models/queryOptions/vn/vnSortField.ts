/** List of available sort fields for vn. */
export const VN_SORT_FIELDS = ['title', 'released', 'popularity', 'rating', 'votecount', 'length'] as const;

/** Sort field for vn. */
export type VnSortField = typeof VN_SORT_FIELDS[number];

const VN_SORT_FIELD_READABLE_MAP: Readonly<Record<VnSortField, string>> = {
  length: 'Length',
  popularity: 'Popularity',
  rating: 'Rating',
  released: 'Released',
  title: 'Title',
  votecount: 'Votes',
};

export namespace VnSortField {

  /**
   * Converts sort field to readable equivalent.
   * @param value Sort field.
   */
  export function toReadable(value: VnSortField): string {
    return VN_SORT_FIELD_READABLE_MAP[value];
  }
}
