import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SEPARATOR_SYMBOL = '%';

/**
 * Makes a string array out of search param.
 * Interprets an empty string as an empty array.
 * @param searchParam Search param.
 */
export function parseStringArrayFromSearchParam<T extends string>(searchParam: string): T[] {
  return searchParam.length === 0 ? [] : searchParam.split(',') as T[];
}

export type UseQueryParamsReturnType<T extends object> = [T, (data: T) => void];

/**
 * Wrapper for reading and writing objects via the URL query string.
 * @param toQueryParamsMapper Mapper for transforming an entity to query params.
 * @param fromQueryParamsMapper Mapper for transforming query params to an entity.
 */
export function useQueryParams<T extends object, U extends Record<string, string>>(
  toQueryParamsMapper: (data: T) => U,
  fromQueryParamsMapper: (queryParams: U) => T,
): UseQueryParamsReturnType<T> {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams) as U;
  const setQueryParams = useCallback((data: T) => {
    setSearchParams(toQueryParamsMapper(data));
  }, []);

  return [fromQueryParamsMapper(queryParams), setQueryParams];
}
