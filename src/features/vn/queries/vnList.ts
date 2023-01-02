import type { UseBaseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { VnOverviewDtoSchema } from 'src/api/dtos/VnOverviewDto';
import { VnOverviewMapper } from 'src/api/mappers/VnOverviewMapper';
import type { VnQueryOptions } from 'src/api/models/search/vnQueryOptions';
import type { VnOverview } from 'src/api/models/VnOverview';
import { VnService } from 'src/api/services/vnService';

/**
 * Get vn overview.
 * @param options Options.
 */
export const getVnList = async(options: VnQueryOptions): Promise<VnOverview> => {
  const response = await fetch('https://api.vndb.org/kana/vn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(VnService.createVnQuery(options)),
  });
  const data = await response.json();
  const dto = VnOverviewDtoSchema.parse(data.results?.[0]);
  console.log(data);
  return VnOverviewMapper.fromDto(dto);
};

/**
 * Vn overview query options.
 * @param options Options.
 */
export const vnListQueryOptions =
  (options: VnQueryOptions): UseBaseQueryOptions<VnOverview, Error> => ({
    queryKey: ['getVnList', options.page],
    // eslint-disable-next-line jsdoc/require-jsdoc
    queryFn: () => getVnList(options),
  });

/**
 * Hook for fetching vn overview.
 * @param options Options.
 */
export const useVnListQuery = (options: VnQueryOptions): UseQueryResult<VnOverview, Error> =>
  useQuery(vnListQueryOptions(options));
