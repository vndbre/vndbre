import { VisualNovelScreenshotDto, VisualNovelDto, VisualNovelRelatedAnimeDto } from '../dtos/ visualNovelDto';
import { imageFlaggingFromDto, imageFlaggingToDto } from './imageFlaggingMapper';
import { VisualNovel, VisualNovelRelatedAnime, VisualNovelScreenshot, VisualNovelTag } from '../../models/visualNovel';

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
const visualNovelRelatedAnimeFromDto = (dto: VisualNovelRelatedAnimeDto): VisualNovelRelatedAnime => ({
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
const visualNovelRelatedAnimeToDto = (data: VisualNovelRelatedAnime): VisualNovelRelatedAnimeDto => ({
  id: data.id,
  ann_id: data.annId,
  nfo_id: data.nfoId,
  title_kanji: data.titleKanji,
  title_romaji: data.titleRomaji,
  type: data.type,
  year: data.year ? data.year.getFullYear() : null,
});

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
const visualNovelScreenShotFromDto = (dto: VisualNovelScreenshotDto): VisualNovelScreenshot => ({
  rid: dto.rid,
  height: dto.height,
  width: dto.width,
  image: dto.image,
  nsfw: dto.nsfw,
  flagging: dto.flagging ? imageFlaggingFromDto(dto.flagging) : null,
});

/**
 * Maps model into dto.
 * @param data Screenshot model object.
 * @returns Screenshot dto object.
 */
const visualNovelScreenShotToDto = (data: VisualNovelScreenshot): VisualNovelScreenshotDto => ({
  rid: data.rid,
  height: data.height,
  width: data.width,
  image: data.image,
  nsfw: data.nsfw,
  flagging: data.flagging ? imageFlaggingToDto(data.flagging) : null,
});

/**
 * Maps tags arrays to tag array of objects.
 * @param dto Array of arrays.
 * @returns Array of tags objects.
 */
const tagsFromArray = (dto: number[][]): VisualNovelTag[] => dto.map(tag => ({
  id: tag[0],
  score: tag[1],
  spoilerLevel: tag[2],
}));

/**
 * Maps visual novel tags object to dto.
 * @param data Visual novel tag objects.
 * @returns Array of arrays with data info.
 */
const tagsToArray = (data: VisualNovelTag[]): number[][] => data.map(tag => [tag.id, tag.score, tag.spoilerLevel]);

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
  anime: dto.anime.map(animeDto => visualNovelRelatedAnimeFromDto(animeDto)),
  relations: dto.relations,
  tags: tagsFromArray(dto.tags),
  popularity: dto.popularity,
  rating: dto.rating,
  screens: dto.screens.map(screenshotDto => visualNovelScreenShotFromDto(screenshotDto)),
  staff: dto.staff,
  imageNsfw: dto.image_nsfw,
  votecount: dto.votecount,
});

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
export const visualNovelToDto = (data: VisualNovel): VisualNovelDto => ({
  id: data.id,
  title: data.title,
  original: data.original,
  released: data.released ? data.released.toISOString() : null,
  languages: data.languages,
  orig_lang: data.originalLanguage,
  platforms: data.platforms,
  aliases: data.aliases,
  length: data.length,
  description: data.description,
  links: data.links,
  image: data.image,
  image_flagging: data.imageFlagging ? imageFlaggingToDto(data.imageFlagging) : null,
  image_nsfw: data.imageNsfw,
  anime: data.anime.map(anime => visualNovelRelatedAnimeToDto(anime)),
  relations: data.relations,
  tags: tagsToArray(data.tags),
  popularity: data.popularity,
  rating: data.rating,
  screens: data.screens.map(screenshot => visualNovelScreenShotToDto(screenshot)),
  staff: data.staff,
  votecount: data.votecount,
});
