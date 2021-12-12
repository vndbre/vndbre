import React, { VFC, memo } from 'react';
import { Box } from '@chakra-ui/react';

interface Props {

  /** Is data loading. */
  error: Error;

}

/**
 * Error component.
 */
const ErrorComponent: VFC<Props> = ({ error }) => (
  <Box h="full" w="full" display="flex" alignItems="center" justifyContent="center">
    {error.message}
  </Box>
);

export const Error = memo(ErrorComponent);
