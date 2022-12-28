import { MutationCache, QueryClient } from '@tanstack/react-query';
import { defaultFetchStrategy, defaultStaleTime } from './globalConfig';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: defaultStaleTime,
      ...defaultFetchStrategy,
    },
  },
  mutationCache: new MutationCache(),
});
