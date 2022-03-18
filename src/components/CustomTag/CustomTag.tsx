import React, { VFC, memo } from 'react';
import { Link, Tag, Text } from '@chakra-ui/react';
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
  readonly note?: string | null;
}

/** Describes shape of component props. */
interface Props {

  /** Tag object. */
  readonly tag: TagData;
}

/** Custom tag component. */
const CustomTagComponent: VFC<Props> = ({ tag }) => (
  <Tag noOfLines={2}>
    {tag.path ? (
      <Link as={NavLink} to={tag.path} variant="no-underline">
        <Text display="inline">{tag.name}</Text>
      </Link>
    ) : <Text display="inline">{tag.name}</Text>}

    {tag.note && (
      <Text display="inline" color="gray.500">
        {' '}
        {tag.note}
      </Text>
    )}
  </Tag>
);

export const CustomTag = memo(CustomTagComponent);
