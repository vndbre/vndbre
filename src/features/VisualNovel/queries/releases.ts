import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { VisualNovel } from '../../../models/visualNovel';
import { defaultFetchStrategy, defaultStaleTime } from './config';
import { Release } from '../../../models/release';
import { ReleaseService } from '../../../api/services/releaseService';

/**
 * Custom hook for fetching releases query.
 * @param id Id of visual novel.
 * @param options Query options.
 */
export const useReleasesQuery = (
  id: VisualNovel['id'],
  options?: UseQueryOptions<Release[], Error>,
): UseQueryResult<Release[], Error> =>
  useQuery(['releases', id], () => ReleaseService.fetchFullReleases(id), {
    staleTime: defaultStaleTime,
    ...defaultFetchStrategy,
    ...options,
  });
