import React, { memo, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { CoverCardSkeleton } from '../CoverCard/CoverCardSkeleton';
import { CharacterCoverCard } from '../CharacterCoverCard/CharacterCoverCard';
import { Character } from '../../../../models/characters/character';

export type CharacterListVariant = 'cards';

interface Props {

  /** Variant of list. */
  readonly variant: CharacterListVariant;

  /** Whether the list is loading or not. */
  readonly isLoading: boolean;

  /** Characters. */
  readonly items?: readonly Character[];
}

/**
 * Characters list.
 */
const CharacterListComponent: VFC<Props> = ({ variant, isLoading, items = [] }) => {
  if (variant === 'cards') {
    return (
      <Box
        display="grid"
        gridGap={8}
        gridTemplateColumns="repeat(auto-fill, minmax(140px, 1fr))"
      >
        {isLoading && Array.from({ length: 20 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CoverCardSkeleton key={index} />
        ))}
        {items.map(character => (
          <CharacterCoverCard
            isImageNsfw={false}
            key={character.id}
            character={character}
          />
        ))}
      </Box>
    );
  }

  return null;
};

export const CharacterList = memo(CharacterListComponent);
