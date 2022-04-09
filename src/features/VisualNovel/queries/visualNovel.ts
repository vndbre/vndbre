import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { defaultFetchStrategy, defaultStaleTime } from './config';
import { VisualNovel } from '../../../models/visualNovels/visualNovel';
import { VisualNovelPaginationOptions, VisualNovelsService } from '../../../api/services/visualNovelsService';
import { Pagination } from '../../../models/pagination';

/**
 * Hook for fetching visual novel by id.
 * @param id Visual novel id.
 * @param options Query options.
 */
export const useVisualNovelQuery = (
  id: VisualNovel['id'], options?: QueryObserverOptions<VisualNovel, Error>,
): UseQueryResult<VisualNovel, Error> =>
  useQuery(['vn', id],
    () => VisualNovelsService.fetchFullVisualNovel(id),
    { staleTime: defaultStaleTime, ...defaultFetchStrategy, ...options });

/**
 * Hook for fetching page of visual novels.
 * @param paginationOptions Pagination options.
 * TODO (Panov A.): Research how to handles query key with a lot of fetch options.
 */
export const useVisualNovelsPageQuery = (paginationOptions: VisualNovelPaginationOptions): UseQueryResult<Pagination<VisualNovel>> =>
  useQuery(
    ['vnPage', paginationOptions.page],
    () => VisualNovelsService.fetchPaginatedVisualNovels(paginationOptions),
    { staleTime: defaultStaleTime, ...defaultFetchStrategy },
  );

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
    () => VisualNovelsService.fetchVisualNovelByIds(ids),
    { staleTime: defaultStaleTime, ...defaultFetchStrategy, ...options });
