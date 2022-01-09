import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { SettingsProvider } from './providers';
import { App } from './App';
import { queryClient } from './api';

import { theme } from './theme';
import 'focus-visible/dist/focus-visible';
import './theme/css/base.css';
import './theme/css/utilities.css';

ReactDOM.render(
  <StrictMode>
    <Router>
      <SettingsProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </QueryClientProvider>
      </SettingsProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);
