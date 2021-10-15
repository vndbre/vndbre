import { DataWrapper } from '../dtos/dataWrapper';
import { VisualNovelDto } from '../dtos/ visualNovelDto';
import { http } from '../index';
import { visualNovelFromDto } from '../mappers/visualNovelMapper';
import { VisualNovel } from '../../models/visualNovel';

/**
 * Fetches full visual novel.
 */
export const fetchFullVisualNovel = async(): Promise<VisualNovel> => {
  const { data } = await http.post<DataWrapper<VisualNovelDto>>(
    '',
    'get vn basic,anime,details,relations,tags,stats,screens,staff (id = 92)',
  );

  return data.data.items.map(dto => visualNovelFromDto(dto))[0];
};
