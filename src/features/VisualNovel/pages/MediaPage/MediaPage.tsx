import React, { useState, VFC } from 'react';
import { useParams } from 'react-router';
import { Image, useDisclosure } from '@chakra-ui/react';
import { useVisualNovelQuery } from '../../queries';
import { useSettingsContext } from '../../../../providers';
import { VisualNovelScreenshot } from '../../../../models/visualNovel';
import { ContentWrapper, ImagePreviewDialog } from '../../../../components';

import cls from './MediaPage.module.css';

/** Media page tab, contains vn screenshots. */
export const MediaPage: VFC = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useVisualNovelQuery(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState('');

  const settingsContext = useSettingsContext();

  /** Filter screenshots by nsfw flag. */
  const filterPredicate = (screen: VisualNovelScreenshot): boolean => (settingsContext.isNsfwContentAllowed ? true : !screen.isNsfw);

  /**
   * Handles clicking image.
   * @param image Image url.
   */
  const handleClickOnImage = (image: string): void => {
    setSelectedImage(image);
    onOpen();
  };

  const images = data && (
    <div className={cls.list}>
      {data.screens.filter(filterPredicate).map(screen => (
        <Image
          onClick={() => handleClickOnImage(screen.image)}
          key={screen.image}
          src={screen.image}
          className={cls.image}
        />
      ))}
    </div>
  );

  return (
    <ContentWrapper isLoading={isLoading} error={error}>
      <div>
        {images}
        {isOpen ? <ImagePreviewDialog image={selectedImage} onClose={onClose} isOpen={isOpen} /> : null}
      </div>
    </ContentWrapper>
  );
};
