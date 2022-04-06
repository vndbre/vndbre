import { StaffDto } from '../dtos/staffDto';
import { Staff } from '../../models/staff';
import { Language } from '../../models/language';
import { StaffRole } from '../../models/staffRole';
import { GenderMapper } from './genderMapper';

/** Staff mapper. */
export namespace StaffMapper {

  /**
   * Maps visual novel in which staff worked from dto.
   * @param dto Dto.
   */
  const mapStaffVisualNovelFromDto = (dto: StaffDto['vns']): Staff['visualNovels'] => dto?.map(visualNovelDto => ({
    id: visualNovelDto.id,
    aliasId: visualNovelDto.aid,
    note: visualNovelDto.note,
    role: StaffRole.toStaffRole(visualNovelDto.role),
  })) ?? [];

  /**
   * Maps staff who voiced a character from dto.
   * @param dto Dto.
   */
  const mapStaffCharacterVoicedFromDto = (dto: StaffDto['voiced']): Staff['voiced'] => dto?.map(staffCharacterVoicedDto => ({
    id: staffCharacterVoicedDto.id,
    aliasId: staffCharacterVoicedDto.aid,
    note: staffCharacterVoicedDto.note,
    characterId: staffCharacterVoicedDto.cid,
  })) ?? [];

  /**
   * Maps staff aliases from dto.
   * @param dto Dto.
   */
  const mapStaffAliasesFromDto = (dto: StaffDto['aliases']): Staff['aliases'] => dto?.map(aliasDto => ({
    aliasId: aliasDto[0],
    name: aliasDto[1],
    originalName: aliasDto[2],
  })) ?? [];

  /**
   * Maps staff into from dto.
   * @param dto Dto.
   */
  export function fromDto(dto: StaffDto): Staff {
    return {
      id: dto.id,
      name: dto.name,
      gender: dto.gender != null ? GenderMapper.GENDER_FROM_DTO_MAP[dto.gender] : null,
      language: Language.toLanguage(dto.language),
      links: dto.links ?? null,
      description: dto.description,
      aliases: mapStaffAliasesFromDto(dto.aliases),
      mainAlias: dto.main_alias ?? null,
      visualNovels: mapStaffVisualNovelFromDto(dto.vns),
      voiced: mapStaffCharacterVoicedFromDto(dto.voiced),
      originalName: dto.original,
    };
  }
}
