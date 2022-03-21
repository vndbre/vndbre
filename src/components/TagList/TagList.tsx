import React, { VFC, memo, ReactNode, useState, useCallback } from 'react';
import { Box, Heading, HStack, IconButton, Text } from '@chakra-ui/react';
import { Tag, TagData } from '../Tag/Tag';
import { Icon } from '../Icon/Icon';

import cls from './TagList.module.css';

interface TagListProps {

  /**
   * Array of tags objects.
   */
  readonly tags: readonly TagData[];

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
 * Tag list component.
 */
export const TagListComponent: VFC<TagListProps> = ({ title, titleIcon, tags, isExpandable = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Handles click on expand button.
   */
  const handleExpandButtonClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpandable, isExpanded]);

  return (
    <Box>
      <Heading as="h3" size="sm">
        <HStack>
          {titleIcon}
          <Text fontWeight="bold">{title}</Text>
        </HStack>
      </Heading>
      <Box className={cls.tags}>
        {tags.slice(0, isExpanded ? -1 : 10).map((tag, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tag key={i} tag={tag} />
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
      </Box>
    </Box>
  );
};

export const TagList = memo(TagListComponent);
