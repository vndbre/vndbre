import type { ExtractStrict } from 'src/api/utils/strictExtract';
import type { BaseFilter, Operator } from '../../search/baseFilter';
import type { BaseQueryOptions } from '../../baseQueryOptions';
import type { TraitSearchField } from './traitSearchField';
import type { TraitSortFilter } from './traitSortField';

export type TraitFilter = BaseFilter<TraitSearchField, ExtractStrict<Operator, '=' | '!='>> | BaseFilter<TraitSortFilter, Operator>;

/** Trait query options. */
export interface TraitQueryOptions extends BaseQueryOptions<TraitSortFilter> {

  /** Id. */
  readonly id?: string;
}
