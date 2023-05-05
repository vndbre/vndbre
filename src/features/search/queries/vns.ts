import type { UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Pagination } from 'src/api/models/pagination';
import type { VnQueryOptions } from 'src/api/models/queryOptions/vn/vnQueryOptions';
import type { SearchVn } from 'src/api/models/vn/searchVn';
import { VnService } from 'src/api/services/vnService';

export const DEFAULT_PAGE_SIZE = 18;

/**
 * Gets base options.
 * @param options Vn query options.
 */
export const getBaseVnsQueryOptions = (
  options: VnQueryOptions,
): UseInfiniteQueryOptions<Pagination<SearchVn>, Error> => ({
  queryKey: ['vns', options],

  /** Query fn. */
  queryFn: ({ pageParam = 1 }) => VnService.getSearchVns({
    ...options,
    results: DEFAULT_PAGE_SIZE,
    page: pageParam,
  }),
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,

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
  data: VnQueryOptions, options?: UseInfiniteQueryOptions<Pagination<SearchVn>, Error>,
): UseInfiniteQueryResult<Pagination<SearchVn>, Error> =>
  useInfiniteQuery({ ...getBaseVnsQueryOptions(data), ...options });
