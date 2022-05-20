import { http } from '..';
import { Tag } from '../../models/tag';
import { ApiProxyEndpoints } from '../apiProxyEndpoints';
import { TagDto } from '../dtos/tagDto';
import { TagMapper } from '../mappers/tagMapper';

const DEFAULT_TAGS_MAX_AMOUNT_PER_FETCH = 10;

/** Search options for tags. */
export interface TagSearchOptions {

  /** Maximum amount of tags per fetch. */
  readonly amount?: number;

  /** Search query. */
  readonly search?: string;
}

/** Tags service. */
export namespace TagsService {

  /**
   * Fetches tags by given array of ids.
   * @param ids List of ids.
   */
  export async function fetchTagsByIds(ids: readonly Tag['id'][]): Promise<Tag[]> {
    const { data } = await http.post<TagDto[]>(
      ApiProxyEndpoints.Tags,
      ids,
    );

    return data.map(TagMapper.fromDto);
  }

  /**
   * Obtains list of tags.
   * @param options Options.
   */
  export async function fetchTags(options: TagSearchOptions): Promise<Tag[]> {
    let params: Record<string, unknown> = { count: options.amount ?? DEFAULT_TAGS_MAX_AMOUNT_PER_FETCH };

    if (options.search != null) {
      params = { ...params, name: options.search };
    }

    const { data } = await http.get<TagDto[]>(
      ApiProxyEndpoints.Tags,
      { params },
    );

    return data.map(TagMapper.fromDto);
  }
}
