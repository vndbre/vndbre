import React, { VFC } from 'react';
import { RouteObject, useRoutes } from 'react-router';
import { Navigate } from 'react-router-dom';
import { searchRoutes } from '../features/Search/routes';
import { visualNovelRoutes } from '../features/VisualNovel/routes';
import { DefaultLayout } from '../layouts/DefaultLayout/DefaultLayout';

/**
 * Creates root router for app navigation.
 * @param isUserLoggedIn Is current user logged in or not.
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
      ...searchRoutes,
    ],
  },
];

/** Root app router. */
export const RootRouter: VFC = () => useRoutes(routes);
