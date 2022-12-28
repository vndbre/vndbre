import type { FC } from 'react';
import React, { memo, useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import { useOverviewQuery } from '../../queries/overview';

/** Visual novel overview tab. */
const VnOverviewComponent: FC = () => {
  const [count, setCount] = useState(0);

  const { data, isLoading } = useOverviewQuery();

  if (isLoading) {
    return <div>loading 2</div>;
  }

  return (
    <div>
      <div>Overview</div>
      <Button onClick={() => setCount(v => v + 1)}>
        clicks
        {' '}
        {count}
      </Button>
      <div>
        <code>{JSON.stringify(data, null, 2)}</code>
      </div>
    </div>
  );
};

export const VnOverview = memo(VnOverviewComponent);
