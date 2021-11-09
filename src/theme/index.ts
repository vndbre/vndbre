import { extendTheme, withDefaultColorScheme, withDefaultVariant } from '@chakra-ui/react';

import { styles } from './styles';
import { colors } from './colors';
import { components } from './components';
import { shadows } from './foundations/shadows';
import { fonts } from './foundations/fonts';
import { radii } from './foundations/radii';

export const theme = extendTheme({
  styles,
  colors,
  shadows,
  fonts,
  radii,
  components,
},
withDefaultColorScheme({
  colorScheme: 'orange',
  components: ['Button'],
}),
withDefaultVariant({
  variant: 'solid',
  components: ['IconButton'],
}));
