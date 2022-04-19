import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { StaffService } from '../../../api/services/staffService';
import { Staff } from '../../../models/staff';

/**
 * Custom hook for retrieving staff by id.
 * @param id Staff id.
 * @param options Query options.
 */
export const useStaff = (
  id: Staff['id'], options?: UseQueryOptions<Staff, Error>,
): UseQueryResult<Staff, Error> =>
  useQuery(
    ['staff', id],
    () => StaffService.fetchStaffById(id),
    { ...options },
  );
