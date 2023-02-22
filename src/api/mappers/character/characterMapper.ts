import type { CharacterDto } from 'src/api/dtos/characterDto/characterDto';
import type { Character } from 'src/api/models/character/character';
import { ImageMapper } from '../imageMapper';
import { BloodTypeMapper } from './bloodTypeMapper';
import { CharacterTraitMapper } from './characterTraitMapper';
import { CharacterVnInfoMapper } from './charaterVnInfoMapper';
import { GenderMapper } from './genderMapper';

export namespace CharacterMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: CharacterDto): Character {
    return {
      id: dto.id,
      name: dto.name,
      aliases: dto.aliases,
      description: dto.description,
      image: dto.image !== null ? ImageMapper.fromDto(dto.image) : null,
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
