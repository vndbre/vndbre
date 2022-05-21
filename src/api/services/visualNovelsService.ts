import { PaginationDto } from '../dtos/paginationDto';
import { VisualNovelDto } from '../dtos/visualNovelDto';
import { http } from '..';
import { VisualNovel } from '../../models/visualNovels/visualNovel';
import { PaginationOptions } from '../../models/paginationOptions';
import { Tag } from '../../models/tag';
import { SortOptions } from '../../models/sortOptions';
import { Platform } from '../../models/platform';
import { Language } from '../../models/language';
import { Pagination } from '../../models/pagination';
import { PaginationMapper } from '../mappers/paginationMapper';
import { VisualNovelMapper } from '../mappers/visualNovelMapper';
import { SortMapper } from '../mappers/sortMapper';
import { DateService } from './dateService';
import {
  VisualNovelFilter,
  VisualNovelFlag,
  VisualNovelSortField as VisualNovelSortFieldDto,
  VNDBService,
} from './vndbService';
import { ApiProxyEndpoints } from '../apiProxyEndpoints';

/** Fields available for sorting visual novels. */
export enum VisualNovelSortField {
  Id,
  Title,
  Released,
  Popularity,
  Rating,
  VoteCount,
}

const SORT_FIELD_MAP: Readonly<Record<VisualNovelSortField, VisualNovelSortFieldDto>> = {
  [VisualNovelSortField.Id]: 'id',
  [VisualNovelSortField.Title]: 'title',
  [VisualNovelSortField.Released]: 'released',
  [VisualNovelSortField.Popularity]: 'popularity',
  [VisualNovelSortField.Rating]: 'rating',
  [VisualNovelSortField.VoteCount]: 'votecount',
};

/** Search options for visual novels. */
export interface VisualNovelSearchOptions extends PaginationOptions {

  /** Search string. */
  readonly search?: string;

  /** Time range for release of visual novels.  */
  readonly releasedRange?: {

    /** Start date. */
    readonly startDate?: Date;

    /** End date. */
    readonly endDate?: Date;
  };

  /** Platforms. */
  readonly platforms?: readonly Platform[];

  /** Languages. */
  readonly languages?: readonly Language[];

  /** Original languages. */
  readonly originalLanguages?: readonly Language[];

  /** Tags. */
  readonly tags?: readonly Tag['id'][];

  /** Sorting field. */
  readonly sort?: SortOptions<VisualNovelSortField>;
}

const DEFAULT_VISUAL_NOVEL_FLAGS: VisualNovelFlag[] = ['basic', 'anime', 'details', 'relations', 'tags', 'stats', 'screens', 'staff'];

/**
 * Visual novel service.
 */
export namespace VisualNovelsService {

  /**
   * Fetches visual novel.
   * @param id Visual novel id.
   */
  export async function fetchVisualNovel(id: VisualNovel['id']): Promise<VisualNovel> {
    const { data } = await http.post<PaginationDto<VisualNovelDto>>(
      ApiProxyEndpoints.VNDB,
      VNDBService.createVNDBGetQuery({
        type: 'vn',
        flags: DEFAULT_VISUAL_NOVEL_FLAGS,
        filters: [['id', '=', id]],
      }),
    );

    return PaginationMapper.mapPaginationFromDto(data, VisualNovelMapper.fromDto).items[0];
  }

  /**
   * Fetches visual novels with given ids.
   * @param ids Array of visual novel ids.
   */
  export async function fetchVisualNovelByIds(ids: VisualNovel['id'][]): Promise<VisualNovel[]> {
    const { data } = await http.post<PaginationDto<VisualNovelDto>>(
      ApiProxyEndpoints.VNDB,
      VNDBService.createVNDBGetQuery({
        type: 'vn',
        flags: DEFAULT_VISUAL_NOVEL_FLAGS,
        filters: [['id', '=', ids]],
        pagination: { page: 1, pageSize: 25 },
      }),
    );

    return PaginationMapper.mapPaginationFromDto(data, VisualNovelMapper.fromDto).items as VisualNovel[];
  }

  /**
   * Get a page of visual novels.
   * @param options Search options.
   */
  export async function fetchPaginatedVisualNovels(options: VisualNovelSearchOptions): Promise<Pagination<VisualNovel>> {
    const visualNovelFilters: VisualNovelFilter[] = [['search', '~', options.search ?? '']];

    if (options.platforms != null && options.platforms.length > 0) {
      visualNovelFilters.push(['platforms', '=', options.platforms]);
    }

    if (options.languages != null && options.languages.length > 0) {
      visualNovelFilters.push(['languages', '=', options.languages]);
    }

    if (options.originalLanguages != null && options.originalLanguages.length > 0) {
      visualNovelFilters.push(['orig_lang', '=', options.originalLanguages]);
    }

    if (options.tags != null && options.tags.length > 0) {
      options.tags.forEach(tag => {
        visualNovelFilters.push(['tags', '=', tag]);
      });
    }

    if (options.releasedRange != null) {
      if (options.releasedRange.startDate != null) {
        visualNovelFilters.push(['released', '>=', DateService.toISODate(options.releasedRange.startDate)]);
      }

      if (options.releasedRange.endDate != null) {
        visualNovelFilters.push(['released', '<=', DateService.toISODate(options.releasedRange.endDate)]);
      }
    }

    const { data } = await http.post<PaginationDto<VisualNovelDto>>(
      ApiProxyEndpoints.VNDB,
      VNDBService.createVNDBGetQuery(
        {
          type: 'vn',
          flags: DEFAULT_VISUAL_NOVEL_FLAGS,
          filters: visualNovelFilters,
          pagination: options,
          sort: options.sort != null ? SortMapper.toDto(options.sort, SORT_FIELD_MAP) : undefined,
        },
      ),
    );

    return PaginationMapper.mapPaginationFromDto(data, VisualNovelMapper.fromDto);
  }
}
