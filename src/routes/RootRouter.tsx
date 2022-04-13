import React, { VFC } from 'react';
import { RouteObject, useRoutes } from 'react-router';
import { Navigate } from 'react-router-dom';
import { characterRoutes } from '../features/Character/routes';
import { searchRoutes } from '../features/Search/routes';
import { staffRoutes } from '../features/Staff/routes';
import { visualNovelRoutes } from '../features/VisualNovel/routes';
import { DefaultLayout } from '../layouts/DefaultLayout/DefaultLayout';

/**
 * Root router for app navigation.
 */
const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    caseSensitive: true,
    children: [
      {
        path: '/',
        caseSensitive: true,

        /**
         * TODO: change redirection path.
         */
        element: <Navigate to="/vn/7/" />,
      },
      ...visualNovelRoutes,
      ...characterRoutes,
      ...searchRoutes,
      ...staffRoutes,
    ],
  },
];

/** Root app router. */
export const RootRouter: VFC = () => useRoutes(routes);
