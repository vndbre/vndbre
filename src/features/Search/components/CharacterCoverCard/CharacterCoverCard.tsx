import React, { memo, VFC } from 'react';
import { CoverCard } from '../CoverCard/CoverCard';
import { Character } from '../../../../models/characters/character';
import imagePlaceholder from '../../../../assets/person.svg';

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
    imagePlaceholder={imagePlaceholder}
  />
);

export const CharacterCoverCard = memo(CharacterCoverCardComponent);
