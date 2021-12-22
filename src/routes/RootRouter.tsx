import React from 'react';
import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import { visualNovelRoutes } from '../features/VisualNovel/routes';
import { testRoutes } from '../features/Test/routes';
import { DefaultLayout } from '../layouts/DefaultLayout/DefaultLayout';

/**
 * Creates root router for app navigation.
 * @param isUserLoggedIn Is current user logged in or not.
 */
export const router = (isUserLoggedIn: boolean): PartialRouteObject[] => [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',

        /**
         * TODO: change redirection path.
         */
        element: <Navigate to="/vn/7/" />,
      },
      ...testRoutes(isUserLoggedIn),
      ...visualNovelRoutes(),
    ],
  },
];
