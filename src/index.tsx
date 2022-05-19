import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider, SettingsProvider } from './providers';
import { queryClient } from './api';
import { App } from './App';
import { theme } from './theme';

import 'focus-visible/dist/focus-visible';
import './theme/css/base.css';
import './theme/css/utilities.css';
import './theme/css/variables.css';

ReactDOM.render(
  <StrictMode>
    <Router>
      <SettingsProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ChakraProvider theme={theme}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </SettingsProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);
