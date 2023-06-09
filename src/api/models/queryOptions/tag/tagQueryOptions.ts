import type { ExtractStrict } from '@/api/utils/strictExtract';
import type { BaseFilter, Operator } from '../../search/baseFilter';
import type { BaseQueryOptions } from '../../baseQueryOptions';
import type { TagSearchField } from './tagSearchField';
import type { TagSortField } from './tagSortField';
import type { TagCategory } from '../../tag/tagCategory';

export type TagFilter = BaseFilter<TagSearchField, ExtractStrict<Operator, '=' | '!='>> | BaseFilter<TagSortField, Operator>;

/** Tag query options. */
export interface TagQueryOptions extends BaseQueryOptions<TagSortField> {

  /** Id. */
  readonly id?: string;

  /** Tag category. */
  readonly category?: TagCategory;
}
