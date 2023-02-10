export namespace PaginationService {
  export async function getAllData<T>(queryBuilderFn: (options: T) => Promise<unknown>);
}
