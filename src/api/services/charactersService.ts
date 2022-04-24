import { VisualNovel } from '../../models/visualNovels/visualNovel';
import { ApiProxyEndpoints, http } from '..';
import { Character } from '../../models/characters/character';
import { PaginationDto } from '../dtos/paginationDto';
import { CharacterDto } from '../dtos/characterDto';
import { PaginationService } from './paginationService';
import { CharacterMapper } from '../mappers/characterMapper';
import { PaginationMapper } from '../mappers/paginationMapper';
import { Pagination } from '../../models/pagination';
import { PaginationOptions } from '../../models/paginationOptions';

/** Search options for characters. */
export interface CharacterSearchOptions extends PaginationOptions {

  /** Search query. */
  readonly search?: string;
}

/**
 * Characters service.
 */
export namespace CharactersService {

  /**
   * Fetches vn characters with given id and page.
   * By default page size is `25`.
   * @param vnId Visual novel page.
   * @param page Query page.
   */
  const fetchCharactersPaginatedByVnId = async(vnId: VisualNovel['id'], page: number): Promise<PaginationDto<CharacterDto>> => {
    const { data } = await http.post<PaginationDto<CharacterDto>>(
      ApiProxyEndpoints.Vndb,
      `get character basic,details,meas,voiced,traits,vns (vn = ${vnId}) {"results": 25, "page": ${page}}`,
    );
    return data;
  };

  /**
   * Fetches all vn characters by vn id.
   * @param vnId Visual novel id.
   */
  export const fetchCharactersByVnId = async(vnId: VisualNovel['id']): Promise<Character[]> =>
    (await PaginationService.fetchAllDataById(vnId, fetchCharactersPaginatedByVnId)).map(dto => CharacterMapper.fromDto(dto));

  /**
   * Fetches character by its id.
   * @param id Character id.
   */
  export const fetchCharacterById = async(id: Character['id']): Promise<Character> => {
    const { data } = await http.post<PaginationDto<CharacterDto>>(
      ApiProxyEndpoints.Vndb,
      `get character basic,details,meas,instances,voiced,traits,vns (id = ${id})`,
    );
    return PaginationMapper.mapPaginationFromDto(data, CharacterMapper.fromDto).items[0];
  };

  /**
   * Gets a page of characters.
   * @param options Options.
   */
  export async function fetchPaginatedCharacters(options: CharacterSearchOptions): Promise<Pagination<Character>> {
    const characterOptions = [PaginationMapper.mapOptionsToDto(options)];

    const characterFilters = [`search ~ "${options.search ?? ''}"`];

    const { data } = await http.post<PaginationDto<CharacterDto>>(
      ApiProxyEndpoints.Vndb,
      `get character basic,details (${characterFilters.join(' and ')}) {${characterOptions.join(', ')}}`,
    );

    return PaginationMapper.mapPaginationFromDto(data, CharacterMapper.fromDto);
  }
}
