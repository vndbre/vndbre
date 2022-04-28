import React, { VFC } from 'react';
import { VStack, Text } from '@chakra-ui/react';

/** Placeholder for non-existent routes. */
export const NotFoundPage: VFC = () => (
  <VStack h="full" justify="center">
    <Text fontSize="5xl" fontWeight="bold">404</Text>
    <Text fontSize="3xl">Page not found</Text>
  </VStack>
);
