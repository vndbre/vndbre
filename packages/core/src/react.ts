import { useMemo } from "react";

import { createApiClient, type ApiClientOptions } from "./api-client";

export function useApiClient(options: ApiClientOptions) {
  const { baseUrl, fetcher, headers } = options;

  return useMemo(() => createApiClient({ baseUrl, fetcher, headers }), [baseUrl, fetcher, headers]);
}
export {
  useInfiniteVisualNovelList,
  useSuspenseVisualNovelList,
  useVisualNovel,
  useVisualNovelList,
} from "./vndb/hooks";
