import { StaffCharacterVoicedDto, StaffVisualNovelDto, StaffDto } from '../dtos/staffDto';
import { StaffCharacterVoiced, StaffVisualNovel, StaffAlias, Staff } from '../../models/staff';

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
const staffVisualNovelFromDto = (dto: StaffVisualNovelDto): StaffVisualNovel => ({
   id: dto.id,
   aliasId: dto.aid,
   note: dto.note,
   role: dto.role,
});

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
const staffCharacterVoicedFromDto = (dto: StaffCharacterVoicedDto): StaffCharacterVoiced => ({
  id: dto.id,
  aliasId: dto.aid,
  note: dto.note,
  characterId: dto.cid,
});

/**
 * Maps array of arrays of numbers and string to array of objects.
 * @param data Array of arrays.
 * @returns Array of objects.
 */
const staffAliasesFromArray = (data: [number, string, string][]): StaffAlias[] => data.map(alias => ({
  aliasId: alias[0],
  name: alias[1],
  originalName: alias[2],
}));

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
export const staffFromDto = (dto: StaffDto): Staff => ({
  id: dto.id,
  name: dto.name,
  gender: dto.gender,
  language: dto.language,
  links: dto.links,
  description: dto.description,
  aliases: staffAliasesFromArray(dto.aliases),
  mainAlias: dto.main_alias,
  visualNovels: dto.vns.map(staffVnDto => staffVisualNovelFromDto(staffVnDto)),
  voiced: dto.voiced.map(voicedDto => staffCharacterVoicedFromDto(voicedDto)),
  originalName: dto.original,
});
