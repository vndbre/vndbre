import { ReleaseDto, ReleaseTypeDto, ReleaseVoiceStatusDto } from '../dtos/releaseDto';
import { Release } from '../../models/releases/release';
import { Language } from '../../models/language';
import { Platform } from '../../models/platform';
import { ReleaseType } from '../../models/releases/releaseType';
import { ReleaseVoiceStatus } from '../../models/releases/releaseVoiceStatus';

const TYPE_FROM_DTO_MAP: Readonly<Record<ReleaseTypeDto, ReleaseType>> = {
  [ReleaseTypeDto.Complete]: ReleaseType.Complete,
  [ReleaseTypeDto.Partial]: ReleaseType.Partial,
  [ReleaseTypeDto.Trial]: ReleaseType.Trial,
};

const VOICED_TYPE_FROM_DTO_MAP: Readonly<Record<ReleaseVoiceStatusDto, ReleaseVoiceStatus>> = {
  [ReleaseVoiceStatusDto.EroVoiced]: ReleaseVoiceStatus.EroVoiced,
  [ReleaseVoiceStatusDto.FullyVoiced]: ReleaseVoiceStatus.FullyVoiced,
  [ReleaseVoiceStatusDto.NotVoiced]: ReleaseVoiceStatus.NotVoiced,
  [ReleaseVoiceStatusDto.PartiallyVoiced]: ReleaseVoiceStatus.PartiallyVoiced,
};

/**
 * Maps release media from dto.
 * @param dto Dto.
 */
function mapReleaseMediaFromDto(dto: ReleaseDto['media']): Release['media'] {
  return dto.map(mediaDto => ({
    medium: mediaDto.medium,
    quantity: mediaDto.qty,
  }));
}

/**
 * Maps release animation from dto.
 * @param dto Dto.
 */
function mapReleaseAnimationFromArray(dto: ReleaseDto['animation']): Release['animation'] {
  return {
    storyAnimation: dto[0],
    eroAnimation: dto[1],
  };
}

/**
 * Maps release producer from dto.
 * @param dto Dto.
 */
function mapReleaseProducerFromDto(dto: ReleaseDto['producers']): Release['producers'] {
  return dto.map(producerDto => ({
    id: producerDto.id,
    isDeveloper: producerDto.developer,
    name: producerDto.name,
    originalName: producerDto.original,
    isPublisher: producerDto.publisher,
    type: producerDto.type,
  }));
}

/**
 * Maps minimum age to age rating.
 * @param minAge Minimum age.
 */
function mapMinAgeToRating(minAge: number | null): string {
  if (minAge === null) {
    return '';
  }

  if (minAge === 0) {
    return 'All ages';
  }

  return `${minAge}+`;
}

/** Release mapper. */
export namespace ReleaseMapper {

  /**
   * Maps release from dto.
   * @param dto Dto.
   */
  export function fromDto(dto: ReleaseDto): Release {
    return {
      id: dto.id,
      title: dto.title,
      originalName: dto.original,
      releasedDate: dto.released && dto.released !== 'tba' ? dto.released : 'TBA',
      type: TYPE_FROM_DTO_MAP[dto.type],
      isPatch: dto.patch,
      isFreeware: dto.freeware,
      isDoujin: dto.doujin,
      languages: dto.languages.map(language => Language.toLanguage(language)),
      website: dto.website,
      notes: dto.notes,
      ageRating: mapMinAgeToRating(dto.minage),
      gtin: dto.gtin,
      catalog: dto.catalog,
      platforms: dto.platforms.map(platform => Platform.toPlatform(platform)),
      media: mapReleaseMediaFromDto(dto.media),
      resolution: dto.resolution,
      voiced: dto.voiced != null ? VOICED_TYPE_FROM_DTO_MAP[dto.voiced] : null,
      animation: mapReleaseAnimationFromArray(dto.animation),
      producers: mapReleaseProducerFromDto(dto.producers),
    };
  }
}
