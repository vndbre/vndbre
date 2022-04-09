import React, { VFC, memo } from 'react';
import { Text } from '@chakra-ui/react';

interface Props {

  /** Detail title. */
  readonly title: string;

  /** Character detail. */
  readonly detail: string;
}

/** Small character detail. */
const CharacterDetailComponent: VFC<Props> = ({ title, detail }) => (
  <Text>
    <Text as="span" fontWeight="bold">
      {title}
      :
      {' '}
    </Text>
    {detail}
  </Text>
);

export const CharacterDetail = memo(CharacterDetailComponent);
