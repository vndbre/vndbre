import React, { lazy } from 'react';
import { RouteObject } from 'react-router';

const VisualNovelSearchPage = lazy(() => import('./pages').then(module => ({ default: module.VisualNovelSearchPage })));

export const searchRoutes: RouteObject[] = [
  {
    path: 'search',
    caseSensitive: true,
    children: [
      {
        path: 'vn',
        element: <VisualNovelSearchPage />,
        caseSensitive: false,
      },
    ],
  },
];
