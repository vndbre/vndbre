import { api } from '../apiClient';
import { createPaginationDtoSchema } from '../dtos/paginationDto';
import { TagDtoSchema } from '../dtos/tagDto';
import { PaginationMapper } from '../mappers/paginationMapper';
import { TagMapper } from '../mappers/tagMapper';
import type { Pagination } from '../models/pagination';
import type { QueryBody } from '../models/queryBody';
import type { TagFilter, TagQueryOptions, TagSortField } from '../models/search/tagQueryOptions';
import type { Tag } from '../models/tag';
import { QueryBuilderService } from './queryBuilderService';

export namespace TagService {

  /**
   * Creates tag query body.
   * @param options Query options.
   */
  export function createTagQueryBody(options: TagQueryOptions): QueryBody<TagSortField, TagFilter> {
    const filters: TagFilter[] = [];

    if (options.id !== undefined) {
      filters.push(QueryBuilderService.createFilter('id', '=', options.id));
    }

    if (options.search !== undefined && options.search !== '') {
      filters.push(QueryBuilderService.createFilter('search', '=', options.search));
    }

    if (options.category !== undefined) {
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
