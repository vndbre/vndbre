import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import {
  QueryParamProvider,
} from 'use-query-params';
import { SettingsProvider } from './providers';
import { App } from './App';
import { queryClient } from './api';

import { theme } from './theme';
import 'focus-visible/dist/focus-visible';
import './theme/css/base.css';
import './theme/css/utilities.css';
import './theme/css/variables.css';

/**
 * This is the main thing you need to use to adapt the react-router v6
 * API to what use-query-params expects.
 *
 * Pass this as the `ReactRouterRoute` prop to QueryParamProvider.
 */
const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate],
  );
  return children({ history: adaptedHistory, location });
};

ReactDOM.render(
  <StrictMode>
    <Router>
      <QueryParamProvider
        ReactRouterRoute={RouteAdapter}
      >
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
