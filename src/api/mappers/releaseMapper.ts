import { ReleaseProducerDto, ReleaseDto, ReleaseMediaDto } from '../dtos/releaseDto';
import { visualNovelFromDto } from './visualNovelMapper';
import { Release, ReleaseMedia, ReleaseProducer } from '../../models/release';

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
const releaseMediaFromDto = (dto: ReleaseMediaDto): ReleaseMedia => ({
  medium: dto.medium,
  qty: dto.qty,
});

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
const releaseProducerFromDto = (dto: ReleaseProducerDto): ReleaseProducer => ({
  id: dto.id,
  developer: dto.developer,
  name: dto.name,
  original: dto.original,
  publisher: dto.publisher,
  type: dto.type,
});

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
export const releaseFromDto = (dto: ReleaseDto): Release => ({
  id: dto.id,
  title: dto.title,
  original: dto.original,
  released: dto.released ? new Date(dto.released) : null,
  type: dto.type,
  patch: dto.patch,
  freeware: dto.freeware,
  doujin: dto.doujin,
  languages: dto.languages,
  website: dto.website,
  notes: dto.notes,
  minAge: dto.minage,
  gtin: dto.gtin,
  catalog: dto.catalog,
  platforms: dto.platforms,
  media: dto.media.map(mediaDto => releaseMediaFromDto(mediaDto)),
  resolution: dto.resolution,
  voiced: dto.voiced,
  animation: dto.animation,
  visualNovels: dto.vn.map(novelDto => visualNovelFromDto(novelDto)),
  producers: dto.producers.map(producerDto => releaseProducerFromDto(producerDto)),
});
