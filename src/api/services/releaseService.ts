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
  let currentPage = 1;
  let hasToFetchMore = true;
  const releasesChunks = [];

  /**
   * Fetches releases by page.
   * @param page Page.
   */
  const fetch = async(page: number): Promise<DataWrapper<ReleaseDto>> => {
    const { data } = await http.post<DataWrapper<ReleaseDto>>(
      ApiUrls.Vndb,
      `get release basic,details,producers (vn = ${vnId}) {"results": 25, "page": ${page}, "sort": "released"}`,
    );

    return data;
  };

  while (hasToFetchMore) {
    // eslint-disable-next-line no-await-in-loop
    const releasesData = await fetch(currentPage);
    releasesChunks.push(releasesData.data.items);

    if (releasesData.data.more) {
      currentPage += 1;
    } else {
      hasToFetchMore = false;
    }
  }

  return releasesChunks.map(releasesChunk => releasesChunk.map(dto => releaseFromDto(dto))).flat();
};
