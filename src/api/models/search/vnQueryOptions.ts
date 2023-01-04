import type { Operator } from '../operator';
import type { BaseFilter } from './baseFilter';
import type { BaseQueryOptions } from '../baseQueryOptions';

/** List of available sort fields for vn. */
export const VN_SORT_FIELDS = ['id', 'title', 'released', 'popularity', 'rating', 'votecount'] as const;

/** Represents sort field for vn. */
export type VnSortField = typeof VN_SORT_FIELDS[number];

/** List of search fields for vn. */
export const VN_SEARCH_FIELDS = ['search', 'lang', 'olang', 'platform', 'tag'] as const;

/** Represents available search field for vn. */
export type VnSearchField = typeof VN_SEARCH_FIELDS[number];

/** Represents available filters for vn. */
export type VnFilter = BaseFilter<VnSearchField, Extract<Operator, '=' | '!='>> | BaseFilter<VnSortField, Operator>;

/** Describes shape of vn query options. */
export interface VnQueryOptions extends BaseQueryOptions<VnSortField> {

  /** Vn id. */
  readonly id?: string;

  /** List of languages to search by. */
  readonly languages?: readonly string[];

  /** List of original languages to search by. */
  readonly originalLanguages?: readonly string[];

  /** List of platforms to search by. */
  readonly platforms?: readonly string[];

  /** List of tags to search by. */
  readonly tags?: readonly string[];

  /** Date range search within. */
  readonly released?: {

    /** Start of date range. */
    start: string;

    /** End of date range. */
    end: string;
  };
}
