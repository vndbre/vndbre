import React, { VFC } from 'react';
import { useParams } from 'react-router';
import { Image } from '@chakra-ui/react';
import { useVisualNovelQuery } from '../../queries';
import { useSettingsContext } from '../../../../providers';

import cls from './MediaPage.module.css';
import { VisualNovelScreenshot } from '../../../../models/visualNovel';

/** Media page tab, contains vn screenshots. */
export const MediaPage: VFC = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useVisualNovelQuery(id);

  const settingsContext = useSettingsContext();

  /** Filter screenshots by nsfw flag. */
  const filterPredicate = (screen: VisualNovelScreenshot): boolean => (settingsContext.showNsfwImages ? true : !screen.isNsfw);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>{`An error has occurred: ${error.message}`}</>;
  }

  return (
    <div>
      {data && (
        <div className={cls.list}>
          {data?.screens.filter(filterPredicate).map(screen => <Image key={screen.image} src={screen.image} className={cls.image} />)}
        </div>
      )}
    </div>
  );
};
