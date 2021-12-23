import { StyleConfig } from './types';

export const Button: StyleConfig = {
  sizes: {
    xs: {
      h: '24px',
      minW: '24px',
      fontWeight: 'normal',
      fontSize: '16px',
    },
    sm: {
      h: '32px',
      minW: '32px',
      fontWeight: 'normal',
      fontSize: '18px',
    },
    md: {
      h: '48px',
      minW: '48px',
      fontWeight: 'medium',
    },
  },
  variants: {
    unstyled: {
      h: 'initial',
      minW: 'initial',
    },
  },
};
