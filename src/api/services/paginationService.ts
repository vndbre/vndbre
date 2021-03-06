import { PaginationDto } from '../dtos/paginationDto';

export namespace PaginationService {
  type PaginatedFetchFunctionById<T> = (id: number, page: number) => Promise<PaginationDto<T>>;

  /**
   * Helper function to fetch paginated data to get more data from api.
   * @param id Id to fetch by.
   * @param fetchFunction Fetch function.
   */
  export async function fetchAllDataById<T>(id: number, fetchFunction: PaginatedFetchFunctionById<T>): Promise<T[]> {
    let currentPage = 1;
    let hasToFetchMore = true;
    const dataChunk = [];

    while (hasToFetchMore) {
      // eslint-disable-next-line no-await-in-loop
      const { data } = await fetchFunction(id, currentPage);
      dataChunk.push(data.items);
      if (data.more) {
        currentPage += 1;
      } else {
        hasToFetchMore = false;
      }
    }
    return dataChunk.flat();
  }
}
