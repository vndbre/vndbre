import { ApiProxyEndpoints, http } from '..';
import { Tag } from '../../models/tag';
import { TagDto } from '../dtos/tagDto';
import { tagFromDto } from '../mappers/tagMapper';

/**
 * Tags service.
 */
export namespace TagsService {

  /**
   * Fetches tags by given array of ids.
   * @param ids List of ids.
   */
  export async function fetchTags(ids: readonly Tag['id'][]): Promise<Tag[]> {
    const { data } = await http.post<TagDto[]>(
      ApiProxyEndpoints.Tags,
      ids,
    );

    return data.map(tagFromDto);
  }
}
