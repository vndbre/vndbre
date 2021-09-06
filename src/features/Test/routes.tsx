import React from 'react';
import { PartialRouteObject } from 'react-router';
import { GuardPage } from '../../components';
import { TestPage } from './pages/TestPage/TestPage';

/**
 * Creates routes for test module.
 * @param isUserLoggedIn Is current user logged in or not.
 */
export const testRoutes = (isUserLoggedIn: boolean): PartialRouteObject[] => [
  {
    path: 'test',
    element: isUserLoggedIn ? <TestPage /> : <GuardPage />,
  },
];
