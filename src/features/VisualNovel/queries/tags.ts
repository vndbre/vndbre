import { QueryObserverOptions, useQuery, UseQueryResult } from 'react-query';
import { ExtendedTag } from '../../../models/extendedTag';
import { Tag } from '../../../models/tag';
import { TagsService } from '../../../api/services/tagsService';
import { VisualNovelTag } from '../../../models/visualNovels/visualNovelTag';

/**
 * Hook for fetching visual novel tags.
 * @param id Vn id for query key.
 * @param ids Tag ids.
 * @param options Query options.
 */
export const useTagsQuery = (id: string, ids: number[], options?: QueryObserverOptions<Tag[], Error>): UseQueryResult<Tag[], Error> =>
  useQuery(['tags', id], () => TagsService.fetchTagsByIds(ids), { ...options });

/**
 * Maps extended tags from tags and visual novel tags.
 * @param tags Tags array.
 * @param vnTags Tags array from within visual novel.
 */
const extendTags = async(tags: Promise<Tag[]>, vnTags: readonly VisualNovelTag[]): Promise<ExtendedTag[]> => {
  const vnTagsObj = vnTags.reduce<Record<string, VisualNovelTag>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {});

  return (await tags).map(tag => ({
    ...tag,
    ...vnTagsObj[tag.id],
  }));
};

/**
 * Hook for fetching visual novel tags.
 * @param id Vn id for query key.
 * @param vnTags Tags array from within visual novel.
 * @param options Query options.
 */
export const useExtendedTagsQuery = (
  id: string,
  vnTags: readonly VisualNovelTag[],
  options?: QueryObserverOptions<ExtendedTag[], Error>,
): UseQueryResult<ExtendedTag[], Error> => useQuery(
  ['tags', id],
  () => extendTags(TagsService.fetchTagsByIds(vnTags.map(t => t.id)), vnTags),
  { ...options },
);
