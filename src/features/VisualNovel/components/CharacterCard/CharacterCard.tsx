import React, { FC, memo } from 'react';
import { Heading, Text, Image } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { Character } from '../../../../models/character';
import cls from './CharacterCard.module.css';
import { Roles } from '../../../../utils/types/roles';
import { Icon } from '../../../../components/Icon/Icon';

import characterPlaceholder from '../../../../assets/person.png';

interface CharacterCardProps {

  /**
   * Character object.
   */
  readonly character: Character;
}

/**
 * Character card component.
 */
export const CharacterCard: FC<CharacterCardProps> = memo(({ character }) => {
  const { id } = useParams();
  const role = character.visualNovels?.find(vn => vn.visualNovelId === Number(id))?.role;

  return (
    <div className={cls.card}>
      <Image src={character.image} alt={character.name} fallbackSrc={characterPlaceholder} className={cls.image} />
      <div className={cls.container}>
        <div className={cls.info}>
          <Heading lineHeight="22px" as="h4" size="sm">
            {character.name}
          </Heading>
          <div className={cls.voiced}>
            <Icon size="xs" name="carbon:microphone" />
            <Text fontSize="xs">
              Voice Actor
            </Text>
          </div>

        </div>
        {
          role && <Text fontSize="xs">{Roles.toReadable(role)}</Text>
        }
      </div>
    </div>
  );
});
