import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { defaultFetchStrategy, defaultStaleTime } from '.';
import { fetchTags } from '../../../api/services/tagService';
import { Tag } from '../../../models/tag';
import { VisualNovelTag } from '../../../models/visualNovel';

/**
 * Hook for fetching visual novel tags.
 * @param id Vn id for query key.
 * @param ids Tag ids.
 * @param options Query options.
 */
export const useTagsQuery = (
  id: string,
  tags: VisualNovelTag[],
  options?: QueryObserverOptions<Tag[], Error>,
): UseQueryResult<Tag[], Error> =>
  useQuery(['tags', id], () => fetchTags(tags), { staleTime: defaultStaleTime, ...defaultFetchStrategy, ...options });
