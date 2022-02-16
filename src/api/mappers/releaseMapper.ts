import { ReleaseProducerDto, ReleaseDto, ReleaseMediaDto } from '../dtos/releaseDto';
import { Release, ReleaseAnimation, ReleaseMedia, ReleaseProducer } from '../../models/release';
import { LanguageService } from '../services/languageService';
import { PlatformService } from '../services/platformService';

/**
 * Maps dto into model.
 * @param dto Dto.
 */
const releaseMediaFromDto = (dto: ReleaseMediaDto): ReleaseMedia => ({
  medium: dto.medium,
  quantity: dto.qty,
});

/**
 * Maps release animation array into object.
 * @param data Array of data.
 */
const releaseAnimationFromArray = (data: [number | null, number | null]): ReleaseAnimation => ({
  storyAnimation: data[0],
  eroAnimation: data[1],
});

/**
 * Maps dto into model.
 * @param dto Dto.
 */
const releaseProducerFromDto = (dto: ReleaseProducerDto): ReleaseProducer => ({
  id: dto.id,
  isDeveloper: dto.developer,
  name: dto.name,
  originalName: dto.original,
  isPublisher: dto.publisher,
  type: dto.type,
});

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

/**
 * Maps dto into model.
 * @param dto Dto.
 */
export const releaseFromDto = (dto: ReleaseDto): Release => ({
  id: dto.id,
  title: dto.title,
  originalName: dto.original,
  releasedDate: dto.released && dto.released !== 'tba' ? dto.released : 'TBA',
  type: dto.type,
  isPatch: dto.patch,
  isFreeware: dto.freeware,
  isDoujin: dto.doujin,
  languages: dto.languages.map(language => LanguageService.toLanguage(language)),
  website: dto.website,
  notes: dto.notes,
  ageRating: mapMinAgeToRating(dto.minage),
  gtin: dto.gtin,
  catalog: dto.catalog,
  platforms: dto.platforms.map(platform => PlatformService.toPlatform(platform)),
  media: dto.media.map(mediaDto => releaseMediaFromDto(mediaDto)),
  resolution: dto.resolution,
  voiced: dto.voiced,
  animation: releaseAnimationFromArray(dto.animation),
  visualNovels: [],
  producers: dto.producers.map(producerDto => releaseProducerFromDto(producerDto)),
});
