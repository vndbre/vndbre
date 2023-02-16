import type { UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Pagination } from 'src/api/models/pagination';
import type { VnQueryOptions } from 'src/api/models/search/vnQueryOptions';
import type { Vn } from 'src/api/models/vn/vn';
import { VnService } from 'src/api/services/vnService';

/**
 * Gets base options.
 * @param options Vn query options.
 */
export const getBaseVnsQueryOptions = (
  options: VnQueryOptions,
): UseInfiniteQueryOptions<Pagination<Vn>, Error> => ({
  queryKey: ['vns', options],

  /** Query fn. */
  queryFn: ({ pageParam = 1 }) => VnService.getVns({ ...options, results: 18, page: pageParam }),

  /**
   * Gets next page params.
   * @param lastPage Last page.
   * @param allPages All pages.
   */
  getNextPageParam: (lastPage, allPages) => (lastPage?.hasMore ? allPages.length + 1 : undefined),
  keepPreviousData: true,
});

/**
 * Hook for fetching vns.
 * @param data Vn query options.
 * @param options Options for useQuery hook.
 */
export const useVnsQuery = (
  data: VnQueryOptions, options?: UseInfiniteQueryOptions<Pagination<Vn>, Error>,
): UseInfiniteQueryResult<Pagination<Vn>, Error> =>
  useInfiniteQuery({ ...getBaseVnsQueryOptions(data), ...options });
