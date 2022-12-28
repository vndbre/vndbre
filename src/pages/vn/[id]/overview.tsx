import type { GetServerSideProps } from 'next';
import { type NextPage } from 'next';
import { dehydrate } from '@tanstack/react-query';
import VnOverview from 'src/features/vn/pages/VnOverviewPage/VnOverviewPage';
import { overviewQueryOptions } from 'src/features/vn/queries/overview';
import { queryClient } from 'src/api/queryClient';

/** Get server side props. */
export const getServerSideProps: GetServerSideProps = async() => {
  await queryClient.prefetchQuery(overviewQueryOptions);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

/** Vn Overview page. */
const VnOverviewPage: NextPage = () => (
  <VnOverview />
);

export default VnOverviewPage;