import {
  DelimitedArrayParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
  QueryParamConfig,
  SetQuery,
} from 'use-query-params';
import { DateService } from '../../../../../api/services/dateService';
import { VisualNovelSearchOptions } from '../../../../../api/services/visualNovelsService';
import { Language } from '../../../../../models/language';
import { Platform } from '../../../../../models/platform';
import { checkIfArrayIsNonEmpty } from '../../../../../utils/checkIfArrayIsNonEmpty';

/** Uses a comma to delimit entries. */
const ReleasedRangeParam: QueryParamConfig<
VisualNovelSearchOptions['releasedRange'],
VisualNovelSearchOptions['releasedRange']
> = {
  encode(releasedRange) {
    return JSON.stringify({
      startDate: releasedRange?.startDate ? DateService.toISODate(releasedRange?.startDate) : null,
      endDate: releasedRange?.endDate ? DateService.toISODate(releasedRange?.endDate) : null,
    });
  },
  decode(str) {
    if (str == null || Array.isArray(str)) {
      return undefined;
    }
    try {
      const range = JSON.parse(str);
      return {
        startDate: range?.startDate != null ? new Date(range.startDate) : undefined,
        endDate: range?.endDate != null ? new Date(range.endDate) : undefined,
      };
    } catch (e: unknown) {
      return undefined;
    }
  },
};

// Didn't find better solution, rather than writing the same implementation with better typings.
type TypedArrayParam<T> = QueryParamConfig<readonly T[] | null | undefined, readonly T[] | null | undefined>;

const Schema = {
  page: withDefault(NumberParam, 1),
  search: withDefault(StringParam, undefined),
  languages: withDefault(DelimitedArrayParam as TypedArrayParam<Language>, undefined),
  originalLanguages: withDefault(DelimitedArrayParam as TypedArrayParam<Language>, undefined),
  platforms: withDefault(DelimitedArrayParam as TypedArrayParam<Platform>, undefined),
  releasedRange: withDefault(ReleasedRangeParam, undefined),
};

type SetVnQuery = SetQuery<typeof Schema>;
type SetVnQueryOptions = Parameters<SetVnQuery>[0];

type UseVisualNovelQueryParamsReturn = [
  Partial<VisualNovelSearchOptions>,
  SetVnQuery,
];

/**
 * Hook to handle query params for visual novel search page.
 */
export function useVisualNovelQueryParams(): UseVisualNovelQueryParamsReturn {
  const [query, setQuery] = useQueryParams(Schema);

  /**
   * Sets query params.
   * @param options Visual novel search options.
   */
  function setVnQuery(options: SetVnQueryOptions): void {
    if (typeof options === 'function') {
      return setQuery(options);
    }
    return setQuery({
      ...options,

      // `null` and `""` would be shown query, `undefined` don't.
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      search: options.search || undefined,
      languages: checkIfArrayIsNonEmpty(options.languages) ? options.languages : undefined,
      originalLanguages: checkIfArrayIsNonEmpty(options.originalLanguages) ? options.originalLanguages : undefined,
      platforms: checkIfArrayIsNonEmpty(options.platforms) ? options.platforms : undefined,
      releasedRange: options.releasedRange,
    });
  }

  return [
    query,
    setVnQuery,
  ];
}
