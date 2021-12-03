import { http } from '..';
import { Staff } from '../../models/staff';
import { ApiUrls } from '../../utils/types/apiUrls';
import { DataWrapper } from '../dtos/dataWrapper';
import { StaffDto } from '../dtos/staffDto';
import { staffFromDto } from '../mappers/staffMapper';

/**
 * Fetches staff by id.
 * @param ids Staff ids.
 * TODO: Add support for fetching more.
 */
export const fetchStaff = async(ids: number[]): Promise<Staff[]> => {
  const { data } = await http.post<DataWrapper<StaffDto>>(
    ApiUrls.Vndb,
    `get staff basic (aid = [${ids}])`,
  );

  return data.data.items.map(dto => staffFromDto(dto));
};
