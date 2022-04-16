import React, { memo, ReactNode, VFC } from 'react';
import { Box, Text } from '@chakra-ui/react';

interface Props {

  /** Title. */
  readonly title?: string;

  /** Items. */
  readonly items: ReactNode;

  /** Items position alignment. */
  readonly alignment?: 'start' | 'end';
}

/** Card list info box. */
const CardDetailListComponent: VFC<Props> = ({ title, items, alignment = 'start' }) => (
  <Box
    display="flex"
    flexDirection="column"
    gap={1}
  >
    {title && <Text fontWeight="semibold">{title}</Text>}
    <Box
      display="flex"
      gap={2}
      flexWrap="wrap"
      justifyContent={alignment}
    >
      {items}
    </Box>
  </Box>
);

export const CardDetailList = memo(CardDetailListComponent);
