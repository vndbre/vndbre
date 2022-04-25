/**
 * Pagination meta info.
 */
export interface PaginationDto<T> {

  /** Pagination data. */
  readonly data: {

    /** Flag that shows if there is more data to fetch. */
    readonly more: boolean;

    /** Number of items in response. */
    readonly num: number;

    /** Array of items. */
    readonly items: readonly T[];
  };
}
export namespace PaginationDto {
  export function assume<T>(u: PaginationDto<unknown>, f : ((obj: unknown) => T)): PaginationDto<T> {
    return { ...u, data: { ...u.data, items: u.data.items.map(f) } };
  }
}
