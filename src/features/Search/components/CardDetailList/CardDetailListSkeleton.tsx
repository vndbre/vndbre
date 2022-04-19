import React, { memo, VFC } from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

interface Props {

  /** Whether title is hidden. */
  readonly isTitleHidden?: boolean;

  /** Items position alignment. */
  readonly alignment?: 'start' | 'end';
}

/** Card info box. */
const CardDetailListSkeletonComponent: VFC<Props> = ({ isTitleHidden = false, alignment = 'start' }) => (
  <Box
    display="flex"
    flexDirection="column"
    gap={4}
    w="full"
    mt={1}
  >
    {!isTitleHidden && <Skeleton ml={alignment === 'end' ? 'auto' : 0} w="69%" h={4} />}
    <SkeletonText
      display="flex"
      flexDirection="column"
      alignItems={alignment}
      noOfLines={2}
      gap={2}
    />
  </Box>
);

export const CardDetailListSkeleton = memo(CardDetailListSkeletonComponent);
