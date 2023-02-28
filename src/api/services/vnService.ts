import { QueryBuilderService } from './queryBuilderService';
import type { QueryBody } from '../models/queryBody';
import type { VnFilter, VnQueryOptions } from '../models/queryOptions/vn/vnQueryOptions';
import { api } from '../apiClient';
import { VnDtoSchema } from '../dtos/vnDto/vnDto';
import { createPaginationDtoSchema } from '../dtos/paginationDto';
import { PaginationMapper } from '../mappers/paginationMapper';
import { VnMapper } from '../mappers/vn/vnMapper';
import type { Pagination } from '../models/pagination';
import type { Vn } from '../models/vn/vn';
import type { VnSortField } from '../models/queryOptions/vn/vnSortField';
import { VnDevelopmentStatusMapper } from '../mappers/vn/developmentStatusMapper';
import { VnLengthMapper } from '../mappers/vn/lengthMapper';
import { isNotEmpty } from '../utils/isNotEmpty';
import type { BaseVn } from '../models/vn/baseVn';
import { BaseVnMapper } from '../mappers/vn/baseVnMapper';
import { BaseVnDtoSchema } from '../dtos/vnDto/baseVnDto';

const BASE_VN_FIELDS = [
  'id',
  'title',
  'image.dims',
  'image.id',
  'image.sexual',
  'image.url',
  'image.violence',
  'image.votecount',
];

const VN_FIELDS = [
  ...BASE_VN_FIELDS,
  'aliases',
  'alttitle',
  'description',
  'devstatus',
  'languages',
  'length_minutes',
  'length_votes',
  'length',
  'olang',
  'platforms',
  'popularity',
  'rating',
  'released',
  'screenshots.dims',
  'screenshots.id',
  'screenshots.sexual',
  'screenshots.thumbnail_dims',
  'screenshots.thumbnail',
  'screenshots.url',
  'screenshots.violence',
  'screenshots.votecount',
  'tags.spoiler',
  'tags.id',
  'tags.name',
  'tags.aliases',
  'tags.description',
  'tags.category',
  'title',
  'titles.lang',
  'titles.latin',
  'titles.main',
  'titles.official',
  'titles.title',
  'votecount',
];

export namespace VnService {

  /**
   * Creates vn query body.
   * @param options Query options.
   * @param fields List of fields to fetch.
   */
  export function createVnQueryBody(
    options: VnQueryOptions, fields = BASE_VN_FIELDS,
  ): QueryBody<VnSortField, VnFilter> {
    const filters: VnFilter[] = [];

    if (isNotEmpty(options.id)) {
      filters.push(QueryBuilderService.createFilter('id', '=', options.id));
    }

    if (isNotEmpty(options.search)) {
      filters.push(QueryBuilderService.createFilter('search', '=', options.search));
    }

    if (isNotEmpty(options.languages)) {
      const langs = options.languages.map<VnFilter>(lang => QueryBuilderService.createFilter('lang', '=', lang));
      filters.push(...langs);
    }

    if (isNotEmpty(options.originalLanguage)) {
      filters.push(QueryBuilderService.createFilter('olang', '=', options.originalLanguage));
    }

    if (isNotEmpty(options.platforms)) {
      const platforms = options.platforms.map<VnFilter>(platform => QueryBuilderService.createFilter('platform', '=', platform));
      filters.push(...platforms);
    }

    if (isNotEmpty(options.tags)) {
      const tags = options.tags.map<VnFilter>(tag => QueryBuilderService.createFilter('tag', '=', tag));
      filters.push(...tags);
    }

    if (isNotEmpty(options.released)) {
      filters.push(QueryBuilderService.createFilter('released', '>=', String(options.released.start)));
      filters.push(QueryBuilderService.createFilter('released', '<=', String(options.released.end)));
    }

    if (isNotEmpty(options.popularity)) {
      filters.push(QueryBuilderService.createFilter('popularity', '>=', String(options.popularity.start)));
      filters.push(QueryBuilderService.createFilter('popularity', '<=', String(options.popularity.end)));
    }

    if (isNotEmpty(options.rating)) {
      filters.push(QueryBuilderService.createFilter('rating', '>=', String(options.rating.start)));
      filters.push(QueryBuilderService.createFilter('rating', '<=', String(options.rating.end)));
    }

    if (isNotEmpty(options.length)) {
      filters.push(QueryBuilderService.createFilter(
        'length',
        '=',
        String(VnLengthMapper.toDto(options.length)),
      ));
    }

    if (isNotEmpty(options.developmentStatus)) {
      filters.push(QueryBuilderService.createFilter(
        'devstatus',
        '=',
        String(VnDevelopmentStatusMapper.toDto(options.developmentStatus)),
      ));
    }

    return {
      ...QueryBuilderService.createBaseQueryBody(options),

      // we don't want to receive count without passing a page.
      count: options.page !== undefined,
      fields: fields.join(', '),
      filters: filters.length > 0 ? ['and', ...filters] : undefined,
    };
  }

  /**
   * Gets base vns.
   * @param options Query options.
   */
  export async function getBaseVns(options: VnQueryOptions): Promise<Pagination<BaseVn>> {
    const response = await api.post(createVnQueryBody(options), 'vn').json();
    const dto = createPaginationDtoSchema(BaseVnDtoSchema).parse(response);
    return PaginationMapper.fromDto(dto, BaseVnMapper.fromDto);
  }

  /**
   * Gets vns.
   * @param options Query options.
   */
  export async function getVns(options: VnQueryOptions): Promise<Pagination<Vn>> {
    const response = await api.post(createVnQueryBody(options, VN_FIELDS), 'vn').json();
    const dto = createPaginationDtoSchema(VnDtoSchema).parse(response);
    return PaginationMapper.fromDto(dto, VnMapper.fromDto);
  }
}
