import type { FC } from 'react';
import React, { memo, useState } from 'react';
import { Button } from 'src/components/Button/Button';
import { useReleasesQuery } from '../../queries/releases';

/** Visual novel releases tab. */
const VnReleasesComponent: FC = () => {
  const [count, setCount] = useState(0);

  const { data, isLoading } = useReleasesQuery();

  if (isLoading) {
    return <div>loading 2</div>;
  }

  return (
    <div>
      <div>Releases</div>
      <Button intent="secondary" onClick={() => setCount(v => v + 1)}>
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

export const VnReleases = memo(VnReleasesComponent);
