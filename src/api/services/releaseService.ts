import { http } from '../index';
import { DataWrapper } from '../dtos/dataWrapper';
import { ReleaseDto } from '../dtos/releaseDto';
import { releaseFromDto } from '../mappers/releaseMapper';
import { Release } from '../../models/release';
import { ApiUrls } from '../../utils/types/apiUrls';

/**
 * Fetches full releases.
 * @param vnId Visual novel id.
 */
export const fetchFullReleases = async(vnId: string): Promise<Release[]> => {
  const { data } = await http.post<DataWrapper<ReleaseDto>>(
    ApiUrls.Vndb,
    `get release basic,details,producers (vn = ${vnId}) {"results": 25, "sort": "released"}`,
  );

  const releases = data.data.items.map(dto => releaseFromDto(dto));
  return releases;
};
