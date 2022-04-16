import React, { memo, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { CoverCardSkeleton } from '../CoverCard/CoverCardSkeleton';
import { CoverCard } from '../CoverCard/CoverCard';
import { VisualNovelTable } from '../VisualNovelTable/VisualNovelTable';
import { VisualNovelTableSkeleton } from '../VisualNovelTable/VisualNovelTableSkeleton';
import { WideCard } from '../WideCard/WideCard';
import { WideCardSkeleton } from '../WideCard/WideCardSkeleton';
import { ExtendedCard } from '../ExtendedCard/ExtendedCard';
import { ExtendedCardSkeleton } from '../ExtendedCard/ExtendedCardSkeleton';

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
  if (variant === 'table') {
    return (
      <>
        {isLoading && <VisualNovelTableSkeleton />}
        {items.length > 0 && <VisualNovelTable items={items} />}
      </>
    );
  }

  if (variant === 'cards') {
    return (
      <Box
        display="grid"
        gridGap={8}
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {isLoading && Array.from({ length: 10 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CoverCardSkeleton key={index} />
        ))}
        {items.map(vn => <CoverCard key={vn.id} vn={vn} />)}
      </Box>
    );
  }

  if (variant === 'wide-cards') {
    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
      >
        {isLoading && Array.from({ length: 5 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <WideCardSkeleton key={index} />
        ))}
        {items.map(vn => <WideCard key={vn.id} vn={vn} />)}
      </Box>
    );
  }

  if (variant === 'extended-cards') {
    return (
      <Box
        display="grid"
        gridGap={8}
        gridTemplateColumns="repeat(auto-fill, minmax(560px, 1fr))"
      >
        {isLoading && Array.from({ length: 15 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ExtendedCardSkeleton key={index} />
        ))}
        {items.map(vn => <ExtendedCard key={vn.id} vn={vn} />)}
      </Box>
    );
  }

  return null;
};

export const VisualNovelList = memo(VisualNovelListComponent);
