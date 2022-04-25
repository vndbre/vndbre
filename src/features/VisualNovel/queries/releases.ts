import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { VisualNovel } from '../../../models/visualNovels/visualNovel';
import { ReleasesService } from '../../../api/services/releasesService';
import { Assumer, ReleaseFlag } from '../../../api/services/vndbService';

/**
 * Custom hook for fetching releases query.
 * @param id Id of visual novel.
 * @param options Query options.
 */
export const useReleasesQuery = <TDto, T>(
  id: VisualNovel['id'], assumer: Assumer<TDto, ReleaseFlag>, mapper: (dto: TDto) => T,
  options?: UseQueryOptions<T[], Error>,
): UseQueryResult<T[], Error> =>
  useQuery(['releases', id], () => ReleasesService.fetchFullReleases(id, assumer, mapper), {
    ...options,
  });
