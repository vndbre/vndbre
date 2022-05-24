import React, { FC, Suspense } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router';
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
        <Box
          display="flex"
          flexDir="column"
          gap={4}
          overflow="hidden"
        >
          <Box
            as="header"
            display="flex"
            flexDir="column"
            gap={4}
          >
            <Grid
              gridTemplateColumns={{
                base: 'var(--chakra-sizes-24) 1fr',
                md: 'var(--chakra-sizes-48) 1fr',
              }}
              gridTemplateRows="min-content 1fr"
              gridTemplateAreas={{
                base: `
                  "image heading"
                  "description description"
                `,
                md: `
                  "image heading"
                  "image description"
                `,
              }}
              gap={{
                base: 4,
                md: 8,
              }}
            >
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
              <Box
                gridArea="heading"
                display="flex"
                gap={4}
                alignItems="flex-start"
              >
                <EntityTitle title={data.title} originalTitle={data.originalName} />
              </Box>
              <Box gridArea="description">
                <Description text={data.description} />
              </Box>
            </Grid>
            <Box overflowX="auto">
              <EntityTabs id={id} tabsInfo={VISUAL_NOVELS_ROUTES_INFO} entityRootPath="vn" />
            </Box>
          </Box>
          <Box>
            <Suspense fallback={<Loading isLoading />}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      )}
    </ContentWrapper>
  );
};
