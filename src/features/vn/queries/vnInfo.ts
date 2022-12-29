import type { UseBaseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { VnInfoDtoSchema } from 'src/api/dtos/VnInfoDto';
import { VnInfoMapper } from 'src/api/mappers/VnInfoMapper';
import type { VnInfo } from 'src/api/models/VnInfo';

/**
 * Get vn info.
 * @param id Vn id.
 */
export const getVnInfo = async(id: number): Promise<VnInfo> => {
  const response = await fetch('https://api.vndb.org/kana/vn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filters: ['id', '=', `v${id}`],
      fields: 'title, alttitle, image.url',
    }),
  });
  const data = await response.json();
  const dto = VnInfoDtoSchema.parse(data.results?.[0]);
  return VnInfoMapper.fromDto(dto);
};

/**
 * Vn info query options.
 * @param id Vn id.
 */
export const vnInfoQueryOptions = (id: number): UseBaseQueryOptions<VnInfo, Error> => ({
  queryKey: ['getVnInfo', id],
  // eslint-disable-next-line jsdoc/require-jsdoc
  queryFn: () => getVnInfo(id),
});

/**
 * Hook for fetching vn info.
 * @param id Vn id.
 */
export const useVnInfoQuery = (id: number): UseQueryResult<VnInfo, Error> =>
  useQuery(vnInfoQueryOptions(id));
