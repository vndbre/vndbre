import { VisualNovel } from '../../models/visualNovels/visualNovel';
import { http } from '..';
import { Character } from '../../models/characters/character';
import { PaginationDto } from '../dtos/paginationDto';
import { CharacterDto } from '../dtos/characterDto';
import { PaginationService } from './paginationService';
import { CharacterMapper } from '../mappers/characterMapper';
import { PaginationMapper } from '../mappers/paginationMapper';
import { Pagination } from '../../models/pagination';
import { PaginationOptions } from '../../models/paginationOptions';
import { CharacterFilter, CharacterFlag, VNDBService } from './vndbService';
import { ApiProxyEndpoints } from '../apiProxyEndpoints';

/** Search options for characters. */
export interface CharacterSearchOptions extends PaginationOptions {

  /** Search query. */
  readonly search?: string;
}

const DEFAULT_CHARACTER_FLAGS: CharacterFlag[] = ['basic', 'details', 'meas', 'voiced', 'traits', 'vns'];

/**
 * Fetches vn characters with given id and page.
 * By default page size is `25`.
 * @param vnId Visual novel page.
 * @param page Query page.
 */
async function fetchCharactersPaginatedByVnId(vnId: VisualNovel['id'], page: number): Promise<PaginationDto<CharacterDto>> {
  const { data } = await http.post<PaginationDto<CharacterDto>>(
    ApiProxyEndpoints.VNDB,
    VNDBService.createVNDBGetQuery({
      type: 'character',
      flags: DEFAULT_CHARACTER_FLAGS,
      filters: [['vn', '=', vnId]],
      pagination: { page, pageSize: 25 },
    }),
  );
  return data;
}

/**
 * Characters service.
 */
export namespace CharactersService {

  /**
   * Fetches all vn characters by vn id.
   * @param vnId Visual novel id.
   */
  export async function fetchCharactersByVnId(vnId: VisualNovel['id']): Promise<Character[]> {
    return (await PaginationService.fetchAllDataById(vnId, fetchCharactersPaginatedByVnId)).map(dto => CharacterMapper.fromDto(dto));
  }

  /**
   * Fetches character by its id.
   * @param id Character id.
   */
  export async function fetchCharacterById(id: Character['id']): Promise<Character> {
    const { data } = await http.post<PaginationDto<CharacterDto>>(
      ApiProxyEndpoints.VNDB,
      VNDBService.createVNDBGetQuery({
        type: 'character',
        flags: DEFAULT_CHARACTER_FLAGS,
        filters: [['id', '=', id]],
      }),
    );
    return PaginationMapper.mapPaginationFromDto(data, CharacterMapper.fromDto).items[0];
  }

  /**
   * Gets a page of characters.
   * @param options Options.
   */
  export async function fetchPaginatedCharacters(options: CharacterSearchOptions): Promise<Pagination<Character>> {
    const characterFilters: CharacterFilter[] = [['search', '~', options.search ?? '']];

    const { data } = await http.post<PaginationDto<CharacterDto>>(
      ApiProxyEndpoints.VNDB,
      VNDBService.createVNDBGetQuery({
        type: 'character',
        flags: DEFAULT_CHARACTER_FLAGS,
        filters: characterFilters,
        pagination: options,
      }),
    );

    return PaginationMapper.mapPaginationFromDto(data, CharacterMapper.fromDto);
  }
}
