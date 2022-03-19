import React, { VFC, memo, useState, FocusEvent, KeyboardEvent, useCallback } from 'react';
import { IconButton, Input } from '@chakra-ui/react';
import { Icon } from '../Icon/Icon';

interface Props {

  /** Change callback. */
  readonly onChange: (pageNumber: number) => void;
}

/**
 * Paginator input component.
 */
const PaginatorInputComponent: VFC<Props> = ({ onChange }) => {
  const [isActive, setIsActive] = useState(false);

  /** Handle activate. */
  const handleActiveClick = useCallback((): void => {
    setIsActive(true);
  }, []);

  /**
   * Handle input blur.
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
   * Handle key down.
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
        ref={focusOnRender}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        type="number"
        w={16}
        h={12}
        py={3}
        px={2}
        textAlign="center"
        variant="filled"
        colorScheme="orange"
      />
    );
  }
  return (
    <IconButton
      onClick={handleActiveClick}
      aria-label="Report"
      icon={<Icon name="carbon:overflow-menu-horizontal" />}
      colorScheme="gray"
    />
  );
};

export const PaginatorInput = memo(PaginatorInputComponent);
