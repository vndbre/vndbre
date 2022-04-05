import React, { useCallback, useState, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { VisualNovelSearchForm } from '../../components';
import { useVisualNovelsPageQuery } from '../../../VisualNovel/queries/visualNovel';
import { CoverCard } from '../../components/CoverCard/CoverCard';

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

  const { isLoading, error, data: visualNovelsPage } = useVisualNovelsPageQuery({
    page: 4,
    pageSize: 20,
  });

  console.log(visualNovelsPage);

  return (
    <Box
      display="flex"
      flexDir="column"
      mt={8}
      px={10}
    >
      <VisualNovelSearchForm />
      <Box
        display="grid"
        gridGap={4}
        gridTemplateColumns="repeat(auto-fill, minmax(var(--chakra-sizes-48), 1fr))"
      >
        <>
          {visualNovelsPage?.items.map(vn => (
            <CoverCard
              key={vn.id}
              id={vn.id}
              image={vn.image ?? undefined}
              title={vn.title}
            />
          ))}
        </>
      </Box>

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
