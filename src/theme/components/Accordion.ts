import { StyleConfig } from './types';

export const Accordion: StyleConfig = {
  baseStyle: {
    container: {
      borderWidth: 0,
      _last: {
        borderBottomWidth: 0,
      },
    },
    button: {
      borderRadius: 'sm',
    },
  },
};
