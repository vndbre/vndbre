import { api } from '../apiClient';
import { CharacterDtoSchema } from '../dtos/characterDto/characterDto';
import { createPaginationDtoSchema } from '../dtos/paginationDto';
import { CharacterMapper } from '../mappers/character/characterMapper';
import { CharacterRoleMapper } from '../mappers/character/characterRoleMapper';
import { GenderMapper } from '../mappers/character/genderMapper';
import { PaginationMapper } from '../mappers/paginationMapper';
import type { Character } from '../models/character/character';
import type { Pagination } from '../models/pagination';
import type { QueryBody } from '../models/queryBody';
import type { CharacterFilter, CharacterQueryOptions } from '../models/queryOptions/character/characterQueryOptions';
import type { CharacterSortField } from '../models/queryOptions/character/characterSortField';
import type { VnFilter } from '../models/queryOptions/vn/vnQueryOptions';
import { isNotEmpty } from '../utils/isNotEmpty';
import { QueryBuilderService } from './queryBuilderService';

export namespace CharacterService {

  /**
   * A.
   * @param options Opt.
   */
  export function createCharacterQueryBody(
    options: CharacterQueryOptions,
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
      fields: [
        'age',
        'aliases',
        'birthday',
        'blood_type',
        'bust',
        'cup',
        'description',
        'height',
        'hips',
        'id',
        'image.dims',
        'image.id',
        'image.sexual',
        'image.url',
        'image.violence',
        'image.votecount',
        'name',
        'original',
        'sex',
        'traits.id',
        'traits.spoiler',
        'vns.id',
        'vns.release.id',
        'vns.role',
        'vns.spoiler',
        'weight',
      ].join(', '),
      filters: filters.length > 0 ? ['and', ...filters] : undefined,
    };
  }

  /**
   * Gets characters.
   * @param options Options.
   */
  export async function getCharacters(
    options: CharacterQueryOptions,
  ): Promise<Pagination<Character>> {
    const response = await api.post(createCharacterQueryBody(options), 'character').json();
    const dto = createPaginationDtoSchema(CharacterDtoSchema).parse(response);
    return PaginationMapper.fromDto(dto, CharacterMapper.fromDto);
  }
}
