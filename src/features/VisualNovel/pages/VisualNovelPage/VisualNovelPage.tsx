import React, { FC, Suspense } from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import cls from './VisualNovelPage.module.css';
import vnPosterPlaceholder from '../../../../assets/star.svg';
import { useVisualNovelQuery } from '../../queries';
import { ContentWrapper, EntityTabs, EntityTitle, Loading, SafeImage } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { RouteInfo } from '../../../../routes/utils/RouteInfo';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';
import { Description } from '../../../../components/Description/Description';

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
                  gridArea: 'image',
                }}
                objectFit="cover"
                height="auto"
                maxH="80"
                src={data.image}
                fallbackSrc={vnPosterPlaceholder}
                alt={data.title}
                isNsfw={data.isImageNsfw}
              />
              <div className={cls.heading}>
                <EntityTitle title={data.title} originalTitle={data.originalName} />
              </div>
              <Box gridArea="description">
                <Description text={data.description} />
              </Box>
            </div>
            <Box overflowX="auto">
              <EntityTabs id={id} tabsInfo={VISUAL_NOVELS_ROUTES_INFO} entityRootPath="vn" />
            </Box>
          </header>
          <div>
            <Suspense fallback={<Loading isLoading />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </ContentWrapper>
  );
};
