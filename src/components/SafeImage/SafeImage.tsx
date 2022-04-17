import React, { memo, VFC } from 'react';
import { Box, BoxProps, Image, ImageProps } from '@chakra-ui/react';
import { useSettingsContext } from '../../providers';

interface SafeImageProps {

  /** Whether the image is nsfw. */
  readonly isNsfw?: boolean;

  /** Wrapper container props. */
  readonly containerProps?: BoxProps;

  /** Image src. */
  readonly src: string | null;
}

interface Props extends SafeImageProps, Omit<ImageProps, 'src'> {}

/** Safe image. */
const SafeImageComponent: VFC<Props> = ({ isNsfw = false, src, containerProps, ...rest }) => {
  const { isNsfwContentAllowed } = useSettingsContext();

  return (
    <Box overflow="hidden" {...containerProps}>
      <Image
        src={src ?? undefined}
        filter={isNsfwContentAllowed || !isNsfw ? 'none' : 'blur(6px)'}
        {...rest}
      />
    </Box>
  );
};

export const SafeImage = memo(SafeImageComponent);