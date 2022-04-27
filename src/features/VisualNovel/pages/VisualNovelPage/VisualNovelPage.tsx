import React, { FC, Suspense, useMemo } from 'react';
import { Text } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import cls from './VisualNovelPage.module.css';
import vnPosterPlaceholder from '../../../../assets/star.svg';
import { useVisualNovelQuery } from '../../queries';
import { VisualNovelTabs } from '../../components';
import { BBCode } from '../../../../components/BBCode/BBCode';
import { ContentWrapper, EntityTitle, HideContent, Loading, SafeImage } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';

/**
 * Visual novel page.
 */
export const VisualNovelPage: FC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();
  const { isLoading, error, data } = useVisualNovelQuery(Number(id));

  const description = useMemo(() => {
    if (data?.description != null) {
      return (
        <HideContent maxHeight={180}>
          <BBCode text={data.description} />
        </HideContent>
      );
    }
    return (<Text>No description.</Text>);
  }, [data?.description]);

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
                {description}
              </div>
            </div>
            <VisualNovelTabs id={id} />
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
