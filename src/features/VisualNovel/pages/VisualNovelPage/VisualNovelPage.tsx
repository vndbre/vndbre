import React, { FC } from 'react';
import { Button, ButtonGroup, Divider, Heading, IconButton, Tag, Text } from '@chakra-ui/react';
import { Outlet, useParams } from 'react-router';
import { Icon } from '../../../../components/Icon/Icon';

import cls from './VisualNovelPage.module.css';
import { useVisualNovel } from '../../hooks/useVisualNovel';
import { VisualNovelTabs } from '../../components';

/**
 * Visual novel page.
 */
export const VisualNovelPage: FC = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useVisualNovel(id);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>{`An error has occurred: ${error.message}`}</>;
  }

  return (
    <>
      {data && (
        <div className={cls.page}>
          <header className={cls.header}>
            <img src={data.image as string} alt={data.title} className={cls.image} />
            <div className={cls.info}>
              <div className={cls.heading}>
                <div className={cls.title}>
                  <Heading as="h1" size="lg">
                    {data.title}
                  </Heading>
                  <Heading as="h2" size="sm">
                    {data.originalName}
                  </Heading>
                </div>
                <Tag>{data.length}</Tag>
              </div>
              <div className={cls.controls}>
                <ButtonGroup size="lg" isAttached>
                  <Button mr="-px">Add to list</Button>
                  <Divider colorScheme="whiteAlpha" height="12" orientation="vertical" />
                  <IconButton aria-label="Add to list extended" icon={<Icon name="carbon:chevron-down" />} />
                </ButtonGroup>
                <IconButton aria-label="Star" size="lg" icon={<Icon name="carbon:star" />} variant="outline" />
                <IconButton aria-label="Edit" size="lg" icon={<Icon name="carbon:edit" />} variant="outline" />
                <IconButton aria-label="Report" size="lg" icon={<Icon name="carbon:flag" />} variant="outline" />
              </div>
              <Text fontSize="xl">{data.description}</Text>
            </div>
            <VisualNovelTabs id={id} />
          </header>
          <Outlet />
        </div>
      )}
    </>
  );
};
