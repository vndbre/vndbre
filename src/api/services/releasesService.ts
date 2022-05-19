import { http } from '../index';
import { PaginationDto } from '../dtos/paginationDto';
import { ReleaseDto } from '../dtos/releaseDto';
import { Release } from '../../models/releases/release';
import { ReleaseAnimationType } from '../../models/releases/releaseAnimationType';
import { ReleaseVoiceStatus } from '../../models/releases/releaseVoiceStatus';
import { ReleaseType } from '../../models/releases/releaseType';
import { PaginationService } from './paginationService';
import { VisualNovel } from '../../models/visualNovels/visualNovel';
import { ReleaseAnimation } from '../../models/releases/releaseAnimation';
import { ReleaseMapper } from '../mappers/releaseMapper';
import { Producer } from '../../models/producer';
import { ApiProxyEndpoints } from '../apiProxyEndpoints';

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
   * Fetches paginated releases by vn id with given query page.
   * @param vnId Visual novel id.
   * @param page Query page.
   */
  export async function fetchReleasesPaginatedByVnId(vnId: VisualNovel['id'], page: number): Promise<PaginationDto<ReleaseDto>> {
    const { data } = await http.post<PaginationDto<ReleaseDto>>(
      ApiProxyEndpoints.VNDB,
      `get release basic,details,producers (vn = ${vnId}) {"results": 25, "page": ${page}, "sort": "released"}`,
    );
    return data;
  }

  /**
   * Fetches paginated releases by producer id with given query page.
   * @param producerId Producer id.
   * @param page Query page.
   */
  export async function fetchReleasesPaginatedByProducerId(producerId: Producer['id'], page: number): Promise<PaginationDto<ReleaseDto>> {
    const { data } = await http.post<PaginationDto<ReleaseDto>>(
      ApiProxyEndpoints.VNDB,
      `get release basic,details,producers (producer = ${producerId}) {"results": 25, "page": ${page}, "sort": "released"}`,
    );
    return data;
  }

  /**
   * Fetches producer's releases.
   * @param producerId Producer id.
   */
  export async function fetchProducerReleases(producerId: Producer['id']): Promise<Release[]> {
    return (
      await PaginationService.fetchAllDataById(producerId, fetchReleasesPaginatedByProducerId)
    ).map(dto => ReleaseMapper.fromDto(dto));
  }

  /**
   * Fetches full releases.
   * @param vnId Visual novel id.
   */
  export async function fetchFullReleases(vnId: VisualNovel['id']): Promise<Release[]> {
    return (await PaginationService.fetchAllDataById(vnId, fetchReleasesPaginatedByVnId)).map(dto => ReleaseMapper.fromDto(dto));
  }

  /**
   * Gets free/non-free icon for release.
   * @param isFreeware Whether release if free or not.
   */
  export function getIsFreewareIcon(isFreeware: boolean): ReleaseIcon {
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
  }

  /**
   * Gets icon for release status.
   * @param releaseType Release type.
   */
  export function getReleaseStatusIcon(releaseType: ReleaseType): ReleaseIcon {
    const label = ReleaseType.toReadable(releaseType);
    const icon = {
      [ReleaseType.Trial]: 'carbon:circle-dash',
      [ReleaseType.Partial]: 'carbon:incomplete',
      [ReleaseType.Complete]: 'carbon:circle-solid',
    }[releaseType];

    return { label, icon };
  }

  /**
   * Gets icons for release story and ero animations.
   * @param animations Release animation info.
   */
  export function getAnimationIcons(animations: ReleaseAnimation): ReleaseIcon[] {
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
  }

  /**
   * Gets voice icon for release.
   * @param releaseVoiced How release is voiced.
   */
  export function getVoiceIcon(releaseVoiced: ReleaseVoiceStatus | null): ReleaseIcon | null {
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
  }

  /**
   * Gets icon for release resolution.
   * @param resolution Resolution.
   */
  export function getResolutionIcon(resolution: string | null): ReleaseIcon | null {
    if (resolution) {
      return {
        label: resolution,
        icon: 'bi:aspect-ratio-fill',
      };
    }

    return null;
  }

  /**
   * Gets all icons for release.
   * @param release Release.
   */
  export function getReleaseIcons(release: Release): ReleaseIcon[] {
    return [
      getResolutionIcon(release.resolution),
      getIsFreewareIcon(release.isFreeware),
      getVoiceIcon(release.voiced),
      ...getAnimationIcons(release.animation),
    ].filter(releaseIcon => releaseIcon !== null) as ReleaseIcon[];
  }
}
