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
      _hover: {
        background: 'inherit',
      },
      paddingX: 0,
      borderRadius: 'sm',
    },
    panel: {
      paddingX: 0,
    },
  },
};
