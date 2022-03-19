import React, { VFC, memo, ReactNode, MouseEventHandler } from 'react';
import { Button } from '@chakra-ui/react';

interface Props {

  /** Children. */
  readonly children: ReactNode;

  /** Whether button is active. */
  readonly active?: boolean;

  /** Click handler. */
  readonly onClick?: MouseEventHandler;
}

/**
 * Paginator button component.
 */
const PaginatorButtonComponent: VFC<Props> = ({ children, active = false, onClick }) => (
  <Button
    onClick={onClick}
    disabled={active}
    _disabled={{
      opacity: 1,
      cursor: 'default',
    }}
    colorScheme={active ? 'orange' : 'gray'}
    p={3}
    minW={12}
    borderRadius={4}
  >
    {children}
  </Button>
);

export const PaginatorButton = memo(PaginatorButtonComponent);
