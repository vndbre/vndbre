import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { memo } from 'react';
import { Poster } from 'src/components/Poster/Poster';
import { useVnOverviewQuery } from '../../queries/vnOverview';

/** Visual novel overview tab. */
const VnOverviewComponent: FC = () => {
  const { query: { id } } = useRouter();
  const { data, isLoading } = useVnOverviewQuery(String(id));

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
