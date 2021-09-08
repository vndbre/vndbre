import { RelatedAnime } from '../../models/relatedAnime';
import { RelatedAnimeDto } from '../dtos/relatedAnimeDto';

/**
 * Maps dto to related anime model.
 * @param dto Dto object.
 * @returns RelatedAnime object.
 */
export const relatedAnimeFromDto = (dto: RelatedAnimeDto): RelatedAnime => ({
  id: dto.id,
  annId: dto.ann_id,
  nfoId: dto.nfo_id,
  titleKanji: dto.title_kanji,
  titleRomaji: dto.title_romaji,
  type: dto.type,
  year: dto.year ? new Date(dto.year) : null,
});

/**
 * Maps model to dto.
 * @param data Related anime object.
 * @returns Dto object.
 */
export const relatedAnimeToDto = (data: RelatedAnime): RelatedAnimeDto => ({
  id: data.id,
  ann_id: data.annId,
  nfo_id: data.nfoId,
  title_kanji: data.titleKanji,
  title_romaji: data.titleRomaji,
  type: data.type,
  year: data.year ? data.year.getFullYear() : null,
});
