import type { ExtractStrict } from 'src/api/utils/strictExtract';
import type { BaseFilter, Operator } from '../../search/baseFilter';
import type { BaseQueryOptions } from '../../baseQueryOptions';
import type { Range } from '../../range';
import type { VnSearchField } from './vnSearchField';
import type { VnSortField } from './vnSortField';
import type { VnDevelopmentStatus } from '../../vn/developmentStatus';

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

  /** Bayesian rating, integer between 10 and 100. */
  readonly length?: number;

  /** Year range search within. */
  readonly released?: Range<number>;

  /** Vn development status. */
  readonly developmentStatus?: VnDevelopmentStatus;
}
