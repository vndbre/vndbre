import type { InfiniteData } from '@tanstack/react-query';

/** Pagination options. */
export interface Pagination<T> {

  /** Total count. */
  readonly count?: number;

  /** If there is more data to fetch. */
  readonly hasMore: boolean;

  /** Data. */
  readonly results: readonly T[];
}

export namespace Pagination {

  /**
   * Gets page data from infinite query results.
   * @param data Infinite query results data.
   * @param page Page.
   */
  export function getPageData<T>(data: InfiniteData<Pagination<T>>, page: number): T[] {
    const pageParam = data.pageParams.indexOf(page);
    const index = pageParam === -1 ? 0 : pageParam;
    return data.pages[index]?.results as T[] ?? [];
  }

  /**
   * Whether the latest page `hasMore` is true or not.
   * @param data Infinite query results data.
   */
  export function hasMore<T>(data: InfiniteData<Pagination<T>> | undefined): boolean {
    return Boolean(data?.pages.at(-1)?.hasMore);
  }

  /**
   * Checks if there is items in infinite query results.
   * @param data Infinite query results data.
   */
  export function getCount<T>(data: InfiniteData<Pagination<T>> | undefined): number {
    return data?.pages[0]?.count ?? 0;
  }
}
