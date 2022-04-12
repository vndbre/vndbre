import React, { memo, ReactNode, VFC } from 'react';
import { Box } from '@chakra-ui/react';

interface Props {

  /** Title.  */
  readonly title?: string;

  /** Items. */
  readonly items: ReactNode;

  /** Items justify  direction. */
  readonly justify?: 'start' | 'end';
}

/** Card list info box. */
const CardDetailListComponent: VFC<Props> = ({ title, items, justify = 'start' }) => (
  <Box
    display="flex"
    flexDirection="column"
    gap={1}
  >
    {title && <Box fontWeight="semibold">{title}</Box>}
    <Box
      display="flex"
      gap={2}
      flexWrap="wrap"
      justifyContent={justify}
    >
      {items}
    </Box>
  </Box>
);

export const CardDetailList = memo(CardDetailListComponent);
