import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { defaultFetchStrategy, defaultStaleTime } from './config';
import { fetchFullReleases } from '../../../api/services/releaseService';
import { Release } from '../../../models/release';

/**
 * Custom hook for fetching releases query.
 * @param id Id of visual novel.
 * @param options Query options.
 */
export const useReleasesQuery = (id: string, options?: UseQueryOptions<Release[], Error>): UseQueryResult<Release[], Error> =>
  useQuery(['releases', id], () => fetchFullReleases(id), { staleTime: defaultStaleTime, ...defaultFetchStrategy, ...options });
