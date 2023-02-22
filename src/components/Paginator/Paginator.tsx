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
    if (pageCount <= inputMinGap * 2 + offset + groupCount * 2) {
      const leftPages = [...Array(pageCount).keys()].map(i => i + offset);

      return [leftPages, [], []];
    }

    if (currentPage <= inputMinGap + groupCount * 2) {
      const leftPages = [...Array(inputMinGap + offset + groupCount * 2).keys()]
        .map(i => i + offset);

      return [
        leftPages,
        [],
        [pageCount],
      ];
    }

    if (currentPage + groupCount * 2 >= pageCount) {
      return [
        [offset],
        [],
        [...Array(inputMinGap + offset + groupCount * 2).keys()].map(i => pageCount - i).reverse(),
      ];
    }

    const middlePages = [...Array(inputMinGap + groupCount * 2).keys()]
      .map(i => currentPage - groupCount + i);

    return [[offset], middlePages, [pageCount]];
  };

  const [leftPagesGroup, middlePages, rightPagesGroup] = getButtons();

  const isMiddlePagesVisible = middlePages.length > 0;
  const isRightPagesGroupVisible = rightPagesGroup.length > 0;

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
