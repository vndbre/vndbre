import { http } from '..';
import { Tag } from '../../models/tag';
import { VisualNovelTag } from '../../models/visualNovel';
import { ApiUrls } from '../../utils/types/apiUrls';
import { TagDto } from '../dtos/tagDto';
import { tagFromDto } from '../mappers/tagMapper';

/**
 * Fetches tags by given array of ids.
 * @param ids List of ids.
 */
export const fetchTags = async(tags: VisualNovelTag[]): Promise<Tag[]> => {
  const { data } = await http.post<TagDto[]>(
    ApiUrls.Tags,
    tags.map(tag => tag.id),
  );

  const tagsObj = tags.reduce<Record<string, VisualNovelTag>>((acc, cur) => ({ ...acc, [cur.id]: cur }), {});

  return data.map(dto => tagFromDto(dto, tagsObj[dto.id]));
};
