import React, { memo, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { CoverCardSkeleton } from '../CoverCard/CoverCardSkeleton';
import { CoverCard } from '../CoverCard/CoverCard';
import { VNTable } from '../VNTable/VNTable';
import { VNTableSkeleton } from '../VNTable/VNTableSkeleton';
import { WideCard } from '../WideCard/WideCard';

export type VisualNovelListVariant = 'table' | 'cards' | 'wide-cards' | 'extended-cards';

interface Props {

  /** Variant of list. */
  readonly variant: VisualNovelListVariant;

  /** Whether loading. */
  readonly isLoading: boolean;

  /** Visual novels. */
  readonly items?: readonly VisualNovel[];
}

/**
 * Visual novels list.
 */
const VisualNovelListComponent: VFC<Props> = ({ variant, isLoading, items = [] }) => {
  if (variant === 'wide-cards') {
    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
      >
        {/* {isLoading && Array.from({ length: 15 }).map(() => (
          <CoverCardSkeleton />
        ))} */}
        {items.map(vn => (
          <WideCard
            key={vn.id}
            id={vn.id}
            image={vn.image}
            title={vn.title}
            released={vn.released}
            rating={vn.rating}
            length={vn.length}
            languages={vn.languages}
            platforms={vn.platforms}
          />
        ))}
      </Box>
    );
  }

  if (variant === 'cards') {
    return (
      <Box
        display="grid"
        gridGap={8}
        gridTemplateColumns="repeat(auto-fill, minmax(var(--chakra-sizes-48), 1fr))"
        w="full"
        h="full"
      >
        {isLoading && Array.from({ length: 15 }).map(() => (
          <CoverCardSkeleton />
        ))}
        {items.map(vn => (
          <CoverCard
            key={vn.id}
            id={vn.id}
            image={vn.image}
            title={vn.title}
            released={vn.released}
            rating={vn.rating}
            length={vn.length}
            languages={vn.languages}
            platforms={vn.platforms}
          />
        ))}
      </Box>
    );
  }

  if (variant === 'table') {
    return (
      <>
        {isLoading && <VNTableSkeleton />}
        <VNTable items={items} />
      </>
    );
  }

  return null;
};

export const VisualNovelList = memo(VisualNovelListComponent);
