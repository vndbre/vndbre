import type { UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Pagination } from 'src/api/models/pagination';
import type { TagQueryOptions } from 'src/api/models/search/tagQueryOptions';
import type { Tag } from 'src/api/models/tag';
import { TagService } from 'src/api/services/tagService';

/** Gets base options. */
export const getBaseTagsQueryOptions = ({ search = '' }: TagQueryOptions): UseInfiniteQueryOptions<Pagination<Tag>, Error> => ({
  queryKey: ['tags', search],

  /** Query fn. */
  queryFn: ({ pageParam = 1 }) => TagService.getTags({ results: 20, page: pageParam, search }),

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
export const useTagsQuery = (search: string): UseInfiniteQueryResult<Pagination<Tag>, Error> =>
  useInfiniteQuery({ ...getBaseTagsQueryOptions({ search }) });
