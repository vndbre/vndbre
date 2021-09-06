import { QueryClient } from 'react-query';
import axios, { AxiosInstance } from 'axios';

export const queryClient = new QueryClient();

/**
 * TODO: CHANGE BASE URL.
 */
export const http: AxiosInstance = axios.create({
  baseURL: 'https://api.github.com/repos/tannerlinsley/react-query',
});
