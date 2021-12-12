import { DataWrapper } from '../dtos/dataWrapper';
import { VisualNovelDto } from '../dtos/visualNovelDto';
import { http } from '../index';
import { visualNovelFromDto } from '../mappers/visualNovelMapper';
import { VisualNovel } from '../../models/visualNovel';
import { ApiUrls } from '../../utils/types/apiUrls';

/**
 * Fetches full visual novel.
 */
export const fetchFullVisualNovel = async(id: string): Promise<VisualNovel> => {
  const { data } = await http.post<DataWrapper<VisualNovelDto>>(
    ApiUrls.Vndb,
    `get vn basic,anime,details,relations,tags,stats,screens,staff (id = ${id})`,
  );

  return data.data.items.map(dto => visualNovelFromDto(dto))[0];
};