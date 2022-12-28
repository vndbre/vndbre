import { dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { type NextPage } from 'next';
import { queryClient } from 'src/api/queryClient';
import VnReleases from 'src/features/vn/pages/VnReleasesPage/VnReleasesPage';
import { releasesQueryOptions } from 'src/features/vn/queries/releases';

/** Get server side props. */
export const getServerSideProps: GetServerSideProps = async() => {
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
