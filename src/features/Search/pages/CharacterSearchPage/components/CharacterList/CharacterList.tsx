import React, { memo, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { CharacterCoverCard } from '../CharacterCoverCard/CharacterCoverCard';
import { Character } from '../../../../../../models/characters/character';
import { checkImageNsfw } from '../../../../../../utils/checkImageNsfw';
import { CoverCardSkeleton } from '../../../../components/CoverCard/CoverCardSkeleton';

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
        gridGap={{
          base: 4,
          md: 8,
        }}
        gridTemplateColumns={{
          base: 'repeat(auto-fill, minmax(160px, 1fr))',
          md: 'repeat(auto-fill, minmax(200px, 1fr))',
        }}
      >
        {isLoading && Array.from({ length: 20 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CoverCardSkeleton key={index} />
        ))}
        {items.map(character => (
          <CharacterCoverCard
            isImageNsfw={checkImageNsfw(character)}
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
