import { useSuspenseQuery } from "@tanstack/react-query";

import { visualNovelDetailQueryOptions } from "./query-options";

export function useVisualNovel(id: string) {
  return useSuspenseQuery(visualNovelDetailQueryOptions(id));
}
