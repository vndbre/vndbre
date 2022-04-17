import React, { memo, ReactNode, VFC } from 'react';
import { Popover as ChakraPopover, PopoverContent, PopoverProps, PopoverTrigger } from '@chakra-ui/react';

interface ComponentProps {

  /** Popover ref element. */
  readonly popoverTrigger: ReactNode;
}

interface Props extends PopoverProps, ComponentProps {}

/** Custom popover component. */
const PopoverComponent: VFC<Props> = ({ children, popoverTrigger, ...rest }) => (
  <ChakraPopover
    {...rest}
    placement="bottom"
    matchWidth
    gutter={36}
    isLazy
  >
    <PopoverTrigger>
      {popoverTrigger}
    </PopoverTrigger>
    <PopoverContent w="max-content" borderRadius="lg">
      {children}
    </PopoverContent>
  </ChakraPopover>
);

export const Popover = memo(PopoverComponent);