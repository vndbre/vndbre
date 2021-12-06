import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { defaultFetchStrategy, defaultStaleTime } from '.';
import { fetchTags } from '../../../api/services/tagService';
import { ExtendedTag } from '../../../models/extendedTag';
import { Tag } from '../../../models/tag';
import { VisualNovelTag } from '../../../models/visualNovel';

/**
 * Maps extended tags from tags and visual novel tags.
 * @param tags Tags array.
 * @param vnTags Tags array from within visual novel.
 */
const extendTags = async(tags: Promise<Tag[]>, vnTags: VisualNovelTag[]): Promise<ExtendedTag[]> => {
  const vnTagsObj = vnTags.reduce<Record<string, VisualNovelTag>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {});

  return (await tags).map(tag => ({
    ...tag,
    ...vnTagsObj[tag.id],
  }));
};

/**
 * Hook for fetching visual novel tags.
 * @param id Vn id for query key.
 * @param vnTtags Tags array from within visual novel.
 * @param options Query options.
 */
export const useTagsQuery = (
  id: string,
  vnTags: VisualNovelTag[],
  options?: QueryObserverOptions<ExtendedTag[], Error>,
): UseQueryResult<ExtendedTag[], Error> => useQuery(
  ['tags', id],
  () => extendTags(fetchTags(vnTags.map(t => t.id)), vnTags),
  { staleTime: defaultStaleTime, ...defaultFetchStrategy, ...options },
);
