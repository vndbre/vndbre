import { dehydrate } from '@tanstack/react-query';
import getQueryClient from 'src/api/getQueryClient';
import { VnReleases } from 'src/features/vn/components/VnReleases/VnReleases';
import { releasesQueryOptions } from 'src/features/vn/queries/releases';
import { HydrateQueryProvider } from 'src/providers/HydrateQuery';

const VnReleasesPage = async() => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(releasesQueryOptions);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateQueryProvider state={dehydratedState}>
      <VnReleases />
    </HydrateQueryProvider>
  );
};

export default VnReleasesPage;
