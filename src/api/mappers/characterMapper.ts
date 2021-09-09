import { CharacterVoicedDto, CharacterInstanceDto, CharacterDto } from '../dtos/characterDto';
import { CharacterNovel, Character, CharacterTrait, CharacterInstance, CharacterVoiced } from '../../models/character';
import { imageFlaggingFromDto } from './imageFlaggingMapper';

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
const characterInstanceFromDto = (dto: CharacterInstanceDto): CharacterInstance => ({
  id: dto.id,
  name: dto.name,
  originalName: dto.original,
  spoiler: dto.spoiler,
});

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
const characterVoicedFromDto = (dto: CharacterVoicedDto): CharacterVoiced => ({
  id: dto.id,
  aliasId: dto.aid,
  visualNovelId: dto.vid,
  note: dto.note,
});

/**
 * Transforms array of numbers into array of objects with traits.
 * @param data Array of arrays with number.
 * @returns Array of traits.
 */
const traitsFromArray = (data: number[][]): CharacterTrait[] => data.map(trait => ({
  id: trait[0],
  spoilerLevel: trait[1],
}));

/**
 * Gets linked novels from array.
 * @param data Array of novels.
 * @returns Array of linked novel objects to the character.
 */
const visualNovelsFromArray = (data: [number, number, number, string][]): CharacterNovel[] => (data.length ? data.map(novel => ({
  visualNovelId: novel[0],
  releaseId: novel[1],
  spoilerLevel: novel[2],
  role: novel[3],
})) : []);

/**
 * Maps dto into model.
 * @param dto Dto.
 * @returns Model.
 */
export const characterFromDto = (dto: CharacterDto): Character => ({
  id: dto.id,
  name: dto.name,
  originalName: dto.original,
  gender: dto.gender,
  spoilGender: dto.spoil_gender,
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
  traits: traitsFromArray(dto.traits),
  voiced: dto.voiced.map(voicedDto => characterVoicedFromDto(voicedDto)),
  instances: dto.instances.map(instanceDto => characterInstanceFromDto(instanceDto)),
  visualNovels: visualNovelsFromArray(dto.vns),
});
