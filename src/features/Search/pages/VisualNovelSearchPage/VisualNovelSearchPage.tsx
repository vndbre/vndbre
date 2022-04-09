import React, { useCallback, useState, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { VisualNovelSearchForm } from '../../components';

/** Search page for visual novels. */
export const VisualNovelSearchPage: VFC = () => {
  /**
   * TODO: Remove mock data.
   */
  const UNKNOWN_PAGE_COUNT = 11;

  const [pageCount, setPageCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginatorChange = useCallback((page: number) => {
    // Imagine { hasNext: false } check here.
    if (page + 1 <= UNKNOWN_PAGE_COUNT) {
      setPageCount(page + 1);
    }
    setCurrentPage(page);
  }, [setPageCount, setCurrentPage]);

  return (
    <Box display="flex" flexDir="column" mt={8}>
      <VisualNovelSearchForm />

      <Box alignSelf="center">
        <Paginator
          isNavigationHidden
          count={pageCount}
          currentPage={currentPage}
          onChange={handlePaginatorChange}
        />
      </Box>
    </Box>
  );
};
