import { Tooltip as TooltipComponent } from '@chakra-ui/react';
import { StyleConfig } from './types';

// dirty hack https://github.com/chakra-ui/chakra-ui/issues/1424
TooltipComponent.defaultProps = { ...TooltipComponent.defaultProps, hasArrow: true, placement: 'top' };

export const Tooltip: StyleConfig = {
};
