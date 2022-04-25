/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-jsdoc */
import { ApiProxyEndpoints, http } from '../index';
import { PaginationDto } from '../dtos/paginationDto';
import { Release } from '../../models/releases/release';
import { ReleaseAnimationType } from '../../models/releases/releaseAnimationType';
import { ReleaseVoiceStatus } from '../../models/releases/releaseVoiceStatus';
import { ReleaseType } from '../../models/releases/releaseType';
import { PaginationService } from './paginationService';
import { VisualNovel } from '../../models/visualNovels/visualNovel';
import { ReleaseAnimation } from '../../models/releases/releaseAnimation';
import { Assumer, ReleaseFlag, VNDBService } from './vndbService';

interface ReleaseIcon {

  /**
   * Label of release icon.
   */
  readonly label: string;

  /**
   * Name of release icon.
   */
  readonly icon: string;
}

/**
 * Releases service.
 */
export namespace ReleasesService {

  /**
   * Fetches full releases.
   * @param vnId Visual novel id.
   */
  export const fetchFullReleases = async<TDto, T>(
    vnId: VisualNovel['id'], assumer: Assumer<TDto, ReleaseFlag>, mapper: (dto: TDto) => T): Promise<T[]> => {
    const fetchReleasesPaginatedByVnId =
      async(id: VisualNovel['id'], page: number) => {
        const { data } = await http.post<PaginationDto<unknown>>(
          ApiProxyEndpoints.VNDB,
          VNDBService.createVNDBGetQuery({
            type: 'release',
            flags: assumer.flags,
            filters: [{ field: 'id', operator: '=', value: id }],
            pagination: { page, pageSize: 25 },
          }),
        );
        return PaginationDto.assume(data, assumer.assume);
      };
    return (await PaginationService.fetchAllDataById(vnId, fetchReleasesPaginatedByVnId)).map(mapper);
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
