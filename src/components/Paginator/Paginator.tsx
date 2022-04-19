import React, { VFC, memo, useCallback } from 'react';
import { Box, IconButton, Spinner } from '@chakra-ui/react';
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
   * How many additional pages would be visible from side of a page.
   */
  readonly groupCount?: number;

  /** Whether paginator `next` and `previous` buttons should be hidden or not. */
  readonly isNavigationHidden?: boolean;

  /**
   * Pagination offset from 0.
   * Defaults to 1, so pagination is user friendly.
   */
  readonly offset?: number;

  /** Minimum gap between two buttons groups for page number input to appear. */
  readonly inputMinGap?: number;

  /** Whether to show loader to the right of the active page. */
  readonly isCountLoading?: boolean;
}

/**
 * Paginator component.
 */
const PaginatorComponent: VFC<Props> = ({
  count,
  currentPage,
  onChange,
  groupCount = 1,
  isNavigationHidden = false,
  offset = 1,
  inputMinGap = 1,
  isCountLoading = false,
}) => {
  /** If value is bigger than count returns count. */
  const parseCount = (value: number): number => (value > count ? count : value);

  /** Get three arrays of pages. */
  const getButtons = (): [number[], number[], number[]] => {
    if (currentPage <= groupCount + offset + inputMinGap) {
      const leftPagesGroup = Array.from({ length: parseCount(currentPage + groupCount) }).map((_, i) => i + offset);

      return [leftPagesGroup, [], [count]];
    }
    const leftPagesGroup = [offset];

    if (currentPage >= count - groupCount - inputMinGap) {
      const rightPagesGroup = Array.from({ length: parseCount(count - currentPage + groupCount + offset) }).map((_, i) => count - i)
        .reverse();
      return [leftPagesGroup, [], rightPagesGroup];
    }

    const middlePages = Array.from({ length: parseCount(groupCount * 2 + offset) }).map((_, i) => i + (currentPage - groupCount));
    return [leftPagesGroup, middlePages, [count]];
  };

  const [leftPagesGroup, middlePages, rightPagesGroup] = getButtons();

  const isMiddlePagesVisible = middlePages.length > 0;
  const isRightPagesGroupVisible = rightPagesGroup.length > 0 && currentPage > groupCount + offset + inputMinGap;

  /**
   * Handles page click.
   * @param page Page number.
   */
  const handlePageClick = useCallback((page: number) => onChange(page), [onChange]);

  /**
   * Handles next page click.
   * @param page Page number.
   */
  const handleNextPageClick = useCallback(() => onChange(currentPage + offset), [onChange, currentPage]);

  /**
   * Handles previous page click.
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
      {leftPagesGroup.map(getPaginatorButton)}

      {isMiddlePagesVisible && (
        <>
          <PaginatorInput onChange={onChange} />
          {middlePages.map(getPaginatorButton)}
        </>
      )}

      {isRightPagesGroupVisible && (
        <>
          <PaginatorInput onChange={onChange} />
          {rightPagesGroup.map(getPaginatorButton)}
        </>
      )}
      {isCountLoading && (
        <IconButton
          colorScheme="gray"
          aria-label="Loading page count"
          icon={<Spinner size="lg" />}
          isDisabled
        />
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
