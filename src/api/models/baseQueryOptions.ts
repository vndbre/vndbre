import type { SortOptions } from './sortOptions';

/** Base query options to retrieve data. */
export interface BaseQueryOptions<SortField extends string> {

  /** Search string. */
  readonly search?: string;

  /** Sort options. */
  readonly sort?: SortOptions<SortField>;

  /** Page to request. */
  readonly page?: number;

  /** Number of results to get(max - 100). */
  readonly results?: number;
}
