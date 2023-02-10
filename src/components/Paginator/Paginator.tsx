import type { FC } from 'react';
import React, { memo, useCallback } from 'react';
import { PaginatorInput } from './PaginatorInput';
import { PaginatorButton } from './PaginatorButton';

interface Props {

  /** Total amount of items. */
  readonly count: number;

  /** Total items per page. */
  readonly pageSize?: number;

  /** Current page number. */
  readonly currentPage: number;

  /** Change callback. */
  readonly onChange: (pageNumber: number) => void;

  /** How many additional pages would be visible from side of a page. */
  readonly groupCount?: number;

  /**
   * Pagination offset from 0.
   * Defaults to 1, so pagination is user friendly.
   */
  readonly offset?: number;

  /** Minimum gap between two buttons groups for page number input to appear. */
  readonly inputMinGap?: number;

}

/**
 * Calculates page amount.
 * @param currentPageNumber Current page number.
 * @param pageAmount Maximum number of pages.
 */
function calculatePageAmount(currentPageNumber: number, pageAmount: number): number {
  return currentPageNumber > pageAmount ? pageAmount : currentPageNumber;
}

/**
 * Paginator component.
 */
const PaginatorComponent: FC<Props> = ({
  count,
  currentPage,
  onChange,
  groupCount = 1,
  offset = 1,
  inputMinGap = 1,
  pageSize = 10,
}) => {
  const pageCount = Math.ceil(count / pageSize);

  /** Get three arrays of pages. */
  const getButtons = (): [number[], number[], number[]] => {
    if (currentPage <= groupCount + offset + inputMinGap) {
      const leftPagesGroup = Array.from({
        length: calculatePageAmount(currentPage + groupCount + inputMinGap, pageCount),
      }).map((_, i) => i + offset);

      return [leftPagesGroup, [pageCount], []];
    }
    const leftPagesGroup = [offset];

    if (currentPage >= pageCount - groupCount - inputMinGap) {
      const rightPagesGroup = Array
        .from({
          length: calculatePageAmount(
            pageCount - currentPage + groupCount + offset + inputMinGap,
            pageCount,
          ),
        })
        .map((_, i) => pageCount - i)
        .reverse();
      return [leftPagesGroup, [], rightPagesGroup];
    }

    const middlePages = Array
      .from({ length: calculatePageAmount(groupCount * 2 + offset, pageCount) })
      .map((_, i) => i + (currentPage - groupCount));
    return [leftPagesGroup, middlePages, [pageCount]];
  };

  const [leftPagesGroup, middlePages, rightPagesGroup] = getButtons();

  const isMiddlePagesVisible = middlePages.length > 0;
  const isRightPagesGroupVisible =
    rightPagesGroup.length > 0 &&
    currentPage > groupCount + offset + inputMinGap;

  /**
   * Handles page click.
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
    <div className="flex gap-2">
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
    </div>
  );
};

export const Paginator = memo(PaginatorComponent);
