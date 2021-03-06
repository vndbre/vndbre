export namespace LocalStorageService {

  /**
   * Saves data to storage.
   * @param key Key.
   * @param data Data for save.
   */
  export function save<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Gets item from storage.
   * @param key Key.
   * @returns Data from storage.
   */
  export function get<T = unknown>(key: string): T | null {
    const rawData = localStorage.getItem(key);
    if (rawData === null) {
      return null;
    }

    return JSON.parse(rawData) as T;
  }

  /**
   * Removes data from storage by key.
   * @param key Key.
   */
  export function remove(key: string): void {
    localStorage.removeItem(key);
  }
}
