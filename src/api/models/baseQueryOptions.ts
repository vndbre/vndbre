import type { SortOptions } from './sortOptions';

/** Describes base query options to retrieve data. */
export interface BaseQueryOptions<SortField extends string> {

  /** Search string. */
  readonly search?: string;

  /** Sort options. */
  readonly sort?: SortOptions<SortField>;

  /** Page to request. */
  readonly page?: number;
}
