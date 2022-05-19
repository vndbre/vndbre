import { http } from '..';
import { Staff } from '../../models/staff';
import { ApiProxyEndpoints } from '../apiProxyEndpoints';
import { PaginationDto } from '../dtos/paginationDto';
import { StaffDto } from '../dtos/staffDto';
import { PaginationMapper } from '../mappers/paginationMapper';
import { StaffMapper } from '../mappers/staffMapper';

export namespace StaffService {

  /**
   * Fetches staff by id.
   * @param id Staff id.
   */
  export async function fetchStaffById(id: Staff['id']): Promise<Staff> {
    const { data } = await http.post<PaginationDto<StaffDto>>(
      ApiProxyEndpoints.VNDB,
      `get staff basic,details,vns,aliases,voiced (id = ${id})`,
    );

    return PaginationMapper.mapPaginationFromDto(data, StaffMapper.fromDto).items[0];
  }
}
