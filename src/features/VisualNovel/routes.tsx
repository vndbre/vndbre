import React from 'react';
import { Navigate, PartialRouteObject } from 'react-router';
import { OverviewPage, ReleasesPage, VisualNovelPage } from './pages';
import { MediaPage } from './pages/MediaPage/MediaPage';

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
        path: 'media',
        element: <MediaPage />,
      },
      {
        path: '',
        element: <Navigate to="overview" />,
      },
    ],
  },
];
