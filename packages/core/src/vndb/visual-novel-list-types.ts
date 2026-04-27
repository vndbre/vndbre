import type { VndbFilterExpression } from "./types";

export type SortOrder = "asc" | "desc";

export type SortOptions<Field extends string> = {
  field: Field;
  order: SortOrder;
};

export type Range<T extends number | string> = {
  start: T;
  end: T;
};

export type VnFilterCombinationMode = "and" | "or";

export type VnMultiValueFilter<Value extends string> = {
  values: readonly Value[];
  mode?: VnFilterCombinationMode;
};

export type VnSortField = "title" | "released" | "popularity" | "rating" | "votecount" | "length";

export type VnLength = 1 | 2 | 3 | 4 | 5;

export type VnDevelopmentStatus = 0 | 1 | 2;

export type VnListOptions = {
  id?: string;
  search?: string;
  languages?: VnMultiValueFilter<string> | readonly string[];
  originalLanguage?: string;
  platforms?: VnMultiValueFilter<string> | readonly string[];
  tags?: VnMultiValueFilter<string> | readonly string[];
  popularity?: Range<number>;
  rating?: Range<number>;
  length?: VnLength;
  released?: Range<number>;
  developmentStatus?: VnDevelopmentStatus;
  sort?: SortOptions<VnSortField>;
  page?: number;
  results?: number;
  expression?: VndbFilterExpression;
};
