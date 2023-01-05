export type SortOrder = 'asc' | 'desc';

/** Sort options. */
export interface SortOptions<T extends string> {

  /** Field to sort by. */
  readonly field: T;

  /** Sort order. */
  readonly order: SortOrder;
}
