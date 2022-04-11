import React, { memo, VFC } from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

/** Cover card skeleton. */
const CoverCardSkeletonComponent: VFC = () => (
  <Box
    display="flex"
    gap={4}
    flexDirection="column"
    w="100%"
  >
    <Skeleton
      h="100%"
      w="100%"
      style={{ aspectRatio: '5 / 7' }}
    />
    <SkeletonText mb={3} noOfLines={2} />
  </Box>
);

export const CoverCardSkeleton = memo(CoverCardSkeletonComponent);
