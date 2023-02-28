import type { CharacterDto } from 'src/api/dtos/characterDto/characterDto';
import type { Character } from 'src/api/models/character/character';
import { BaseCharacterMapper } from './baseCharacterMapper';
import { BloodTypeMapper } from './bloodTypeMapper';
import { CharacterTraitMapper } from './characterTraitMapper';
import { CharacterVnInfoMapper } from './characterVnInfoMapper';
import { GenderMapper } from './genderMapper';

export namespace CharacterMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: CharacterDto): Character {
    return {
      ...BaseCharacterMapper.fromDto(dto),
      originalName: dto.original,
      aliases: dto.aliases,
      description: dto.description,
      bloodType: dto.blood_type !== null ? BloodTypeMapper.fromDto(dto.blood_type) : null,
      height: dto.height,
      weight: dto.weight,
      bust: dto.bust,
      hips: dto.hips,
      cup: dto.cup,
      age: dto.age,
      birthday: dto.birthday !== null ? {
        month: dto.birthday[0],
        day: dto.birthday[1],
      } : null,
      gender: dto.sex !== null ? {
        none: GenderMapper.fromDto(dto.sex[0]),
        minor: GenderMapper.fromDto(dto.sex[0]),
        major: GenderMapper.fromDto(dto.sex[1]),
      } : null,
      vnsInfo: dto.vns.map(CharacterVnInfoMapper.fromDto),
      traits: dto.traits.map(CharacterTraitMapper.fromDto),
    };
  }
}
