import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

import { styles } from './styles';
import { colors } from './colors';
import { components } from './components';
import { shadows } from './foundations/shadows';
import { fonts } from './foundations/fonts';
import { fontSizes } from './foundations/fontSizes';
import { lineHeights } from './foundations/lineHeights';

export const theme = extendTheme({
  styles,
  colors,
  shadows,
  fonts,
  fontSizes,
  lineHeights,
  components,
},
withDefaultColorScheme({
  colorScheme: 'orange',
  components: ['Button'],
}));
