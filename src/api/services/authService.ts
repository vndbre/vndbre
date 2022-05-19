import { http } from '..';
import { AuthData } from '../../models/authData';
import { ApiProxyEndpoints } from '../apiProxyEndpoints';
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

  /** Logs the user out. */
  export async function logout(): Promise<void> {
    await http.post<void>(ApiProxyEndpoints.Logout);
  }
}
