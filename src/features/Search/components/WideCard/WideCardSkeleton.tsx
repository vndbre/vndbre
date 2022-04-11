import React, { memo, VFC } from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

/** Wide card skeleton. */
const WideCardSkeletonComponent: VFC = () => (
  <Box display="flex">
    <Skeleton
      style={{ aspectRatio: '5 / 7' }}
      h={20}
    />
    <Box
      w="full"
      p={4}
      display="grid"
      gridTemplateColumns="2fr minmax(calc((24px + 4px)*8), 1fr) minmax(calc((24px + 4px)*8), 1fr) 80px 80px 120px"
      gap={8}
    >
      <SkeletonText noOfLines={2} />
    </Box>
  </Box>
);

export const WideCardSkeleton = memo(WideCardSkeletonComponent);
