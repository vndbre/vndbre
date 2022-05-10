import React, { VFC, useState, createContext, ReactNode, useCallback, useMemo, useContext } from 'react';
import { AuthService } from '../api/services/authService';
import { LocalStorageService } from '../api/services/localStorageService';
import { AuthData } from '../models/authData';
import { assertNonNull } from '../utils/assertNonNull';
import { KEY_TOKEN, KEY_USERNAME } from '../utils/localStorageKeys';

/** TODO (Panov A.): Come up with a way to handle auth errors. */
interface BaseAuthContext {

  /** Username of the user. */
  readonly username: string | null;

  /** Token. */
  readonly token: string | null;

  /** Logs the user in. */
  readonly login?: (loginData: AuthData.Login) => Promise<void>;

  /** Logs the user out. */
  readonly logout?: () => Promise<void>;
}

interface AuthContext extends BaseAuthContext {

  /** Whether the user is logged in or not. */
  readonly isLoggedIn: boolean;

  /** @inheritdoc */
  readonly login: (loginData: AuthData.Login) => Promise<void>;

  /** @inheritdoc */
  readonly logout: () => Promise<void>;
}

const authContextInitialData: BaseAuthContext = {
  username: LocalStorageService.get<string>(KEY_USERNAME),
  token: LocalStorageService.get<string>(KEY_TOKEN),
};

const authContext = createContext(authContextInitialData);

/** Auth provider. */
export const AuthProvider: VFC<{ readonly children: ReactNode; }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(authContextInitialData.username);
  const [token, setToken] = useState<string | null>(authContextInitialData.token);

  const login = useCallback(async(loginData: AuthData.Login) => {
    const { token: sessionToken } = await AuthService.login(loginData);
    LocalStorageService.save(KEY_USERNAME, loginData.username);
    LocalStorageService.save(KEY_TOKEN, sessionToken);
    setUsername(loginData.username);
    setToken(sessionToken);
  }, []);

  const logout = useCallback(async() => {
    await AuthService.logout();
    LocalStorageService.remove(KEY_USERNAME);
    LocalStorageService.remove(KEY_TOKEN);
    setUsername(null);
    setToken(null);
  }, []);

  const value = useMemo(() => ({
    username,
    token,
    login,
    logout,
    isLoggedIn: username != null && token != null,
  }), [username, token]);

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
};

/** Auth context hook. */
export const useAuthContext = (): AuthContext => {
  const { username, token, login, logout } = useContext(authContext);
  assertNonNull(login);
  assertNonNull(logout);

  return { username, token, login, logout, isLoggedIn: username != null && token != null };
};
