/** Pagination options. */
export interface Pagination<T> {

  /** Total count. */
  readonly count?: number;

  /** If there is more data to fetch. */
  readonly hasMore: boolean;

  /** Data. */
  readonly results: readonly T[];
}
