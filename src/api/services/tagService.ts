import { api } from '../apiClient';
import { createPaginationDtoSchema } from '../dtos/paginationDto';
import { TagDtoSchema } from '../dtos/tagDto';
import { PaginationMapper } from '../mappers/paginationMapper';
import { TagMapper } from '../mappers/tagMapper';
import type { Pagination } from '../models/pagination';
import type { QueryBody } from '../models/queryBody';
import type { TagFilter, TagQueryOptions } from '../models/queryOptions/tag/tagQueryOptions';
import type { TagSortField } from '../models/queryOptions/tag/tagSortField';
import type { Tag } from '../models/tag';
import { isNotEmpty } from '../utils/isEmpty';
import { QueryBuilderService } from './queryBuilderService';

export namespace TagService {

  /**
   * Creates tag query body.
   * @param options Query options.
   */
  export function createTagQueryBody(options: TagQueryOptions): QueryBody<TagSortField, TagFilter> {
    const filters: TagFilter[] = [];

    if (isNotEmpty(options.id)) {
      filters.push(QueryBuilderService.createFilter('id', '=', options.id));
    }

    if (isNotEmpty(options.search)) {
      filters.push(QueryBuilderService.createFilter('search', '=', options.search));
    }

    if (isNotEmpty(options.category)) {
      filters.push(QueryBuilderService.createFilter('category', '=', options.category));
    }

    return {
      ...QueryBuilderService.createBaseQueryBody(options),
      count: options.page !== undefined,
      fields: 'id, name, aliases, description, category',
      filters: filters.length > 0 ? ['and', ...filters] : undefined,
    };
  }

  /**
   * Get tags.
   * @param options Query options.
   */
  export async function getTags(options: TagQueryOptions): Promise<Pagination<Tag>> {
    const response = await api.post(createTagQueryBody(options), 'tag').json();
    const results = createPaginationDtoSchema(TagDtoSchema).parse(response);
    return PaginationMapper.fromDto(results, TagMapper.fromDto);
  }
}
