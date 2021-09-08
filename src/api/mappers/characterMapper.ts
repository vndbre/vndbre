import { CharacterNovel, Character, CharacterTrait } from '../../models/character';
import { imageFlaggingFromDto } from './imageFlaggingMapper';
import { CharacterDto } from '../dtos/characterDto';

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
const visualNovelsFromArray = (data: [number, number, number, string][]): CharacterNovel[] => data.map(novel => ({
  vid: novel[0],
  rid: novel[1],
  spoilerLevel: novel[2],
  role: novel[3],
}));

/**
 * Maps dto into model.
 * @param dto Character dto.
 * @returns Character model.
 */
export const characterFromDto = (dto: CharacterDto): Character => ({
  id: dto.id,
  name: dto.name,
  original: dto.original,
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
  voiced: dto.voiced,
  instances: dto.instances,
  visualNovels: visualNovelsFromArray(dto.vns),
});
