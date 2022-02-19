import { VisualNovel } from '../../models/visualNovel';
import { characterFromDto } from '../mappers/characterMapper';
import { http } from '..';
import { Character } from '../../models/character';
import { ApiUrls } from '../../utils/types/apiUrls';
import { DataWrapper } from '../dtos/dataWrapper';
import { CharacterDto } from '../dtos/characterDto';
import { PaginationService } from './paginationService';

export namespace CharacterService {

  /**
   * Fetches vn characters with given id and page.
   * By default page size is `25`.
   * @param vnId Visual novel page.
   * @param page Query page.
   */
  const fetchCharactersPaginatedByVnId = async(vnId: VisualNovel['id'], page: number): Promise<DataWrapper<CharacterDto>> => {
    const { data } = await http.post<DataWrapper<CharacterDto>>(
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
    (await PaginationService.fetchAllDataById(vnId, fetchCharactersPaginatedByVnId)).map(dto => characterFromDto(dto));

}
