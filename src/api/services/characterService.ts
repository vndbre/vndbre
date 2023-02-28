import { api } from '../apiClient';
import { BaseCharacterDtoSchema } from '../dtos/characterDto/baseCharacterDto';
import { CharacterDtoSchema } from '../dtos/characterDto/characterDto';
import { createPaginationDtoSchema } from '../dtos/paginationDto';
import { BaseCharacterMapper } from '../mappers/character/baseCharacterMapper';
import { CharacterMapper } from '../mappers/character/characterMapper';
import { CharacterRoleMapper } from '../mappers/character/characterRoleMapper';
import { GenderMapper } from '../mappers/character/genderMapper';
import { PaginationMapper } from '../mappers/paginationMapper';
import type { BaseCharacter } from '../models/character/baseCharacter';
import type { Character } from '../models/character/character';
import type { Pagination } from '../models/pagination';
import type { QueryBody } from '../models/queryBody';
import type { CharacterFilter, CharacterQueryOptions } from '../models/queryOptions/character/characterQueryOptions';
import type { CharacterSortField } from '../models/queryOptions/character/characterSortField';
import type { VnFilter } from '../models/queryOptions/vn/vnQueryOptions';
import { isNotEmpty } from '../utils/isNotEmpty';
import { QueryBuilderService } from './queryBuilderService';

const BASE_CHARACTER_FIELDS = [
  'id',
  'name',
  'image.dims',
  'image.id',
  'image.sexual',
  'image.url',
  'image.violence',
  'image.votecount',
];

const CHARACTER_FIELDS = [
  ...BASE_CHARACTER_FIELDS,
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

export namespace CharacterService {

  /**
   * Create query body for character requests.
   * @param options Opt.
   * @param fields Fields to fetch.
   */
  export function createCharacterQueryBody(
    options: CharacterQueryOptions,
    fields = BASE_CHARACTER_FIELDS,
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
   * Gets characters with base fields.
   * @param options Options.
   */
  export async function getBaseCharacters(
    options: CharacterQueryOptions,
  ): Promise<Pagination<BaseCharacter>> {
    const response = await api.post(createCharacterQueryBody(options, BASE_CHARACTER_FIELDS), 'character').json();
    const dto = createPaginationDtoSchema(BaseCharacterDtoSchema).parse(response);
    return PaginationMapper.fromDto(dto, BaseCharacterMapper.fromDto);
  }

  /**
   * Gets characters.
   * @param options Options.
   */
  export async function getCharacters(
    options: CharacterQueryOptions,
  ): Promise<Pagination<Character>> {
    const response = await api.post(createCharacterQueryBody(options, CHARACTER_FIELDS), 'character').json();
    const dto = createPaginationDtoSchema(CharacterDtoSchema).parse(response);
    return PaginationMapper.fromDto(dto, CharacterMapper.fromDto);
  }
}
