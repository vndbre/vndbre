import type { ExtractStrict } from 'src/api/utils/strictExtract';
import type { BaseFilter, Operator } from './baseFilter';
import type { BaseQueryOptions } from '../baseQueryOptions';
import type { Range } from '../range';

/** List of available sort fields for vn. */
export const VN_SORT_FIELDS = ['id', 'title', 'released', 'popularity', 'rating', 'votecount'] as const;

/** Sort field for vn. */
export type VnSortField = typeof VN_SORT_FIELDS[number];

/** List of search fields for vn. */
export const VN_SEARCH_FIELDS = ['search', 'lang', 'olang', 'platform', 'tag'] as const;

/** Available search field for vn. */
export type VnSearchField = typeof VN_SEARCH_FIELDS[number];

/** Available filters for vn. */
export type VnFilter = BaseFilter<VnSearchField, ExtractStrict<Operator, '=' | '!='>> | BaseFilter<VnSortField, Operator>;

/** Vn query options. */
export interface VnQueryOptions extends BaseQueryOptions<VnSortField> {

  /** Vn id. */
  readonly id?: string;

  /** List of languages to search by. */
  readonly languages?: readonly string[];

  /** List of original languages to search by. */
  readonly originalLanguage?: string;

  /** List of platforms to search by. */
  readonly platforms?: readonly string[];

  /** List of tags to search by. */
  readonly tags?: readonly string[];

  /** Popularity score, integer between 0 and 100. */
  readonly popularity?: Range<number>;

  /** Bayesian rating, integer between 10 and 100. */
  readonly rating?: Range<number>;

  /** Year range search within. */
  readonly released?: Range<string>;
}
