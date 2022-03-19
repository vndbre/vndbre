import React, { VFC, memo, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import { PaginatorInput } from './PaginatorInput';
import { PaginatorButton } from './PaginatorButton';

interface Props {

  /** Page count. */
  count: number;

  /** Current page number. */
  currentPage: number;

  /** Change callback. */
  onChange: (pageNumber: number) => void;

  /**
   * How many items would be visible from edges when close to edge,
   * and how many items would be visible from sides of middle.
   */
  edgeCount?: number;
}

/**
 * Paginator component.
 */
const PaginatorComponent: VFC<Props> = ({ count, currentPage, onChange, edgeCount = 2 }) => {
  let leftButtons: number[] = [];
  let middleButtons: number[] = [];
  let rightButtons: number[] = [];

  if (currentPage <= edgeCount + 2) {
    leftButtons = Array.from({ length: currentPage + edgeCount }).map((_, i) => i + 1);
    rightButtons = [count];
  } else {
    leftButtons = [1];

    if (currentPage >= count - edgeCount - 1) {
      rightButtons = Array.from({ length: count - currentPage + edgeCount + 1 }).map((_, i) => count - i)
        .reverse();
    } else {
      middleButtons = Array.from({ length: 1 + edgeCount * 2 }).map((_, i) => i + (currentPage - edgeCount));
      rightButtons = [count];
    }
  }

  const isMiddleButtonsVisible = middleButtons.length > 0;
  const isRightButtonsVisible = rightButtons.length > 0;

  /**
   * Handle page click.
   * @param page Page number.
   */
  const handlePageClick = useCallback((page: number): void => {
    onChange(page);
  }, [onChange]);

  return (
    <Box
      display="flex"
      gridGap={2}
    >
      {leftButtons.map(page => (
        <PaginatorButton
          key={page}
          active={page === currentPage}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </PaginatorButton>
      ))}

      {isMiddleButtonsVisible && (
        <>
          <PaginatorInput onChange={onChange} />
          {middleButtons.map(page => (
            <PaginatorButton
              key={page}
              active={page === currentPage}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </PaginatorButton>
          ))}
        </>
      )}

      {isRightButtonsVisible && (
        <>
          <PaginatorInput onChange={onChange} />
          {rightButtons.map(page => (
            <PaginatorButton
              key={page}
              active={page === currentPage}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </PaginatorButton>
          ))}
        </>
      )}
    </Box>
  );
};

export const Paginator = memo(PaginatorComponent);
