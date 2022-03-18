import React, { VFC, memo, ReactNode, useState, useCallback } from 'react';
import { Heading, HStack, IconButton, Link, Tag, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon/Icon';

import cls from './TagBlock.module.css';

interface TagBlockProps {

  /**
   * Array of tags objects.
   */
  readonly tags: {

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
  }[];

  /**
   * Block title.
   */
  readonly title: string;

  /**
   * Block title icon component.
   */
  readonly titleIcon?: ReactNode;

  /**
   * Whether tag list is expandable or not.
   */
  readonly isExpandable?: boolean;
}

/**
 * Tag block component for tag data.
 */
export const TagBlockComponent: VFC<TagBlockProps> = ({ title, titleIcon, tags, isExpandable }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Handles click on expand button.
   */
  const handleExpandButtonClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpandable, isExpanded]);

  return (
    <div>
      <Heading as="h3" size="sm">
        <HStack>
          {titleIcon}
          <Text fontWeight="bold">{title}</Text>
        </HStack>
      </Heading>
      <div className={cls.tags}>
        {tags.slice(0, isExpanded ? -1 : 10).map((tag, i) => (
          <Tag noOfLines={2} key={tag.name + String(i)}>
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
        ))}
        {isExpandable && tags.length > 10 && (
          <IconButton
            aria-label="Expand"
            size="30px"
            paddingX={2}
            borderRadius="sm"
            icon={<Icon name="carbon:overflow-menu-horizontal" />}
            variant="solid"
            colorScheme="gray"
            onClick={handleExpandButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export const TagBlock = memo(TagBlockComponent);
