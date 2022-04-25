/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-jsdoc */
import { PaginationOptions } from '../../models/paginationOptions';
import { ReleaseProducers } from '../../models/releases/release';
import { ReleaseBasicDto, ReleaseDetailsDto, ReleaseIdDto, ReleaseProducersDto, ReleaseVnDto } from '../dtos/releaseDto';
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

export type ReleaseFilter = {
  readonly field: 'id'; readonly operator: '=' | '!=' | '>' | '>=' | '<' | '<='; readonly value: number;
} | {
  readonly field: 'id'; readonly operator: '=' | '!=' | '>' | '>=' | '<' | '<='; readonly value: number;
};
export type ReleaseFlag = 'basic' | 'details' | 'producers' | 'vn';

type GetQueryConfigBase =
  { readonly type: 'vn'; readonly filters: readonly VisualNovelFilter[]; readonly flags: readonly VisualNovelFlag[]; } |
  { readonly type: 'character'; readonly filters: readonly CharacterFilter[]; readonly flags: readonly CharacterFlag[]; } |
  { readonly type: 'release'; readonly filters: readonly ReleaseFilter[]; readonly flags: readonly ReleaseFlag[]; };

type GetQueryConfig = GetQueryConfigBase & {
  readonly pagination?: PaginationOptions;
  readonly sort?: string;
};

type Filter = VisualNovelFilter | CharacterFilter | ReleaseFilter;

export type Flags = VisualNovelFlag | CharacterFlag | ReleaseFlag;

export type Types = 'vn' | 'character' | 'release';

type MapDto<T extends Types, F extends Flags> = T extends 'release' ? (
  F extends 'basic' ? ReleaseBasicDto :
  F extends 'details' ? ReleaseDetailsDto :
  F extends 'producers' ? ReleaseProducersDto :
  F extends 'vn' ? ReleaseVnDto :
  never) : never;

type IdDto<T extends Types> = T extends 'release' ? ReleaseIdDto : never;

export interface Assumer<T, F> {
  assume: (obj: unknown) => T; flags: F[];
}

export function builder<F extends Flags>() {
  function add<V extends F, I>(flag: V, p: (obj: unknown) => I, prevFlags: F[]) {
    const ret = (obj: unknown) => p(obj) as I & MapDto<Types, V>;
    const flags = [...prevFlags, flag];
    return {
      with: <T extends F>(t: T) => add(t, ret, flags),
      build(): Assumer<I & MapDto<Types, V>, F> {
        return { assume: ret, flags };
      },
    };
  }
  function init<V extends F>(flag: V) {
    const ret = (obj: unknown) => obj as (IdDto<Types> & MapDto<Types, V>);
    const flags = [flag];
    return {
      with: <V extends F>(f: V) => add(f, ret, flags),
      build(): Assumer<IdDto<Types> & MapDto<Types, V>, F> {
        return { assume: ret, flags };
      },
    };
  }
  return { with: <V extends F>(f: V) => init(f) };
}

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
