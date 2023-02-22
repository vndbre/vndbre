import type { CharacterVnInfoDto } from 'src/api/dtos/characterDto/characterVnInfoDto';
import type { CharacterVnInfo } from 'src/api/models/character/characterVnInfo';
import { CharacterRoleMapper } from './characterRoleMapper';

export namespace CharacterVnInfoMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: CharacterVnInfoDto): CharacterVnInfo {
    return {
      id: dto.id,
      role: CharacterRoleMapper.fromDto(dto.role),
    };
  }
}
