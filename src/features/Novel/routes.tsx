import React from 'react';
import { PartialRouteObject } from 'react-router';
import { GuardPage } from '../../components';
import { TestPage } from '../Test/pages/TestPage/TestPage';
import { NovelPage } from './pages';

/**
 * Creates routes for test module.
 * @param isUserLoggedIn Is current user logged in or not.
 */
export const novelRoutes = (isUserLoggedIn: boolean): PartialRouteObject[] => [
  {
    path: 'vn',
    element: isUserLoggedIn ? <NovelPage /> : <GuardPage />,
    children: [
      {
        path: '',
        element: <TestPage />,
      },
      {
        path: 'releases',
        element: <TestPage />,
      },
      {
        path: 'characters',
        element: <TestPage />,
      },
      {
        path: 'relations',
        element: <TestPage />,
      },
      {
        path: 'discussions',
        element: <TestPage />,
      },
      {
        path: 'media',
        element: <TestPage />,
      },
    ],
  },
];
