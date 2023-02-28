import type { BaseCharacterDto } from 'src/api/dtos/characterDto/baseCharacterDto';
import type { BaseCharacter } from 'src/api/models/character/baseCharacter';
import { ImageMapper } from '../imageMapper';

export namespace BaseCharacterMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: BaseCharacterDto): BaseCharacter {
    return {
      id: dto.id,
      name: dto.name,
      image: dto.image !== null ? ImageMapper.fromDto(dto.image) : null,
    };
  }
}
