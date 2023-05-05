import { dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { queryClient } from 'src/api/queryClient';
import { VnReleasesPage } from 'src/features/vn/pages/VnReleasesPage/VnReleasesPage';
import { releasesQueryOptions } from 'src/features/vn/queries/releases';
import { nullify } from 'src/api/utils/nullify';

/** Get server side props. */
export const getServerSideProps: GetServerSideProps = async() => {
  await queryClient.prefetchQuery(releasesQueryOptions);

  return {
    props: {
      // Workaround for https://github.com/TanStack/query/issues/1458
      dehydratedState: nullify(dehydrate(queryClient)),
    },
  };
};

export default VnReleasesPage;
