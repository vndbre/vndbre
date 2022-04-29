import React, { lazy } from 'react';
import { RouteObject } from 'react-router';
import { RedirectLegacyPath } from '../../routes/components';

const CharacterPage = lazy(() => import('./pages').then(module => ({ default: module.CharacterPage })));

export const characterRoutes: RouteObject[] =
[
  {
    path: 'character/:id',
    caseSensitive: true,
    element: <CharacterPage />,
  },
  {
    path: 'c:id',
    element: <RedirectLegacyPath to="character" />,
  },
];
