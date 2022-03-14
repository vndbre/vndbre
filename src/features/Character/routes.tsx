import React, { lazy } from 'react';
import { RouteObject } from 'react-router';

const CharacterPage = lazy(() => import('./pages').then(module => ({ default: module.CharacterPage })));

export const characterRoutes: RouteObject[] =
[
  {
    path: 'character/:id',
    caseSensitive: true,
    element: <CharacterPage />,
  },
];
