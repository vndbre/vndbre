import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { defaultStaleTime } from './index';
import { fetchFullReleases } from '../../../api/services/releaseService';
import { Release } from '../../../models/release';

/**
 * Custom hook for fetching releases query.
 * @param id Id of visual novel.
 * @param options Query options.
 */
export const useReleasesQuery = (id: string, options?: UseQueryOptions<Release[], Error>): UseQueryResult<Release[]> =>
  useQuery(['releases', id], () => fetchFullReleases(id), { staleTime: defaultStaleTime, ...options });
