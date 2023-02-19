import type { InfiniteData } from '@tanstack/react-query';
import type { Pagination } from '../models/pagination';

export namespace PaginationService {

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
}
