import { Language } from '../../models/language';
import { Platform } from '../../models/platform';
import { StaffRole } from '../../models/staffRole';
import { VisualNovel } from '../../models/visualNovels/visualNovel';
import { ReadableVisualNovelLength, VisualNovelLength } from '../../models/visualNovels/visualNovelLength';
import { VisualNovelRelation } from '../../models/visualNovels/visualNovelRelation';

import {
  VisualNovelDto,
  RelationTypeDto,
  VisualNovelLengthDto,
} from '../dtos/visualNovelDto';
import { ExternalLinksMapper } from './externalLinksMapper';
import { ImageFlaggingMapper } from './imageFlaggingMapper';

/** Visual novel mapper. */
export namespace VisualNovelMapper {
  const RELATION_FROM_DTO_MAP: Readonly<Record<RelationTypeDto, VisualNovelRelation>> = {
    [RelationTypeDto.Alternative]: VisualNovelRelation.Alternative,
    [RelationTypeDto.SharesCharacters]: VisualNovelRelation.SharesCharacters,
    [RelationTypeDto.SideStory]: VisualNovelRelation.SideStory,
    [RelationTypeDto.SameSetting]: VisualNovelRelation.SameSetting,
    [RelationTypeDto.FanDisc]: VisualNovelRelation.FanDisc,
    [RelationTypeDto.Sequel]: VisualNovelRelation.Sequel,
    [RelationTypeDto.Prequel]: VisualNovelRelation.Prequel,
    [RelationTypeDto.SameSeries]: VisualNovelRelation.SameSeries,
    [RelationTypeDto.ParentStory]: VisualNovelRelation.ParentStory,
  };

  const LENGTH_FROM_DTO_MAP: Readonly<Record<VisualNovelLengthDto, VisualNovelLength>> = {
    [VisualNovelLengthDto.VeryShort]: VisualNovelLength.VeryShort,
    [VisualNovelLengthDto.Short]: VisualNovelLength.Short,
    [VisualNovelLengthDto.Medium]: VisualNovelLength.Medium,
    [VisualNovelLengthDto.Long]: VisualNovelLength.Long,
    [VisualNovelLengthDto.VeryLong]: VisualNovelLength.VeryLong,
  };

  const TO_TEXT_LENGTH_MAP: Readonly<Record<VisualNovelLength, ReadableVisualNovelLength>> = {
    [VisualNovelLength.VeryShort]: ReadableVisualNovelLength.VeryShort,
    [VisualNovelLength.Short]: ReadableVisualNovelLength.Short,
    [VisualNovelLength.Medium]: ReadableVisualNovelLength.Medium,
    [VisualNovelLength.Long]: ReadableVisualNovelLength.Long,
    [VisualNovelLength.VeryLong]: ReadableVisualNovelLength.VeryLong,
  };

  /**
   * Maps VN length from dto.
   * @param dto Dto.
   */
  const mapVisualNovelLengthFromDto = (dto: VisualNovelDto['length']): VisualNovel['length'] => {
    if (dto === null) {
      return null;
    }

    return TO_TEXT_LENGTH_MAP[LENGTH_FROM_DTO_MAP[dto]];
  };

  /**
   * Maps related to the vn anime from dto.
   * @param dto Dto.
   */
  const mapVisualNovelRelatedAnimeFromDto = (dto: VisualNovelDto['anime']): VisualNovel['anime'] => dto.map(animeDto => ({
    id: animeDto.id,
    annId: animeDto.ann_id,
    nfoId: animeDto.nfo_id,
    titleKanji: animeDto.title_kanji,
    titleRomaji: animeDto.title_romaji,
    type: animeDto.type,
    year: animeDto.year ? new Date(animeDto.year) : null,
  }));

  /**
   * Maps vn relations from dto.
   * @param dto Dto.
   */
  const mapVisualNovelRelatedFromDto = (dto: VisualNovelDto['relations']): VisualNovel['relations'] => dto.map(relationDto => ({
    id: relationDto.id,
    isOfficial: relationDto.official,
    originalName: relationDto.original,
    relation: RELATION_FROM_DTO_MAP[relationDto.relation],
    title: relationDto.title,
  }));

  /**
   * Maps vn staff from dto.
   * @param dto Dto.
   */
  const mapVisualNovelStaffFromDto = (dto: VisualNovelDto['staff']): VisualNovel['staff'] => dto.map(staffDto => ({
    aliasId: staffDto.aid,
    staffId: staffDto.sid,
    name: staffDto.name,
    originalName: staffDto.original,
    note: staffDto.note,
    role: StaffRole.toStaffRole(staffDto.role),
  }));

  /**
   * Maps vn screenshots from dto.
   * @param dto Dto.
   */
  const mapVisualNovelScreenshotsFromDto = (dto: VisualNovelDto['screens']): VisualNovel['screens'] => dto.map(screenShotDto => ({
    releaseId: screenShotDto.rid,
    height: screenShotDto.height,
    width: screenShotDto.width,
    image: screenShotDto.image,
    isNsfw: screenShotDto.nsfw,
    flagging: screenShotDto.flagging ? ImageFlaggingMapper.fromDto(screenShotDto.flagging) : null,
  }));

  /**
   * Maps tags arrays to tag array of objects.
   * @param dto Array of arrays.
   */
  const magTagsFromDto = (dto: VisualNovelDto['tags']): VisualNovel['tags'] =>
    dto.map(tag => ({
      id: tag[0],
      score: tag[1],
      spoilerLevel: tag[2],
    }));

  /**
   * Maps dto to visual novel model.
   * @param dto Dto object.
   */
  export const fromDto = (dto: VisualNovelDto): VisualNovel => ({
    id: dto.id,
    title: dto.title,
    originalName: dto.original,
    released: dto.released ? new Date(dto.released) : null,
    languages: dto.languages.map(languageDto => Language.toLanguage(languageDto)),
    originalLanguage: dto.orig_lang.map(originalLanguageDto => Language.toLanguage(originalLanguageDto)),
    platforms: dto.platforms.map(platformDto => Platform.toPlatform(platformDto)),
    aliases: dto.aliases,
    length: dto.length ? mapVisualNovelLengthFromDto(dto.length) : null,
    description: dto.description,
    links: ExternalLinksMapper.fromDto(dto.links),
    image: dto.image,
    imageFlagging: dto.image_flagging ? ImageFlaggingMapper.fromDto(dto.image_flagging) : null,
    anime: mapVisualNovelRelatedAnimeFromDto(dto.anime),
    relations: mapVisualNovelRelatedFromDto(dto.relations),
    tags: magTagsFromDto(dto.tags),
    popularity: dto.popularity,
    rating: dto.rating,
    screens: mapVisualNovelScreenshotsFromDto(dto.screens),
    staff: mapVisualNovelStaffFromDto(dto.staff),
    isImageNsfw: dto.image_nsfw,
    voteCount: dto.votecount,
  });

}
