import type { UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { SearchCharacter } from 'src/api/models/character/searchCharacter';
import type { Pagination } from 'src/api/models/pagination';
import type { CharacterQueryOptions } from 'src/api/models/queryOptions/character/characterQueryOptions';
import { CharacterService } from 'src/api/services/characterService';

export const DEFAULT_PAGE_SIZE = 18;

/**
 * Gets base options.
 * @param options Vn query options.
 */
export const getBaseCharactersQueryOptions = (
  options: CharacterQueryOptions,
): UseInfiniteQueryOptions<Pagination<SearchCharacter>, Error> => ({
  queryKey: ['characters', options],

  /** Query fn. */
  queryFn: ({ pageParam = 1 }) => CharacterService.getSearchCharacters({
    ...options,
    results: DEFAULT_PAGE_SIZE,
    page: pageParam,
  }),

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
export const useCharactersQuery = (
  data: CharacterQueryOptions,
  options?: UseInfiniteQueryOptions<Pagination<SearchCharacter>, Error>,
): UseInfiniteQueryResult<Pagination<SearchCharacter>, Error> =>
  useInfiniteQuery({ ...getBaseCharactersQueryOptions(data), ...options });
