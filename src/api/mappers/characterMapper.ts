import { Character } from '../../models/characters/character';
import { CharacterRole } from '../../models/characters/characterRole';
import { SpoilerLevel } from '../../models/spoilerLevel';
import { CharacterDto, SpoilerLevelDto } from '../dtos/characterDto';
import { GenderMapper } from './genderMapper';
import { ImageFlaggingMapper } from './imageFlaggingMapper';

const SPOILER_LEVEL_FROM_DTO_MAP: Readonly<Record<SpoilerLevelDto, SpoilerLevel>> = {
  [SpoilerLevelDto.Major]: SpoilerLevel.Major,
  [SpoilerLevelDto.Minor]: SpoilerLevel.Minor,
  [SpoilerLevelDto.None]: SpoilerLevel.None,
};

/**
 * Maps character instances from dto.
 * @param dto Dto.
 */
function mapCharacterInstanceFromDto(dto: CharacterDto['instances']): Character['instances'] {
  return dto?.map(instanceDto => ({
    id: instanceDto.id,
    name: instanceDto.name,
    originalName: instanceDto.original,
    spoiler: SPOILER_LEVEL_FROM_DTO_MAP[instanceDto.spoiler],
  })) ?? [];
}

/**
 * Maps character voice actors from dto.
 * @param dto Dto.
 */
function mapCharacterVoicedFromDto(dto: CharacterDto['voiced']): Character['voicedActors'] {
  return dto?.map(voicedActorDto => ({
    id: voicedActorDto.id,
    aliasId: voicedActorDto.aid,
    visualNovelId: voicedActorDto.vid,
    note: voicedActorDto.note,
  })) ?? [];
}

/**
 * Maps traits from dto.
 * @param dto Dto.
 */
function mapTraitsFromDto(dto: CharacterDto['traits']): Character['traits'] {
  return dto?.map(traitDto => ({
    id: traitDto[0],
    spoilerLevel: traitDto[1],
  })) ?? [];
}

/**
 * Maps linked novels from dto.
 * @param dto Dto.
 */
function mapVisualNovelsFromDto(dto: CharacterDto['vns']): Character['visualNovels'] {
  return dto?.map(novelDto => ({
    visualNovelId: novelDto[0],
    releaseId: novelDto[1],
    spoilerLevel: novelDto[2],
    role: novelDto[3] as CharacterRole,
  })) ?? [];
}

/** Character mapper. */
export namespace CharacterMapper {

  /**
   * Maps character from dto.
   * @param dto Dto.
   */
  export function fromDto(dto: CharacterDto): Character {
    return {
      id: dto.id,
      name: dto.name,
      originalName: dto.original,
      gender: dto.gender != null ? GenderMapper.GENDER_FROM_DTO_MAP[dto.gender] : null,
      spoilerGender: dto.spoil_gender,
      bloodType: dto.bloodt,
      birthday: `${dto.birthday[0]}-${dto.birthday[1]}`,
      aliases: dto.aliases,
      description: dto.description,
      age: dto.age,
      image: dto.image,
      imageFlagging: dto.image_flagging ? ImageFlaggingMapper.fromDto(dto.image_flagging) : null,
      bust: dto.bust,
      waist: dto.waist,
      hip: dto.hip,
      height: dto.height,
      weight: dto.weight,
      cupSize: dto.cup_size,
      traits: mapTraitsFromDto(dto.traits),
      voicedActors: mapCharacterVoicedFromDto(dto.voiced),
      instances: mapCharacterInstanceFromDto(dto.instances),
      visualNovels: mapVisualNovelsFromDto(dto.vns),
    };
  }
}
