import React, { FC } from 'react';
import { useParams } from 'react-router';
import { useReleasesQuery } from '../../queries';

/**
 * Releases page.
 */
export const ReleasesPage: FC = () => {
  const { id } = useParams();

  const {
    isLoading: isReleasesLoading,
    error: releasesError,
    data: releases,
  } = useReleasesQuery(id);

  if (isReleasesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      test
    </div>
  );
};
