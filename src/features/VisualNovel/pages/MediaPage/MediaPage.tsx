import React, { VFC, useCallback, useMemo, useState } from 'react';
import { Image, Grid } from '@chakra-ui/react';
import Viewer from 'react-viewer';
import { useVisualNovelQuery } from '../../queries';
import { useSettingsContext } from '../../../../providers';
import { ContentWrapper } from '../../../../components';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';

/** Media page tab, contains vn screenshots. */
export const MediaPage: VFC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();
  const [isVisible, setIsVisible] = useState(false);
  const [imageActiveIndex, setImageActiveIndex] = useState(0);
  const { isLoading, error, data } = useVisualNovelQuery(Number(id));

  const settingsContext = useSettingsContext();

  const filteredScreens = useMemo(() => {
    if (data) {
      return data.screens.filter(screen => (settingsContext.isNsfwContentAllowed ? true : !screen.isNsfw));
    }
    return [];
  }, [data, settingsContext.isNsfwContentAllowed]);

  /**
   * Handles click on an image.
   * @param index Image clicked index.
   */
  const handleImageClick = useCallback((index: number) => () => {
    setImageActiveIndex(index);
    setIsVisible(true);
  }, []);

  /** Handles closing of image viewer. */
  const handleViewerClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const images = data && (
    <Grid
      templateColumns={{
        base: 'repeat(auto-fill, minmax(var(--chakra-sizes-40), 1fr))',
        md: 'repeat(auto-fill, minmax(var(--chakra-sizes-64), 1fr))',
      }}
      gridGap={4}
    >
      {filteredScreens.map((screen, idx) => (
        <Image
          onClick={handleImageClick(idx)}
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
    </Grid>
  );

  return (
    <ContentWrapper isLoading={isLoading} error={error}>
      {images}
    </ContentWrapper>
  );
};
