import React, { FC, Suspense } from 'react';
import { Button, ButtonGroup, IconButton, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Icon } from '../../../../components/Icon/Icon';
import cls from './VisualNovelPage.module.css';
import vnPosterPlaceholder from '../../../../assets/star.svg';
import { useVisualNovelQuery } from '../../queries';
import { VisualNovelTabs } from '../../components';
import { BBCode } from '../../../../components/BBCode/BBCode';
import { ContentWrapper, EntityTitle, Loading, SafeImage } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';

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
                }}
                maxH="80"
                objectFit="cover"
                height="auto"
                src={data.image ?? undefined}
                fallbackSrc={vnPosterPlaceholder}
                loading="eager"
                alt={data.title}
                isImageNsfw={data.isImageNsfw}
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
            <VisualNovelTabs id={id} />
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
