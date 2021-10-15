import React from 'react';
import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import { testRoutes } from '../features/Test/routes';
import { visualNovelRoutes } from '../features/VisualNovel/routes';

/**
 * Creates root router for app navigation.
 * @param isUserLoggedIn Is current user logged in or not.
 */
export const router = (isUserLoggedIn: boolean): PartialRouteObject[] => [
  ...testRoutes(isUserLoggedIn),
  ...visualNovelRoutes(),
  {
    path: '',
    element: <Navigate to="/test" />,
  },
];
