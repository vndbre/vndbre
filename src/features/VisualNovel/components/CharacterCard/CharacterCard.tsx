/* eslint-disable react/require-default-props */
import React, { FC, memo, useState } from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { Character } from '../../../../models/character';
import cls from './CharacterCard.module.css';
import { Roles } from '../../../../utils/types/roles';
import { Icon } from '../../../../components/Icon/Icon';

/**
 * Component props.
 */
interface CharacterCardProps {

  /**
   * Character object.
   */
  readonly character: Character;
}

/**
 * Character card component.
 */
export const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  const { id } = useParams();
  const role = character.visualNovels?.find(vn => vn.visualNovelId === Number(id))?.role;

  return (
    <div className={cls.card}>
      <img src={character.image} alt={character.name} className={cls.image} />
      <div className={cls.container}>
        <div className={cls.info}>
          <Heading as="h4" size="sm">
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
          role && (
            <Text fontSize="xs">{Roles.toReadable(role)}</Text>
          )
        }
      </div>
    </div>
  );
};
