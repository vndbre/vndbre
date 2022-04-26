import React, { StrictMode, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryParamProvider } from 'use-query-params';
import { SettingsProvider } from './providers';
import { queryClient } from './api';
import { App } from './App';
import { theme } from './theme';

import 'focus-visible/dist/focus-visible';
import './theme/css/base.css';
import './theme/css/utilities.css';
import './theme/css/variables.css';

/**
 * Work around until fixed.
 * {@link https://github.com/pbeshai/use-query-params/issues/108 Github issue}.
 * @param props Props.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const QueryParamRouteAdapter = ({ children }: any): any => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = useMemo(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      replace(to: any) {
        navigate(to, { replace: true, state: to.state });
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      push(to: any) {
        navigate(to, { replace: false, state: to.state });
      },
    }),
    [navigate],
  );
  return children({ history: adaptedHistory, location });
};

ReactDOM.render(
  <StrictMode>
    <Router>
      <QueryParamProvider ReactRouterRoute={QueryParamRouteAdapter}>
        <SettingsProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </QueryClientProvider>
        </SettingsProvider>
      </QueryParamProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);
