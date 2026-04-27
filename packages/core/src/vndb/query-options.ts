import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { defaultVisualNovelListPageSize } from "./pagination";
import { getVisualNovelList, normalizeVisualNovelListOptions } from "./visual-novel-list";
import { getVisualNovelById, normalizeVisualNovelId } from "./visual-novel";
import type { VnListOptions } from "./visual-novel-list-types";

export const visualNovelKeys = {
  all: ["visual-novel"] as const,
  detail: (id: string) => [...visualNovelKeys.all, "detail", normalizeVisualNovelId(id)] as const,
  lists: () => [...visualNovelKeys.all, "list"] as const,
  list: (options: VnListOptions) =>
    [...visualNovelKeys.lists(), normalizeVisualNovelListOptions(options)] as const,
};

export function visualNovelDetailQueryOptions(id: string) {
  const visualNovelId = normalizeVisualNovelId(id);

  return queryOptions({
    queryKey: visualNovelKeys.detail(visualNovelId),
    queryFn: () => getVisualNovelById(visualNovelId),
    staleTime: 30 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
}

export function visualNovelListQueryOptions(options: VnListOptions = {}) {
  const normalizedOptions = normalizeVisualNovelListOptions(options);

  return queryOptions({
    queryKey: visualNovelKeys.list(normalizedOptions),
    queryFn: () =>
      getVisualNovelList({
        ...normalizedOptions,
        page: normalizedOptions.page ?? 1,
        results: normalizedOptions.results ?? defaultVisualNovelListPageSize,
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

export function infiniteVisualNovelListQueryOptions(options: VnListOptions = {}) {
  const normalizedOptions = normalizeVisualNovelListOptions(options);

  return infiniteQueryOptions({
    queryKey: visualNovelKeys.list(normalizedOptions),
    queryFn: ({ pageParam }) =>
      getVisualNovelList({
        ...normalizedOptions,
        page: pageParam,
        results: normalizedOptions.results ?? defaultVisualNovelListPageSize,
      }),
    initialPageParam: normalizedOptions.page ?? 1,
    getNextPageParam: (lastPage, allPages) => (lastPage.more ? allPages.length + 1 : undefined),
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
