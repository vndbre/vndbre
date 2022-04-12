import React, { memo, VFC } from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import { CardDetailSkeleton } from '../CardDetail/CardDetailSkeleton';
import { CardDetailListSkeleton } from '../CardDetailList/CardDetailListSkeleton';

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
      p={4}
      display="flex"
      flexDirection="column"
      gap={8}
    >
      <SkeletonText noOfLines={1} my={2} w="69%" />
      <Box
        display="flex"
        gap={12}
      >
        <CardDetailSkeleton />
        <CardDetailSkeleton />
        <CardDetailSkeleton />
      </Box>
      <Box
        display="flex"
        gap={12}
      >
        <CardDetailListSkeleton />
        <CardDetailListSkeleton />
      </Box>
    </Box>
  </Box>
);

export const ExtendedCardSkeleton = memo(ExtendedCardSkeletonComponent);
