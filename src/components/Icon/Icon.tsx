import React, { FC, memo } from 'react';
import { Icon as IconifyIcon } from '@iconify/react';

interface Props {

  /**
   * Name of icon in format provider:icon-name.
   */
  name: string;

  /**
   * Style object.
   */
  style?: React.CSSProperties;

  /**
   * Class name.
   */
  className?: string;

  /**
   * Size in string format or pixels.
   */
  size?: number | keyof typeof sizes;
}

const sizes = {
  md: 24,
  sm: 20,
  xs: 16,
};

/**
 * Map string sizes to number of pixels.
 */
function mapToPx(size: string | number): number {
  if (typeof size === 'number') {
    return size;
  }
  if (size in sizes) {
    return sizes[size as keyof typeof sizes];
  }
  return sizes.md;
}

/**
 * Icon.
 */
export const Icon: FC<Props> = memo(({ name, style, className, size = 'md' }) => {
  const sizePx = mapToPx(size);

  const mappedProps = {
    style,
    className,
    icon: name,
    width: sizePx,
    height: sizePx,
  };

  return <IconifyIcon {...mappedProps} />;
});
