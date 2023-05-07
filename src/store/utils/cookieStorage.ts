import type { createJSONStorage } from 'jotai/utils';
import Cookies from 'js-cookie';

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
   * @param serverSideCookieValue Value of server side cookie.
   */
  export function getCookieValue<T>(
    key: string,
    initialValue: T,
    serverSideCookieValue?: string,
  ): T {
    const data = serverSideCookieValue === undefined ? Cookies.get(key) : serverSideCookieValue;

    try {
      const value = JSON.parse(data ?? '');
      return value;
    } catch {
      return initialValue;
    }
  }
}
