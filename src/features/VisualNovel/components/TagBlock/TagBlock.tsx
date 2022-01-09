import React, { FC, memo, useState } from 'react';
import { Heading, IconButton, Tag, Text } from '@chakra-ui/react';
import { Icon } from '../../../../components/Icon/Icon';

import cls from './TagBlock.module.css';

interface TagBlockProps {

  /**
   * Array of tags objects.
   */
  readonly tags: {

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
   * Whether tag list is expandable or not.
   */
  readonly isExpandable?: boolean;
}

/**
 * Tag block component for tag data.
 */
export const TagBlock: FC<TagBlockProps> = memo(({ title, tags, isExpandable }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Handles click on expand button.
   */
  const handleExpandButtonClick = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <Heading as="h3" size="sm">
        {title}
      </Heading>
      <div className={cls.tags}>
        {tags.slice(0, isExpanded ? -1 : 10).map(tag => (
          <Tag noOfLines={2} key={tag.name}>
            <Text display="inline">{tag.name}</Text>
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
});
