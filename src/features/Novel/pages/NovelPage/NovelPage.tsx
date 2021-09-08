import React, { FC } from 'react';
import { Outlet } from 'react-router';

/**
 * TODO: add comments.
 */
export const NovelPage: FC = () => (
  <div>
    Novel page
    <Outlet />
  </div>
);
