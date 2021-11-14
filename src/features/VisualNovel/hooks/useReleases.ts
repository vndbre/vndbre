import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { fetchFullReleases } from '../../../api/services/releaseService';
import { Release } from '../../../models/release';

/**
 * Hook for fetching releases novel by id.
 * @param id Visual novel id.
 * @param options Query options.
 */
export const useReleases = (id: string, options: QueryObserverOptions<Release[], Error> = {}): UseQueryResult<Release[], Error> =>
  useQuery(['releases', id], () => fetchFullReleases(id), options);
