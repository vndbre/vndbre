/** List of available sort fields for vn. */
export const VN_SORT_FIELDS = ['id', 'title', 'released', 'popularity', 'rating', 'votecount', 'length'] as const;

/** Sort field for vn. */
export type VnSortField = typeof VN_SORT_FIELDS[number];

const VN_SORT_FIELD_READABLE_MAP: Readonly<Record<VnSortField, string>> = {
  id: 'Id',
  length: 'Length',
  popularity: 'Popularity',
  rating: 'Rating',
  released: 'Released',
  title: 'Title',
  votecount: 'Votes',
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace VnSortField {

  /**
   * TODO: ADD DOCS.
   * @param value Test.
   */
  export function toReadable(value: VnSortField): string {
    return VN_SORT_FIELD_READABLE_MAP[value];
  }
}
