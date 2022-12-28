import type { UseBaseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

/** Get comments. */
export const getComments = async(): Promise<unknown> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  return response.json();
};

/** Overview query options. */
export const overviewQueryOptions: UseBaseQueryOptions<unknown, Error> = { queryKey: ['getComments'], queryFn: getComments };

/** Hook for fetching overview. */
export const useOverviewQuery = (): UseQueryResult<unknown, Error> =>
  useQuery(overviewQueryOptions);
