import React, { VFC, memo, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import { PaginatorInput } from './PaginatorInput';
import { PaginatorButton } from './PaginatorButton';
import { PaginatorNavigationButton } from './PaginatorNavigationButton';

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

  /** Whether paginator `next` and `previous` buttons should be hidden or not. */
  readonly isNavigationHidden?: boolean;

  /**
   * Pagination offset from 0.
   * Defaults to 1, so pagination is user friendly.
   */
  readonly offset?: number;

  /** Minimum gap between two edge buttons groups for input button(ellipsis) to appear. */
  readonly inputMinGap?: number;
}

/**
 * Paginator component.
 */
const PaginatorComponent: VFC<Props> = ({
  count,
  currentPage,
  onChange,
  edgeCount = 1,
  isNavigationHidden = false,
  offset = 1,
  inputMinGap = 1,
}) => {
  /** Get three arrays of pages. */
  const getButtons = (): [number[], number[], number[]] => {
    if (currentPage <= edgeCount + offset + inputMinGap) {
      const leftEdgePages = Array.from({ length: currentPage + edgeCount }).map((_, i) => i + offset);

      return [leftEdgePages, [], [count]];
    }
    const leftEdgePages = [offset];

    if (currentPage >= count - edgeCount - inputMinGap) {
      const rightEdgePages = Array.from({ length: count - currentPage + edgeCount + offset }).map((_, i) => count - i)
        .reverse();
      return [leftEdgePages, [], rightEdgePages];
    }

    const middlePages = Array.from({ length: edgeCount * 2 + offset }).map((_, i) => i + (currentPage - edgeCount));
    return [leftEdgePages, middlePages, [count]];
  };

  const [leftEdgePages, middlePages, rightEdgePages] = getButtons();

  const isMiddlePagesVisible = middlePages.length > 0;
  const isRightEdgePagesVisible = rightEdgePages.length > 0 && currentPage > edgeCount + offset + inputMinGap;

  /**
   * Handles page click.
   * @param page Page number.
   */
  const handlePageClick = useCallback((page: number) => onChange(page), [onChange]);

  /**
   * Handle next page click.
   * @param page Page number.
   */
  const handleNextPageClick = useCallback(() => onChange(currentPage + offset), [onChange, currentPage]);

  /**
   * Handle previous page click.
   * @param page Page number.
   */
  const handlePrevPageClick = useCallback(() => onChange(currentPage - 1), [onChange, currentPage]);

  const isPrevButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === count;

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
      {isNavigationHidden && (
        <PaginatorNavigationButton
          isDisabled={isPrevButtonDisabled}
          direction="prev"
          onClick={handlePrevPageClick}
        />
      ) }
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
      {isNavigationHidden && (
        <PaginatorNavigationButton
          direction="next"
          isDisabled={isNextButtonDisabled}
          onClick={handleNextPageClick}
        />
      ) }
    </Box>
  );
};

export const Paginator = memo(PaginatorComponent);
