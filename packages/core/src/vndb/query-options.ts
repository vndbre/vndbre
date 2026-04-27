import { queryOptions } from "@tanstack/react-query";

import { getVisualNovelById, normalizeVisualNovelId } from "./visual-novel";

export const visualNovelKeys = {
  all: ["visual-novel"] as const,
  detail: (id: string) => [...visualNovelKeys.all, "detail", normalizeVisualNovelId(id)] as const,
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
