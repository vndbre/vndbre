import React from 'react';
import { Navigate, PartialRouteObject } from 'react-router';
import { OverviewPage, ReleasesPage, VisualNovelPage } from './pages';

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
      {
        path: 'releases',
        element: <ReleasesPage />,
      },
      {
        path: '',
        element: <Navigate to="overview" />,
      },
    ],
  },
];
