import React, { useCallback, useMemo, useState, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { Paginator } from '../../../../components/Paginator/Paginator';
import { VisualNovelSearchForm } from '../../components';
import { useVisualNovelsPageQuery } from '../../../VisualNovel/queries/visualNovel';
import { CoverCard } from '../../components/CoverCard/CoverCard';
import { VisualNovelFormData } from '../../components/VisualNovelSearchForm/VisualNovelSearchForm';
import { CoverCardSkeleton } from '../../components/CoverCard/CoverCardSkeleton';

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
      <Box
        display="grid"
        gridGap={8}
        gridTemplateColumns="repeat(auto-fill, minmax(var(--chakra-sizes-48), 1fr))"
        w="full"
        h="full"
      >
        {isLoading && Array.from({ length: 15 }).map(() => (
          <CoverCardSkeleton />
        ))}
        {visualNovelsPage?.items.map(vn => (
          <CoverCard
            key={vn.id}
            id={vn.id}
            image={vn.image}
            title={vn.title}
            released={vn.released}
            rating={vn.rating}
            length={vn.length}
            languages={vn.languages}
            platforms={vn.platforms}
          />
        ))}
      </Box>

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
