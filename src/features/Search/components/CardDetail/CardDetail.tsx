import React, { memo, ReactText, VFC } from 'react';
import { Box, Text } from '@chakra-ui/react';

interface Props {

  /** Title.  */
  readonly title: string;

  /** Text. */
  readonly text: ReactText;
}

/** Card detail. */
const CardDetailComponent: VFC<Props> = ({ title, text }) => (
  <Box
    display="flex"
    flexDirection="column"
    gap={1}
  >
    <Text fontSize="sm">{title}</Text>
    <Text fontWeight="semibold" whiteSpace="nowrap">{text}</Text>
  </Box>
);

export const CardDetail = memo(CardDetailComponent);
