import React, { FC } from 'react';
import { Button, ButtonGroup, Divider, Heading, IconButton, Tab, TabList, TabPanels, Tabs, Tag, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Outlet, useParams } from 'react-router';
import { EditIcon, StarIcon, WarningIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components/Icon/Icon';
import { fetchFullVisualNovel } from '../../../../api/services/visualNovelService';

import cls from './VisualNovelPage.module.css';

/**
 * Visual novel page.
 */
export const VisualNovelPage: FC = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery(['vn', id], () => fetchFullVisualNovel(id));

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>{`An error has occurred: ${(error as Error).message}`}</>;
  }

  return (
    <>
      {data && (
        <div className={cls.page}>
          <header className={cls.header}>
            <img src={data.image as string} alt={data.title} className={cls['vn-image']} />
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
            <div className={cls.tabs}>
              <Tabs colorScheme="orange">
                <TabList>
                  <Link to={`/vn/${id}/overview`}>
                    <Tab>
                      Overview
                    </Tab>
                  </Link>
                  <Link to={`/vn/${id}/releases`}>
                    <Tab>
                      Releases
                    </Tab>
                  </Link>
                  <Link to={`/vn/${id}/characters`}>
                    <Tab>
                      Characters
                    </Tab>
                  </Link>
                  <Link to={`/vn/${id}/relations`}>
                    <Tab>
                      Relations
                    </Tab>
                  </Link>
                  <Link to={`/vn/${id}/media`}>
                    <Tab>
                      Media
                    </Tab>
                  </Link>
                </TabList>
              </Tabs>
            </div>
          </header>
          <Outlet />
        </div>
      )}
    </>
  );
};
