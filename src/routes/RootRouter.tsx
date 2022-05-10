import React, { VFC } from 'react';
import { RouteObject, useRoutes } from 'react-router';
import { Navigate } from 'react-router-dom';
import { authRoutes } from '../features/Auth/routes';
import { characterRoutes } from '../features/Character/routes';
import { producerRoutes } from '../features/Producer/routes';
import { searchRoutes } from '../features/Search/routes';
import { staffRoutes } from '../features/Staff/routes';
import { visualNovelRoutes } from '../features/VisualNovel/routes';
import { DefaultLayout } from '../layouts/DefaultLayout/DefaultLayout';
import { NotFoundPage } from './pages';

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
      {
        path: '*',
        element: <NotFoundPage />,
      },
      ...visualNovelRoutes,
      ...characterRoutes,
      ...searchRoutes,
      ...staffRoutes,
      ...producerRoutes,
      ...authRoutes,
    ],
  },
];

/** Root app router. */
export const RootRouter: VFC = () => useRoutes(routes);
