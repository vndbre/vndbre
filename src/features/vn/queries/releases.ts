import type { UseBaseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

/**
 * Wait.
 * @param delay Delay.
 */
const wait = (delay: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });

/** Get posts. */
export const getPosts = async(): Promise<unknown> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  // TODO: Remove when actual api is implemented.
  // Showcasing that only first load takes time and then cached.
  await wait(1000);
  return response.json();
};

/** Releases query options. */
export const releasesQueryOptions: UseBaseQueryOptions<unknown, Error> = { queryKey: ['getPosts'], queryFn: getPosts };

/** Hook for fetching releases. */
export const useReleasesQuery = (): UseQueryResult<unknown, Error> =>
  useQuery(releasesQueryOptions);
