import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { VisualNovelSearchForm } from '../../components';
import { useVisualNovelsPageQuery } from '../../../VisualNovel/queries/visualNovel';
import { CoverCard } from '../../components/CoverCard/CoverCard';
import { VisualNovelFormData } from '../../components/VisualNovelSearchForm/VisualNovelSearchForm';
import { CoverCardSkeleton } from '../../components/CoverCard/CoverCardSkeleton';
import { VisualNovelList } from '../../components/VisualNovelList/VisualNovelList';

/** Search page for visual novels. */
export const VisualNovelSearchPage: VFC = () => {
  /**
   * TODO: Remove mock data.
   */
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { isLoading, data: visualNovelsPage } = useVisualNovelsPageQuery({
    page,
    pageSize: 20,
    search: searchQuery,
  });

  const pageCount = useMemo(() => (visualNovelsPage?.hasMore ? page + 1 : page), [visualNovelsPage, page]);

  const handlePaginatorChange = useCallback(setPage, []);

  const handleSearchSubmit = useCallback((data: VisualNovelFormData) => {
    setPage(1);
    setSearchQuery(data.title);
  }, []);

  return (
    <Box
      display="flex"
      flexDir="column"
      mt={8}
      px={10}
      gap={8}
    >
      <VisualNovelSearchForm
        onSubmit={handleSearchSubmit}
      />

      <VisualNovelList
        variant="table"
        isLoading={isLoading}
        items={visualNovelsPage?.items}
      />

      <Box alignSelf="center">
        <Paginator
          isCountLoading={isLoading}
          isNavigationHidden
          count={pageCount}
          currentPage={page}
          onChange={handlePaginatorChange}
        />
      </Box>
    </Box>
  );
};
