import type { AuthInfoDto } from '../dtos/authInfoDto';
import type { AuthInfo } from '../models/authInfo';

const permissionsMap = {
  listread: 'read',
  listwrite: 'write',
} as const;

export namespace AuthInfoMapper {

  /**
   * Maps dto to model.
   * @param dto Dto.
   * @param token Vndb token.
   */
  export function fromDto(dto: AuthInfoDto, token: string): AuthInfo {
    return {
      id: dto.id,
      token,
      name: dto.username,
      permissions: dto.permissions.map(permission => permissionsMap[permission]),
    };
  }
}
