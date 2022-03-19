import { shadows } from '../foundations/shadows';
import { StyleConfig } from './types';

export const Input: StyleConfig = {
  variants: {
    outline: {
      field: {
        bg: 'gray.100',
        borderRadius: 'base',
        borderColor: 'transparent',
        fontSize: 'md',
        _focus: {
          borderColor: 'orange.400',
          boxShadow: shadows.outline,
        },
      },
    },
  },
};
