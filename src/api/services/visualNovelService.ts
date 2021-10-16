import { DataWrapper } from '../dtos/dataWrapper';
import { VisualNovelDto } from '../dtos/ visualNovelDto';
import { http } from '../index';
import { visualNovelFromDto } from '../mappers/visualNovelMapper';
import { VisualNovel } from '../../models/visualNovel';

/**
 * Fetches full visual novel.
 */
export const fetchFullVisualNovel = async(id: string): Promise<VisualNovel> => {
  const { data } = await http.post<DataWrapper<VisualNovelDto>>(
    '',
    `get vn basic,anime,details,relations,tags,stats,screens,staff (id = ${id})`,
  );

  const data1 = await http.post(
    '',
    `get release basic,details,producers (vn = ${id})`,
  );
  console.log(data1);

  return data.data.items.map(dto => visualNovelFromDto(dto))[0];
};
