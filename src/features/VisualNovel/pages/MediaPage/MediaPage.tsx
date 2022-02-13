import React, { VFC, useCallback, useMemo, useState } from 'react';
import { Image, Flex } from '@chakra-ui/react';
import Viewer from 'react-viewer';
import { useVisualNovelQuery } from '../../queries';
import { useSettingsContext } from '../../../../providers';
import { VisualNovelScreenshot } from '../../../../models/visualNovel';
import { ContentWrapper } from '../../../../components';

import { useRouteParams } from '../../../../hooks/useRouterParams';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';

/** Media page tab, contains vn screenshots. */
export const MediaPage: VFC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();
  const { isLoading, error, data } = useVisualNovelQuery(id);
  const [isVisible, setIsVisible] = useState(false);
  const [imageActiveIndex, setImageActiveIndex] = useState(0);
  const settingsContext = useSettingsContext();

  /** Filter screenshots by nsfw flag. */
  const filterPredicate = (screen: VisualNovelScreenshot): boolean => (settingsContext.isNsfwContentAllowed ? true : !screen.isNsfw);

  const filteredScreens = useMemo(() => {
    if (data) {
      return data.screens.filter(filterPredicate);
    }
    return [];
  }, [data, filterPredicate]);

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
    <Flex gridGap="5" flexWrap="wrap">
      {filteredScreens.map((screen, idx) => (
        <Image
          onClick={() => handleClickOnImage(idx)}
          key={screen.image}
          src={screen.image}
          width="80"
          borderRadius="8"
          cursor="zoom-in"
        />
      ))}
      <Viewer
        visible={isVisible}
        images={filteredScreens.map(screen => ({ src: screen.image }))}
        activeIndex={imageActiveIndex}
        noToolbar
        noNavbar
        drag={false}
        disableMouseZoom
        noClose
        onMaskClick={handleViewerClose}
      />
    </Flex>
  );

  return (
    <ContentWrapper isLoading={isLoading} error={error}>
      {images}
    </ContentWrapper>
  );
};
