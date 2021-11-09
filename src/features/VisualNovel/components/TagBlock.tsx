/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/dot-notation */
import { Button, Heading, Tag } from '@chakra-ui/react';
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
  const [range, setRange] = useState(isExpandable ? [0, 10] : [0]);
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Handles click on expand button.
   */
  const handleExpandButtonClick = (): void => {
    setIsExpanded(!isExpanded);
    setRange(isExpanded ? [0] : [0, 10]);
  };

  return (
    <div className={cls['tag-block']}>
      <Heading as="h3" size="sm">
        {title}
      </Heading>
      <div className={cls['tags']}>
        {tags.slice(...range).map(tag => (
          <Tag key={tag.name}>
            {tag.name}
            {tag.note && (
              <span className={cls['note']}>{tag.note}</span>
            )}
          </Tag>
        ))}
        {isExpandable && tags.length > 10 && (
          <Button size="sm" onClick={handleExpandButtonClick} type="button">...</Button>
        )}
      </div>
    </div>
  );
});
