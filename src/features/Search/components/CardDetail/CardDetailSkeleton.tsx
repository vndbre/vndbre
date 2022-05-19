import React, { memo, VFC } from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import { Random } from '../../../../utils/random';

/** Card list info box skeleton. */
const CardDetailSkeletonComponent: VFC = () => (
  <Box
    display="flex"
    flexDirection="column"
    gap={4}
    w="full"
    mt={1}
  >
    <SkeletonText w={Random.generateWidthInRange(75)} noOfLines={1} />
    <Skeleton w={Random.generateWidthInRange(75)} h={4} />
  </Box>
);

export const CardDetailSkeleton = memo(CardDetailSkeletonComponent);
