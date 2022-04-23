import React, { VFC, memo, ReactNode } from 'react';
import { Box, CircularProgress } from '@chakra-ui/react';
import { CircularProgress as theme } from '../../theme/components/external/CircularProgress';

interface Props {

  /** Is data loading. */
  readonly isLoading: boolean;

  /** Children node. */
  readonly children?: ReactNode;

  /** Whether loader should take full height. */
  readonly hasFullHeight?: boolean;
}

/**
 * Loading component.
 */
const LoadingComponent: VFC<Props> = ({ isLoading, children, hasFullHeight = false }) => (
  <>
    {isLoading ? (
      <Box
        py={4}
        w="full"
        h={hasFullHeight ? 'full' : undefined}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress isIndeterminate {...theme.baseStyle} />
      </Box>
    ) : children }
  </>
);

export const Loading = memo(LoadingComponent);
