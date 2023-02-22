import type { UseBaseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { VnOverviewDtoSchema } from 'src/api/dtos/VnOverviewDto';
import { VnOverviewMapper } from 'src/api/mappers/VnOverviewMapper';
import type { VnOverview } from 'src/api/models/VnOverview';
import { VnService } from 'src/api/services/vnService';

/**
 * Get vn overview.
 * @param id Vn id.
 */
export const getVnOverview = async(id: string): Promise<VnOverview> => {
  const response = await fetch('https://api.vndb.org/kana/vn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(VnService.createVnQueryBody({ id })),
  });
  const data = await response.json();
  const dto = VnOverviewDtoSchema.parse(data.results?.[0]);
  return VnOverviewMapper.fromDto(dto);
};

/**
 * Vn overview query options.
 * @param id Vn id.
 */
export const vnOverviewQueryOptions = (id: string): UseBaseQueryOptions<VnOverview, Error> => ({
  queryKey: ['getVnOverview', id],
  // eslint-disable-next-line jsdoc/require-jsdoc
  queryFn: () => getVnOverview(id),
});

/**
 * Hook for fetching vn overview.
 * @param id Vn id.
 */
export const useVnOverviewQuery = (id: string): UseQueryResult<VnOverview, Error> =>
  useQuery(vnOverviewQueryOptions(id));
