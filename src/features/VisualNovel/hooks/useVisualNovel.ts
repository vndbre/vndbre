import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { fetchFullVisualNovel } from '../../../api/services/visualNovelService';
import { VisualNovel } from '../../../models/visualNovel';

/**
 * Hook for fetching visual novel by id.
 * @param id Visual novel id.
 * @param options Query options.
 */
export const useVisualNovel = (id: string, options: QueryObserverOptions<VisualNovel, Error> = {}): UseQueryResult<VisualNovel, Error> =>
  useQuery(['vn', id], () => fetchFullVisualNovel(id), options);
