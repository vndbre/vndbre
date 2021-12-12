import React, { VFC, memo, ReactNode } from 'react';
import { Box, CircularProgress } from '@chakra-ui/react';
import { CircularProgress as theme } from '../../theme/components/CircularProgress';

interface Props {

  /** Is data loading. */
  isLoading: boolean;

  /** Children node. */
  children: ReactNode;
}

/**
 * Loading component.
 */
const LoadingComponent: VFC<Props> = ({ isLoading, children }) => (
  <>
    {isLoading ? (
      <Box h="full" w="full" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress isIndeterminate {...theme.baseStyle} />
      </Box>
    ) : children }
  </>
);

export const Loading = memo(LoadingComponent);
