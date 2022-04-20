import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { Release } from '../../../models/releases/release';
import { ReleasesService } from '../../../api/services/releasesService';
import { Producer } from '../../../models/producer';

/**
 * Custom hook for fetching releases query.
 * @param id Id of producer.
 * @param options Query options.
 */
export const useReleasesQuery = (
  id: Producer['id'],
  options?: UseQueryOptions<Release[], Error>,
): UseQueryResult<Release[], Error> =>
  useQuery(['releases', id], () => ReleasesService.fetchProducerReleases(id), {
    ...options,
  });
