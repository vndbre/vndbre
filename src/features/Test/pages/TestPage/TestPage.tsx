import React, { FC } from 'react';
import { Stack, Button } from '@chakra-ui/react';

/**
 * TODO: add comments.
 */
export const TestPage: FC = () => (
  <div>
    TEST PAGE
    <Stack direction="row" spacing={4} align="center">
      <Button colorScheme="telegram" variant="solid">
        Button
      </Button>
      <Button colorScheme="teal" variant="outline">
        Button
      </Button>
      <Button colorScheme="teal" variant="ghost">
        Button
      </Button>
      <Button colorScheme="teal" variant="link">
        Button
      </Button>
    </Stack>
  </div>
);
