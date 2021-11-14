import React, { FC } from 'react';
import { Outlet, useParams } from 'react-router';
import { VisualNovelTabs } from '../../components';

/**
 * TODO: add comments.
 */
export const NovelPage: FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Novel page</h1>
      <VisualNovelTabs id={id} />
      <Outlet />
    </div>
  );
};
