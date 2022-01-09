import { StyleConfig } from './types';

export const Tabs: StyleConfig = {
  variants: {
    line: {
      tablist: {
        borderBottom: '1px solid',
        borderColor: 'gray.300',
        paddingBottom: '1px',
      },
      tab: {
        _active: {
          bg: 'transparent',
        },
      },
    },
  },
};
