import React, { FC } from 'react';
import { Button, ButtonGroup, Heading, IconButton, Text, Image } from '@chakra-ui/react';
import { Outlet, useParams } from 'react-router';
import { Icon } from '../../../../components/Icon/Icon';

import cls from './VisualNovelPage.module.css';
import { useVisualNovelQuery } from '../../queries';
import { VisualNovelTabs } from '../../components';

/**
 * Visual novel page.
 */
export const VisualNovelPage: FC = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useVisualNovelQuery(id);

  /** TODO: Replace it when loading wrapper will be implemented. */
  if (isLoading) {
    return <>Loading...</>;
  }

  /** TODO: Replace it when error wrapper will be implemented. */
  if (error) {
    return <>{`An error has occurred: ${error.message}`}</>;
  }

  return (
    <>
      {data && (
        <div className={cls.page}>
          <header className={cls.header}>
            <Image src={data.image as string} alt={data.title} className={cls.image} />
            <div className={cls.info}>
              <div className={cls.heading}>
                <div className={cls.title}>
                  <Heading as="h1" size="md">
                    {data.title}
                  </Heading>
                  <Heading as="h2" size="sm" fontWeight="normal">
                    {data.originalName}
                  </Heading>
                </div>
              </div>
              <div className={cls.controls}>
                <ButtonGroup isAttached>
                  <Button mr="-px">Add to list</Button>
                  <IconButton aria-label="Add to list extended" icon={<Icon name="carbon:chevron-down" />} />
                </ButtonGroup>
                <IconButton aria-label="Star" icon={<Icon name="carbon:star" />} colorScheme="gray" />
                <IconButton aria-label="Edit" icon={<Icon name="carbon:edit" />} colorScheme="gray" />
                <IconButton aria-label="Report" icon={<Icon name="carbon:flag" />} colorScheme="gray" />
              </div>
              <Text className={cls.description}>{data.description}</Text>
            </div>
            <VisualNovelTabs id={id} />
          </header>
          <Outlet />
        </div>
      )}
    </>
  );
};
