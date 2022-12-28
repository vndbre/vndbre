import { dehydrate, MutationCache, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { type NextPage } from 'next';
import VnReleases from '../../../features/vn/pages/VnReleasesPage/VnReleasesPage';
import { releasesQueryOptions } from '../../../features/vn/queries/releases';

/** 10 minutes. */
export const defaultStaleTime = 10000 * 60;

/** Default fetch strategy for queries.  */
export const defaultFetchStrategy = {
  retry: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

/** Get server side props. */
export const getServerSideProps: GetServerSideProps = async() => {
  // const queryClient = new QueryClient();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: defaultStaleTime,
        ...defaultFetchStrategy,
      },
    },
    mutationCache: new MutationCache(),
  });
  await queryClient.prefetchQuery(releasesQueryOptions);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

/** Vn Releases page. */
const VnReleasesPage: NextPage = () => (
  <VnReleases />
);

export default VnReleasesPage;
