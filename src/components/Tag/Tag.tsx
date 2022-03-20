import React, { VFC, memo } from 'react';
import { Link, Tag as ChakraTag, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

/** Describes shape of tag to show. */
export interface TagData {

  /** Link path to entity. */
  readonly path?: string;

  /**
   * Tag content.
   */
  readonly name: string;

  /**
   * Additional info for tag.
   */
  readonly note?: string;
}

interface Props {

  /** Tag object. */
  readonly tag: TagData;
}

/** Tag component based on Chakra UI design. */
const TagComponent: VFC<Props> = ({ tag }) => (
  <ChakraTag noOfLines={2}>
    {tag.path != null ? (
      <Link as={NavLink} to={tag.path} variant="no-underline">
        <Text display="inline">{tag.name}</Text>
      </Link>
    ) : <Text display="inline">{tag.name}</Text>}

    {tag.note != null && (
      <Text display="inline" color="gray.500">
        {' '}
        {tag.note}
      </Text>
    )}
  </ChakraTag>
);

export const Tag = memo(TagComponent);
