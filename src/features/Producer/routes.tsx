import React, { lazy } from 'react';
import { RouteObject } from 'react-router';

const ProducerPage = lazy(() => import('./pages').then(module => ({ default: module.ProducerPage })));

export const producerRoutes: RouteObject[] =
[
  {
    path: 'producer/:id',
    caseSensitive: true,
    element: <ProducerPage />,
  },
];
