import React, { memo, VFC } from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import { CardInfoBoxSkeleton } from '../CardInfoBox/CardInfoBoxSkeleton';
import { CardListInfoBoxSkeleton } from '../CardListInfoBox/CardListInfoBoxSkeleton';

/** Wide card skeleton. */
const WideCardSkeletonComponent: VFC = () => (
  <Box
    display="flex"
    backgroundColor="gray.100"
    w="full"
  >
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
      <SkeletonText spacing={4} mt={1} noOfLines={2} />
      <CardListInfoBoxSkeleton isTitleHidden justify="end" />
      <CardListInfoBoxSkeleton isTitleHidden />
      <CardInfoBoxSkeleton />
      <CardInfoBoxSkeleton />
      <CardInfoBoxSkeleton />
    </Box>
  </Box>
);

export const WideCardSkeleton = memo(WideCardSkeletonComponent);
