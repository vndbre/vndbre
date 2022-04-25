import { ReleaseBasicDto, ReleaseDetailsDto, ReleaseDto, ReleaseIdDto, ReleaseProducersDto, ReleaseTypeDto, ReleaseVoiceStatusDto } from '../dtos/releaseDto';
import { Release, ReleaseBasic, ReleaseDetails, ReleaseId, ReleaseProducers } from '../../models/releases/release';
import { Language } from '../../models/language';
import { Platform } from '../../models/platform';
import { ReleaseType } from '../../models/releases/releaseType';
import { ReleaseVoiceStatus } from '../../models/releases/releaseVoiceStatus';

/** Release mapper. */
export namespace ReleaseMapper {
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
  const mapReleaseMediaFromDto = (dto: ReleaseDto['media']): Release['media'] => dto.map(mediaDto => ({
    medium: mediaDto.medium,
    quantity: mediaDto.qty,
  }));

  /**
   * Maps release animation from dto.
   * @param dto Dto.
   */
  const mapReleaseAnimationFromArray = (dto: ReleaseDto['animation']): Release['animation'] => ({
    storyAnimation: dto[0],
    eroAnimation: dto[1],
  });

  /**
   * Maps release producer from dto.
   * @param dto Dto.
   */
  const mapReleaseProducerFromDto = (dto: ReleaseDto['producers']): Release['producers'] => dto.map(producerDto => ({
    id: producerDto.id,
    isDeveloper: producerDto.developer,
    name: producerDto.name,
    originalName: producerDto.original,
    isPublisher: producerDto.publisher,
    type: producerDto.type,
  }));

  /**
   * Maps minimum age to age rating.
   * @param minAge Minimum age.
   */
  const mapMinAgeToRating = (minAge: number | null): string => {
    if (minAge === null) {
      return '';
    }

    if (minAge === 0) {
      return 'All ages';
    }

    return `${minAge}+`;
  };

  /** Maps release id from dto. */
  export const mapId = (dto: ReleaseIdDto): ReleaseId => ({ id: dto.id });

  /** Maps release basic from dto. */
  export const mapBasic = (dto: ReleaseBasicDto): ReleaseBasic => ({
    title: dto.title,
    originalName: dto.original,
    releasedDate: dto.released && dto.released !== 'tba' ? dto.released : 'TBA',
    type: TYPE_FROM_DTO_MAP[dto.type],
    isPatch: dto.patch,
    isFreeware: dto.freeware,
    isDoujin: dto.doujin,
    languages: dto.languages.map(language => Language.toLanguage(language)),
  });

  /** Maps release details from dto. */
  export const mapDetails = (dto: ReleaseDetailsDto): ReleaseDetails => ({
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
  });

  /** Maps release producers from dto. */
  export const mapProducers = (dto: ReleaseProducersDto): ReleaseProducers => ({
    producers: mapReleaseProducerFromDto(dto.producers),
  });

  /**
   * Maps release from dto.
   * @param dto Dto.
   */
  export const fromDto = (dto: ReleaseDto): Release => ({
    ...mapId(dto),
    ...mapBasic(dto),
    ...mapDetails(dto),
    ...mapProducers(dto),
  });
}
