import React from 'react';
import { PartialRouteObject } from 'react-router';
import { OverviewPage } from './pages/OverviewPage/OverviewPage';
import { VisualNovelPage } from './pages/VisualNovelPage/VisualNovelPage';

/**
 * Creates routes for test module.
 */
export const visualNovelRoutes = (): PartialRouteObject[] => [
  {
    path: 'vn/:id',
    element: <VisualNovelPage />,
    children: [
      {
        path: 'overview',
        element: <OverviewPage />,
      },
    ],
  },
];
