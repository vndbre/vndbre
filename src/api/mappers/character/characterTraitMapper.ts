import type { CharacterTraitDto } from 'src/api/dtos/characterDto/characterTraitDto';
import type { CharacterTrait } from 'src/api/models/character/characterTrait';
import { SpoilerLevelMapper } from '../spoilerLevelMapper';

export namespace CharacterTraitMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: CharacterTraitDto): CharacterTrait {
    return {
      id: dto.id,
      spoilerLevel: SpoilerLevelMapper.fromDto(dto.spoiler),
    };
  }
}
