/** Pagination options. */
export interface Pagination<T> {

  /** Total count. */
  readonly count: number;

  /** If there is more data to fetch. */
  readonly more: boolean;

  /** Current page. */
  readonly page: number;

  /** Data. */
  readonly data: readonly T[];
}
