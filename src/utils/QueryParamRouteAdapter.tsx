/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Work around until fixed.
 *
 * Https://github.com/pbeshai/use-query-params/issues/108.
 *
 * This is the main thing you need to use to adapt the react-router v6
 * API to what use-query-params expects.
 *
 * Pass this as the `ReactRouterRoute` prop to QueryParamProvider.
 */
export const QueryParamRouteAdapter = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = useMemo(
    () => ({
      replace(to: any) {
        navigate(to, { replace: true, state: to.state });
      },
      push(to: any) {
        navigate(to, { replace: false, state: to.state });
      },
    }),
    [navigate],
  );
  return children({ history: adaptedHistory, location });
};
