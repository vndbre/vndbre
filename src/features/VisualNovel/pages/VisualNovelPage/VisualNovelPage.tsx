import React, { FC, Suspense, useEffect } from 'react';
import { Button, ButtonGroup, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Icon } from '../../../../components/Icon/Icon';
import cls from './VisualNovelPage.module.css';
import vnPosterPlaceholder from '../../../../assets/star.svg';
import { useVisualNovelQuery } from '../../queries';
import { VisualNovelTabs } from '../../components';
import { BBCode } from '../../../../components/BBCode/BBCode';
import { ContentWrapper, Loading } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';
import { useVisualNovelsPageQuery } from '../../queries/visualNovel';
import { Language } from '../../../../api/services/languageService';
import { Platform } from '../../../../api/services/platformService';
import { SortType } from '../../../../models/sortOptions';
import { VisualNovelSortField } from '../../../../api/services/visualNovelsService';

/**
 * Visual novel page.
 */
export const VisualNovelPage: FC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();
  const { isLoading, error, data } = useVisualNovelQuery(id);

  /** TODO (Panov A.): Remove test usage of hook. */
  const { data: novelList } = useVisualNovelsPageQuery({
    page: 1,
    pageSize: 15,
    releasedRange: {
      startDate: new Date('2004-01-01'),
      endDate: new Date('2010-02-25'),
    },
    languages: [Language.Russian, Language.German],
    platforms: [Platform.PlayStation3],
    sort: { type: SortType.Descending, field: VisualNovelSortField.Released },
  });

  useEffect(() => {
    /** TODO (Panov A.): Remove console log. */
    console.log(novelList);
  }, [novelList]);

  return (

    // TODO: Add height 100vh to route/page.
    <ContentWrapper isLoading={isLoading} error={error}>
      {data && (
        <div className={cls.page}>
          <header className={cls.header}>
            <div className={cls.overview}>
              <Image
                src={data.image ?? undefined}
                fallbackSrc={vnPosterPlaceholder}
                loading="eager"
                alt={data.title}
                className={cls.image}
              />
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
