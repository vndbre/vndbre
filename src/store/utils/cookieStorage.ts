import type { createJSONStorage } from 'jotai/utils';
import Cookies from 'js-cookie';
import cookie from 'cookie';
import type { IncomingMessage } from 'http';
import type { CookieListItem } from 'next/dist/compiled/@edge-runtime/cookies';

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
   * Gets value from cookies by key.
   * @param key Key.
   * @param initialValue Initial value, in case if there is no corresponding cookie.
   * @param req Request(for retrieving server-side cookies).
   * @param cookieItem App dir cookies.
   */
  export function getCookieValue<T>(
    key: string,
    initialValue: T,
    req?: IncomingMessage,
    cookieItem?: CookieListItem,
  ): T {
    let data: string | undefined;
    if (req === undefined && cookieItem === undefined) {
      data = Cookies.get(key);
    } else {
      data = req ? cookie.parse(req.headers.cookie ?? '')[key] : cookieItem?.value;
    }

    if (data !== undefined) {
      return JSON.parse(data);
    }

    return initialValue;
  }
}
