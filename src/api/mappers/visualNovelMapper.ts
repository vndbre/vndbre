import {
  VisualNovelRelatedAnime,
  VisualNovelRelated,
  VisualNovelStaff,
  VisualNovelScreenshot,
  VisualNovelTag,
  VisualNovel,
} from '../../models/visualNovel';
import {
  VisualNovelRelatedAnimeDto,
  VisualNovelRelatedDto,
  VisualNovelStaffDto,
  VisualNovelScreenshotDto,
  VisualNovelDto,
} from '../dtos/ visualNovelDto';
import { imageFlaggingFromDto } from './imageFlaggingMapper';

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
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
const visualNovelRelatedFromDto = (dto: VisualNovelRelatedDto): VisualNovelRelated => ({
  id: dto.id,
  official: dto.official,
  originalName: dto.original,
  relation: dto.relation,
  title: dto.title,
});

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
const visualNovelStaffFromDto = (dto: VisualNovelStaffDto): VisualNovelStaff => ({
  aliasId: dto.aid,
  staffId: dto.sid,
  name: dto.name,
  originalName: dto.original,
  note: dto.note,
  role: dto.role,
});

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
const visualNovelScreenShotFromDto = (dto: VisualNovelScreenshotDto): VisualNovelScreenshot => ({
  releaseId: dto.rid,
  height: dto.height,
  width: dto.width,
  image: dto.image,
  nsfw: dto.nsfw,
  flagging: dto.flagging ? imageFlaggingFromDto(dto.flagging) : null,
});

/**
 * Maps tags arrays to tag array of objects.
 * @param dto Array of arrays.
 * @returns Array of tags objects.
 */
const tagsFromArray = (dto: number[][]): VisualNovelTag[] =>
  (dto.length ? dto.map(tag => ({
    id: tag[0],
    score: tag[1],
    spoilerLevel: tag[2],
  })) : []);

/**
 * Maps dto to visual novel model.
 * @param dto Dto object.
 * @returns VisualNovel object.
 */
export const visualNovelFromDto = (dto: VisualNovelDto): VisualNovel => ({
  id: dto.id,
  title: dto.title,
  originalName: dto.original,
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
  relations: dto.relations.map(relationDto => visualNovelRelatedFromDto(relationDto)),
  tags: tagsFromArray(dto.tags),
  popularity: dto.popularity,
  rating: dto.rating,
  screens: dto.screens.map(screenshotDto => visualNovelScreenShotFromDto(screenshotDto)),
  staff: dto.staff.map(staffDto => visualNovelStaffFromDto(staffDto)),
  imageNsfw: dto.image_nsfw,
  votecount: dto.votecount,
});