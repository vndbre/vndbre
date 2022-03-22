import React, { VFC, memo, useCallback } from 'react';
import { Button } from '@chakra-ui/react';

interface Props {

  /** Whether button is active. */
  readonly isActive?: boolean;

  /** Click handler. */
  readonly onClick: (page: number) => void;

  /** Page number. */
  readonly page: number;
}

/**
 * Paginator button component.
 */
const PaginatorButtonComponent: VFC<Props> = ({ isActive = false, onClick, page }) => {
  const handleClick = useCallback(() => onClick(page), []);
  const colorScheme = isActive ? 'orange' : 'gray';
  return (
    <Button
      transition="none"
      onClick={handleClick}
      disabled={isActive}
      _disabled={{
        opacity: 1,
        cursor: 'default',
      }}
      colorScheme={colorScheme}
      p={3}
      minW={12}
      borderRadius={4}
    >
      {page}
    </Button>
  );
};

export const PaginatorButton = memo(PaginatorButtonComponent);
