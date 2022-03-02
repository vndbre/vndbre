import { Character } from '../../models/characters/character';
import { CharacterGender } from '../../models/characters/characterGender';
import { CharacterRole } from '../../models/characters/characterRole';
import { SpoilerLevel } from '../../models/spoilerLevel';
import { CharacterDto, CharacterGenderDto, SpoilerLevelDto } from '../dtos/characterDto';
import { ImageFlaggingMapper } from './imageFlaggingMapper';

/** Character mapper. */
export namespace CharacterMapper {
  const SPOILER_LEVEL_FROM_DTO_MAP: Readonly<Record<SpoilerLevelDto, SpoilerLevel>> = {
    [SpoilerLevelDto.Major]: SpoilerLevel.Major,
    [SpoilerLevelDto.Minor]: SpoilerLevel.Minor,
    [SpoilerLevelDto.None]: SpoilerLevel.None,
  };

  const GENDER_FROM_DTO_MAP: Readonly<Record<CharacterGenderDto, CharacterGender>> = {
    [CharacterGenderDto.Male]: CharacterGender.Male,
    [CharacterGenderDto.Female]: CharacterGender.Female,
    [CharacterGenderDto.Both]: CharacterGender.Both,
  };

  /**
   * Maps character instances from dto.
   * @param dto Dto.
   */
  const mapCharacterInstanceFromDto = (dto: CharacterDto['instances']): Character['instances'] => dto?.map(instanceDto => ({
    id: instanceDto.id,
    name: instanceDto.name,
    originalName: instanceDto.original,
    spoiler: SPOILER_LEVEL_FROM_DTO_MAP[instanceDto.spoiler],
  })) ?? [];

  /**
   * Maps character voice actors from dto.
   * @param dto Dto.
   */
  const mapCharacterVoicedFromDto = (dto: CharacterDto['voiced']): Character['voicedActors'] => dto?.map(voicedActorDto => ({
    id: voicedActorDto.id,
    aliasId: voicedActorDto.aid,
    visualNovelId: voicedActorDto.vid,
    note: voicedActorDto.note,
  })) ?? [];

  /**
   * Maps traits from dto.
   * @param dto Dto.
   */
  const mapTraitsFromDto = (dto: CharacterDto['traits']): Character['traits'] => dto?.map(traitDto => ({
    id: traitDto[0],
    spoilerLevel: traitDto[1],
  })) ?? [];

  /**
   * Maps linked novels from dto.
   * @param dto Dto.
   */
  const mapVisualNovelsFromDto = (dto: CharacterDto['vns']): Character['visualNovels'] => dto?.map(novelDto => ({
    visualNovelId: novelDto[0],
    releaseId: novelDto[1],
    spoilerLevel: novelDto[2],
    role: novelDto[3] as CharacterRole,
  })) ?? [];

  /**
   * Maps character from dto.
   * @param dto Dto.
   */
  export const fromDto = (dto: CharacterDto): Character => ({
    id: dto.id,
    name: dto.name,
    originalName: dto.original,
    gender: dto.gender != null ? GENDER_FROM_DTO_MAP[dto.gender] : null,
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
  });
}
