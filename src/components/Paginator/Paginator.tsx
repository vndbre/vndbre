import React, { VFC, memo, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import { PaginatorInput } from './PaginatorInput';
import { PaginatorButton } from './PaginatorButton';

interface Props {

  /** Page count. */
  readonly count: number;

  /** Current page number. */
  readonly currentPage: number;

  /** Change callback. */
  readonly onChange: (pageNumber: number) => void;

  /**
   * How many items would be visible from edges when close to edge,
   * and how many items would be visible from sides of middle.
   */
  readonly edgeCount?: number;
}

/**
 * Paginator component.
 */
const PaginatorComponent: VFC<Props> = ({ count, currentPage, onChange, edgeCount = 1 }) => {
  /** Get three arrays of pages. */
  const getButtons = (): [number[], number[], number[]] => {
    if (currentPage <= edgeCount + 2) {
      const leftEdgePages = Array.from({ length: currentPage + edgeCount }).map((_, i) => i + 1);

      return [leftEdgePages, [], [count]];
    }
    const leftEdgePages = [1];

    if (currentPage >= count - edgeCount - 1) {
      const rightEdgePages = Array.from({ length: count - currentPage + edgeCount + 1 }).map((_, i) => count - i)
        .reverse();
      return [leftEdgePages, [], rightEdgePages];
    }

    const middlePages = Array.from({ length: 1 + edgeCount * 2 }).map((_, i) => i + (currentPage - edgeCount));
    return [leftEdgePages, middlePages, [count]];
  };

  const [leftEdgePages, middlePages, rightEdgePages] = getButtons();

  const isMiddlePagesVisible = middlePages.length > 0;
  const isRightEdgePagesVisible = rightEdgePages.length > 0;

  /**
   * Handle page click.
   * @param page Page number.
   */
  const handlePageClick = useCallback((page: number) => onChange(page), [onChange]);

  /**
   * Get paginator button element.
   * @param page Page number.
   */
  const getPaginatorButton = useCallback((page: number) => (
    <PaginatorButton
      page={page}
      key={page}
      isActive={page === currentPage}
      onClick={handlePageClick}
    />
  ), [currentPage]);

  return (
    <Box
      display="flex"
      gridGap={2}
    >
      {leftEdgePages.map(getPaginatorButton)}

      {isMiddlePagesVisible && (
        <>
          <PaginatorInput onChange={onChange} />
          {middlePages.map(getPaginatorButton)}
        </>
      )}

      {isRightEdgePagesVisible && (
        <>
          <PaginatorInput onChange={onChange} />
          {rightEdgePages.map(getPaginatorButton)}
        </>
      )}
    </Box>
  );
};

export const Paginator = memo(PaginatorComponent);
