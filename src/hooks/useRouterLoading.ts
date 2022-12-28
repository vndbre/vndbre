import { Router } from 'next/router';
import { useState } from 'react';

/**
 * Checks if route navigation is in process.
 */
export const useRouterLoading = (): boolean => {
  const [isLoading, setIsLoading] = useState(false);

  Router.events.on('routeChangeStart', () => setIsLoading(true));
  Router.events.on('routeChangeComplete', () => setIsLoading(false));
  Router.events.on('routeChangeError', () => setIsLoading(false));

  return isLoading;
};
