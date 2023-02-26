import { api } from '../apiClient';
import { createPaginationDtoSchema } from '../dtos/paginationDto';
import { TraitDtoSchema } from '../dtos/traitDto';
import { PaginationMapper } from '../mappers/paginationMapper';
import { TraitMapper } from '../mappers/traitMapper';
import type { Pagination } from '../models/pagination';
import type { QueryBody } from '../models/queryBody';
import type { TraitFilter, TraitQueryOptions } from '../models/queryOptions/trait/traitQueryOptions';
import type { TraitSortFilter } from '../models/queryOptions/trait/traitSortField';
import type { Trait } from '../models/trait';
import { isNotEmpty } from '../utils/isNotEmpty';
import { QueryBuilderService } from './queryBuilderService';

export namespace TraitService {

  /**
   * Creates trait query body.
   * @param options Query options.
   */
  export function createTraitQueryBody(
    options: TraitQueryOptions,
  ): QueryBody<TraitSortFilter, TraitFilter> {
    const filters: TraitFilter[] = [];

    if (isNotEmpty(options.id)) {
      filters.push(QueryBuilderService.createFilter('id', '=', options.id));
    }

    if (isNotEmpty(options.search)) {
      filters.push(QueryBuilderService.createFilter('search', '=', options.search));
    }

    return {
      ...QueryBuilderService.createBaseQueryBody(options),
      count: options.page !== undefined,
      fields: 'id, name, aliases, description, group_id, group_name',
      filters: filters.length > 0 ? ['and', ...filters] : undefined,
    };
  }

  /**
   * Get traits.
   * @param options Query options.
   */
  export async function getTraits(options: TraitQueryOptions): Promise<Pagination<Trait>> {
    const response = await api.post(createTraitQueryBody(options), 'trait').json();
    const results = createPaginationDtoSchema(TraitDtoSchema).parse(response);
    return PaginationMapper.fromDto(results, TraitMapper.fromDto);
  }
}
