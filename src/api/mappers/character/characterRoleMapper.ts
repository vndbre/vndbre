import type { CharacterRoleDto } from 'src/api/dtos/characterDto/characterRoleDto';
import type { CharacterRole } from 'src/api/models/character/characterRole';

const CHARACTER_ROLE_FROM_DTO_MAP: Readonly<Record<CharacterRoleDto, CharacterRole>> = {
  main: 'protagonist',
  primary: 'main',
  appears: 'appears',
  side: 'side',
};

const CHARACTER_ROLE_TO_DTO_MAP: Readonly<Record<CharacterRole, CharacterRoleDto>> = {
  protagonist: 'main',
  main: 'primary',
  side: 'side',
  appears: 'appears',
};

export namespace CharacterRoleMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   */
  export function fromDto(dto: CharacterRoleDto): CharacterRole {
    return CHARACTER_ROLE_FROM_DTO_MAP[dto];
  }

  /**
   * Maps model to dto.
   * @param data Character role.
   */
  export function toDto(data: CharacterRole): CharacterRoleDto {
    return CHARACTER_ROLE_TO_DTO_MAP[data];
  }
}
