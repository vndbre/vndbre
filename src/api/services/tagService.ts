import { http } from '..';
import { Tag } from '../../models/tag';
import { ApiUrls } from '../../utils/types/apiUrls';
import { TagDto } from '../dtos/tagDto';
import { tagFromDto } from '../mappers/tagMapper';

/**
 * Fetches tags by given array of ids.
 * @param ids List of ids.
 */
export const fetchTags = async(ids: number[]): Promise<Tag[]> => {
  const { data } = await http.post<TagDto[]>(
    ApiUrls.Tags,
    ids,
  );

  return data.map(dto => tagFromDto(dto));
};
