import { dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/api/getQueryClient';
import { VnReleases } from '@/features/vn/components/VnReleases/VnReleases';
import { releasesQueryOptions } from '@/features/vn/queries/releases';
import { HydrateQueryProvider } from '@/providers/HydrateQuery';

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
