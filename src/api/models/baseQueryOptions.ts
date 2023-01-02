import type { SortOptions } from './sortOptions';

/** Describes base query options to retrieve data. */
export interface BaseQueryOptions<SortField extends string> {

  /** Sort options. */
  readonly sort?: SortOptions<SortField>;

  /** Page to request. */
  readonly page?: number;
}
