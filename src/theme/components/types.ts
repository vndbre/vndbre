/* eslint-disable jsdoc/require-jsdoc */
import { SystemStyleObject, Theme } from '@chakra-ui/react';

interface StyleOptions {
  theme: Theme;
  colorMode: 'light' | 'dark';
  colorScheme: string;
}

type StyleInterpolation = SystemStyleObject | ((options: StyleOptions) => SystemStyleObject);

type Size = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';

export interface StyleConfig {
  baseStyle?: StyleInterpolation;
  sizes?: Record<Size, StyleInterpolation>;
  variants?: Record<string, StyleInterpolation>;
  defaultProps?: {
    variant: string;
    size: Size;
  };
}
