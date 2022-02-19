import React, { VFC } from 'react';
import { Image } from '@chakra-ui/react';
import { useVisualNovelQuery } from '../../queries';
import { useSettingsContext } from '../../../../providers';
import { VisualNovelScreenshot } from '../../../../models/visualNovel';
import { ContentWrapper } from '../../../../components';

import cls from './MediaPage.module.css';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';

/** Media page tab, contains vn screenshots. */
export const MediaPage: VFC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();
  const { isLoading, error, data } = useVisualNovelQuery(Number(id));

  const settingsContext = useSettingsContext();

  /** Filter screenshots by nsfw flag. */
  const filterPredicate = (screen: VisualNovelScreenshot): boolean => (settingsContext.isNsfwContentAllowed ? true : !screen.isNsfw);

  const images = data && (
    <div className={cls.list}>
      {data.screens.filter(filterPredicate).map(screen => <Image key={screen.image} src={screen.image} className={cls.image} />)}
    </div>
  );

  return (
    <ContentWrapper isLoading={isLoading} error={error}>
      <div>
        {images}
      </div>
    </ContentWrapper>
  );
};
