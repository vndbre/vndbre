import React, { VFC, createContext, ReactNode, useCallback, useMemo, useContext } from 'react';
import { AuthService } from '../api/services/authService';
import { LocalStorageService } from '../api/services/localStorageService';
import { useLocalStorage } from '../hooks';
import { AuthData } from '../models/authData';
import { assertNonNull } from '../utils/assertNonNull';
import { KEY_TOKEN, KEY_USERNAME } from '../utils/localStorageKeys';

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
  const { value: username, setValue: setUsername, removeValue: removeUsername } = useLocalStorage<string | null>(
    KEY_USERNAME, authContextInitialData.username,
  );
  const { value: token, setValue: setToken, removeValue: removeToken } = useLocalStorage<string | null>(
    KEY_TOKEN, authContextInitialData.token,
  );

  const login = useCallback(async(loginData: AuthData.Login) => {
    const { token: sessionToken } = await AuthService.login(loginData);
    setUsername(loginData.username);
    setToken(sessionToken);
  }, []);

  const logout = useCallback(async() => {
    await AuthService.logout();
    removeUsername(null);
    removeToken(null);
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
