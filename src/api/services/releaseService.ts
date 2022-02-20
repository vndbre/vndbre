import { http } from '../index';
import { PaginationDto } from '../dtos/paginationDto';
import { ReleaseDto } from '../dtos/releaseDto';
import { releaseFromDto } from '../mappers/releaseMapper';
import { Release, ReleaseAnimation } from '../../models/release';
import { ApiUrls } from '../../utils/types/apiUrls';
import { ReleaseAnimationType } from '../../enums/releaseAnimationType';
import { ReleaseVoiceStatus } from '../../enums/releaseVoiceStatus';
import { ReleaseType } from '../../enums/releaseType';

interface ReleaseIcon {

  /**
   * Label of release icon.
   */
  label: string;

  /**
   * Name of release icon.
   */
  icon: string;
}

export namespace ReleaseService {

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
    const fetch = async(page: number): Promise<PaginationDto<ReleaseDto>> => {
      const { data } = await http.post<PaginationDto<ReleaseDto>>(
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

    return releasesChunks.flatMap(releasesChunk => releasesChunk.map(dto => releaseFromDto(dto)));
  };

  /**
   * Gets free/non-free icon for release.
   * @param isFreeware Whether release if free or not.
   */
  export const getIsFreewareIcon = (isFreeware: boolean): ReleaseIcon => {
    if (isFreeware) {
      return {
        label: 'Freeware',
        icon: 'eva:gift-fill',
      };
    }

    return {
      label: 'Non-free',
      icon: 'bx:bx-dollar',
    };
  };

  /**
   * Gets icon for release status.
   * @param releaseType Release type.
   */
  export const getReleaseStatusIcon = (releaseType: ReleaseType): ReleaseIcon => {
    const label = ReleaseType.toReadable(releaseType);
    const icon = {
      [ReleaseType.Trial]: 'carbon:circle-dash',
      [ReleaseType.Partial]: 'carbon:incomplete',
      [ReleaseType.Complete]: 'carbon:circle-solid',
    }[releaseType];

    return { label, icon };
  };

  /**
   * Gets icons for release story and ero animations.
   * @param animations Release animation info.
   */
  export const getAnimationIcons = (animations: ReleaseAnimation): ReleaseIcon[] => {
    const animationIcons = [];

    if (animations.storyAnimation) {
      const animation = animations.storyAnimation;
      const label = `Story: ${ReleaseAnimationType.toReadable(animation).toLowerCase()}`;
      const icon = animation > ReleaseAnimationType.NoAnimation ? 'carbon:media-library-filled' : 'carbon:media-library';
      animationIcons.push({ label, icon });
    }

    if (animations.eroAnimation) {
      const animation = animations.eroAnimation;
      const label = `Ero: ${ReleaseAnimationType.toReadable(animation).toLowerCase()}`;
      const icon = {
        [ReleaseAnimationType.NoAnimation]: 'carbon:favorite',
        [ReleaseAnimationType.SimpleAnimation]: 'carbon:favorite-half',
        [ReleaseAnimationType.SomeFullyAnimated]: 'carbon:favorite-half',
        [ReleaseAnimationType.FullyAnimated]: 'carbon:favorite-filled',
      }[animation];
      animationIcons.push({ label, icon });
    }

    return animationIcons;
  };

  /**
   * Gets voice icon for release.
   * @param releaseVoiced How release is voiced.
   */
  export const getVoiceIcon = (releaseVoiced: ReleaseVoiceStatus | null): ReleaseIcon | null => {
    switch (releaseVoiced) {
      case ReleaseVoiceStatus.NotVoiced:
        return {
          label: ReleaseVoiceStatus.toReadable(releaseVoiced),
          icon: 'carbon:microphone-off',
        };
      case ReleaseVoiceStatus.EroVoiced:
        return {
          label: ReleaseVoiceStatus.toReadable(releaseVoiced),
          icon: 'carbon:microphone-off-filled',
        };
      case ReleaseVoiceStatus.PartiallyVoiced:
        return {
          label: ReleaseVoiceStatus.toReadable(releaseVoiced),
          icon: 'carbon:microphone',
        };
      case ReleaseVoiceStatus.FullyVoiced:
        return {
          label: ReleaseVoiceStatus.toReadable(releaseVoiced),
          icon: 'carbon:microphone-filled',
        };
      default: {
        return null;
      }
    }
  };

  /**
   * Gets icon for release resolution.
   * @param resolution Resolution.
   */
  export const getResolutionIcon = (resolution: string | null): ReleaseIcon | null => {
    if (resolution) {
      return {
        label: resolution,
        icon: 'bi:aspect-ratio-fill',
      };
    }

    return null;
  };

  /**
   * Gets all icons for release.
   * @param release Release.
   */
  export const getReleaseIcons = (release: Release): ReleaseIcon[] => [
    getResolutionIcon(release.resolution),
    getIsFreewareIcon(release.isFreeware),
    getVoiceIcon(release.voiced),
    ...getAnimationIcons(release.animation),
  ].filter(releaseIcon => releaseIcon !== null) as ReleaseIcon[];
}
