import { CharacterSearchOptions } from '../../../api/services/charactersService';
import { useQueryParams, UseQueryParamsReturnType } from '../../../hooks/useQueryParams';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type CharacterSearchQueryParams = {
  readonly page?: string;
  readonly search?: string;
};

/**
 * Maps query params from character search options.
 * @param data Search options.
 */
function mapQueryParamsFromSearchOptions(data: Partial<CharacterSearchOptions>): CharacterSearchQueryParams {
  return {
    ...(data.page == null ? null : { page: data.page.toString() }),
    ...(data.search == null || data.search.length === 0 ? null : { search: data.search }),
  };
}

/**
 * Maps query params to character search options.
 * @param queryParams Query params.
 */
function mapQueryParamsToSearchOptions(queryParams: CharacterSearchQueryParams): Partial<CharacterSearchOptions> {
  return {
    ...(queryParams.page == null ? null : { page: Number(queryParams.page) }),
    ...(queryParams.search == null ? null : { search: queryParams.search }),
  };
}

/** Hook for reading/writing character search data via query params. */
export function useCharacterQueryParams(): UseQueryParamsReturnType<Partial<CharacterSearchOptions>> {
  const [queryParams, setQueryParams] = useQueryParams(mapQueryParamsFromSearchOptions, mapQueryParamsToSearchOptions);
  return [queryParams, setQueryParams];
}
