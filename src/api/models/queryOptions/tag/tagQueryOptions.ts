import type { ExtractStrict } from 'src/api/utils/strictExtract';
import type { BaseFilter, Operator } from '../../search/baseFilter';
import type { BaseQueryOptions } from '../../baseQueryOptions';
import type { TagCategory } from '../../tag';
import type { TagSearchField } from './tagSeachField';
import type { TagSortField } from './tagSortField';

export type TagFilter = BaseFilter<TagSearchField, ExtractStrict<Operator, '=' | '!='>> | BaseFilter<TagSortField, Operator>;

/** Tag query options. */
export interface TagQueryOptions extends BaseQueryOptions<TagSortField> {

  /** Id. */
  readonly id?: string;

  /** Tag category. */
  readonly category?: TagCategory;
}
