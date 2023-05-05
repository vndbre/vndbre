'use client';

import type { FocusEvent, KeyboardEvent, FC } from 'react';
import { memo, useState, useCallback } from 'react';
import { IconButton } from '../IconButton/IconButton';
import { Input } from '../Input/Input';

interface Props {

  /** Change callback. */
  readonly onChange: (pageNumber: number) => void;
}

/** Paginator input component. */
const PaginatorInputComponent: FC<Props> = ({ onChange }) => {
  const [isActive, setIsActive] = useState(false);

  /** Handles activate. */
  const handleActiveClick = useCallback((): void => {
    setIsActive(true);
  }, []);

  /**
   * Handles input blur.
   * @param event Event,.
   */
  const handleInputBlur = useCallback((event: FocusEvent<HTMLInputElement>): void => {
    const pageNumber = parseInt(event.target.value, 10);
    if (!Number.isNaN(pageNumber) && pageNumber > 0) {
      onChange(pageNumber);
    }

    event.target.value = '';
    setIsActive(false);
  }, [onChange]);

  /**
   * Handles key down.
   * @param event Keyboard event.
   */
  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      (event.target as HTMLInputElement).blur();
    }
  }, []);

  /**
   * Focus input on render.
   * @param input Input element.
   */
  const focusOnRender = useCallback((input: HTMLInputElement | null): void => {
    input?.focus();
  }, []);

  if (isActive) {
    return (
      <Input
        className="min-w-[48px] text-center"
        hasAutoWidth
        ref={focusOnRender}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        type="number"
      />
    );
  }
  return (
    <IconButton
      onClick={handleActiveClick}
      aria-label="Input page number"
      className="cursor-text"
      name="ellipsis"
      intent="tertiary"
    />
  );
};

export const PaginatorInput = memo(PaginatorInputComponent);
