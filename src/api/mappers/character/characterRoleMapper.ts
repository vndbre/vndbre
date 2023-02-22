import type { CharacterRoleDto } from 'src/api/dtos/characterDto/characterRoleDto';
import type { CharacterRole } from 'src/api/models/character/characterRole';

const CHARACTER_ROLE_FROM_DTO_MAP: Readonly<Record<CharacterRoleDto, CharacterRole>> = {
  primary: 'protagonist',
  main: 'main',
  appears: 'appears',
  side: 'side',
};

export namespace CharacterRoleMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: CharacterRoleDto): CharacterRole {
    return CHARACTER_ROLE_FROM_DTO_MAP[dto];
  }
}
