import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { defaultFetchStrategy, defaultStaleTime } from './config';
import { fetchFullVisualNovel, fetchVisualNovelByIds } from '../../../api/services/visualNovelService';
import { VisualNovel } from '../../../models/visualNovel';

/**
 * Hook for fetching visual novel by id.
 * @param id Visual novel id.
 * @param options Query options.
 */
export const useVisualNovelQuery = (id: string, options?: QueryObserverOptions<VisualNovel, Error>): UseQueryResult<VisualNovel, Error> =>
  useQuery(['vn', id], () => fetchFullVisualNovel(id), { staleTime: defaultStaleTime, ...defaultFetchStrategy, ...options });

/**
 * Hook for fetching related visual novels by array of vn ids.
 * @param id Visual novel id.
 * @param ids Array of vns.
 * @param options Query options.
 */
export const useRelatedVisualNovelsQuery = (
  id: string,
  ids: number[],
  options?: QueryObserverOptions<VisualNovel[], Error>,
): UseQueryResult<VisualNovel[], Error> =>
  useQuery(['relatedVns', id], () => fetchVisualNovelByIds(ids), { staleTime: defaultStaleTime, ...defaultFetchStrategy, ...options });
