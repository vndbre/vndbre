import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { defaultStaleTime } from '.';
import { fetchFullVisualNovel } from '../../../api/services/visualNovelService';
import { VisualNovel } from '../../../models/visualNovel';

/**
 * Hook for fetching visual novel by id.
 * @param id Visual novel id.
 * @param options Query options.
 */
export const useVisualNovelQuery = (id: string, options?: QueryObserverOptions<VisualNovel, Error>): UseQueryResult<VisualNovel, Error> =>
  useQuery(['vn', id], () => fetchFullVisualNovel(id), { staleTime: defaultStaleTime, ...options });
