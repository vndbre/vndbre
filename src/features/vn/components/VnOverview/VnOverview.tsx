'use client';

import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { memo } from 'react';
import { Poster } from 'src/components/Poster/Poster';
import { useVnOverviewQuery } from '../../queries/vnOverview';

interface Props {
  vnId: string;
}

/** Visual novel overview tab. */
const VnOverviewComponent: FC<Props> = ({ vnId }) => {
  const { data, isLoading } = useVnOverviewQuery(vnId);

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
