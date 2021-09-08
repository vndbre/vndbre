import { visualNovelFromDto } from './visualNovelMapper';
import { Release } from '../../models/release';
import { ReleaseDto } from '../dtos/releaseDto';

/**
 * Maps dto into model.
 * @param dto Release dto.
 * @returns Release object.
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
  media: dto.media,
  resolution: dto.resolution,
  voiced: dto.voiced,
  animation: dto.animation,
  visualNovels: dto.vn.map(novelDto => visualNovelFromDto(novelDto)),
  producers: dto.producers,
});
