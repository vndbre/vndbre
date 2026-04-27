export type ApiClientOptions = {
  baseUrl: string;
  headers?: HeadersInit;
  fetcher?: typeof fetch;
};

export type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  headers?: HeadersInit;
};

export class ApiError extends Error {
  readonly response: Response;
  readonly body: unknown;

  constructor(response: Response, body: unknown) {
    super(`Request failed with ${response.status}`);
    this.name = "ApiError";
    this.response = response;
    this.body = body;
  }
}

export function createApiClient({ baseUrl, headers, fetcher = fetch }: ApiClientOptions) {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  async function request<T>(
    path: string,
    { body, headers: requestHeaders, ...init }: ApiRequestOptions = {},
  ): Promise<T> {
    const response = await fetcher(`${normalizedBaseUrl}${path}`, {
      ...init,
      headers: {
        accept: "application/json",
        ...(body === undefined ? undefined : { "content-type": "application/json" }),
        ...headers,
        ...requestHeaders,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    const text = await response.text();
    const data = text.length > 0 ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new ApiError(response, data);
    }

    return data as T;
  }

  return {
    get: <T>(path: string, options?: ApiRequestOptions) =>
      request<T>(path, { ...options, method: "GET" }),
    post: <T>(path: string, body: unknown, options?: ApiRequestOptions) =>
      request<T>(path, { ...options, method: "POST", body }),
    request,
  };
}
