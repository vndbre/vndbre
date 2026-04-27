import { createApiClient } from "../api-client";

export const vndbApiBaseUrl = "https://api.vndb.org/kana";

export function createVndbClient() {
  return createApiClient({
    baseUrl: vndbApiBaseUrl,
    headers: {
      "content-type": "application/json",
    },
  });
}
