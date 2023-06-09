'use client';

import type { FC } from 'react';
import { memo } from 'react';
import { Poster } from '@/components/Poster/Poster';
import { useVnOverviewQuery } from '../../queries/vnOverview';

interface Props {

  /** Vn id. */
  readonly id: string;
}

/** Visual novel overview tab. */
const VnOverviewComponent: FC<Props> = ({ id }) => {
  const { data, isLoading } = useVnOverviewQuery(id);

  if (isLoading || data == null) {
    return <div>loading overview</div>;
  }

  return (
    <div>
      <div className="flex gap-8">
        {data.imageUrl && (
          <Poster
            priority
            className="w-64 shrink-0"
            src={data.imageUrl}
            alt={data.titleEnglish}
          />
        )}
        <div>
          <code>{JSON.stringify(data, null, 2)}</code>
        </div>
      </div>
    </div>
  );
};

export const VnOverview = memo(VnOverviewComponent);
