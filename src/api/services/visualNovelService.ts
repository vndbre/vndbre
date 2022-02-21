import { DataWrapper } from '../dtos/dataWrapper';
import { VisualNovelDto } from '../dtos/visualNovelDto';
import { http } from '../index';
import { visualNovelFromDto } from '../mappers/visualNovelMapper';
import { VisualNovel } from '../../models/visualNovel';
import { ApiUrls } from '../../utils/types/apiUrls';

export namespace VisualNovelService {

  /**
   * Fetches visual novels by vnIds.
   * @param ids Array of vn ids.
   */
  export const fetchVisualNovelByIds = async(ids: VisualNovel['id'][]): Promise<VisualNovel[]> => {
    const { data } = await http.post<DataWrapper<VisualNovelDto>>(
      ApiUrls.Vndb,
      `get vn basic,anime,details,relations,tags,stats,screens,staff (id = [${ids}]) {"results": 25}`,
    );

    return data.data.items.map(dto => visualNovelFromDto(dto));
  };

  /**
   * Fetches full visual novel.
   * @param id Visual novel id.
   */
  export const fetchFullVisualNovel = async(id: VisualNovel['id']): Promise<VisualNovel> => {
    const { data } = await http.post<DataWrapper<VisualNovelDto>>(
      ApiUrls.Vndb,
      `get vn basic,anime,details,relations,tags,stats,screens,staff (id = ${id})`,
    );

    return data.data.items.map(dto => visualNovelFromDto(dto))[0];
  };

}
