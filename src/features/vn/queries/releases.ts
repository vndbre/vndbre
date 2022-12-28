import type { UseBaseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

const wait = async(delay: number) => new Promise(resolve => setTimeout(resolve, delay));

/** Get posts. */
export const getPosts = async(): Promise<unknown> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  await wait(1000);
  return response.json();
};

/** Releases query options. */
export const releasesQueryOptions: UseBaseQueryOptions<unknown, Error> = { queryKey: ['getPosts'], queryFn: getPosts };

/** Hook for fetching releases. */
export const useReleasesQuery = (): UseQueryResult<unknown, Error> =>
  useQuery(releasesQueryOptions);
