import type { createJSONStorage } from 'jotai/utils';
import Cookies from 'js-cookie';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export type Storage<T> = ReturnType<typeof createJSONStorage<T>>;

export namespace CookieStorage {

  /** Creates cookie storage. */
  export function createStorage<T>(): Storage<T> {
    return {
      getItem(key: string) {
        const data = Cookies.get(key);
        if (data !== undefined) {
          return JSON.parse(data);
        }
        return null;
      },
      setItem(key: string, newValue: T) {
        Cookies.set(key, JSON.stringify(newValue));
      },
      removeItem(key: string) {
        Cookies.remove(key);
      },
    };
  }

  /**
   * Gets value from cookies by key or from server-side value.
   * @param key Key.
   * @param initialValue Initial value, in case if there is no corresponding cookie.
   * @param serverSideCookieStore Server side store for cookies.
   */
  export function getCookieValue<T>(
    key: string,
    initialValue: T,
    serverSideCookieStore?: ReadonlyRequestCookies,
  ): T {
    const data = serverSideCookieStore === undefined
      ? Cookies.get(key)
      : serverSideCookieStore.get(key)?.value;

    try {
      const value = JSON.parse(data ?? '');
      return value;
    } catch {
      return initialValue;
    }
  }
}
