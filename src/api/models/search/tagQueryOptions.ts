import type { ExtractStrict } from 'src/api/utils/strictExtract';
import type { BaseFilter, Operator } from './baseFilter';
import type { BaseQueryOptions } from '../baseQueryOptions';
import type { TagCategory } from '../tag';

export const TAG_SORT_FIELDS = ['id', 'name'] as const;

export type TagSortField = typeof TAG_SORT_FIELDS[number];

export const TAG_SEARCH_FIELDS = ['id', 'search', 'category'] as const;

export type TagSearchField = typeof TAG_SEARCH_FIELDS[number];

export type TagFilter = BaseFilter<TagSearchField, ExtractStrict<Operator, '=' | '!='>> | BaseFilter<TagSortField, Operator>;

/** Tag query options. */
export interface TagQueryOptions extends BaseQueryOptions<TagSortField> {

  /** Id. */
  readonly id?: string;

  /** Tag category. */
  readonly category?: TagCategory;
}
