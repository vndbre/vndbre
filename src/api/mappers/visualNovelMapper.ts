import { relatedAnimeFromDto } from './relatedAnimeMapper';
import { imageFlaggingFromDto } from './imageFlaggingMapper';
import { VisualNovel, VisualNovelTag } from '../../models/visualNovel';
import { VisualNovelDto } from '../dtos/ visualNovelDto';

/**
 * Maps tags arrays to tag array of objects.
 * @param dto Array of arrays.
 * @returns Array of tags objects.
 */
const tagsFromDto = (dto: number[][]): VisualNovelTag[] => dto.map(tag => ({
    id: tag[0],
    score: tag[1],
    spoilerLevel: tag[2],
}));

/**
 * Maps dto to visual novel model.
 * @param dto Dto object.
 * @returns VisualNovel object.
 */
export const visualNovelFromDto = (dto: VisualNovelDto): VisualNovel => ({
  id: dto.id,
  title: dto.title,
  original: dto.original,
  released: dto.released ? new Date(dto.released) : null,
  languages: dto.languages,
  originalLanguage: dto.orig_lang,
  platforms: dto.platforms,
  aliases: dto.aliases,
  length: dto.length,
  description: dto.description,
  links: dto.links,
  image: dto.image,
  imageFlagging: dto.image_flagging ? imageFlaggingFromDto(dto.image_flagging) : null,
  anime: dto.anime.map(animeDto => relatedAnimeFromDto(animeDto)),
  relations: dto.relations,
  tags: tagsFromDto(dto.tags),
  popularity: dto.popularity,
  rating: dto.rating,
  screens: dto.screens,
  staff: dto.staff,
  imageNsfw: dto.image_nsfw,
  votecount: dto.votecount,
});

/**
 * Maps model to dto.
 * @param data Visual novel object.
 * @returns Dto object.
 */
export const visualNovelToDto = (data: VisualNovel): VisualNovelDto => ({
  id: data.id,
  ann_id: data.annId,
  nfo_id: data.nfoId,
  title_kanji: data.titleKanji,
  title_romaji: data.titleRomaji,
  type: data.type,
  year: data.year ? data.year.getFullYear() : null,
});
