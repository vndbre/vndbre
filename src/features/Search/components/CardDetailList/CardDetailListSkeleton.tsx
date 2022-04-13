import React, { memo, VFC } from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

interface Props {

  /** Whether title is hidden. */
  readonly isTitleHidden?: boolean;

  /** Items justify  direction. */
  readonly justify?: 'start' | 'end';
}

/** Card info box. */
const CardDetailListSkeletonComponent: VFC<Props> = ({ isTitleHidden = false, justify = 'start' }) => (
  <Box
    display="flex"
    flexDirection="column"
    gap={4}
    w="full"
    mt={1}
  >
    {!isTitleHidden && <Skeleton ml={justify === 'end' ? 'auto' : 0} w="69%" h={4} />}
    <SkeletonText
      display="flex"
      flexDirection="column"
      alignItems={justify}
      noOfLines={2}
      gap={2}
    />
  </Box>
);

export const CardDetailListSkeleton = memo(CardDetailListSkeletonComponent);
