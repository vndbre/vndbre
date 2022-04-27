import React, { memo, VFC } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

type Props = ButtonProps;

/**
 * Button with text based on Chakra UI `Button` component,
 * but with overridden base styles to look similar to Chakra UI `Link` component.
 */
const TextButtonComponent: VFC<Props> = ({ children, ...rest }) => (
  <Button
    height="auto"
    padding={0}
    margin={0}
    borderRadius={0}
    background="transparent"
    color="brand.900"
    fontWeight="normal"
    borderBottomWidth="1px"
    borderBottomColor="transparent"
    textDecoration="underline"
    textDecorationThickness="1px"
    textDecorationColor="gray.500"
    textUnderlineOffset="5px"
    _hover={{
      background: 'transparent',
      color: 'orange.500',
      textDecorationColor: 'orange.500',
    }}
    _active={{
      background: 'transparent',
    }}
    {...rest}
  >
    {children}
  </Button>
);

export const TextButton = memo(TextButtonComponent);
