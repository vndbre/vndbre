import { StyleConfig } from './types';

export const Link: StyleConfig = {
  baseStyle: {
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: 'gray.500',
    _hover: {
      textDecoration: 'none',
      color: 'orange.500',
      borderBottomColor: 'orange.500',
    },
  },
  variants: {
    'no-underline': {
      borderBottom: 'none',
    },
  },
};
