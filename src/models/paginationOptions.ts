/** Options required to paginate list. */
export interface PaginationOptions {

  /** 1-based page number. */
  readonly page: number;

  /** Amount of items on the page. */
  readonly pageSize: number;
}
