import { dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/api/getQueryClient';
import { VnOverview } from '@/features/vn/components/VnOverview/VnOverview';
import { vnOverviewQueryOptions } from '@/features/vn/queries/vnOverview';
import type { VnRouteParams } from '@/features/vn/routeParams';
import { HydrateQueryProvider } from '@/providers/HydrateQuery';

const VnOverviewPage = async({ params }: VnRouteParams) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(vnOverviewQueryOptions(params.id));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateQueryProvider state={dehydratedState}>
      <VnOverview id={params.id} />
    </HydrateQueryProvider>
  );
};

export default VnOverviewPage;
