import React, { memo, ReactNode, VFC } from 'react';
import { Box, Text } from '@chakra-ui/react';

interface Props {

  /** Title. */
  readonly title: string;

  /** Detail content. */
  readonly children: ReactNode;
}

/** Component with staff detail. */
const StaffDetailComponent: VFC<Props> = ({ title, children }) => (
  <Box>
    <Text as="span" fontWeight="bold">
      {title}
      :
      {' '}
    </Text>
    {children}
  </Box>
);

export const StaffDetail = memo(StaffDetailComponent);
