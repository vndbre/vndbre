import { QueryClient } from 'react-query';
import axios, { AxiosInstance } from 'axios';
import { defaultFetchStrategy, defaultStaleTime } from './globalConfig';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: defaultStaleTime,
      ...defaultFetchStrategy,
    },
  },
});

/**
 * Configured axios instance.
 */
export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VNDBRE_PROXY_BASEURL,
});

/**
 * Api proxy endpoints.
 */
export enum ApiProxyEndpoints {
  VNDB = 'vndb',
  Tags = 'tags',
  Traits = 'traits',
  Login = 'login',
}
