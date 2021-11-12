/* eslint-disable react/require-default-props */
import React, { FC, memo, useState } from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { Character } from '../../../../models/character';
import cls from './CharacterCard.module.css';
import { Staff } from '../../../../models/staff';
import { Roles } from '../../../../utils/types/roles';

/**
 * Component props.
 */
interface CharacterCardProps {

  /**
   * Character object.
   */
  readonly character: Character;

  /**
   * Staff.
   */
  readonly staff?: Staff[];
}

/**
 * Character card component.
 */
export const CharacterCard: FC<CharacterCardProps> = ({ character, staff }) => {
  const { id } = useParams();
  const role = character.visualNovels?.find(vn => vn.visualNovelId === Number(id))?.role;

  // Let voiced: Staff | null = null;

  // If (staff && staff.length > 0) {
  //   Voiced = staff.find(va => va.id === character.voicedActors[0].id) ?? null;
  // }

  return (
    <div className={cls.card}>
      <img src={character.image} alt={character.name} className={cls.image} />
      <div className={cls.container}>
        <div className={cls.info}>
          <Heading as="h4" size="sm">
            {character.name}
          </Heading>
          {/* {
            voiced && (
              <Text fontSize="xs">{voiced}</Text>
            )
          } */}
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
