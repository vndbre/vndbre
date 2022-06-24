import { VisualNovelSearchOptions as SearchOptions, VisualNovelSortField } from '../../../api/services/visualNovelsService';
import { parseStringArrayFromSearchParam, SEPARATOR_SYMBOL, useQueryParams, UseQueryParamsReturnType } from '../../../hooks/useQueryParams';
import { SortType } from '../../../models/sortOptions';
import { Tag } from '../../../models/tag';
import { SelectOption } from '../../../utils/selectOption';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type VisualNovelSearchQueryParams = {
  readonly page?: string;
  readonly search?: string;
  readonly languages?: string;
  readonly originalLanguages?: string;
  readonly platforms?: string;
  readonly startYear?: string;
  readonly endYear?: string;
  readonly tags?: string;
  readonly sortField?: string;
  readonly sortDirection?: string;
};

type VisualNovelSearchOptions = Partial<SearchOptions> & { readonly tagOptions?: readonly SelectOption<Tag['id']>[]; };

/**
 * Maps query params from visual novel search options.
 * @param data Search options.
 */
function mapQueryParamsFromSearchOptions(data: VisualNovelSearchOptions): VisualNovelSearchQueryParams {
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
    ...(data.tagOptions == null ? null : {
      tags: data.tagOptions.map(option => [option.value, option.label].join(SEPARATOR_SYMBOL)).join(','),
    }),
    ...(data.sort == null) ? null : {
      sortField: data.sort.field,
      sortDirection: data.sort.type,
    },
  };
}

/**
 * Maps query params to visual novel search options.
 * @param queryParams Query params.
 */
function mapQueryParamsToSearchOptions(queryParams: VisualNovelSearchQueryParams): VisualNovelSearchOptions {
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
    ...(queryParams.tags == null ? null : {
      tagOptions: parseStringArrayFromSearchParam(queryParams.tags).map(tag => {
        const [value, label] = tag.split(SEPARATOR_SYMBOL);
        return SelectOption.create(Number(value), label);
      }),
    }),
    ...(queryParams.sortField != null && queryParams.sortDirection != null ? {
      sort: { type: queryParams.sortDirection as SortType, field: queryParams.sortField as VisualNovelSortField },
    } : null),
  };
}

/** Hook for reading/writing visual novel search data via query params. */
export function useVisualNovelQueryParams(): UseQueryParamsReturnType<VisualNovelSearchOptions> {
  const [queryParams, setQueryParams] = useQueryParams(mapQueryParamsFromSearchOptions, mapQueryParamsToSearchOptions);
  return [queryParams, setQueryParams];
}
