import React, { memo, VFC } from 'react';
import { CoverCard } from '../../../../components/CoverCard/CoverCard';
import { Character } from '../../../../../../models/characters/character';

interface Props {

  /** Character data. */
  readonly character: Character;

  /** Whether image is nsfw. */
  readonly isImageNsfw: boolean;
}

/**
 * Character cover card.
 */
const CharacterCoverCardComponent: VFC<Props> = ({
  character: {
    id,
    name,
    image,
  },
  isImageNsfw,
}) => (
  <CoverCard
    link={`/character/${id}`}
    title={name}
    image={image}
    isImageNsfw={isImageNsfw}
  />
);

export const CharacterCoverCard = memo(CharacterCoverCardComponent);
