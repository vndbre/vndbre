import React, { lazy } from 'react';
import { RouteObject } from 'react-router';
import { RedirectLegacyPath } from '../../routes/components';

const StaffPage = lazy(() => import('./pages').then(module => ({ default: module.StaffPage })));

export const staffRoutes: RouteObject[] =
[
  {
    path: 'staff/:id',
    caseSensitive: true,
    element: <StaffPage />,
  },
  {
    path: 's:id',
    element: <RedirectLegacyPath to="staff" />,
  },
];
