import { dehydrate } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import getQueryClient from 'src/api/getQueryClient';
import { VnHeader } from 'src/features/vn/components/VnHeader/VnHeader';
import { vnInfoQueryOptions } from 'src/features/vn/queries/vnInfo';
import { HydrateQueryProvider } from 'src/providers/HydrateQuery';

interface Params {
  params: { id: string; };
}

type Props = PropsWithChildren<Params>;

const VnLayout = async({ params, children }: Props) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(vnInfoQueryOptions(params.id));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateQueryProvider state={dehydratedState}>
      <div className="flex flex-col gap-6">
        <VnHeader vnId={params.id} />
        {children}
      </div>
    </HydrateQueryProvider>
  );
};

export default VnLayout;
