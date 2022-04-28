import React, { FC, Suspense, useMemo } from 'react';
import { Button, ButtonGroup, IconButton, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import { Helmet } from 'react-helmet';

import { Icon } from '../../../../components/Icon/Icon';
import cls from './VisualNovelPage.module.css';
import vnPosterPlaceholder from '../../../../assets/star.svg';
import { useVisualNovelQuery } from '../../queries';
import { BBCode } from '../../../../components/BBCode/BBCode';
import { ContentWrapper, EntityTabs, EntityTitle, HideContent, Loading, SafeImage } from '../../../../components';
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

  const description = useMemo(() => {
    if (data?.description != null) {
      return (
        <HideContent maxHeight={250}>
          <BBCode text={data.description} />
        </HideContent>
      );
    }
    return (<Text>No description.</Text>);
  }, [data?.description]);

  return (
    <>
      {data != null && (
        <Helmet>
          <title>{data.title}</title>
          <meta property="og:image:type" content="image/png" />
          <meta name="og:image" content={data.image ?? undefined} />
          <meta name="og:image:width" content="1200" />
          <meta name="og:image:height" content="600" />
        </Helmet>
      )}
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
                  {description}
                </div>
              </div>
              <EntityTabs id={id} tabsInfo={VISUAL_NOVELS_ROUTES_INFO} entityRootPath="vn" />
            </header>
            <div>
              <Suspense fallback={<Loading isLoading />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        )}
      </ContentWrapper>
    </>
  );
};
