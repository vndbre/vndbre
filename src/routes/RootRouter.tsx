import React from 'react';
import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import { novelRoutes } from '../features/VisualNovel/routes';
import { testRoutes } from '../features/Test/routes';

/**
 * Creates root router for app navigation.
 * @param isUserLoggedIn Is current user logged in or not.
 */
export const router = (isUserLoggedIn: boolean): PartialRouteObject[] => [
  ...testRoutes(isUserLoggedIn),
  ...novelRoutes(isUserLoggedIn),
  {
    path: '/',

    /**
     * TODO: change redirection path.
     */
    element: <Navigate to="/vn/4/" />,
  },
];
