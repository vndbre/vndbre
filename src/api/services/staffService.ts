import { ApiProxyEndpoints, http } from '..';
import { Staff } from '../../models/staff';
import { PaginationDto } from '../dtos/paginationDto';
import { StaffDto } from '../dtos/staffDto';
import { StaffMapper } from '../mappers/staffMapper';

/**
 * Fetches staff by id.
 * @param ids Staff ids.
 * TODO: Add support for fetching more.
 */
export const fetchStaff = async(ids: number[]): Promise<Staff[]> => {
  const { data } = await http.post<PaginationDto<StaffDto>>(
    ApiProxyEndpoints.Vndb,
    `get staff basic (aid = [${ids}])`,
  );

  return data.data.items.map(dto => StaffMapper.fromDto(dto));
};
