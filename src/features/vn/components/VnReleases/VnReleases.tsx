'use client';

import type { FC } from 'react';
import React, { memo } from 'react';
import { useReleasesQuery } from '../../queries/releases';

/** Visual novel releases tab. */
const VnReleasesComponent: FC = () => {
  const { data, isLoading } = useReleasesQuery();

  if (isLoading) {
    return <div>loading releases</div>;
  }

  return (
    <div>
      <div>
        <code>{JSON.stringify(data, null, 2)}</code>
      </div>
    </div>
  );
};

export const VnReleases = memo(VnReleasesComponent);
