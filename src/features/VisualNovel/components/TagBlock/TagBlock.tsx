/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/dot-notation */
import { Button, Heading, Tag, Text } from '@chakra-ui/react';
import React, { FC, memo, useState } from 'react';

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
    <div className={cls['tag-block']}>
      <Heading as="h3" size="sm">
        {title}
      </Heading>
      <div className={cls['tags']}>
        {tags.slice(0, isExpanded ? -1 : 10).map(tag => (
          <Tag key={tag.name}>
            {tag.name}
            {tag.note && (
              <Text marginLeft="5px" noOfLines={2} color="gray.500">{tag.note}</Text>
            )}
          </Tag>
        ))}
        {isExpandable && tags.length > 10 && (
          <Button size="xs" onClick={handleExpandButtonClick} type="button" aria-label="Expand">...</Button>
        )}
      </div>
    </div>
  );
});
