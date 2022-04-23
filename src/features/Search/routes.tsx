import React, { lazy } from 'react';
import { RouteObject } from 'react-router';
import { CharacterSearchPage } from './pages/CharacterSearchPage/CharacterSearchPage';

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
      {
        path: 'character',
        element: <CharacterSearchPage />,
        caseSensitive: false,
      },
    ],
  },
];
