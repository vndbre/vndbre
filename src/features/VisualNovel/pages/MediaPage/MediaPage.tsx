import React, { useCallback, useState, VFC } from 'react';
import { useParams } from 'react-router';
import { Image } from '@chakra-ui/react';
import Viewer from 'react-viewer';
import { useVisualNovelQuery } from '../../queries';
import { useSettingsContext } from '../../../../providers';
import { VisualNovelScreenshot } from '../../../../models/visualNovel';
import { ContentWrapper } from '../../../../components';

import cls from './MediaPage.module.css';

/** Media page tab, contains vn screenshots. */
export const MediaPage: VFC = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useVisualNovelQuery(id);
  const [isVisible, setIsVisible] = useState(false);
  const [imageActiveIndex, setImageActiveIndex] = useState(0);
  const settingsContext = useSettingsContext();

  /** Filter screenshots by nsfw flag. */
  const filterPredicate = (screen: VisualNovelScreenshot): boolean => (settingsContext.isNsfwContentAllowed ? true : !screen.isNsfw);

  /**
   * Handles clicking image.
   * @param index Image clicked index.
   */
  const handleClickOnImage = useCallback((index: number) => {
    setImageActiveIndex(index);
    setIsVisible(true);
  }, []);

  /** Handles closing of image viewer. */
  const handleViewerClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const images = data && (
    <div className={cls.list}>
      {data.screens.filter(filterPredicate).map((screen, idx) => (
        <Image
          onClick={() => handleClickOnImage(idx)}
          key={screen.image}
          src={screen.image}
          className={cls.image}
        />
      ))}
      <Viewer
        visible={isVisible}
        images={data.screens.filter(filterPredicate).map(screen => ({ src: screen.image }))}
        activeIndex={imageActiveIndex}
        noToolbar
        noNavbar
        drag={false}
        disableMouseZoom
        noClose
        onMaskClick={handleViewerClose}
      />
    </div>
  );

  return (
    <ContentWrapper isLoading={isLoading} error={error}>
      {images}
    </ContentWrapper>
  );
};
