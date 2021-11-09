import React, { FC } from 'react';
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
   * Size in pixels.
   */
  size?: number | typeof stringSizes[number];
}

const defaultProps = {
  style: undefined,
  className: undefined,
  size: 'md',
};

const stringSizes = ['md', 'sm', 'xs'] as const;

/**
 * TODO: Icon.
 */
export const Icon: FC<Props> = ({ name, style, className, size }) => {
  let _size = 24;
  if (typeof size === 'string' && stringSizes.includes(size!)) {
    switch (size) {
      case 'sm':
        _size = 20;
        break;
      case 'xs':
        _size = 16;
        break;
      default:
          _size = 24;
    }
  }

  const mappedProps = {
    style,
    className,
    icon: name,
    width: _size,
    height: _size,
  };

  return <IconifyIcon {...mappedProps} />;
};

Icon.defaultProps = defaultProps;
