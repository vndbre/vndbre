import type { UseBaseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { VnOverviewDto } from 'src/api/dtos/VnOverviewDto';
import { VnOverviewMapper } from 'src/api/mappers/VnOverviewMapper';
import type { VnOverview } from 'src/api/models/VnOverview';

/**
 * Get vn overview.
 * @param id Vn id.
 */
export const getVnOverview = async(id: number): Promise<VnOverview> => {
  const response = await fetch('https://api.vndb.org/kana/vn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filters: ['id', '=', `v${id}`],
      fields: 'title, image.url',
    }),
  });
  const data = await response.json();
  const dto = data.results?.[0] as VnOverviewDto;
  console.log(data);
  return VnOverviewMapper.fromDto(dto);
};

/**
 * Vn overview query options.
 * @param id Vn id.
 */
export const vnOverviewQueryOptions = (id: number): UseBaseQueryOptions<VnOverview, Error> => ({
  queryKey: ['getVnOverview', id],
  // eslint-disable-next-line jsdoc/require-jsdoc
  queryFn: () => getVnOverview(id),
});

/**
 * Hook for fetching vn overview.
 * @param id Vn id.
 */
export const useVnOverviewQuery = (id: number): UseQueryResult<VnOverview, Error> =>
  useQuery(vnOverviewQueryOptions(id));
