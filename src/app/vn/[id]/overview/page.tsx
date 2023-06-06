import { dehydrate } from '@tanstack/react-query';
import getQueryClient from 'src/api/getQueryClient';
import { VnOverview } from 'src/features/vn/components/VnOverview/VnOverview';
import { vnOverviewQueryOptions } from 'src/features/vn/queries/vnOverview';
import type { VnRouteParams } from 'src/features/vn/routeParams';
import { HydrateQueryProvider } from 'src/providers/HydrateQuery';

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
