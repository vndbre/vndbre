import React, { memo, VFC } from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import { randomWidth } from '../../../../utils/randomWidth';

/** Card list info box skeleton. */
const CardInfoBoxSkeletonComponent: VFC = () => (
  <Box
    display="flex"
    flexDirection="column"
    gap={4}
    w="full"
    mt={1}
  >
    <SkeletonText w={randomWidth(75)} noOfLines={1} />
    <Skeleton w={randomWidth(75)} h={4} />
  </Box>
);

export const CardInfoBoxSkeleton = memo(CardInfoBoxSkeletonComponent);
