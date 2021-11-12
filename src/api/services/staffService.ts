import { http } from '..';
import { Staff } from '../../models/staff';
import { ApiUrls } from '../../utils/types/apiUrls';
import { DataWrapper } from '../dtos/dataWrapper';
import { StaffDto } from '../dtos/staffDto';
import { staffFromDto } from '../mappers/staffMapper';

/**
 * Fetches staff by id.
 * @param id Staff id.
 * TODO: Add support for fetching more.
 */
export const fetchStaff = async(ids: number[]): Promise<Staff[]> => {
  console.log(ids);
  const { data } = await http.post<DataWrapper<StaffDto>>(
    ApiUrls.VNDB,
    `get staff basic (aid = [${ids}])`,
  );

  console.log(data);

  return data.data.items.map(dto => staffFromDto(dto));
};
