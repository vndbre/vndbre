import { PaginationDto } from '../dtos/paginationDto';
import { VisualNovelDto } from '../dtos/visualNovelDto';
import { ApiProxyEndpoints, http } from '../index';
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

/** Fields available for sorting visual novels. */
export enum VisualNovelSortField {
  Id,
  Title,
  Released,
  Popularity,
  Rating,
  VoteCount,
}

type VisualNovelSortFieldDto = keyof Pick<VisualNovelDto, 'id' | 'title' | 'released' | 'popularity' | 'rating' | 'votecount'>;

const SORT_FIELD_MAP: Readonly<Record<VisualNovelSortField, VisualNovelSortFieldDto>> = {
  [VisualNovelSortField.Id]: 'id',
  [VisualNovelSortField.Title]: 'title',
  [VisualNovelSortField.Released]: 'released',
  [VisualNovelSortField.Popularity]: 'popularity',
  [VisualNovelSortField.Rating]: 'rating',
  [VisualNovelSortField.VoteCount]: 'votecount',
};

/** Pagination options for visual novels. */
export interface VisualNovelPaginationOptions extends PaginationOptions {

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

/**
 * Visual novel service.
 */
export namespace VisualNovelsService {

  const QUERY_BASE = 'get vn basic,anime,details,relations,tags,stats,screens,staff';

  /**
   * Fetches visual novel with detailed information.
   * @param id Visual novel id.
   */
  export async function fetchFullVisualNovel(id: VisualNovel['id']): Promise<VisualNovel> {
    const { data } = await http.post<PaginationDto<VisualNovelDto>>(
      ApiProxyEndpoints.Vndb, `${QUERY_BASE} (id = ${id})`,
    );

    return PaginationMapper.mapPaginationFromDto(data, VisualNovelMapper.fromDto).items[0];
  }

  /**
   * Fetches visual novels by vnIds.
   * @param ids Array of vn ids.
   */
  export const fetchVisualNovelByIds = async(ids: VisualNovel['id'][]): Promise<VisualNovel[]> => {
    const { data } = await http.post<PaginationDto<VisualNovelDto>>(
      ApiProxyEndpoints.Vndb,
      `get vn basic,anime,details,relations,tags,stats,screens,staff (id = [${ids}]) {"results": 25}`,
    );

    return PaginationMapper.mapPaginationFromDto(data, VisualNovelMapper.fromDto).items as VisualNovel[];
  };

  /**
   * Get a page of visual novels.
   * @param options Pagination options.
   */
  export async function fetchPaginatedVisualNovels(options: VisualNovelPaginationOptions): Promise<Pagination<VisualNovel>> {
    console.log('a');
    const visualNovelOptions = [PaginationMapper.mapOptionsToDto(options)];
    const visualNovelFilters = [`search ~ "${options.search ?? ''}"`];

    if (options.sort != null) {
      visualNovelOptions.push(SortMapper.toDto(options.sort, SORT_FIELD_MAP));
    }

    if (options.platforms != null && options.platforms.length > 0) {
      visualNovelFilters.push(`platforms = [${options.platforms.map(platform => `"${platform}"`).join(', ')}]`);
    }

    if (options.languages != null && options.languages.length > 0) {
      visualNovelFilters.push(`languages = [${options.languages.map(language => `"${language}"`).join(', ')}]`);
    }

    if (options.originalLanguages != null && options.originalLanguages.length > 0) {
      visualNovelFilters.push(`orig_lang = [${options.originalLanguages.map(originalLanguage => `"${originalLanguage}"`).join(', ')}]`);
    }

    if (options.tags != null && options.tags.length > 0) {
      visualNovelFilters.push(`tags = [${options.tags.map(tag => `${tag}`).join(', ')}]`);
    }

    if (options.releasedRange != null) {
      if (options.releasedRange.startDate != null) {
        visualNovelFilters.push(`released >= "${DateService.toISODate(options.releasedRange.startDate)}"`);
      }

      if (options.releasedRange.endDate != null) {
        visualNovelFilters.push(`released <= "${DateService.toISODate(options.releasedRange.endDate)}"`);
      }
    }

    const { data } = await http.post<PaginationDto<VisualNovelDto>>(
      ApiProxyEndpoints.Vndb,
      `${QUERY_BASE} (${visualNovelFilters.join(' and ')}) {${visualNovelOptions.join(', ')}}`,
    );

    return PaginationMapper.mapPaginationFromDto(data, VisualNovelMapper.fromDto);
  }
}
