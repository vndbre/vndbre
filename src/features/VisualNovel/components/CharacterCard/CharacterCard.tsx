import React, { VFC, memo } from 'react';
import { Heading, Text, Link } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Character } from '../../../../models/characters/character';
import cls from './CharacterCard.module.css';
import characterPlaceholder from '../../../../assets/person.svg';
import { CharacterRole } from '../../../../models/characters/characterRole';
import { SafeImage } from '../../../../components';

interface CharacterCardProps {

  /**
   * Character object.
   */
  readonly character: Character;
}

/**
 * Character card component.
 */
export const CharacterCardComponent: VFC<CharacterCardProps> = ({ character }) => {
  const { id } = useParams();
  const role = character.visualNovels?.find(vn => vn.visualNovelId === Number(id))?.role;

  return (
    <div className={cls.card}>
      <SafeImage
        src={character.image}
        alt={character.name}
        fallbackSrc={characterPlaceholder}
        h="full"
        w="full"
        containerProps={{
          borderRadius: 'lg',
        }}
        objectFit="cover"
      />
      <div className={cls.container}>
        <div className={cls.info}>
          <Link as={NavLink} to={`/character/${character.id}`}>
            <Heading lineHeight="22px" as="h4" size="sm">
              {character.name}
            </Heading>
          </Link>
        </div>
        {
          role && <Text fontSize="xs">{CharacterRole.toReadable(role)}</Text>
        }
      </div>
    </div>
  );
};

export const CharacterCard = memo(CharacterCardComponent);
