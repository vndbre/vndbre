import React, { memo, VFC } from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import { CardInfoBoxSkeleton } from '../CardInfoBox/CardInfoBoxSkeleton';
import { CardListInfoBoxSkeleton } from '../CardListInfoBox/CardListInfoBoxSkeleton';

/** Cover card skeleton. */
const ExtendedCardSkeletonComponent: VFC = () => (
  <Box
    display="flex"
    borderRadius="lg"
    overflow="hidden"
    backgroundColor="gray.100"
    h="full"
    maxH="320px"
  >
    <Skeleton
      style={{ aspectRatio: '5 / 7' }}
      h="300px"
    />
    <Box
      w="full"
      py={4}
      px={4}
      display="flex"
      flexDirection="column"
      gap={8}
    >
      <SkeletonText noOfLines={1} my={2} w="69%" />
      <Box
        display="flex"
        gap={12}
      >
        <CardInfoBoxSkeleton />
        <CardInfoBoxSkeleton />
        <CardInfoBoxSkeleton />
      </Box>
      <Box
        display="flex"
        gap={12}
      >
        <CardListInfoBoxSkeleton />
        <CardListInfoBoxSkeleton />
      </Box>
    </Box>
  </Box>
);

export const ExtendedCardSkeleton = memo(ExtendedCardSkeletonComponent);
