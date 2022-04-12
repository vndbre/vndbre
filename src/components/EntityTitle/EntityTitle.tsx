import React, { memo, VFC } from 'react';
import { Box, Heading } from '@chakra-ui/react';

interface Props {

  /** Title. */
  readonly title: string;

  /** Title in original language. */
  readonly originalTitle: string | null;
}

/** Component with entity title. */
const EntityTitleComponent: VFC<Props> = ({ title, originalTitle }) => (
  <Box>
    <Heading as="h1" size="md">
      {title}
    </Heading>
    <Heading as="h2" size="sm" fontWeight="normal">
      {originalTitle}
    </Heading>
  </Box>
);

export const EntityTitle = memo(EntityTitleComponent);
