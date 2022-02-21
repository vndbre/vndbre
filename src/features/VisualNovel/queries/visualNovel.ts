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

/**
 * Hook for fetching related visual novels by array of vn ids.
 * @param id Visual novel id.
 * @param ids Array of vns.
 * @param options Query options.
 */
export const useRelatedVisualNovelsQuery = (
  id: VisualNovel['id'],
  ids: VisualNovel['id'][],
  options?: QueryObserverOptions<VisualNovel[], Error>,
): UseQueryResult<VisualNovel[], Error> =>
  useQuery(['relatedVns', id],
    () => VisualNovelService.fetchVisualNovelByIds(ids),
    { staleTime: defaultStaleTime, ...defaultFetchStrategy, ...options });
