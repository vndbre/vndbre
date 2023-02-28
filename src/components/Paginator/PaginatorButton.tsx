import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { Button } from '../Button/Button';

interface Props {

  /** Whether button is active. */
  readonly isActive?: boolean;

  /** Click handler. */
  readonly onClick: (page: number) => void;

  /** Page number. */
  readonly page: number;
}

/** Paginator button component. */
const PaginatorButtonComponent: FC<Props> = ({ isActive = false, onClick, page }) => {
  const handleClick = useCallback(() => onClick(page), []);
  return (
    <Button
      onClick={handleClick}
      className="min-w-[48px] px-3"
      intent={isActive ? 'primary' : 'tertiary'}
    >
      {page}
    </Button>
  );
};

export const PaginatorButton = memo(PaginatorButtonComponent);
