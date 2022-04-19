import React, { memo, VFC } from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import { getRandomWidth } from '../../../../utils/randomWidth';

/** Card list info box skeleton. */
const CardDetailSkeletonComponent: VFC = () => (
  <Box
    display="flex"
    flexDirection="column"
    gap={4}
    w="full"
    mt={1}
  >
    <SkeletonText w={getRandomWidth(75)} noOfLines={1} />
    <Skeleton w={getRandomWidth(75)} h={4} />
  </Box>
);

export const CardDetailSkeleton = memo(CardDetailSkeletonComponent);
