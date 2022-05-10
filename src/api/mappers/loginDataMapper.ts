import { AuthData } from '../../models/authData';
import { AuthDto } from '../dtos/authDto';

/** Login data mapper. */
export namespace LoginDataMapper {

  /**
   * Maps login data to dto.
   * @param data Login data.
   */
  export function toDto(data: AuthData.Login): AuthDto.Login {
    return {
      username: data.username,
      password: data.password,
    };
  }
}
