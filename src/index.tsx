import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from './App';
import { queryClient } from './api';
import './theme/index.css';

ReactDOM.render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);
