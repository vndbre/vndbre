import React, { lazy } from 'react';
import { RouteObject } from 'react-router';
import { RedirectLegacyPath } from '../../routes/components';

const VisualNovelPage = lazy(() => import('./pages').then(module => ({ default: module.VisualNovelPage })));
const OverviewPage = lazy(() => import('./pages').then(module => ({ default: module.OverviewPage })));
const ReleasesPage = lazy(() => import('./pages').then(module => ({ default: module.ReleasesPage })));
const MediaPage = lazy(() => import('./pages').then(module => ({ default: module.MediaPage })));
const RelationsPage = lazy(() => import('./pages').then(module => ({ default: module.RelationsPage })));
const CharactersPage = lazy(() => import('./pages').then(module => ({ default: module.CharactersPage })));

export const visualNovelRoutes: RouteObject[] = [
  {
    path: 'vn/:id',
    element: <VisualNovelPage />,
    caseSensitive: true,
    children: [
      {
        path: '',
        element: <OverviewPage />,
        caseSensitive: false,
      },
      {
        path: 'releases',
        element: <ReleasesPage />,
        caseSensitive: true,
      },
      {
        path: 'relations',
        element: <RelationsPage />,
      },
      {
        path: 'characters',
        element: <CharactersPage />,
        caseSensitive: true,
      },
      {
        path: 'media',
        element: <MediaPage />,
        caseSensitive: true,
      },
    ],
  },
  {
    path: 'v:id',
    element: <RedirectLegacyPath to="vn" />,
  },
];
