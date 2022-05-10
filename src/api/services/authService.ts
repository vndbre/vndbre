import { ApiProxyEndpoints, http } from '..';
import { AuthData } from '../../models/authData';
import { AuthDto } from '../dtos/authDto';
import { LoginDataMapper } from '../mappers/loginDataMapper';

export namespace AuthService {

  /**
   * Logs in a user with username and password.
   * @param loginData Login data.
   */
  export async function login(loginData: AuthData.Login): Promise<AuthData.UserSecret> {
    const { data } = await http.post<AuthDto.UserSecret>(
      ApiProxyEndpoints.Login,
      LoginDataMapper.toDto(loginData),
    );

    return { token: data.sessiontoken };
  }
}
