/** Sort type. */
export enum SortType {
  Ascending,
  Descending,
}

/** Sort options for a list of items. */
export interface SortOptions<T> {

  /** Type. */
  readonly type: SortType;

  /** Field by which items should be sorted. */
  readonly field: T;
}
