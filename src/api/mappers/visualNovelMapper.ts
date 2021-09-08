import { relatedAnimeFromDto, relatedAnimeToDto } from './relatedAnimeMapper';
import { imageFlaggingFromDto, imageFlaggingToDto } from './imageFlaggingMapper';
import { VisualNovel, VisualNovelTag } from '../../models/visualNovel';
import { VisualNovelDto } from '../dtos/ visualNovelDto';

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
  anime: dto.anime.map(animeDto => relatedAnimeFromDto(animeDto)),
  relations: dto.relations,
  tags: tagsFromArray(dto.tags),
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
  anime: data.anime.map(anime => relatedAnimeToDto(anime)),
  relations: data.relations,
  tags: tagsToArray(data.tags),
  popularity: data.popularity,
  rating: data.rating,
  screens: data.screens,
  staff: data.staff,
  votecount: data.votecount,
});
