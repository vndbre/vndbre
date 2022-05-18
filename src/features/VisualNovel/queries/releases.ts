import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { VisualNovel } from '../../../models/visualNovels/visualNovel';
import { Release } from '../../../models/releases/release';
import { ReleasesService } from '../../../api/services/releasesService';

/**
 * Custom hook for fetching releases.
 * @param id Id of visual novel.
 * @param options Query options.
 */
export const useReleasesQuery = (
  id: VisualNovel['id'],
  options?: UseQueryOptions<Release[], Error>,
): UseQueryResult<Release[], Error> =>
  useQuery(['releases', id], () => ReleasesService.fetchFullReleases(id), {
    ...options,
  });
