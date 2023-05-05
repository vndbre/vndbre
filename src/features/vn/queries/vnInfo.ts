import type { UseBaseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { VnInfoDtoSchema } from 'src/api/dtos/VnInfoDto';
import { VnInfoMapper } from 'src/api/mappers/VnInfoMapper';
import type { VnInfo } from 'src/api/models/VnInfo';
import { VnService } from 'src/api/services/vnService';

/**
 * Get vn info.
 * @param id Vn id.
 */
export const getVnInfo = async(id: string): Promise<VnInfo> => {
  const response = await fetch('https://api.vndb.org/kana/vn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(VnService.createVnQueryBody({ id })),
  });
  const data = await response.json();
  return VnInfoMapper.fromDto(data.results[0]);
};

/**
 * Vn info query options.
 * @param id Vn id.
 */
export const vnInfoQueryOptions = (id: string): UseBaseQueryOptions<VnInfo, Error> => ({
  queryKey: ['getVnInfo', id],
  // eslint-disable-next-line jsdoc/require-jsdoc
  queryFn: () => getVnInfo(id),
});

/**
 * Hook for fetching vn info.
 * @param id Vn id.
 */
export const useVnInfoQuery = (id: string): UseQueryResult<VnInfo, Error> =>
  useQuery(vnInfoQueryOptions(id));
