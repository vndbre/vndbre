/** Sort type. */
export enum SortType {
  Ascending = 'asc',
  Descending = 'desc',
}

/** Sort options for a list of items. */
export interface SortOptions<T extends string> {

  /** Type. */
  readonly type: SortType;

  /** Field by which items should be sorted. */
  readonly field: T;
}
