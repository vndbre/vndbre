import { QueryClient } from 'react-query';
import axios, { AxiosInstance } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

/**
 * TODO: CHANGE BASE URL.
 */
export const http: AxiosInstance = axios.create({
  baseURL: 'https://vndbre-proxy.azurewebsites.net/api/v1/',
});
