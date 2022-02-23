import { QueryClient } from 'react-query';
import axios, { AxiosInstance } from 'axios';

export const queryClient = new QueryClient();

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
  Vndb = 'vndb',
  Tags = 'tags',
  Traits = 'traits',
}
