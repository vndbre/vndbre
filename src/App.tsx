import React, { VFC, Suspense } from 'react';
import { RootRouter } from './routes/RootRouter';
import { Loading } from './components';

/**
 * TODO: add comments.
 */
export const App: VFC = () => (
  <Suspense fallback={<Loading isLoading />}>
    <RootRouter />
  </Suspense>
);
