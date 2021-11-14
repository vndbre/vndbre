import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { fetchTags } from '../../../api/services/tagService';
import { Tag } from '../../../models/tag';

/**
 * Hook for fetching visual novel tags.
 * @param id Visual novel id for creating key.
 * @param ids Tag ids.
 * @param options Query options.
 */
export const useTags = (id: string, ids: number[], options: QueryObserverOptions<Tag[], Error> = {}): UseQueryResult<Tag[], Error> =>
  useQuery(['tags', id], () => fetchTags(ids), options);
