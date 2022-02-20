import { http } from '..';
import { Character } from '../../models/character';
import { ApiUrls } from '../../utils/types/apiUrls';
import { PaginationDto } from '../dtos/paginationDto';
import { CharacterDto } from '../dtos/characterDto';
import { CharacterMapper } from '../mappers/characterMapper';

/**
 * Fetches characters by vn id.
 * @param vnId Visual novel id.
 * TODO: Add support for fetching more.
 */
export const fetchCharacters = async(vnId: string): Promise<Character[]> => {
  const { data } = await http.post<PaginationDto<CharacterDto>>(
    ApiUrls.Vndb,
    `get character basic,details,meas,voiced,traits,vns (vn = ${vnId})`,
  );

  return data.data.items.map(dto => CharacterMapper.fromDto(dto));
};
