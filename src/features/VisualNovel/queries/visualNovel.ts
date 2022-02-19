import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { defaultFetchStrategy, defaultStaleTime } from './config';
import { VisualNovelService } from '../../../api/services/visualNovelService';
import { VisualNovel } from '../../../models/visualNovel';

/**
 * Hook for fetching visual novel by id.
 * @param id Visual novel id.
 * @param options Query options.
 */
export const useVisualNovelQuery = (
  id: VisualNovel['id'], options?: QueryObserverOptions<VisualNovel, Error>,
): UseQueryResult<VisualNovel, Error> =>
  useQuery(['vn', id],
    () => VisualNovelService.fetchFullVisualNovel(id),
    { staleTime: defaultStaleTime, ...defaultFetchStrategy, ...options });
