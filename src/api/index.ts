import { QueryClient } from 'react-query';
import axios, { AxiosInstance } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

/**
 * TODO: CHANGE BASE URL.
 */
export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VNDBRE_PROXY_BASEURL as string,
});
