import axios, { AxiosInstance } from 'axios';
import { MutationCache, QueryClient } from 'react-query';
import { defaultFetchStrategy, defaultStaleTime } from './globalConfig';
import { authInterceptor } from './interceptors/authInterceptor';
import { Toast } from '../utils/toast';
import { errorInterceptor } from './interceptors/errorInterceptor';
import { AppError } from '../models/appError';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: defaultStaleTime,
      ...defaultFetchStrategy,
    },
  },
  mutationCache: new MutationCache({
    onError(error) {
      if (error instanceof AppError) {
        Toast.showErrorMessage(error.message);
      }
    },
  }),
});

/** Configured axios instance. */
export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VNDBRE_PROXY_BASEURL,
});

http.interceptors.request.use(authInterceptor);
http.interceptors.response.use(response => response, errorInterceptor);
