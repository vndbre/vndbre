import React, { lazy } from 'react';
import { RouteObject } from 'react-router';

const LoginPage = lazy(() => import('./pages').then(module => ({ default: module.LoginPage })));

export const authRoutes: RouteObject[] =
[
  {
    path: 'auth',
    caseSensitive: true,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
        caseSensitive: false,
      },
    ],
  },
];
