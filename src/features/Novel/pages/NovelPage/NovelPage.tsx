import React, { FC } from 'react';
import { Outlet, useParams } from 'react-router';
import { NovelTabs } from '../../components';

/**
 * TODO: add comments.
 */
export const NovelPage: FC = () => {
  const { id } = useParams();

  return (
    <div>
      Novel page
      <NovelTabs id={id} />
      <Outlet />
    </div>
  );
};
