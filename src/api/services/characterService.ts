import { characterFromDto } from '../mappers/characterMapper';
import { http } from '..';
import { Character } from '../../models/character';
import { ApiUrls } from '../../utils/types/apiUrls';
import { DataWrapper } from '../dtos/dataWrapper';
import { CharacterDto } from '../dtos/characterDto';

/**
 * Fetches characters by vn id.
 * @param vnId Visual novel id.
 * TODO: Add support for fetching more.
 */
export const fetchCharacters = async(vnId: string): Promise<Character[]> => {
  const { data } = await http.post<DataWrapper<CharacterDto>>(
    ApiUrls.Vndb,
    `get character basic,details,meas,voiced,traits,vns (vn = ${vnId})`,
  );

  return data.data.items.map(dto => characterFromDto(dto));
};
