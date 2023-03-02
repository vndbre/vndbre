import type { SearchCharacterDto } from 'src/api/dtos/characterDto/searchCharacterDto';
import type { SearchCharacter } from 'src/api/models/character/searchCharacter';
import { ImageMapper } from '../imageMapper';

export namespace SearchCharacterMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: SearchCharacterDto): SearchCharacter {
    return {
      id: dto.id,
      name: dto.name,
      image: dto.image !== null ? ImageMapper.fromDto(dto.image) : null,
    };
  }
}
