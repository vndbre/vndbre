import type { CharacterTraitDto } from 'src/api/dtos/characterDto/characterTraitDto';
import type { CharacterTrait } from 'src/api/models/character/characterTrait';
import { SpoilerLevelMapper } from '../spoilerLevelMapper';
import { TraitMapper } from '../traitMapper';

export namespace CharacterTraitMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: CharacterTraitDto): CharacterTrait {
    return {
      ...TraitMapper.fromDto(dto),
      spoilerLevel: SpoilerLevelMapper.fromDto(dto.spoiler),
    };
  }
}
