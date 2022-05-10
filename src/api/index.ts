import { QueryClient } from 'react-query';
import axios, { AxiosInstance } from 'axios';
import { defaultFetchStrategy, defaultStaleTime } from './globalConfig';
import { authInterceptor } from './interceptors/authInterceptor';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: defaultStaleTime,
      ...defaultFetchStrategy,
    },
  },
});

/** Configured axios instance. */
export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VNDBRE_PROXY_BASEURL,
});

http.interceptors.request.use(authInterceptor);
