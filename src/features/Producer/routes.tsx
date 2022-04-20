import React, { lazy } from 'react';
import { RouteObject } from 'react-router';

const ProducerPage = lazy(() => import('./pages').then(module => ({ default: module.ProducerPage })));
const ReleasesPage = lazy(() => import('./pages').then(module => ({ default: module.ReleasesPage })));
const VisualNovelsPage = lazy(() => import('./pages').then(module => ({ default: module.VisualNovelsPage })));

export const producerRoutes: RouteObject[] =
[
  {
    path: 'producer/:id',
    caseSensitive: true,
    element: <ProducerPage />,
    children: [
      {
        path: '',
        element: <ReleasesPage />,
      },
      {
        path: 'vns',
        element: <VisualNovelsPage />,
      },
    ],
  },
];
