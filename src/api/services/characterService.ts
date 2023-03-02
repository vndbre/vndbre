import { api } from '../apiClient';
import { SearchCharacterDtoSchema } from '../dtos/characterDto/searchCharacterDto';
import { createPaginationDtoSchema } from '../dtos/paginationDto';
import { CharacterRoleMapper } from '../mappers/character/characterRoleMapper';
import { GenderMapper } from '../mappers/character/genderMapper';
import { SearchCharacterMapper } from '../mappers/character/searchCharacterMapper';
import { PaginationMapper } from '../mappers/paginationMapper';
import type { SearchCharacter } from '../models/character/searchCharacter';
import type { Pagination } from '../models/pagination';
import type { QueryBody } from '../models/queryBody';
import type { CharacterFilter, CharacterQueryOptions } from '../models/queryOptions/character/characterQueryOptions';
import type { CharacterSortField } from '../models/queryOptions/character/characterSortField';
import type { VnFilter } from '../models/queryOptions/vn/vnQueryOptions';
import { isNotEmpty } from '../utils/isNotEmpty';
import { QueryBuilderService } from './queryBuilderService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CHARACTER_FIELDS = [
  'id',
  'name',
  'image.dims',
  'image.id',
  'image.sexual',
  'image.url',
  'image.violence',
  'image.votecount',
  'age',
  'aliases',
  'birthday',
  'blood_type',
  'bust',
  'cup',
  'description',
  'height',
  'hips',
  'original',
  'sex',
  'traits.id',
  'traits.name',
  'traits.spoiler',
  'traits.searchable',
  'traits.aliases',
  'traits.group_id',
  'traits.group_name',
  'traits.applicable',
  'traits.description',
  'vns.id',
  'vns.release.id',
  'vns.role',
  'vns.spoiler',
  'weight',
];

const SEARCH_CHARACTER_FIELDS = [
  'id',
  'name',
  'image.dims',
  'image.id',
  'image.sexual',
  'image.url',
  'image.violence',
  'image.votecount',
];

export namespace CharacterService {

  /**
   * Create query body for character requests.
   * @param options Options.
   * @param fields Fields to fetch.
   */
  export function createCharacterQueryBody(
    options: CharacterQueryOptions,
    fields = SEARCH_CHARACTER_FIELDS,
  ): QueryBody<CharacterSortField, CharacterFilter> {
    const filters: CharacterFilter[] = [];

    if (isNotEmpty(options.id)) {
      filters.push(QueryBuilderService.createFilter('id', '=', options.id));
    }

    if (isNotEmpty(options.search)) {
      filters.push(QueryBuilderService.createFilter('search', '=', options.search));
    }

    if (isNotEmpty(options.roles)) {
      const roles = options.roles.map<CharacterFilter>(role => {
        const roleDto = CharacterRoleMapper.toDto(role);
        return QueryBuilderService.createFilter('role', '=', roleDto);
      });

      filters.push(...roles);
    }

    if (isNotEmpty(options.gender)) {
      filters.push(
        QueryBuilderService.createFilter('sex', '=', GenderMapper.toDto(options.gender)),
      );
    }

    if (isNotEmpty(options.vnId)) {
      const vnFilter: VnFilter = ['id', '=', options.vnId];
      filters.push(QueryBuilderService.createFilter('vn', '=', ['and', vnFilter]));
    }

    if (isNotEmpty(options.traits)) {
      const traits = options.traits.map<CharacterFilter>(trait => QueryBuilderService.createFilter('trait', '=', trait));
      filters.push(...traits);
    }

    return {
      ...QueryBuilderService.createBaseQueryBody(options),
      count: options.page !== undefined,
      fields: fields.join(', '),
      filters: filters.length > 0 ? ['and', ...filters] : undefined,
    };
  }

  /**
   * Gets characters with fields for search feature.
   * @param options Options.
   */
  export async function getSearchCharacters(
    options: CharacterQueryOptions,
  ): Promise<Pagination<SearchCharacter>> {
    const response = await api.post(createCharacterQueryBody(options, SEARCH_CHARACTER_FIELDS), 'character').json();
    const dto = createPaginationDtoSchema(SearchCharacterDtoSchema).parse(response);
    return PaginationMapper.fromDto(dto, SearchCharacterMapper.fromDto);
  }
}
