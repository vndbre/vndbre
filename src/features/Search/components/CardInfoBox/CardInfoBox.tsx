import React, { memo, VFC } from 'react';
import { Box } from '@chakra-ui/react';

interface Props {

  /** Title.  */
  readonly title: string;

  /** Text. */
  readonly text: string | number;
}

/** Card info box. */
const CardInfoBoxComponent: VFC<Props> = ({ title, text }) => (
  <Box
    display="flex"
    flexDirection="column"
    gap={1}
  >
    <Box fontSize="sm">{title}</Box>
    <Box fontWeight="semibold" whiteSpace="nowrap">{text}</Box>
  </Box>
);

export const CardInfoBox = memo(CardInfoBoxComponent);
