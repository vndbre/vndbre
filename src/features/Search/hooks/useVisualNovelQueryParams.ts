import { VisualNovelSearchOptions } from '../../../api/services/visualNovelsService';
import { parseStringArrayFromSearchParam, useQueryParams, UseQueryParamsReturnType } from '../../../hooks/useQueryParams';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type VisualNovelSearchQueryParams = {
  readonly page?: string;
  readonly search?: string;
  readonly languages?: string;
  readonly originalLanguages?: string;
  readonly platforms?: string;
  readonly startYear?: string;
  readonly endYear?: string;
};

/**
 * Maps query params from visual novel search options.
 * @param data Search options.
 */
function mapQueryParamsFromSearchOptions(data: Partial<VisualNovelSearchOptions>): VisualNovelSearchQueryParams {
  return {
    ...(data.page == null ? null : { page: data.page.toString() }),
    ...(data.search == null || data.search.length === 0 ? null : { search: data.search }),
    ...(data.languages == null || data.languages.length === 0 ? null : { languages: data.languages.join(',') }),
    ...(data.originalLanguages == null || data.originalLanguages.length === 0 ? null : {
      originalLanguages: data.originalLanguages.join(','),
    }),
    ...(data.platforms == null || data.platforms.length === 0 ? null : { platforms: data.platforms.join(',') }),
    ...(data.releasedRange == null || data.releasedRange.startDate == null ? null : {
      startYear: data.releasedRange.startDate.getFullYear().toString(),
    }),
    ...(data.releasedRange == null || data.releasedRange.endDate == null ? null : {
      endYear: data.releasedRange.endDate.getFullYear().toString(),
    }),
  };
}

/**
 * Maps query params to visual novel search options.
 * @param queryParams Query params.
 */
function mapQueryParamsToSearchOptions(queryParams: VisualNovelSearchQueryParams): Partial<VisualNovelSearchOptions> {
  return {
    ...(queryParams.page == null ? null : { page: Number(queryParams.page) }),
    ...(queryParams.search == null ? null : { search: queryParams.search }),
    ...(queryParams.languages == null ? null : { languages: parseStringArrayFromSearchParam(queryParams.languages) }),
    ...(queryParams.originalLanguages == null ? null : {
      originalLanguages: parseStringArrayFromSearchParam(queryParams.originalLanguages),
    }),
    ...(queryParams.platforms == null ? null : { platforms: parseStringArrayFromSearchParam(queryParams.platforms) }),
    ...(queryParams.startYear == null || queryParams.endYear == null ? undefined : {
      releasedRange: {
        startDate: new Date(queryParams.startYear),
        endDate: new Date(queryParams.endYear),
      },
    }),
  };
}

/** Hook for reading/writing visual novel search data via query params. */
export function useVisualNovelQueryParams(): UseQueryParamsReturnType<Partial<VisualNovelSearchOptions>> {
  const [queryParams, setQueryParams] = useQueryParams(mapQueryParamsFromSearchOptions, mapQueryParamsToSearchOptions);
  return [queryParams, setQueryParams];
}
