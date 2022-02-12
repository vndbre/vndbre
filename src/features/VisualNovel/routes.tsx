import React, { lazy } from 'react';
import { RouteObject } from 'react-router';

const VisualNovelPage = lazy(() => import('./pages').then(module => ({ default: module.VisualNovelPage })));
const OverviewPage = lazy(() => import('./pages').then(module => ({ default: module.OverviewPage })));
const ReleasesPage = lazy(() => import('./pages').then(module => ({ default: module.ReleasesPage })));
const MediaPage = lazy(() => import('./pages').then(module => ({ default: module.MediaPage })));

/**
 * Creates routes for test module.
 */
export const visualNovelRoutes: RouteObject[] = [
  {
    path: 'vn/:id',
    element: <VisualNovelPage />,
    children: [
      {
        path: '',
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
    ],
  },
];
