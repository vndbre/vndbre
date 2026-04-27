import { createVndbClient } from "./client";
import { and, combine, filter } from "./query-builder";
import type {
  VndbFilterCondition,
  VndbFilterExpression,
  VndbImage,
  VndbQueryRequest,
  VndbTag,
} from "./types";
import type { VndbPage } from "./pagination";
import type {
  Range,
  SortOptions,
  VnDevelopmentStatus,
  VnFilterCombinationMode,
  VnLength,
  VnListOptions,
  VnMultiValueFilter,
  VnSortField,
} from "./visual-novel-list-types";

export const visualNovelListFields = [
  "id",
  "title",
  "alttitle",
  "released",
  "rating",
  "votecount",
  "popularity",
  "length",
  "length_minutes",
  "devstatus",
  "languages",
  "platforms",
  "image{id,url,dims,sexual,violence,votecount}",
  "tags{id,name,category,rating,spoiler,lie}",
].join(",");

export type VnListItem = {
  id: string;
  title: string;
  alttitle: string | null;
  released: string | null;
  rating: number | null;
  votecount: number;
  popularity: number;
  length: VnLength | null;
  length_minutes: number | null;
  devstatus: VnDevelopmentStatus;
  languages: string[];
  platforms: string[];
  image: VndbImage | null;
  tags: VndbTag[];
};

type VnFilterField =
  | "id"
  | "search"
  | "lang"
  | "olang"
  | "platform"
  | "tag"
  | "released"
  | "popularity"
  | "rating"
  | "length"
  | "devstatus";

type VnFilterCondition = VndbFilterCondition<VnFilterField, string | number>;

export function createVisualNovelListRequest(options: VnListOptions): VndbQueryRequest {
  const filters = createVisualNovelListFilterExpression(options);

  return {
    fields: visualNovelListFields,
    filters,
    sort: options.sort?.field,
    reverse: options.sort?.order === "desc",
    page: options.page,
    results: options.results,
    count: options.page !== undefined,
  };
}

export function createVisualNovelListFilterExpression(options: VnListOptions) {
  const languages = normalizeMultiValueFilter(options.languages);
  const platforms = normalizeMultiValueFilter(options.platforms);
  const tags = normalizeMultiValueFilter(options.tags);
  const expressions = compactExpressions<VnFilterCondition>([
    stringFilter("id", options.id),
    stringFilter("search", options.search),
    stringFilter("olang", options.originalLanguage),
    multiValueFilter("lang", languages),
    multiValueFilter("platform", platforms),
    multiValueFilter("tag", tags),
    rangeFilter("released", options.released),
    rangeFilter("popularity", options.popularity),
    rangeFilter("rating", options.rating),
    numericFilter("length", options.length),
    numericFilter("devstatus", options.developmentStatus),
    options.expression as VndbFilterExpression<VnFilterCondition> | undefined,
  ]);

  return and<VnFilterCondition>(...expressions);
}

export async function getVisualNovelList(options: VnListOptions = {}) {
  const client = createVndbClient();
  const request = createVisualNovelListRequest(options);

  return client.post<VndbPage<VnListItem>>("/vn", request);
}

export function normalizeVisualNovelListOptions(options: VnListOptions = {}): VnListOptions {
  return {
    ...options,
    id: normalizeString(options.id),
    search: normalizeString(options.search),
    originalLanguage: normalizeString(options.originalLanguage),
    languages: normalizeMultiValueFilter(options.languages),
    platforms: normalizeMultiValueFilter(options.platforms),
    tags: normalizeMultiValueFilter(options.tags),
    sort: normalizeSort(options.sort),
    expression: options.expression,
  };
}

function stringFilter(
  field: VnFilterField,
  value: string | undefined,
): VndbFilterExpression<VnFilterCondition> | undefined {
  const normalizedValue = normalizeString(value);

  return normalizedValue === undefined ? undefined : filter(field, "=", normalizedValue);
}

function numericFilter(
  field: VnFilterField,
  value: number | undefined,
): VndbFilterExpression<VnFilterCondition> | undefined {
  return value === undefined ? undefined : filter(field, "=", value);
}

function rangeFilter(
  field: VnFilterField,
  range: Range<number> | undefined,
): VndbFilterExpression<VnFilterCondition> | undefined {
  if (range === undefined) {
    return undefined;
  }

  return and<VnFilterCondition>(filter(field, ">=", range.start), filter(field, "<=", range.end));
}

function multiValueFilter(
  field: VnFilterField,
  value: VnMultiValueFilter<string> | undefined,
): VndbFilterExpression<VnFilterCondition> | undefined {
  if (value === undefined || value.values.length === 0) {
    return undefined;
  }

  const filters: VnFilterCondition[] = value.values.map((item) => filter(field, "=", item));

  return combine<VnFilterCondition>(value.mode ?? "and", filters);
}

function normalizeString(value: string | undefined) {
  const trimmedValue = value?.trim();

  return trimmedValue === undefined || trimmedValue.length === 0 ? undefined : trimmedValue;
}

function normalizeMultiValueFilter(
  value: VnMultiValueFilter<string> | readonly string[] | undefined,
) {
  if (value === undefined) {
    return undefined;
  }

  if (isStringArray(value)) {
    const values = value
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .toSorted();

    return values.length === 0 ? undefined : { mode: "and" as const, values };
  }

  const mode: VnFilterCombinationMode = value.mode ?? "and";
  const values = value.values
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .toSorted();

  return values.length === 0 ? undefined : { mode, values };
}

function isStringArray(
  value: VnMultiValueFilter<string> | readonly string[],
): value is readonly string[] {
  return Array.isArray(value);
}

function normalizeSort(sort: SortOptions<VnSortField> | undefined) {
  if (sort === undefined) {
    return undefined;
  }

  return {
    field: sort.field,
    order: sort.order,
  };
}

function compactExpressions<Condition extends VndbFilterCondition>(
  expressions: Array<VndbFilterExpression<Condition> | undefined>,
) {
  return expressions.filter((expression) => expression !== undefined);
}
