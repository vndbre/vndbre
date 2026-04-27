export type VndbPage<T> = {
  results: T[];
  more: boolean;
  count?: number;
};

export const defaultVisualNovelListPageSize = 24;
