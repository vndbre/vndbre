import { shadows } from '../foundations/shadows';
import { StyleConfig } from './types';

export const Input: StyleConfig = {
  variants: {
    outline: {
      field: {
        bg: 'gray.100',
        border: 'none',
        borderRadius: 'base',
        fontSize: 'md',
        _focus: {
          boxShadow: shadows.outline,
        },
      },
    },
  },
};
