/* eslint-disable jsdoc/require-jsdoc */
import { SystemStyleObject, Theme } from '@chakra-ui/react';

type StyleInterpolation = SystemStyleObject | ((options: StyleOptions) => SystemStyleObject);

interface StyleOptions {
  theme: Theme;
  colorMode: 'light' | 'dark';
  colorScheme: string;
}

export interface StyleConfig {
  baseStyle?: StyleInterpolation;
  sizes?: Record<string, StyleInterpolation>;
  variants?: Record<string, StyleInterpolation>;
  defaultProps?: {
    variant: string;
    size: string;
  };
}
