import { Router } from 'next/router';
import { useEffect, useState } from 'react';

/** Hook to checks whether route navigation is in process. */
export const useRouterLoading = (): boolean => {
  const [isLoading, setIsLoading] = useState(false);

  /** Enables loading. */
  const enableLoading = (): void => {
    setIsLoading(true);
  };

  /** Disables loading. */
  const disableLoading = (): void => {
    setIsLoading(false);
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', enableLoading);
    Router.events.on('routeChangeComplete', disableLoading);
    Router.events.on('routeChangeError', disableLoading);
    return () => {
      Router.events.off('routeChangeStart', enableLoading);
      Router.events.off('routeChangeComplete', disableLoading);
      Router.events.off('routeChangeError', disableLoading);
    };
  }, []);

  return isLoading;
};
