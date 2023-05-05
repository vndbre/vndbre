import type { UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Pagination } from 'src/api/models/pagination';
import type { TraitQueryOptions } from 'src/api/models/queryOptions/trait/traitQueryOptions';
import type { Trait } from 'src/api/models/trait';
import { TraitService } from 'src/api/services/traitService';

/** Gets base options. */
export const getBaseTraitsQueryOptions = ({ search = '' }: TraitQueryOptions): UseInfiniteQueryOptions<Pagination<Trait>, Error> => ({
  queryKey: ['traits', search],

  /** Query fn. */
  queryFn: ({ pageParam = 1 }) => TraitService.getTraits({ results: 20, page: pageParam, search }),
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
 * Hook for fetching tags.
 * @param search Search term.
 */
export const useTraitsQuery = (search: string): UseInfiniteQueryResult<Pagination<Trait>, Error> =>
  useInfiniteQuery({ ...getBaseTraitsQueryOptions({ search }) });
