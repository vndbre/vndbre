import { characterFromDto } from '../mappers/characterMapper';
import { http } from '..';
import { Character } from '../../models/character';
import { ApiUrls } from '../../utils/types/apiUrls';
import { DataWrapper } from '../dtos/dataWrapper';
import { CharacterDto } from '../dtos/characterDto';

/**
 * Fetches all vn characters by vn id.
 * @param vnId Visual novel id.
 */
export const fetchCharactersByVnId = async(vnId: string): Promise<Character[]> => {
  let currentPage = 1;
  let hasToFetchMore = true;
  const charactersChunk = [];

  /**
   * Fetches characters by page.
   * @param page Page.
   */
  const fetch = async(page: number): Promise<DataWrapper<CharacterDto>> => {
    const { data } = await http.post<DataWrapper<CharacterDto>>(
      ApiUrls.Vndb,
      `get character basic,details,meas,voiced,traits,vns (vn = ${vnId}) {"results": 25, "page": ${page}}`,
    );
    return data;
  };

  while (hasToFetchMore) {
    // eslint-disable-next-line no-await-in-loop
    const charactersData = await fetch(currentPage);
    charactersChunk.push(charactersData.data.items);

    if (charactersData.data.more) {
      currentPage += 1;
    } else {
      hasToFetchMore = false;
    }
  }

  return charactersChunk.flatMap(characterChunk => characterChunk.map(dto => characterFromDto(dto)));
};
