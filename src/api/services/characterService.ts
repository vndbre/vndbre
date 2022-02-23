import { VisualNovel } from '../../models/visualNovel';
import { http } from '..';
import { Character } from '../../models/character';
import { ApiUrls } from '../../utils/types/apiUrls';
import { PaginationDto } from '../dtos/paginationDto';
import { CharacterDto } from '../dtos/characterDto';
import { PaginationService } from './paginationService';
import { CharacterMapper } from '../mappers/characterMapper';

export namespace CharacterService {

  /**
   * Fetches vn characters with given id and page.
   * By default page size is `25`.
   * @param vnId Visual novel page.
   * @param page Query page.
   */
  const fetchCharactersPaginatedByVnId = async(vnId: VisualNovel['id'], page: number): Promise<PaginationDto<CharacterDto>> => {
    const { data } = await http.post<PaginationDto<CharacterDto>>(
      ApiUrls.Vndb,
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

}
