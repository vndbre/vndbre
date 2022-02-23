/** Pagination wrapper. */
export interface Pagination<T> {

  /** Items on the page. */
  readonly items: readonly T[];

  /** Whether the pagination s next page or not. */
  readonly hasMore: boolean;

  /** Max amount of items on the page. */
  readonly size: number;
}
