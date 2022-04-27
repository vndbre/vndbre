import { VisualNovel } from '../../models/visualNovels/visualNovel';
import { ApiProxyEndpoints, http } from '..';
import { Character } from '../../models/characters/character';
import { PaginationDto } from '../dtos/paginationDto';
import { CharacterDto } from '../dtos/characterDto';
import { PaginationService } from './paginationService';
import { CharacterMapper } from '../mappers/characterMapper';
import { PaginationMapper } from '../mappers/paginationMapper';

/**
 * Fetches vn characters with given id and page.
 * By default page size is `25`.
 * @param vnId Visual novel page.
 * @param page Query page.
 */
async function fetchCharactersPaginatedByVnId(vnId: VisualNovel['id'], page: number): Promise<PaginationDto<CharacterDto>> {
  const { data } = await http.post<PaginationDto<CharacterDto>>(
    ApiProxyEndpoints.Vndb,
    `get character basic,details,meas,voiced,traits,vns (vn = ${vnId}) {"results": 25, "page": ${page}}`,
  );
  return data;
}

/**
 * TODO: (Maximov T.) Add extendable query for searching like in `visualNovelService`.
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
      ApiProxyEndpoints.Vndb,
      `get character basic,details,meas,instances,voiced,traits,vns (id = ${id})`,
    );
    return PaginationMapper.mapPaginationFromDto(data, CharacterMapper.fromDto).items[0];
  }
}
