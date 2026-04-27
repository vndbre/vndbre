import { useInfiniteQuery, useQuery, useSuspenseQuery } from "@tanstack/react-query";

import {
  infiniteVisualNovelListQueryOptions,
  visualNovelDetailQueryOptions,
  visualNovelListQueryOptions,
} from "./query-options";
import type { VnListOptions } from "./visual-novel-list-types";

export function useVisualNovel(id: string) {
  return useSuspenseQuery(visualNovelDetailQueryOptions(id));
}

export function useVisualNovelList(options: VnListOptions = {}) {
  return useQuery(visualNovelListQueryOptions(options));
}

export function useSuspenseVisualNovelList(options: VnListOptions = {}) {
  return useSuspenseQuery(visualNovelListQueryOptions(options));
}

export function useInfiniteVisualNovelList(options: VnListOptions = {}) {
  return useInfiniteQuery(infiniteVisualNovelListQueryOptions(options));
}
