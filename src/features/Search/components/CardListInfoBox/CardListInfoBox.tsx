import React, { memo, ReactNode, VFC } from 'react';
import { Box } from '@chakra-ui/react';

interface Props {

  /** Title.  */
  readonly title: string;

  /** Items. */
  readonly items: ReactNode;
}

/** Card info box. */
const CardListInfoBoxComponent: VFC<Props> = ({ title, items }) => (
  <Box
    display="flex"
    flexDirection="column"
    gap={1}
  >
    <Box fontWeight="semibold">{title}</Box>
    <Box
      display="flex"
      gap={2}
      flexWrap="wrap"
    >
      {items}
    </Box>
  </Box>
);

export const CardListInfoBox = memo(CardListInfoBoxComponent);
