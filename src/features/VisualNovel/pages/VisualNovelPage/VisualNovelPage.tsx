import React, { FC, Suspense } from 'react';
import { Button, ButtonGroup, IconButton, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Icon } from '../../../../components/Icon/Icon';
import cls from './VisualNovelPage.module.css';
import vnPosterPlaceholder from '../../../../assets/star.svg';
import { useVisualNovelQuery } from '../../queries';
import { BBCode } from '../../../../components/BBCode/BBCode';
import { ContentWrapper, EntityTabs, EntityTitle, Loading, SafeImage } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { RouteInfo } from '../../../../routes/utils/RouteInfo';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';

export const VISUAL_NOVELS_ROUTES_INFO: readonly RouteInfo[] = [
  { name: 'Overview', path: '' },
  { name: 'Releases', path: 'releases' },
  { name: 'Characters', path: 'characters' },
  { name: 'Relations', path: 'relations' },
  { name: 'Media', path: 'media' },
];

/**
 * Visual novel page.
 */
export const VisualNovelPage: FC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();
  const { isLoading, error, data } = useVisualNovelQuery(Number(id));

  return (
    <ContentWrapper isLoading={isLoading} error={error}>
      {data && (
        <div className={cls.page}>
          <header className={cls.header}>
            <div className={cls.overview}>
              <SafeImage
                containerProps={{
                  borderRadius: 'lg',
                  h: 'max-content',
                }}
                objectFit="cover"
                height="auto"
                maxH="80"
                src={data.image}
                fallbackSrc={vnPosterPlaceholder}
                alt={data.title}
                isNsfw={data.isImageNsfw}
              />
              <div className={cls.info}>
                <div className={cls.heading}>
                  <EntityTitle title={data.title} originalTitle={data.originalName} />
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
                {(data.description ? <BBCode text={data.description} /> : <Text>No description.</Text>)}
              </div>
            </div>
            <EntityTabs id={id} tabsInfo={VISUAL_NOVELS_ROUTES_INFO} entityRootPath="vn" />
          </header>
          <div className={cls.tabContent}>
            <Suspense fallback={<Loading isLoading />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </ContentWrapper>
  );
};
