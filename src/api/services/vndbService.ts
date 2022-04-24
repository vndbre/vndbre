import { PaginationOptions } from '../../models/paginationOptions';
import { PaginationMapper } from '../mappers/paginationMapper';

export type VisualNovelFlag = 'basic' | 'anime' | 'details' | 'relations' | 'tags' | 'stats' | 'screens' | 'staff';
export type VisualNovelFilter =
  { readonly field: 'search'; readonly operator: '~'; readonly value: string; } |
  { readonly field: 'id'; readonly operator: '=' | '!=' | '>' | '>=' | '<' | '<='; readonly value: number; } |
  { readonly field: 'id'; readonly operator: '=' | '!='; readonly value: number[]; } |
  { readonly field: 'platforms'; readonly operator: '=' | '!='; value: readonly string[]; } |
  { readonly field: 'languages'; readonly operator: '=' | '!='; value: readonly string[]; } |
  { readonly field: 'orig_lang'; readonly operator: '=' | '!='; value: readonly string[]; } |
  { readonly field: 'tags'; readonly operator: '=' | '!='; readonly value: readonly number[]; } |
  { readonly field: 'released'; readonly operator: '=' | '!=' | '>' | '>=' | '<' | '<='; readonly value: string; };
export type VisualNovelSortField = 'id' | 'title' | 'released' | 'popularity' | 'rating' | 'votecount';

export type CharacterFlag = 'character' | 'basic' | 'details' | 'meas' | 'voiced' | 'traits' | 'vns';
export type CharacterFilter =
  { readonly field: 'search'; readonly operator: '~'; readonly value: string; } |
  { readonly field: 'traits'; readonly operator: '=' | '!='; readonly value: readonly string[]; };
export type CharacterSortField = 'id' | 'name';

type GetQueryConfigBase =
  { readonly type: 'vn'; readonly filters: readonly VisualNovelFilter[]; readonly flags: readonly VisualNovelFlag[]; } |
  { readonly type: 'character'; readonly filters: readonly CharacterFilter[]; readonly flags: readonly CharacterFlag[]; };

type GetQueryConfig = GetQueryConfigBase & {
  readonly pagination?: PaginationOptions;
  readonly sort?: string;
};

type Filter = VisualNovelFilter | CharacterFilter;

/**
 * Maps filter to string format.
 * @param filter Filter.
 */
function mapFilterToString(filter: Filter): string {
  if (filter.value instanceof Array) {
    const values = filter.value.map(value => `"${value}"`).join(', ');

    return `${filter.field} ${filter.operator} [${values}]`;
  }

  return `${filter.field} ${filter.operator} "${filter.value}"`;
}

export namespace VNDBService {

  /**
   * Constructs the `get` command for data fetching from the `VNDB` API.
   * @param config Command configuration.
   */
  export function createVNDBGetQuery(config: GetQueryConfig): string {
    const flags = config.flags.join(',');

    if (config.filters.length === 0) {
      throw new Error('There must be at least one filter!');
    }

    const filters = config.filters.map(mapFilterToString).join(' and ');
    const filtersArgument = filters.length > 0 ? `(${filters})` : '';

    const paginationOption = config.pagination != null ? PaginationMapper.mapOptionsToDto(config.pagination) : '';
    const sortOption = config.sort ?? '';
    const options = [paginationOption, sortOption].filter(option => option.length > 0);
    const optionsArgument = options.length > 0 ? `{${options.join(', ')}}` : '';

    const queryArguments = [config.type, flags, filtersArgument, optionsArgument]
      .filter(queryArgument => queryArgument.length > 0)
      .join(' ');

    return `get ${queryArguments}`;
  }
}
