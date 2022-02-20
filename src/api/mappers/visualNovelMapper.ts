import {
  VisualNovelRelatedAnime,
  VisualNovelRelated,
  VisualNovelStaff,
  VisualNovelScreenshot,
  VisualNovelTag,
  VisualNovel,
  RelationType,
} from '../../models/visualNovel';
import { StaffRoles } from '../../utils/types/staffRoles';
import { DisplayVisualNovelLength, VisualNovelLength } from '../../utils/types/visualNovelLength';
import {
  VisualNovelRelatedAnimeDto,
  VisualNovelRelatedDto,
  VisualNovelStaffDto,
  VisualNovelScreenshotDto,
  VisualNovelDto,
  RelationTypeDto,
} from '../dtos/visualNovelDto';
import { imageFlaggingFromDto } from './imageFlaggingMapper';

const RELATION_MAP_FROM_DTO: Readonly<Record<RelationTypeDto, RelationType>> = {
  [RelationTypeDto.Alternative]: RelationType.Alternative,
  [RelationTypeDto.SharesCharacters]: RelationType.SharesCharacters,
  [RelationTypeDto.SideStory]: RelationType.SideStory,
  [RelationTypeDto.SameSetting]: RelationType.SameSetting,
  [RelationTypeDto.FanDisc]: RelationType.FanDisc,
  [RelationTypeDto.Sequel]: RelationType.Sequel,
  [RelationTypeDto.Prequel]: RelationType.Prequel,
  [RelationTypeDto.SameSeries]: RelationType.SameSeries,
  [RelationTypeDto.ParentStory]: RelationType.ParentStory,
};

/**
 * Maps VN length to readable format.
 * @param length Visual novel length.
 */
const mapVisualNovelLength = (length: number): DisplayVisualNovelLength => {
  switch (length) {
    case VisualNovelLength.VeryShort:
      return DisplayVisualNovelLength.VeryShort;
    case VisualNovelLength.Short:
      return DisplayVisualNovelLength.Short;
    case VisualNovelLength.Medium:
      return DisplayVisualNovelLength.Medium;
    case VisualNovelLength.Long:
      return DisplayVisualNovelLength.Long;
    case VisualNovelLength.VeryLong:
      return DisplayVisualNovelLength.VeryLong;
    default:
      return DisplayVisualNovelLength.Medium;
  }
};

/**
 * Maps dto into model.
 * @param dto Dto.
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
 */
const visualNovelRelatedFromDto = (dto: VisualNovelRelatedDto): VisualNovelRelated => ({
  id: dto.id,
  isOfficial: dto.official,
  originalName: dto.original,
  relation: RELATION_MAP_FROM_DTO[dto.relation],
  title: dto.title,
});

/**
 * Maps dto into model.
 * @param dto Dto.
 */
const visualNovelStaffFromDto = (dto: VisualNovelStaffDto): VisualNovelStaff => ({
  aliasId: dto.aid,
  staffId: dto.sid,
  name: dto.name,
  originalName: dto.original,
  note: dto.note,
  role: dto.role as StaffRoles,
});

/**
 * Maps dto into model.
 * @param dto Dto.
 */
const visualNovelScreenShotFromDto = (dto: VisualNovelScreenshotDto): VisualNovelScreenshot => ({
  releaseId: dto.rid,
  height: dto.height,
  width: dto.width,
  image: dto.image,
  isNsfw: dto.nsfw,
  flagging: dto.flagging ? imageFlaggingFromDto(dto.flagging) : null,
});

/**
 * Maps tags arrays to tag array of objects.
 * @param dto Array of arrays.
 */
const tagsFromArray = (dto: number[][]): VisualNovelTag[] =>
  dto.map(tag => ({
    id: tag[0],
    score: tag[1],
    spoilerLevel: tag[2],
  }));

/**
 * Maps dto to visual novel model.
 * @param dto Dto object.
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
  length: dto.length ? mapVisualNovelLength(dto.length) : null,
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
  isImageNsfw: dto.image_nsfw,
  voteCount: dto.votecount,
});
