/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/dot-notation */
import { Heading, Tag } from '@chakra-ui/react';
import React, { FC, memo } from 'react';

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

}

/**
 * Tag block component for tag data.
 */
export const TagBlock: FC<TagBlockProps> = memo(({ title, tags }) => (
  <div className={cls['tag-block']}>
    <Heading as="h3" size="sm">
      {title}
    </Heading>
    <div className={cls['tags']}>
      {tags.map(tag => (
        <Tag key={tag.name}>
          {tag.name}
          {tag.note && (
            <span className={cls['note']}>{tag.note}</span>
          )}
        </Tag>
      ))}
    </div>
  </div>
));
