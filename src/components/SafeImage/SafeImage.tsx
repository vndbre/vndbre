import React, { memo, VFC } from 'react';
import { Box, BoxProps, Image, ImageProps } from '@chakra-ui/react';
import { useSettingsContext } from '../../providers';

interface SafeImageProps {

  /** Whether the image is nsfw. */
  readonly isImageNsfw?: boolean;

  /** Wrapper container props. */
  readonly containerProps?: BoxProps;
}

interface Props extends SafeImageProps, ImageProps {}

/** Safe image. */
const SafeImageComponent: VFC<Props> = ({ isImageNsfw = true, containerProps, ...rest }) => {
  const { isNsfwContentAllowed } = useSettingsContext();

  return (
    <Box overflow="hidden" {...containerProps}>
      <Image
        filter={isNsfwContentAllowed || !isImageNsfw ? 'none' : 'blur(6px)'}
        {...rest}
        loading="eager"
      />
    </Box>
  );
};

export const SafeImage = memo(SafeImageComponent);
