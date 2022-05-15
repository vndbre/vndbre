import React, { FC, Suspense, useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import cls from './VisualNovelPage.module.css';
import vnPosterPlaceholder from '../../../../assets/star.svg';
import { useVisualNovelQuery } from '../../queries';
import { BBCode } from '../../../../components/BBCode/BBCode';
import { ContentWrapper, EntityTabs, EntityTitle, HideContent, Loading, SafeImage } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { RouteInfo } from '../../../../routes/utils/RouteInfo';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';
import { useIsMobile } from '../../../../hooks/useIsMobile';

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

  const isMobile = useIsMobile();
  const descriptionHeight = isMobile ? 100 : 180;

  const description = useMemo(() => {
    if (data?.description != null) {
      return (
        <HideContent maxHeight={descriptionHeight}>
          <BBCode text={data.description} />
        </HideContent>
      );
    }
    return (<Text>No description.</Text>);
  }, [data?.description, descriptionHeight]);

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
                {description}
              </Box>
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
  );
};
