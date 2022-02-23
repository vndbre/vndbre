import { CharacterVoicedDto, CharacterInstanceDto, CharacterDto } from '../dtos/characterDto';
import { CharacterNovel, Character, CharacterTrait, CharacterInstance, CharacterVoiced } from '../../models/character';
import { imageFlaggingFromDto } from './imageFlaggingMapper';
import { Roles } from '../../utils/types/roles';

/** Character mapper. */
export namespace CharacterMapper {

  /**
   * Maps dto into model.
   * @param dto Dto.
   */
  const mapCharacterInstanceFromDto = (dto: CharacterInstanceDto): CharacterInstance => ({
    id: dto.id,
    name: dto.name,
    originalName: dto.original,
    spoiler: dto.spoiler,
  });

  /**
   * Maps dto into model.
   * @param dto Dto.
   */
  const mapCharacterVoicedFromDto = (dto: CharacterVoicedDto): CharacterVoiced => ({
    id: dto.id,
    aliasId: dto.aid,
    visualNovelId: dto.vid,
    note: dto.note,
  });

  /**
   * Transforms array of numbers into array of objects with traits.
   * @param data Array of arrays with number.
   */
  const mapTraitsFromDto = (data: CharacterDto['traits']): readonly CharacterTrait[] => data?.map(trait => ({
    id: trait[0],
    spoilerLevel: trait[1],
  })) ?? [];

  /**
   * Gets linked novels from array.
   * @param data Array of novels.
   */
  const mapVisualNovelsFromDto = (data: CharacterDto['vns']): readonly CharacterNovel[] => data?.map(novel => ({
    visualNovelId: novel[0],
    releaseId: novel[1],
    spoilerLevel: novel[2],
    role: novel[3] as Roles,
  })) ?? [];

  /**
   * Maps dto into model.
   * @param dto Dto.
   */
  export const fromDto = (dto: CharacterDto): Character => ({
    id: dto.id,
    name: dto.name,
    originalName: dto.original,
    gender: dto.gender,
    spoilerGender: dto.spoil_gender,
    bloodType: dto.bloodt,
    birthday: `${dto.birthday[0]}-${dto.birthday[1]}`,
    aliases: dto.aliases,
    description: dto.description,
    age: dto.age,
    image: dto.image,
    imageFlagging: dto.image_flagging ? imageFlaggingFromDto(dto.image_flagging) : null,
    bust: dto.bust,
    waist: dto.waist,
    hip: dto.hip,
    height: dto.height,
    weight: dto.weight,
    cupSize: dto.cup_size,
    traits: dto.traits ? mapTraitsFromDto(dto.traits) : undefined,
    voicedActors: dto.voiced.map(voicedDto => mapCharacterVoicedFromDto(voicedDto)),
    instances: dto.instances?.map(instanceDto => mapCharacterInstanceFromDto(instanceDto)),
    visualNovels: dto.vns ? mapVisualNovelsFromDto(dto.vns) : undefined,
  });
}
