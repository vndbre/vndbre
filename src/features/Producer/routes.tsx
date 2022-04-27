import React, { lazy } from 'react';
import { RouteObject } from 'react-router';
import { RedirectLegacyPath } from '../../routes/components';

const ProducerPage = lazy(() => import('./pages').then(module => ({ default: module.ProducerPage })));

export const producerRoutes: RouteObject[] =
[
  {
    path: 'producer/:id',
    caseSensitive: true,
    element: <ProducerPage />,
  },
  {
    path: 'p:id',
    element: <RedirectLegacyPath to="producer" />,
  },
];
